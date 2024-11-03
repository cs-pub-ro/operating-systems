# Race Conditions

## C - TLS on Demand

The perspective of C towards TLS is the following: everything is shared by default.
This makes multithreading easier and more lightweight to implement than in other languages, like D, because synchronization is left entirely up to the developer, at the cost of potential unsafety.

Of course, we can specify that some data belongs to the TLS, by preceding the declaration of a variable with `__thread` keyword.
First, compile and run the code in `chapters/compute/synchronization/drills/tasks/race-condition/support/c/race_condition_tls.c` a few times.
As expected, the result is different each time.

1. Modify the declaration of `var` and add the `__thread` keyword to place the variable in the TLS of each thread.
   Recompile and run the code a few more times.
   You should see that in the end, `var` is 0.

   [Quiz 1](../../questions/tls-synchronization.md)

   [Quiz 2](../../questions/tls-var-copies.md)

1. Print the address and value of `var` in each thread.
   See that they differ.

1. Modify the value of `var` in the `main()` function before calling `pthread_create()`.
   Notice that the value doesn't propagate to the other threads.
   This is because, upon creating a new thread, its TLS is initialised.

## Atomic Assembly

No, this section is not about nukes, sadly :(.
Instead, we aim to get accustomed to the way in which the x86 ISA provides atomic instructions.

This mechanism looks very simple.
It is but **one instruction prefix**: `lock`.
It is not an instruction with its own separate opcode, but a prefix that slightly modifies the opcode of the following instructions to make the CPU execute it atomically (i.e. with exclusive access to the data bus).

`lock` must only be place before an instruction that executes a _read-modify-write_ action.
For example, we cannot place it before a `mov` instruction, as the action of a `mov` is simply `read` or `write`.
Instead, we can place it in front of an `inc` instruction if its operand is memory.

Go to `chapters/compute/synchronization/drills/tasks/race-condition/support/`.
Look at the code in `asm/race_condition_lock.S`.
It's an Assembly equivalent of the code you've already seen many times so far (such as `c/race_condition.c`).
Assemble and run it a few times.
Notice the different results you get.

Now add the `lock` prefix before `inc` and `dec`.
Reassemble and rerun the code.
And now we have synchronized the two threads by leveraging CPU support.
