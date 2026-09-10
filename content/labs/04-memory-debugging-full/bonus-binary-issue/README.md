# Bonus: Patch the Bug, No Source Code Allowed

**Tools:** GDB, objdump, nm, readelf, Python

## Goal

Reference solution for the binary-patching bonus: the source the shipped binary was built from, a working patcher, and the route from "a program that crashes" to "four bytes changed" without recompiling anything.

## Background

Students are given one file — `vuln`, a compiled x86-64 ELF executable — and no source.
This directory has the source, which is short:

```C
static void reader(void)
{
	char buffer[64];

	printf("gimme message: ");
	fgets(buffer, 128, stdin);
	printf("hello, %s\n", buffer);
}
```

The bug is the `fgets()` line: `buffer` is 64 bytes and `fgets()` is told it may write up to 128.
Any input line of 64 characters or more runs off the end of the buffer and over whatever the compiler placed after it on the stack — including the saved return address.

The binary is deliberately built with `-fno-stack-protector -no-pie`:

* **no stack protector**, so the overflow reaches the return address instead of being caught by a canary;
* **no PIE**, so every address is fixed and matches this document byte for byte.

Both are only to make the bug reproducible in a classroom.
They are also, not coincidentally, two of the mitigations that would have made this a non-event in production.

`vuln.c` also contains three unused static functions (`warcraft`, `diablo`, `starcraft`) and an unused global (`g`).
They are red herrings for students who go looking through `nm` output, and have nothing to do with the bug.

Files:

* `vuln.c` — the source the shipped binary was built from.
* `Makefile` — builds `vuln` exactly as shipped, plus a `-g` build and the patch/test targets.
* `patch_vuln.py` — the reference patcher.

## Build & Run

```console
make          # builds ./vuln exactly as shipped to students (no -g)
make debug    # builds ./vuln-debug, same source, with debug info
make patch    # builds ./vuln, then produces ./vuln.patched via patch_vuln.py
make test     # builds everything and demonstrates bug and fix end-to-end
```

```text
== 1. vuln, short input (expected: prints back the string) ==
hello, blizzard!
gimme message: hello, hello

== 2. vuln, long input (expected: segmentation fault) ==
Segmentation fault (core dumped)
exit status: 139

== 3. vuln.patched, long input (expected: no crash, truncated output) ==
hello, blizzard!
gimme message: hello, AAAA...AAAA
exit status: 0

all good: vuln crashes on long input, vuln.patched does not.
```

## Results and Explanations

### Confirming the diagnosis

The shipped binary has no debug info, so `vuln-debug` is there for a source-level look:

```console
python3 -c "print('A' * 100)" > /tmp/overflow.txt
gdb ./vuln-debug
(gdb) run < /tmp/overflow.txt
```

```text
Program received signal SIGSEGV, Segmentation fault.
0x000000000040124b in reader () at vuln.c:30
(gdb) bt
#0  0x000000000040124b in reader () at vuln.c:30
#1  0x4141414141414141 in ?? ()
#2  0x4141414141414141 in ?? ()
```

`0x41` is `'A'`.
The saved return address is eight bytes of the input, and so is the frame below it.

That is the fingerprint of a classic stack smash, and it is worth dwelling on: the overwritten data is not "corrupted" in some complicated way.
It is *literally the input*, sitting where the return address used to be.
The distance between this and a working exploit is choosing more interesting bytes than `AAAAAAAA`.

### Finding it from the binary alone

Students do not have `vuln.c`, so the route is: find the function that reads input, and compare the buffer it writes into against the size it passes.

```console
nm vuln                    # the binary is not stripped
objdump -d --disassemble=reader -M intel vuln
```

```text
00000000004011f6 <reader>:
  4011f6:	f3 0f 1e fa          	endbr64
  4011fa:	55                   	push   rbp
  4011fb:	48 89 e5             	mov    rbp,rsp
  4011fe:	48 83 ec 40          	sub    rsp,0x40
  ...
  401216:	48 8b 15 13 2e 00 00 	mov    rdx,QWORD PTR [rip+0x2e13]  # stdin@GLIBC_2.2.5
  40121d:	48 8d 45 c0          	lea    rax,[rbp-0x40]
  401221:	be 80 00 00 00       	mov    esi,0x80
  401226:	48 89 c7             	mov    rdi,rax
  401229:	e8 52 fe ff ff       	call   401080 <fgets@plt>
```

