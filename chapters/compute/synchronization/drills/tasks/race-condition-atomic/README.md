# C: Atomics

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

Compilers provide support for such hardware-level atomic operations.
GCC exposes [built-ins](https://gcc.gnu.org/onlinedocs/gcc/_005f_005fatomic-Builtins.html) such as `__atomic_load()`, `__atomic_store()`, `__atomic_compare_exchange()` and many others.
All of them rely on the mechanism described above.

Go to the `race-condition-atomic/` directory of the extracted archive (or `chapters/compute/synchronization/drills/tasks/race-condition-atomic/` if you are working directly in the repository) and run:

```bash
make skels
```

Now enter `support/src/race_condition_atomic.c` and complete the function `decrement_var()`.
Compile and run the code.
Its running time should be somewhere between `race_condition` and `race_condition_mutex`.

The C standard library also provides atomic data types.
Access to these variables can be done only by one thread at a time.
Go to `support/src/race_condition_atomic2.c`, compile and run the code.

After both tasks are done, go in the checker folder and run it using the following commands:

```bash
cd ../tests/
./checker.sh
```

Notice that the time is similar to `race_condition_atomic`.

So using the hardware support is more efficient, but it usually is leveraged only for simple, individual instructions, such as loads and stores.
And the fact that high-level languages also expose an API for atomic operations shows how useful these operations are for developers.
