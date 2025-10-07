# Atomic Assembly

No, this section is not about nukes, sadly :(.
Instead, we aim to get accustomed to the way in which the x86 ISA provides atomic instructions.

This mechanism looks very simple.
It is but **one instruction prefix**: `lock`.
It is not an instruction with its own separate opcode, but a prefix that slightly modifies the opcode of the following instructions to make the CPU execute it atomically (i.e. with exclusive access to the data bus).

`lock` must only be place before an instruction that executes a _read-modify-write_ action.
For example, we cannot place it before a `mov` instruction, as the action of a `mov` is simply `read` or `write`.
Instead, we can place it in front of an `inc` instruction if its operand is memory.

Go in the `atomic-assembly/` directory of the extracted archive (or `chapters/compute/synchronization/drills/tasks/atomic-assembly/` if you are working directly in the repository) and run:

```bash
make skels
```

Look at the code in `support/src/race_condition_lock.asm`.
It's an Assembly equivalent of the code you've already seen many times so far (such as `race-condition/support/c/race_condition.c`).
The 2 assembly functions (**increment_var** and **decrement_var**) are called by `race_condition_lock_checker.c`

Now add the `lock` prefix before `dec`.
Go in the `tests/` folder and run the checker:

```bash
cd ../tests/
./checker.sh
```

You should see something like this, if done correctly:

```text
Building the project...

nasm -f elf64 -o race_condition_lock.o race_condition_lock.asm
gcc -no-pie -o race_condition_lock_checker race_condition_lock_checker.c race_condition_lock.o -lpthread
Checking if var == 0...

Test passed
```

And now we have synchronized the two threads by leveraging CPU support.
