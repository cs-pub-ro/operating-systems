# Session 05: Memory Security — Full Contents

This directory holds the complete version of session 05: reference write-ups, the bug and exploit for every challenge, and the full build/publish/deploy/solve infrastructure used to host each one.

Use it after the live session for a full view of the solutions and the reasoning behind them.
The corresponding directory used during the session, with the public challenge files, is [`05-memory-security-live/`](../05-memory-security-live).

> [!WARNING]
> This directory contains the **flags** (`*/flag`) and the **reference exploits** (`*/solve/exploit.py`).
> It must never be handed to students.
> The lab-archive tool (`scripts/gen_zip.py`) packs the `*-live/` half of a lab session and nothing else, and aborts outright if a file from a `*-full/` tree ever reaches an archive.
> Check any archive with `unzip -l` before it leaves your machine all the same.
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
* A Linux environment with `gdb`, `objdump`, `nc` and `python3`; the scripted solution to the last challenge uses [pwntools](https://docs.pwntools.com/).
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
| [`bonus-pwntools-primer`](bonus-pwntools-primer) | Bonus | — | A short tutorial on pwntools tubes and address packing. |
| [`bonus-heap-mayhem`](bonus-heap-mayhem) | Bonus | Heap overflow (PIE) | Leak a code pointer to beat ASLR, then overwrite a callback. |

Each task directory contains:

* `README.md` — the solving write-up: the bug, how to reach it, and the solution in three forms (step-by-step by hand, a shell script, and a pwntools script). It assumes the challenge is already deployed.
* `README.chall.md` — how the challenge is *prepared*: build, publish, deploy and the solver container (the Docker pipeline).
* `FURTHER.md` — extensions, variations, and discussion points, with answers.
* `INSTRUCTOR.md` — notes for whoever runs the session.
* `flag` — the challenge flag, copied into the container as `flag.txt` at deploy time.
* `build/`, `publish/`, `deploy/`, `solve/` — the Docker pipeline (see `README.chall.md`).

`bonus-pwntools-primer` is a tutorial, not a challenge, so it has no `build/publish/deploy` pipeline and no flag.

## The through-line of the session

Every challenge is the same sentence with a different object: **a write the program's author thought was bounded is not, and the bytes past the end land on something that matters.**

1. **`heap-0`** — the something is an adjacent `char` buffer, and any change wins.
1. **`heap-1`** — the same, but the bytes have to spell one exact word: now you are *choosing* the value, not just destroying it.
1. **`heap-2`** — the something is a **function pointer**. Choosing the value now means choosing which code runs: data corruption becomes control-flow hijack.
1. **`heap-3`** — there is no overflow at all. A **use-after-free** hands you a pointer into a chunk the allocator has already given away, and the write goes through that.
1. **`heap-havoc`** — the overflow crosses out of one heap object and into the *next struct*, several fields deep, to reach a callback nobody guards.
1. **`heap-mayhem`** — the same struct-to-struct overflow, but in a **PIE**, so first you have to *leak* a code address to know where anything is.

The progression is: corrupt a value → choose the value → choose the code → get the pointer without an overflow → reach across objects → beat ASLR to do it. Each challenge reuses the previous idea and adds exactly one thing.

Every binary except `heap-mayhem` is built deliberately weak — no stack canary, and no PIE — because the point is the bug, not the mitigations. `heap-mayhem` turns PIE back on precisely so the last exercise has to deal with it.

## Solving the challenges: three forms, by hand first

Each challenge's `README.md` gives the solution in three forms, and they all work against both a local binary and the deployed service:

1. **By hand** — the menu choices and inputs to type into `nc`. This is the intended way to solve most of the session; you should understand the bug well enough to drive it yourself.
1. **A shell script** (`solve/solve.sh`) — the same inputs, scripted with `printf` and `nc`, so a solve is one command and repeatable.
1. **A pwntools script** (`solve/exploit.py`) — the same again in Python, which is the only practical form once addresses must be computed at runtime.

Only `heap-mayhem` genuinely *needs* a script: it is a PIE, so the exploit has to read a leaked address and do arithmetic on it live.
`bonus-pwntools-primer` teaches exactly that, and is meant to be done before `heap-mayhem`.

## The challenge pipeline

Each challenge is prepared as four Docker stages, each with its own `README.md`, and summarised in the task's `README.chall.md`:

* **`build/`** — a reproducible Debian build image compiles `chall.c` and copies out the exact `libc.so.6` and loader it was linked against. Heap layout depends on the glibc version, so the matching libc ships with the binary.
* **`publish/`** — zips the binary and its libc/loader into the archive handed to players.
* **`deploy/`** — runs the binary under `xinetd` in a container, one TCP port per challenge, with the flag mounted as `flag.txt` owned by a separate user.
* **`solve/`** — the reference `solve.sh` and `exploit.py`, and a pwntools container to run the latter locally, against a local deployment, or against a remote target.

Start from the task's `README.chall.md`, then follow `build`, `publish`, `deploy`, `solve` in order.

## A note on reproducibility

The write-ups quote concrete offsets (the overflow distance between two allocations, struct layouts) and, for the non-PIE binaries, concrete symbol addresses.
The *offsets between allocations* and the *struct layouts* are stable for a given build; the overflow distance is printed by the program itself or measured once and reused.
Under PIE (`heap-mayhem`) nothing is fixed — which is why that exploit measures every address at runtime instead of hardcoding it.
All exploits were last rebuilt and re-run green against freshly built binaries on x86-64 (glibc 2.41, Debian 13 build image).

## Pwntools Cheatsheet

Most of this session is solvable by hand or with a short shell script; `heap-mayhem` needs pwntools.
A fuller, worked introduction is in [`bonus-pwntools-primer`](bonus-pwntools-primer); this is the quick reference.

### Connecting

```python
from pwn import *

io = process("./chall")                  # run the local binary
io = remote("141.85.224.106", 31010)     # connect to the deployed service
```

### Talking to the program (tubes)

```python
io.recvuntil(b"Enter your choice: ")     # read until this text appears, and stop
line = io.recvline()                     # read one line
data = io.recvall(timeout=5)             # read everything until the program closes

io.send(b"abc")                          # send bytes, no newline
io.sendline(b"2")                        # send bytes plus a newline
io.sendlineafter(b"choice: ", b"2")      # recvuntil(...) then sendline(...), in one call
io.interactive()                         # hand the tube to your keyboard
```

### Building payloads

```python
payload  = b"A" * 48                     # filler to reach the neighbour
payload += p64(0x401196)                 # 64-bit address, little-endian
payload += p32(0x080491f6)               # 32-bit address, little-endian
addr = u64(leak.ljust(8, b"\x00"))       # turn 8 leaked bytes back into a number
```

* Payloads are `bytes`. Build them with `b"..."` and `p64`/`p32`, never by typing hex digits in reading order — that gets the byte order wrong.
* `p64`/`p32` pack a number into little-endian bytes; `u64`/`u32` unpack bytes back into a number.

### Addresses from the binary

```python
exe = ELF("chall", checksec=False)
win = exe.symbols["win"]                  # address of a symbol
bss = exe.get_section_by_name(".bss").header.sh_addr
```

For a non-PIE binary these are the real runtime addresses.
For a PIE, they are *offsets* from the load base: add them to a base you recovered from a leak.

### Running a script

```console
python3 exploit.py                        # against the local ./chall
python3 exploit.py REMOTE HOST=141.85.224.106 PORT=31010   # against the server
```

The reference `exploit.py` files read `args.REMOTE`, `args.HOST` and `args.PORT` so the same script does both.