Reading the four instructions before the `call`, in argument order: `rdx` is `stdin`, `rdi` is the address of the buffer, and `rsi` is `0x80`.

Two numbers describe the same buffer and they disagree:

* `sub rsp,0x40` reserves 64 bytes of locals, and `lea rax,[rbp-0x40]` computes an address 64 bytes below the frame pointer — that is `buffer`, and it is `0x40` = 64 bytes long.
* `mov esi,0x80` loads 128 into `ESI`, which under the x86-64 System V ABI carries the **second** argument, i.e. `fgets()`'s maximum size.

Neither number is wrong on its own.
They are only wrong together, which is the shape of most real buffer overflows.

### The fix: patch the machine code

The instruction is `be 80 00 00 00` — opcode `0xBE` (`mov esi, imm32`) followed by the little-endian immediate.
Only the immediate has to change, from `0x80` to `0x40`.

`patch_vuln.py` finds that byte pattern, confirms it is followed by a `call` so it does not patch a coincidental match elsewhere, and rewrites the four immediate bytes:

```console
python3 patch_vuln.py vuln -o vuln.patched
```

```text
found buggy instruction at file offset 0x1221: mov esi, 128
patched immediate at file offset 0x1222: mov esi, 128 -> mov esi, 64
wrote patched binary to vuln.patched
```

Confirm that exactly one instruction changed:

```console
objdump -d --disassemble=reader -M intel vuln.patched
```

```text
  401221:  be 40 00 00 00       mov    esi,0x40
```

**Virtual address to file offset.**
The binary is non-PIE, so the mapping is a constant subtraction, and `readelf` gives you the constant:

```console
readelf -S vuln | grep -A1 '\.text'
```

```text
  [14] .text  PROGBITS  0000000000401090  00001090
```

The `.text` section is at virtual address `0x401090` and file offset `0x1090`, so file offset = virtual address − `0x400000`.
The instruction at `0x401221` is at file offset `0x1221`, and its immediate starts one byte later, at `0x1222`.

### Why the patch has to be this small

Changing an immediate is free: the instruction keeps its length, so nothing moves.

Adding an instruction is not.
Everything after it would shift, every relative jump and call offset computed against those addresses would break, and every absolute address in the relocation and symbol tables would be wrong.
This is why real binary patches are almost always "flip one constant" or "redirect a call into unused space" — the two edits that preserve layout.

### Why patch at all, rather than fix the source

When you have the source, recompiling is obviously the right answer.
This exercise is about the case where you do not: a vendor-supplied binary, a legacy build with no surviving source tree, firmware, or a third-party component you are auditing.

Going from "I found a bug by reading disassembly" to "I fixed it by changing four bytes, verifiably and minimally" is what a hotfix to a shipped binary actually looks like — and it is the same skill, pointed the other way, that turns a crash like this one into an exploit.

### Is truncation the right behaviour?

The patched program no longer crashes; it truncates input at 63 characters.
That is *safe*, and it is not obviously *correct* — a program that silently discards part of its input is a different bug, a quieter one.

The honest fix, with the source in hand, is to read the length, detect truncation and report it.
Worth saying out loud: a minimal binary patch buys you safety, not correctness, and the two are not the same thing.

## References

* `man 1 objdump`, `man 1 nm`, `man 1 readelf`, `man 1 gdb`
* `man 3 fgets` — note exactly what the size argument is specified to mean
* [x86-64 System V ABI](https://gitlab.com/x86-psABIs/x86-64-ABI) — argument registers, in order: `rdi`, `rsi`, `rdx`, `rcx`, `r8`, `r9`
* [Smashing The Stack For Fun And Profit](https://phrack.org/issues/49/14.html) — Aleph One, 1996; still the clearest description of this bug class
