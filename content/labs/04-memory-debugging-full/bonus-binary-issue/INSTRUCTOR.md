# Instructor Notes: Patch the Bug, No Source Code Allowed

## Purpose

The hardest task in the session and the one furthest from the others: no source, no Valgrind route, and a fix that edits the binary rather than the code.
It pulls together the session's tools — `gdb` for the crash, disassembly for the cause — and points them at a target students have not seen before.

It is a bonus, and most groups will not reach it in the room.
It works well as a take-home, and the README is written to be followed unaided end to end.

## What students get, and what they must not

Students get **only `vuln`** — the binary in `04-memory-debugging-work/bonus-binary-issue/`.
They do **not** get `vuln.c` or `patch_vuln.py`; both live here, in full-contents, and the archive build keeps `solutions`-style material out of what ships.
If a student has the source, the exercise is pointless — the whole skill is working without it.

## The bug and the fix

* `reader()` calls `fgets(buffer, 128, stdin)` where `buffer` is 64 bytes.
* The fix changes one immediate: `mov esi,0x80` becomes `mov esi,0x40`, at file offset `0x1222`.

That is four bytes (`be 80 00 00 00` -> `be 40 00 00 00`), and only the immediate changes.

## The verified facts, for reference

The shipped binary is a fixed artefact, so these are exact for everyone who works from that file:

| Fact | Value |
| --- | --- |
| Function that reads input | `reader` |
| Buffer | `lea rax,[rbp-0x40]`, and `sub rsp,0x40` — 64 bytes |
| Buggy instruction | `mov esi,0x80` at virtual address `0x401221` |
| Immediate to patch | file offset `0x1222`, `0x80` -> `0x40` |
| `.text` mapping | virtual `0x401090` = file offset `0x1090`, so file offset = VA − `0x400000` |
| Crash site | `ret` in `reader`, return address overwritten with `0x4141414141414141` |
| Long-input exit, unpatched | 139 (`SIGSEGV`) |
| Long-input exit, patched | 0, input truncated to 63 characters |

Note that `make` here rebuilds `vuln` from `vuln.c`, and the rebuilt binary is **not** byte-identical to the shipped one (build-path and toolchain differences).
The addresses and offsets above match the *shipped* binary, which is the one students patch.
If you rebuild and the offsets shift, that is expected; work from the committed `vuln`, not a fresh `make`.

## Sequencing a walk-through

If you do present it, the arc is four steps and the README follows them:

1. **Observe.** Short input works, long input segfaults. The length dependence is the first clue about the bug class.
1. **Locate.** `gdb`, run with a long line, `bt`. The return address is `0x4141...` — input bytes where a code address belongs.
1. **Read.** `objdump -d --disassemble=reader`. Two numbers for one buffer, `0x40` and `0x80`, and they disagree.
1. **Patch.** Change the immediate, confirm with `objdump` that exactly one instruction moved, retest.

Step 2 is where the idea lands: the corruption is not mysterious, it is *literally the input*. That sentence is the whole lesson about this bug class.

## Points to hammer

* **The overwrite is the input.**
  `0x41` is `'A'`. Students expect "corruption" to look complicated; the fact that it is their own bytes, verbatim, is what makes stack smashing click.
* **The argument registers.**
  `rdi`, `rsi`, `rdx`, ... in order. The size is the second argument, so it is in `esi`. This is the one piece of ABI knowledge the task requires, and it is worth writing on the board.
* **VA to file offset is a constant subtraction, because the binary is non-PIE.**
  Show where the constant comes from in `readelf -S`. On a PIE binary none of this would be fixed.
* **Patch size is the constraint.**
  Immediate: free. New instruction: impossible without moving everything. This is the transferable idea, more than the specific fix.
* **Safe is not correct.**
  The patch stops the crash and silently truncates. Ask whether that is the behaviour they would want, and what the real fix would do differently.

## Why the mitigations are off

Say this explicitly, because a sharp student will notice the flags and ask:

* **`-fno-stack-protector`** — a canary would abort cleanly before `ret`, so the return address would never be reached and there would be no instructive crash.
* **`-no-pie`** — PIE randomises addresses per run, so the disassembly and patch offsets could not be written down.

Both are classroom conveniences and both are defaults to leave on everywhere else — which is itself a point worth making.
`FURTHER.md` has the students rebuild with the protector on and watch the crash turn into `*** stack smashing detected ***`.

## The red herrings

`warcraft`, `diablo`, `starcraft` and `g` are unused, and they are in the symbol table on purpose.
A student who runs `nm` and asks about them has understood that a non-stripped binary tells you a great deal — reward that.
They also set up the natural follow-up question: what if `ret` landed on one of them instead of crashing? That is the doorway from "bug" to "exploit", and it is the right note to end the session on if the group is strong.

## Practical notes

* Needs Python 3 and assumes x86-64.
  It will not work on an ARM laptop, and there is no fallback — check before assigning it as anything other than take-home.
* `make test` demonstrates the whole thing end to end and is the fastest way to confirm a lab machine is set up correctly.
* Nothing here is timing-sensitive.
