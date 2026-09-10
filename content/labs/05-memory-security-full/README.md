# Session 05: Memory Security — Full Contents

This directory holds the complete version of session 05: reference write-ups, the bug and exploit for every challenge, and the full build/publish/deploy/solve infrastructure used to host each one.

Use it after the live session for a full view of the solutions and the reasoning behind them.
The corresponding directory used during the session, with the public challenge files, is [`05-memory-security-work/`](../05-memory-security-work).

> [!WARNING]
> This directory contains the **flags** (`*/flag`) and the **reference exploits** (`*/solve/exploit.py`).
> It must never be handed to students.
> The lab-archive tool (`scripts/gen_zip.py`) only excludes directories literally named `solutions`, and only packs directories matching `session-*`; a `*-full-contents/` directory matches neither rule.
> Before session 05 is ever published as a student archive, `scripts/sessions.py` has to be taught to pack from `*-work/` and to skip `*-full-contents/`.
> See the session `INSTRUCTOR.md` for details.

## Learning objectives

By the end of this session students should be able to:

* Explain how a heap buffer overflow can corrupt an adjacent variable or structure field.
* Craft an overflow payload that sets a target value precisely, including endianness considerations.
* Overwrite a function pointer stored on the heap and redirect control flow to code of their choosing.
* Explain what a use-after-free bug is, and how allocator reuse (glibc's tcache) turns it into a write primitive.
* Combine an information leak with a heap overflow to defeat ASLR in a position-independent executable.

## Prerequisites and required tools

* Session 04 concepts: heap layout, and using `gdb` to inspect memory.
* A Linux environment with `gdb`, `objdump` and `python3`; the exploits use [pwntools](https://docs.pwntools.com/).
* **Docker** — the only requirement to build, publish, deploy and solve every challenge. No compiler, Python or pwntools install is needed on the host.

## Contents

| Task | Type | Bug | Technique |
| --- | --- | --- | --- |
| [`demo-heap-0`](demo-heap-0) | Demo | Heap overflow | Corrupt an adjacent variable to any value. |
| [`demo-heap-1`](demo-heap-1) | Demo | Heap overflow | Corrupt it to one specific value. |
| [`01-cylab-heap-0`](01-cylab-heap-0) | Core | Heap overflow | Corrupt an adjacent variable to any value. |
| [`02-cylab-heap-1`](02-cylab-heap-1) | Core | Heap overflow | Corrupt it to one specific value. |
| [`03-cylab-heap-2`](03-cylab-heap-2) | Core | Heap overflow | Overwrite a function pointer with `win()`'s address. |
| [`04-cylab-heap-3`](04-cylab-heap-3) | Core | Use-after-free | Reclaim a freed chunk via tcache and write through the dangling pointer. |
| [`bonus-cylab-heap-havoc`](bonus-cylab-heap-havoc) | Bonus | Heap overflow (32-bit) | Cross from one struct into the next to set a hidden callback. |
| [`bonus-heap-mayhem`](bonus-heap-mayhem) | Bonus | Heap overflow (PIE) | Leak a code pointer to beat ASLR, then overwrite a callback. |

Each task directory contains:

* `README.md` — the write-up: the bug, the exploit, and how to build, run and solve it.
* `FURTHER.md` — extensions, variations, and discussion points, with answers.
* `INSTRUCTOR.md` — notes for whoever runs the session.
* `flag` — the challenge flag, copied into the container as `flag.txt` at deploy time.
* `build/`, `publish/`, `deploy/`, `solve/` — the Docker pipeline (see below).

## The through-line of the session

Every challenge is the same sentence with a different object: **a write the program's author thought was bounded is not, and the bytes past the end land on something that matters.**

1. **`heap-0`** — the something is an adjacent `char` buffer, and any change wins.
1. **`heap-1`** — the same, but the bytes have to spell one exact word: now you are *choosing* the value, not just destroying it.
1. **`heap-2`** — the something is a **function pointer**. Choosing the value now means choosing which code runs: data corruption becomes control-flow hijack.
1. **`heap-3`** — there is no overflow at all. A **use-after-free** hands you a pointer into a chunk the allocator has already given away, and the write goes through that.
1. **`heap-havoc`** — the overflow crosses out of one heap object and into the *next struct*, several fields deep, to reach a callback nobody guards.
1. **`heap-mayhem`** — the same struct-to-struct overflow, but in a **PIE**, so first you have to *leak* a code address to know where anything is.

The progression is: corrupt a value → choose the value → choose the code → get the pointer without an overflow → reach across objects → beat ASLR to do it. Each challenge reuses the previous idea and adds exactly one thing.

Every binary here is built deliberately weak — no stack canary, `heap-0..3` and `heap-havoc` with no PIE — because the point is the bug, not the mitigations. `heap-mayhem` turns PIE back on precisely so the last exercise has to deal with it.

## The challenge pipeline

Each challenge is structured as four Docker stages, each with its own `README.md`:

* **`build/`** — a reproducible Debian build image compiles `chall.c` and copies out the exact `libc.so.6` and loader it was linked against. Heap layout depends on the glibc version, so the matching libc ships with the binary.
* **`publish/`** — zips the binary and its libc/loader into the archive handed to players.
* **`deploy/`** — runs the binary under `xinetd` in a container, one TCP port per challenge, with the flag mounted as `flag.txt` owned by a separate user.
* **`solve/`** — the reference `exploit.py` and a pwntools container to run it locally, against a local deployment, or against a remote target.

Start from `<task>/build/README.md` and follow `publish`, `deploy`, `solve` in order.

## A note on reproducibility

The write-ups quote concrete addresses and offsets (heap deltas, symbol addresses).
The *offsets between allocations* and the *struct layouts* are stable for a given build; absolute addresses are not, and under PIE (`heap-mayhem`) nothing is fixed at all — which is why that exploit measures every address at runtime instead of hardcoding it.
All eight exploits were last run green against freshly built binaries on x86-64.
