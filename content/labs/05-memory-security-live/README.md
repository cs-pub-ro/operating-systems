# Session 05: Memory Security

This session is about turning a memory-safety bug into an exploit: CTF-style heap challenges where you find the bug and use it to read out a secret flag.

* Heap buffer overflows into an adjacent variable or struct field.
* Overwriting a function pointer to redirect control flow.
* Use-after-free, and how allocator reuse turns it into a write.

## Learning objectives

By the end of this session you should be able to:

* Explain how a heap buffer overflow can corrupt an adjacent variable or structure field.
* Craft an overflow payload that sets a target value precisely, including endianness considerations.
* Overwrite a function pointer stored on the heap and redirect control flow to code of your choosing.
* Explain what a use-after-free bug is, and how allocator reuse turns it into a write primitive.

## Prerequisites and required tools

* Session 04 concepts: heap layout, and using `gdb` to inspect memory.
* A Linux environment with `gdb`, `objdump` and `python3`; the exploit scripts use [pwntools](https://docs.pwntools.com/).
* `nc` for talking to a deployed challenge over the network.
* Basic familiarity with two's complement, endianness, and reading disassembly.

Check that your system has all it needs for the lab, by downloading and running the [`check-prerequisites.sh` script](https://github.com/cs-pub-ro/operating-systems-sessions/blob/master/scripts/check-prerequisites.sh):

```console
wget http://raw.githubusercontent.com/cs-pub-ro/operating-systems-sessions/refs/heads/master/scripts/check-prerequisites.sh
chmod a+x check-prerequisites.sh
./check-prerequisites.sh
```

The script installs nothing.
It reports what is missing and prints the command that installs it on your distribution.

If something is missing, be sure to install and configure it.

## How these challenges work

Each task is a CTF-style challenge: you are given the source (`chall.c`) and the compiled binary (`chall`), you find the memory-safety bug, and you exploit it to make the program read out a secret `flag.txt`.

Run a challenge locally with `./chall`; it opens `flag.txt` in the current directory, so drop a placeholder `flag.txt` beside it to test.
The real flag lives only on the remote service your teaching assistant deploys — solve locally first, then point your exploit at the remote target to capture it.

## Getting the lab archive

Download [`05-memory-security.zip`](https://github.com/cs-pub-ro/operating-systems-sessions/raw/lab-archives/05-memory-security.zip), then unzip it and change into the directory it creates:

```console
wget https://github.com/cs-pub-ro/operating-systems-sessions/raw/lab-archives/05-memory-security.zip
unzip 05-memory-security.zip
cd 05-memory-security/
```

Work inside that directory for the rest of the session.

## Task order

The demos are solved together with the teaching assistant at the start of the session, as warm-ups.
The core exercises are solved individually or in teams, in the numeric order shown — each one adds a technique to the previous one.
Bonus exercises are optional and harder; take them in any order once the core exercises are done.

| Order | Task | Type | Objective |
| --- | --- | --- | --- |
| 1 | [`demo-heap-0`](demo-heap-0) | Demo | Overflow a heap buffer to flip an adjacent "lock" variable. |
| 2 | [`demo-heap-1`](demo-heap-1) | Demo | Overflow a heap buffer to set an adjacent variable to one specific value. |
| 3 | [`01-cylab-heap-0`](01-cylab-heap-0) | Core | A basic heap overflow: change a "safe" variable you are not supposed to reach. |
| 4 | [`02-cylab-heap-1`](02-cylab-heap-1) | Core | The same overflow, but the target must become one exact value. |
| 5 | [`03-cylab-heap-2`](03-cylab-heap-2) | Core | Overflow into a function pointer and hijack control flow. |
| 6 | [`04-cylab-heap-3`](04-cylab-heap-3) | Core | Exploit a use-after-free through allocator (tcache) reuse. |
| 7 | [`bonus-cylab-heap-havoc`](bonus-cylab-heap-havoc) | Bonus | Overflow one heap struct into the next to reach a hidden function-pointer field. |
| 8 | [`bonus-heap-mayhem`](bonus-heap-mayhem) | Bonus | Combine an information leak with a heap overflow to defeat ASLR in a PIE. |

The two demos are deliberately near-identical to `01-cylab-heap-0` and `02-cylab-heap-1`: solving them together first is meant to make the first two core challenges quick wins.

Each challenge directory has a `README.md` with the task and hints.
