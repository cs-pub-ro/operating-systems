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
Go to `chapters/compute/synchronization/drills/tasks/race-condition/support/c/race_condition.c`, compile and run the code a few times.
It spawns to threads that do exactly what we've talked about so far: one thread increments `var` 10 million times, while the other decrements it 10 million times.

As you can see from running the program, the differences between subsequent runs can be substantial.
To fix this, we must ensure that **only one thread** can execute either `var++` or `var--` at any time.
We call these code sections **critical sections**.
A critical section is a piece of code that can only be executed by **one thread** at a time.
So we need some sort of _mutual exclusion mechanism_ so that when one thread runs the critical section, the other has to **wait** before entering it.
This mechanism is called a **mutex**, whose name comes from "mutual exclusion".

## Thread-Local Storage (TLS)

First things first: what if we don't want data to be shared between threads?
Are we condemned to have to worry about race conditions?
Well, no.

To protect data from race conditions "by design", we can place in what's called **Thread-Local Storage (TLS)**.
As its name implies, this is a type of storage that is "owned" by individual threads, as opposed to being shared among all threads.
**Do not confuse it with copy-on-write**.
TLS pages are always duplicated when creating a new thread and their contents are reinitialised.
