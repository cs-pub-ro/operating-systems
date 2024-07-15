# Synchronization

So far, we've used threads and processes without wondering how to "tell" them how to access shared data.
Moreover, in order to make threads wait for each other, we simply had the main thread wait for the others to finish all their work.
But what if we want one thread to wait until another one simply performs some specific action, after which it resumes its execution?
For this, we need to use some more complex synchronization mechanisms.

## Race Conditions

For example, what if one thread wants to increase a global variable while another one wants to decrease it?
Let's say the assembly code for increasing and decreasing the variable looks like the one in the snippet below.

```asm
increase:
    mov eax, [var]
    inc eax
    mov [var], eax

decrease:
    mov eax, [var]
    dec eax
    mov [var], eax
```

Imagine both threads executed `mov eax, [var]` at the same time.
Then each would independently increase its (**non-shared**) `eax` register.
In the end, the final value of `var` depends on which thread executes `mov [var], eax` _last_.
So it's kind of a reversed race.
The thread that runs the slowest "wins" this race and writes the final value of `var`.
But this is up to the scheduler and is non-deterministic.
Such undefined behaviours can cripple the execution of a program if `var` is some critical variable.

Let's see this bug in action.
Go to `race-condition/support/c/race_condition.c`, compile and run the code a few times.
It spawns to threads that do exactly what we've talked about so far: one thread increments `var` 10 million times, while the other decrements it 10 million times.

As you can see from running the program, the differences between subsequent runs can be substantial.
To fix this, we must ensure that **only one thread** can execute either `var++` or `var--` at any time.
We call these code sections **critical sections**.
A critical section is a piece of code that can only be executed by **one thread** at a time.
So we need some sort of _mutual exclusion mechanism_ so that when one thread runs the critical section, the other has to **wait** before entering it.
This mechanism is called a **mutex**, whose name comes from "mutual exclusion".

Go to `race-condition/support/c/race_condition_mutex.c` and notice the differences between this code and the buggy one.
We now use a `pthread_mutex_t` variable, which we `lock` at the beginning of a critical section, and we `unlock` at the end.
Generally speaking, `lock`-ing a mutex makes a thread enter a critical section, while calling `pthread_mutex_unlock()` makes the thread leave said critical section.
Therefore, as we said previously, the critical sections in our code are `var--` and `var++`.
Run the code multiple times to convince yourself that in the end, the value of `var` will always be 0.

Mutexes contain an internal variable which can be either 1 (locked) or 0 (unlocked).
When a thread calls `pthread_mutex_lock()`, it attempts to set that variable to 1.
If it was 0, the thread sets it to 1 and proceeds to execute the critical section.
Otherwise, it **suspends its execution** and waits until that variable is set to 0 again.

