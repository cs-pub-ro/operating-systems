# Session 04: Memory Debugging

This session is about finding memory bugs, and picking the tool that matches the symptom.

* Breakpoints, watchpoints and backtraces with `gdb`.
* Invalid reads and writes, and leaks, with Valgrind.
* Recognising common bug patterns, from integer underflow to off-by-one allocation.
* Diagnosing a bug from a compiled binary, with no source code.

## Learning objectives

By the end of this session you should be able to:

* Use `gdb` to set breakpoints and watchpoints, inspect variables, and read a backtrace.
* Use Valgrind's Memcheck tool to locate invalid reads and writes, and memory leaks.
* Recognize common bug patterns: unsigned integer underflow, dangling pointers after `realloc`, uninitialised memory, broken linked-list removal, and off-by-one buffer allocation.
* Choose the right tool from the symptom, and explain what each tool is blind to.

## Prerequisites and required tools

* Session 03 concepts: heap allocation with `malloc`/`realloc`/`free`, and ownership of a heap block.
* A Linux environment with `gcc`, `make`, `gdb` and `valgrind` installed.
* For the binary-only bonus exercise: `objdump`, `nm`, `readelf` and Python 3.

Check that your system has all it needs for the lab, by downloading and running the [`check-prerequisites.sh` script](https://github.com/cs-pub-ro/operating-systems-sessions/blob/master/scripts/check-prerequisites.sh):

```console
wget http://raw.githubusercontent.com/cs-pub-ro/operating-systems-sessions/refs/heads/master/scripts/check-prerequisites.sh
chmod a+x check-prerequisites.sh
./check-prerequisites.sh
```

The script installs nothing.
It reports what is missing and prints the command that installs it on your distribution.

If something is missing, be sure to install and configure it.

## Getting the lab archive

Download [`04-memory-debugging.zip`](https://github.com/cs-pub-ro/operating-systems-sessions/raw/lab-archives/04-memory-debugging.zip), then unzip it and change into the directory it creates:

```console
wget https://github.com/cs-pub-ro/operating-systems-sessions/raw/lab-archives/04-memory-debugging.zip
unzip 04-memory-debugging.zip
cd 04-memory-debugging/
```

Work inside that directory for the rest of the session.

## Task order

The demo comes first, solved together with the teaching assistant.
The core exercises are then solved individually or in teams, in the numeric order shown.
Bonus exercises are optional: start them if you finish the core exercises, or take them home.

| Order | Task | Type | Objective |
| --- | --- | --- | --- |
| 1 | [`demo-in-memory-database`](demo-in-memory-database) | Demo | Fix three bugs — a crash, a wrong answer, and an invisible leak — with `gdb` and Valgrind. |
| 2 | [`01-grade-histogram`](01-grade-histogram) | Core | Find an out-of-bounds write that Valgrind cannot see, using a watchpoint. |
| 3 | [`02-longest-word`](02-longest-word) | Core | Find a memory leak in a program whose output is already correct. |
| 4 | [`03-symbol-hash-table`](03-symbol-hash-table) | Core | Find three independent bugs in a hash table, choosing the right tool for each. |
| 5 | [`bonus-json-parser`](bonus-json-parser) | Bonus | Find a one-byte heap overflow that never changes the output. |
| 6 | [`bonus-binary-issue`](bonus-binary-issue) | Bonus | Locate and patch a stack overflow in a compiled binary, with no source code. |

The demo teaches the workflow every exercise afterwards assumes: run it, watch how it fails, pick the tool that matches the failure, and walk back to the line.
The two ideas to carry through the whole session are that **the symptom tells you which tool to reach for**, and that **a clean run — even a correct-looking one — is not a proof of correctness**.

Each exercise directory has a `README.md` with the task itself.
