# Going Further: Patch the Bug, No Source Code Allowed

## Things to try

1. **Find the buffer size two independent ways.**
   You read `0x40` off both `sub rsp,0x40` and `lea rax,[rbp-0x40]`.
   Confirm they agree, and work out where the saved frame pointer and the return address sit relative to `buffer`: the buffer starts at `rbp-0x40`, so the saved `rbp` is at `rbp+0` (64 bytes in) and the return address at `rbp+8` (72 bytes in).
   That tells you the shortest input that can reach the return address before you ever run the program.
1. **Find the threshold experimentally**, then reconcile it with the arithmetic:

   ```console
   for n in 63 64 72 73 96; do
     printf 'len=%s exit=' "$n"
     python3 -c "print('A' * $n)" | ./vuln > /dev/null 2>&1; echo $?
   done
   ```

   Short inputs exit 0; past the point where the write reaches the saved return address, they exit 139.
   The crash is not at 64 — overwriting the saved `rbp` alone does not always kill it — but a little beyond.
1. **Patch it a different way.**
   Instead of shrinking the size argument, redirect the `call` to a safer function, or overwrite the whole `fgets` setup with a shorter, safe sequence padded with `nop`.
   What makes the immediate patch trivial and the others hard is that you cannot *move* any code — see the layout discussion in the README.
1. **Rebuild with the defences on** and watch the crash change:

   ```console
   gcc -O0 -no-pie -o vuln-protected vuln.c        # stack protector is on by default
   python3 -c "print('A' * 200)" | ./vuln-protected
   ```

   ```text
   *** stack smashing detected ***: terminated
   ```

   The canary turns a silent hijack into a controlled abort (exit 134, `SIGABRT`).
   Find the canary in the disassembly: a load from `fs:0x28` on entry and a compare against it before `ret`.
1. **Watch the overwrite land.**
   In `gdb` on `vuln-debug`, break on the line after `fgets`, then `x/16gx $rbp-0x40` before and after a long input.
   Identify the saved `rbp` and the return address in the dump and watch them turn into `0x4141414141414141`.
1. **Run `checksec`** (or `readelf -a`) on this binary and on a default-compiled one, and list every protection that was turned off to make the exercise work.

## Questions to answer

* **Why does a short input work and a long one crash?**
  `fgets` writes what it reads into `buffer`.
  Up to 63 characters plus a terminator fit; beyond that it writes past the end, and once the write reaches the saved return address at `rbp+8`, the function returns to an address made of input bytes and the CPU faults.
* **Why was the binary built without the stack protector and without PIE?**
  The canary would have caught the overflow and aborted cleanly, so the return address would never be reached — no instructive crash.
  PIE would have randomised the addresses, so the disassembly and the patch offsets would differ on every build and could not be written down.
  Both are classroom conveniences, and both are defaults you should leave on everywhere else.
* **You patched an immediate operand in place. Why is that safe?**
  The instruction keeps its length, so nothing after it moves and no offset, relocation or symbol address changes.
  A fix that needed *more* instructions than the original would shift everything downstream and break every relative jump and absolute address computed against it.
* **The patched program truncates long input instead of crashing. Is that correct, or just safe?**
  Safe, not correct.
  Silently discarding part of the input is a milder bug, not the absence of one.
  The correct fix, with source in hand, reads the length, notices the truncation and reports it.
* **The overwritten return address was `0x4141414141414141`. What would an attacker put there instead?**
  The address of code they want to run — an existing function in the binary, a chain of instruction fragments, or injected shellcode.
  `warcraft`, `diablo` and `starcraft` are in the symbol table precisely so a curious student can ask what happens if `ret` lands on one of them.

## Discussion points

* **A binary is not a black box.**
  Symbols, disassembly, the dynamic section and the runtime behaviour together are usually enough to reconstruct what the source said.
  That is the basis of reverse engineering, and of debugging a production crash where you have a core dump and no build tree.
* **Patching in place is constrained by size.**
  Changing a constant is free; adding an instruction is not.
  This is why real patches are "flip one immediate" or "jump to a code cave", and why the size of a fix matters as much as its content.
* **The bug is a mismatch between two numbers** — the declared size of the buffer and the size passed to the reader.
  Neither is wrong alone.
  This is exactly the shape of the `malloc(len)` versus `len + 1` bug in `bonus-json-parser`, one layer up.
* **Every mitigation that would have caught this was deliberately disabled**: stack protector, PIE and ASLR, and `_FORTIFY_SOURCE` (which at `-O2` replaces `fgets` with a checked variant).
  The exercise is a compact argument for leaving compiler defaults alone.
* **This is a debugging exercise and an offensive-security exercise at the same time.**
  The input sitting where the return address belongs is the whole of the vulnerability; the rest is choosing better bytes.

## References

* `man 1 objdump`, `man 1 nm`, `man 1 readelf`, `man 1 gdb`
* `man 3 fgets`
* [x86-64 System V ABI](https://gitlab.com/x86-psABIs/x86-64-ABI) — argument registers
* [Smashing The Stack For Fun And Profit](https://phrack.org/issues/49/14.html) — Aleph One
* `checksec` — [github.com/slimm609/checksec.sh](https://github.com/slimm609/checksec.sh)