When calling `pthread_mutex_unlock()`, the internal variable is set to 0 and all waiting threads are woken up to try to acquire the mutex again.
**Be careful:** It is generally considered unsafe and [in many cases undefined behaviour](https://pubs.opengroup.org/onlinepubs/9699919799/functions/pthread_mutex_lock.html) to call `pthread_mutex_unlock()` from a different thread than the one that acquired the lock.
So the general workflow should look something like this:

```text
within a single thread:
    pthread_mutex_lock(&mutex)
    // do atomic stuff
    pthread_mutex_unlock(&mutex)
```

### Synchronization - Overhead

> There ain't no such thing as a free lunch

This saying is also true for multithreading.
Running threads in parallel is nice and efficient, but synchronization always comes with a penalty: overhead.
Use the `time` command to record the running times of `race_condition` and `race_condition_mutex`.
Notice that those of `race_condition_mutex` are larger than those of `race_condition`.

The cause of this is that now when one thread is executing the critical section, the other has to wait and do nothing.
Waiting means changing its state from RUNNING to WAITING, which brings further overhead from the scheduler.
This latter overhead comes from the **context switch** that is necessary for a thread to switch its state from RUNNING to WAITING and back.

### Practice: Wrap the Whole `for` Statements in Critical Sections

Move the calls to `pthread_mutex_lock()` and `pthread_mutex_unlock()` outside the `for` statements so that the critical sections become the entire statement.
Measure the new time spent by the code and compare it with the execution times recorded when the critical sections were made up of only `var--` and `var++`.

[Quiz](../drills/questions/coarse-vs-granular-critical-section.md)

## Atomics

So now we know how to use mutexes.
And we know that mutexes work by using an internal variable that can be either 1 (locked) or 0 (unlocked).
But how does `pthread_mutex_lock()` actually set that variable to 1?
How does it avoid a race condition in case another thread also wants to set it to 1?

We need a guarantee that anyone "touching" that variable does so "within its own critical section".
But now we need a critical section to implement a critical section...
To solve this circular problem, we make use of a very common _Deus ex Machina_: **hardware support**.

Modern processors are capable of _atomically_ accessing data, either for reads or writes.
An atomic action is an indivisible sequence of operations that a thread runs without interference from others.
Concretely, before initiating an atomic transfer on one of its data buses, the CPU first makes sure all other transfers have ended, then **locks** the data bus by stalling all cores attempting to transfer data on it.
This way, one thread obtains **exclusive** access to the data bus while accessing data.
As a side note, the critical sections in `race-condition/support/c/race_condition_mutex.c` are also atomic once they are wrapped between calls to `pthread_mutex_lock()` and `pthread_mutex_unlock()`.

As with every hardware feature, the `x86` ISA exposes an instruction for atomic operations.
In particular, this instruction is a **prefix**, called `lock`.
It makes the instruction that follows it run atomically.
The `lock` prefix ensures that the core performing the instruction has exclusive ownership of the cache line from where the data is transferred for the entire operation.
This is how the increment is made into an indivisible unit.

For example, `inc dword [x]` can be made atomic, like so: `lock inc dword [x]`.
You can play with the `lock` prefix [in the Arena](atomic-assembly).

Compilers provide support for such hardware-level atomic operations.
GCC exposes [built-ins](https://gcc.gnu.org/onlinedocs/gcc/_005f_005fatomic-Builtins.html) such as `__atomic_load()`, `__atomic_store()`, `__atomic_compare_exchange()` and many others.
All of them rely on the mechanism described above.

Go to `race-condition/support/c/race_condition_atomic.c` and complete the function `decrement_var()`.
Compile and run the code.
Now measure its running time against the mutex implementations.
It should be somewhere between `race_condition.c` and `race_condition_mutex.c`.

The C standard library also provides atomic data types.
Access to these variables can be done only by one thread at a time.
Go to `race-condition/support/c/race_condition_atomic2.c`, compile and run the code.
Now measure its running time against the other implementations.
Notice that the time is similar to `race_condition_atomic`.

So using the hardware support is more efficient, but it usually is leveraged only for simple, individual instructions, such as loads and stores.
And the fact that high-level languages also expose an API for atomic operations shows how useful these operations are for developers.

## Semaphores

Up to now, we've learned how to create critical sections that can be accessed by **only one thread** at a time.
These critical sections revolved around **data**.
Whenever we define a critical section, there is some specific data to which we cannot allow parallel access.
The reason why we can't allow it is, in general, data integrity, as we've seen in our examples in `race-condition/support/`

But what if threads need to count?
Counting is inherently thread-unsafe because it's a _read-modify-write_ operation.
We read the counter, increment (modify) it and then write it back.
Think about our example with [`apache2`](../../process-threads-apache2/reading/processes-threads-apache2.md)
Let's say a `worker` has created a _pool_ of 3 threads.
They are not doing any work initially;
they are in the WAITING state.
As clients initiate connections, these threads are picked up and are used to serve **at most 3** connections at a time.
But the number of connections may be arbitrarily large.
Therefore, we need a way to keep track of it.
When serving a client, a thread should decrement it to inform the others that a connection has been finished.
In short, we need a counter that the dispatcher increments and that worker threads decrement.

Such a counter could be implemented using a **semaphore**.
For simplicity's sake, you can view a semaphore as simply a mutex whose internal variable can take any value and acts like a counter.
When a thread attempts to `acquire()` a semaphore, it will wait if this counter is less than or equal to 0.
Otherwise, the thread **decrements** the internal counter and the function returns.
The opposite of `acquire()` is `release()`, which increases the internal counter by a given value (by default 1).

## Conditions

Another way we can implement our `apache2` simulator is to use a condition variable.
This one is probably the most intuitive synchronization primitive.
It's a means by which a thread can tell another one: "Hey, wake up, _this_ happened!".
So it's a way for threads to notify each other.
For this reason, the main methods associated with conditions are `notify()` and `wait()`.
As you might expect, they are complementary:

- `wait()` puts the thread in the WAITING state until it's woken up by another one
- `notify()` wakes up one or more `wait()`-ing threads.
If `notify()` is called before any thread has called `wait()`, the first thread that calls it will continue its execution unhindered.

## Thread-Local Storage (TLS)

First things first: what if we don't want data to be shared between threads?
Are we condemned to have to worry about race conditions?
Well, no.

To protect data from race conditions "by design", we can place in what's called **Thread-Local Storage (TLS)**.
As its name implies, this is a type of storage that is "owned" by individual threads, as opposed to being shared among all threads.
**Do not confuse it with copy-on-write**.
TLS pages are always duplicated when creating a new thread and their contents are reinitialised.
