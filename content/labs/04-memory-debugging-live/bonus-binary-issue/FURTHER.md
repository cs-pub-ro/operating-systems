# Going Further: Patch the Bug, No Source Code Allowed

Optional.

## Things to try

1. **Find the buffer size independently of the bug.**
   From the disassembly, work out the stack frame layout: how much does the function subtract from `rsp`, and where does the buffer start relative to `rbp`?
   Confirm your answer matches the size you patched in.
1. **Patch it a different way.**
   Instead of changing the size argument, redirect the call to a safer function, or insert a length check.
   What makes one patch easy and another impossible when you cannot move any code?
1. **Rebuild the defences.**
   The binary was built with the stack protector and PIE both disabled.
   Compile something similar *with* the stack protector and see what changes: where does the canary live, and what does the crash look like now?
1. **Watch the overflow land.**
   In GDB, examine the stack around the buffer before and after a long input.
   Identify the saved frame pointer and the return address, and watch them get overwritten.
   At what input length does each one first change?
1. **Run `checksec`** (or `readelf -a`) on this binary and on a default-compiled one, and list every protection that was turned off to make this exercise possible.

## Questions to answer

* Why does a short input work and a long one crash?
  What exactly is different, and at what length does the behaviour change?
* Why was the binary built without the stack protector and without PIE?
  What would each of them have done to this exercise?
* You patched an immediate operand in place.
  Why is that safe, and what would have gone wrong if the fix had needed *more* instructions than the original?
* The patched program now truncates long input instead of crashing.
  Is truncation the correct behaviour, or just a safe one?

## Discussion points

* **A binary is not a black box.**
  Symbols, disassembly, the dynamic section and the runtime behaviour together are usually enough to reconstruct what the source said — which is the whole basis of reverse engineering, and of debugging production crashes where you have a core dump and no build tree.
* **Patching in place is constrained by size.**
  Changing an immediate is free; adding an instruction is not, because everything after it would move and every relative offset would break.
  This is why real binary patches are so often "flip one constant" or "jump to a cave".
* **The bug is a mismatch between two numbers** — the declared size of the buffer and the size passed to the read function.
  Neither is wrong on its own; they are only wrong together.
  This is the same shape as the `strlen + 1` bug in the JSON parser.
* **Every mitigation that would have caught this was deliberately disabled.**
  Worth listing them: stack protector, PIE and ASLR, and `_FORTIFY_SOURCE`.
  The exercise is a good argument for leaving defaults alone.

## References

* `man 1 objdump`, `man 1 nm`, `man 1 readelf`, `man 1 gdb`
* `man 3 fgets` — note what the size argument is specified to mean
* [x86-64 System V ABI](https://gitlab.com/x86-psABIs/x86-64-ABI) — argument registers
