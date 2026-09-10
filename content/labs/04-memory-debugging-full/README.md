# Session 04: Memory Debugging — Full Contents

This directory holds the complete version of session 04: reference solutions, full explanations, and the reference output of every command the exercises ask for.

Use it after the live session for a full view of the solutions and the reasoning behind them.
The corresponding directory used during the session, with the buggy programs and the task descriptions, is [`04-memory-debugging-work/`](../04-memory-debugging-work).

## Learning objectives

By the end of this session you should be able to:

* Use `gdb` to set breakpoints and watchpoints, inspect variables, and read a backtrace.
* Use Valgrind's Memcheck tool to locate invalid reads and writes, and memory leaks.
* Recognize common bug patterns: unsigned integer underflow, dangling pointers after `realloc`, uninitialised memory, broken linked-list removal, and off-by-one buffer allocation.
* Choose the right tool from the symptom, and explain what each tool is blind to.
* Diagnose a bug from a compiled binary alone, without access to its source code.

## Prerequisites and required tools

* Session 03 concepts: heap allocation with `malloc`/`realloc`/`free`, and ownership of a heap block.
* A Linux environment with `gcc`, `make`, `gdb` and `valgrind` installed.
* For the binary-only bonus exercise: `objdump`, `nm`, `readelf` and Python 3.

## Contents

| Task | Type | Objective |
| --- | --- | --- |
| [`demo-in-memory-database`](demo-in-memory-database) | Demo | Three bugs, three symptoms, two tools: the whole workflow in one program. |
| [`01-grade-histogram`](01-grade-histogram) | Core | An out-of-bounds write that Valgrind cannot see, and the watchpoint that finds it. |
| [`02-longest-word`](02-longest-word) | Core | A leak in a program whose output is correct, and what "definitely lost" means. |
| [`03-symbol-hash-table`](03-symbol-hash-table) | Core | Uninitialised memory, a dangling bucket head, and a leaked key. |
| [`bonus-json-parser`](bonus-json-parser) | Bonus | One missing byte: `malloc(len)` where the code writes `len + 1`. |
| [`bonus-binary-issue`](bonus-binary-issue) | Bonus | A stack overflow found in disassembly and fixed by patching four bytes. |

Each task directory contains:

* `README.md` — the tutorial: goal, background, how to build and run, and what the results mean.
* `FURTHER.md` — optional extensions and discussion points, with answers.
* `INSTRUCTOR.md` — notes for whoever runs the session.

## The through-line of the session

Session 03 was about writing correct memory code.
This session is about what to do when it is already wrong, and the argument runs on two tracks.

**The symptom tells you which tool to reach for.**
There are three ways a memory bug shows itself, and each one needs something different:

1. **It crashes.** Start with `gdb`: run it, let it die, read the backtrace.
   This is the demo's first bug, the hash table's first bug, and the whole of `bonus-binary-issue`.
1. **It runs and prints the wrong thing.** A crash gives you a location for free; a wrong answer does not.
   Here you have to aim the microscope yourself, with a conditional breakpoint or a watchpoint.
   This is `01-grade-histogram`.
1. **Nothing visible happens at all.** No crash, correct output, and a bug all the same.
   Only a tool that audits the whole run can see it, which means Valgrind.
   This is `02-longest-word`, the demo's third bug, the hash table's third bug, and `bonus-json-parser`.

**Neither tool sees everything.**
Valgrind checks every access against the *allocation* it belongs to, so it finds the JSON parser's one-byte overrun instantly — and is completely blind to the histogram's out-of-bounds write, which lands on the wrong field of a block the allocator really did hand out.
`gdb` sees anything you point it at, and nothing you do not.
The pairing is deliberate: `01-grade-histogram` is the case only `gdb` solves, `bonus-json-parser` is the case only Valgrind solves, and `03-symbol-hash-table` needs both in the same program.

The recurring practical point is that **a correct answer is not a correctness proof**.
Four of the six tasks print exactly what they should while being broken.

## A note on the numbers

The allocation counts quoted in these files were taken on Ubuntu 24.04 / gcc 14.2 / valgrind 3.24 / x86-64.
Addresses, process ids and byte totals will differ on your machine.
What should reproduce is the *shape* of every report: which line Valgrind names, how many blocks leak, and `0 errors from 0 contexts` once the bug is fixed.

The one exception is [`bonus-binary-issue`](bonus-binary-issue), where the shipped binary is a fixed artefact: its addresses and file offsets are the same for everyone.
