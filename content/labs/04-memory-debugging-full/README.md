# Session 04: Memory Debugging — Full Contents

This directory holds the complete version of session 04: reference solutions, full explanations, and the reference output of every command the exercises ask for.

Use it after the live session for a full view of the solutions and the reasoning behind them.
The corresponding directory used during the session, with the buggy programs and the task descriptions, is [`04-memory-debugging-live/`](../04-memory-debugging-live).

## Learning objectives

By the end of this session you should be able to:

* Run a crashing program under GDB and read the backtrace up to the line of your own code where it died.
* Add print statements that narrow a bug down to one line, and remove them afterwards.
* Run a program under Valgrind, read a leak report and an invalid-access report, and go from the report to the line.
* Pick the tool from the symptom: a crash, a wrong answer, or no visible symptom at all.
* Say what each tool cannot see.
* Diagnose a bug from a compiled binary alone, without access to its source code.

## Prerequisites and required tools

* Session 03 concepts: heap allocation with `malloc`/`realloc`/`free`, and who owns a heap block.
* A Linux environment with `gcc`, `make`, `gdb` and `valgrind` installed.
* For the binary-only bonus exercise: `objdump`, `nm`, `readelf` and Python 3.

## Contents

| Task | Type | Objective |
| --- | --- | --- |
| [`demo-in-memory-database`](demo-in-memory-database) | Demo | A crash and a wrong answer: the routine of the session, on one program. |
| [`demo-memory-leak`](demo-memory-leak) | Demo | A Valgrind leak report, read line by line. |
| [`01-config-parser`](01-config-parser) | Core | Two leaks, two owners, and what "definitely lost" points at. |
| [`02-longest-word`](02-longest-word) | Core | A leak caused by one assignment, and the order of the three statements that fix it. |
| [`03-grade-histogram`](03-grade-histogram) | Core | An out-of-bounds write that Valgrind cannot see, and the print that finds it. |
| [`04-csv-report`](04-csv-report) | Core | A crash inside the C library, a backtrace walked up to `main.c`, and the `NULL` behind it. |
| [`bonus-symbol-hash-table`](bonus-symbol-hash-table) | Bonus | A bucket head left pointing at a freed node, and uninitialised memory that happens to be zero. |
| [`bonus-json-parser`](bonus-json-parser) | Bonus | One missing byte: `malloc(len)` where the code writes `len + 1`. |
| [`bonus-binary-issue`](bonus-binary-issue) | Bonus | A stack overflow found in disassembly and fixed by patching four bytes. |

Each task directory contains:

* `README.md` — the tutorial: goal, background, how to build and run, and what the results mean.
* `FURTHER.md` — optional extensions and discussion points, with answers.
* `INSTRUCTOR.md` — notes for whoever runs the session.
* `prompt.txt` — where there is one, the note the task was written from.

## The through-line of the session

Session 03 was about writing correct memory code.
This session is about what to do when it is already wrong, and the routine is the same every time: run it, look at how it fails, pick the tool that matches the failure, go to the line it names, and only then read the code.

**The symptom tells you which tool to reach for.**
There are three ways a memory bug shows itself, and each one needs something different:

1. **It crashes.**
   Start with GDB: run it, let it die, read the backtrace down to the first frame in your own code, and print the variables there.
   That tells you *where*.
   A print just before that line, showing what it was given, usually tells you *why*.
   This is the demo's first bug, `04-csv-report`, and the crash in `bonus-symbol-hash-table`.
1. **It runs and prints the wrong thing.**
   A crash gives you a location for free; a wrong answer does not.
   Print what the suspicious code computes and compare it with what you expect, one line at a time, until the numbers disagree.
   This is the demo's second bug, `03-grade-histogram`, and the dropped symbols in `bonus-symbol-hash-table`.
1. **Nothing visible happens at all.**
   No crash, correct output, and a bug all the same.
   Only a tool that audits the whole run can see it, which means Valgrind.
   This is `demo-memory-leak`, `01-config-parser`, `02-longest-word`, and `bonus-json-parser`.

Valgrind has a part in the first two cases too.
On a crash it names the bad access, and if the memory had been freed, where that happened; on a use of freed memory it finds what no print can, which is the second bug of the hash table.

**Where GDB stops being the right tool.**
GDB can do far more than show a backtrace: breakpoints, stepping, watchpoints.
This session uses it for one thing, finding out where a program died and what its variables held at that moment, because that is where it pays off most for the least learning.
For following a value through a program, a print next to the line is faster to write, easier to read, and works the same for everyone.
The cheatsheet at the end of this page lists the GDB commands for when you want more.

**Neither tool sees everything.**
Valgrind checks every access against the *block* it belongs to, so it finds the JSON parser's one-byte overrun instantly, and is completely blind to the histogram's out-of-bounds write, which lands on the wrong field of a block the allocator really did hand out.
GDB and a print see anything you point them at, and nothing you do not.
The pairing is deliberate: `03-grade-histogram` is the case only a print solves, `bonus-json-parser` is the case only Valgrind solves, and `bonus-symbol-hash-table` needs both in the same program.

The recurring practical point is that **a correct answer is not a correctness proof**.
Five of the nine tasks print exactly what they should while being broken.

## A note on the numbers

The allocation counts and line numbers quoted in these files were taken on Ubuntu 25.04 / gcc 14.2 / glibc 2.41 / valgrind 3.24 / x86-64.
Addresses, process ids and the garbage values read through dangling pointers will differ on your machine.
What should reproduce is the *shape* of every report: which line Valgrind names, how many blocks leak, and `0 errors from 0 contexts` once the bug is fixed.

The one exception is [`bonus-binary-issue`](bonus-binary-issue), where the shipped binary is a fixed artefact: its addresses and file offsets are the same for everyone.

## Debugging Cheatsheet

The live page has the short version.
This one has the same three tools, with the options and the habits that make them pay off.

### Build for debugging

```console
gcc -Wall -Wextra -g -o program main.c
```

* `-g` keeps the names of files, functions, variables and lines in the binary.
  Without it GDB shows addresses and Valgrind shows `???`.
* No `-O2` while debugging: optimised code reorders statements and keeps variables in registers, and GDB starts answering `<optimized out>`.
  Without an `-O` flag, `gcc` compiles at `-O0`, which is what you want.
* `-Wall -Wextra` is the cheapest debugger there is; read what it says before running anything else.
* `-fsanitize=address` builds in a checker that catches heap and stack overflows and leaks at a fraction of Valgrind's slowdown.
  It is a good first run on a large program; it does not replace Valgrind on an uninitialised read, and like Valgrind it does not see a write that stays inside a block.

### Print debugging

The simplest tool, and the one every programmer uses most.
Print the values a suspicious line works with, right before it runs:

```C
fprintf(stderr, "record_grade: grade=%d bucket=%d\n", grade, bucket);
```

* **Print to `stderr`.**
  It is unbuffered, so the message reaches the terminal even if the program crashes on the next line, and it does not mix with the program's own output, so `./program > out.txt` still works.
  If you must print to `stdout`, call `fflush(stdout)` after it, or the last messages before a crash are lost in the buffer.
* **Print values, not milestones.**
  `got here` tells you the line ran; `count=0 capacity=0 records=(nil)` tells you why it failed.
  Include the name of the function, so that the output reads on its own.
* **Pick the right conversion.**
  `%d` for `int`, `%u` for `unsigned`, `%zu` for `size_t`, `%ld` for `long`, `%p` for a pointer, cast to `(void *)`, `%s` only for a string you are sure is one, and `%c` for a character.
  A wrong conversion prints garbage and sends you after the wrong bug.
* **Print the inputs of a crash, and the outputs of a wrong answer.**
  Before a crashing line, print what it was handed.
  Around a wrong result, print what each step produced, and stop at the first step that disagrees with your expectation.
* **Give a print a condition** when it would fire thousands of times: `if (bucket >= NBUCKETS)` in front of it turns a flood into one line.
* **Bisect with prints.**
  In a program that crashes somewhere in a long run, the last message printed is just before the crash.
  Move the print forward until it stops appearing.
* **Rebuild after every change** and remove the prints once the bug is fixed.
  A macro keeps them out of the way instead:

  ```C
  #ifdef DEBUG
  #define dprintf(...) fprintf(stderr, __VA_ARGS__)
  #else
  #define dprintf(...) do { } while (0)
  #endif
  ```

  Then `make CFLAGS="-Wall -Wextra -g -DDEBUG"` turns them on, and a normal build leaves them out.

### GDB

The job it does in this session is to say where a program died and what the variables held at that moment.

```console
gdb ./program
(gdb) run arg1 arg2            # or: run < input.txt
(gdb) backtrace                # bt: the chain of calls at the crash, innermost first
(gdb) frame 3                  # move to frame #3; up and down move one frame at a time
(gdb) info locals              # every local variable of the current frame
(gdb) info args                # the arguments it was called with
(gdb) print expr               # a variable, a field, a dereference: print *db, print e->name
(gdb) print db->capacity - 1   # any C expression, evaluated in the current frame
(gdb) list                     # the source around the current line
(gdb) quit
```

* **The top frames are often in the C library.**
  `strlen()`, `printf()`, `strtol()` crash when they are handed a bad pointer; the mistake is in the first frame that belongs to one of your files.
  Walk down to it, then look at what your code passed in.
* **A crash with no backtrace**, or one made of `??`, means the binary has no debug information: rebuild with `-g`.
* **The debuginfod question.**
  On recent distributions GDB asks whether to download debug information for the libraries.
  Answer `n`; it only adds source lines to the library frames, which you walk past anyway.
  `set debuginfod enabled off` in `~/.gdbinit` stops the question.
* **A program that hangs** instead of crashing can be stopped with `Ctrl-C` inside GDB, after which `backtrace` shows where it was looping.

When a crash is not enough and you want to stop *before* it, GDB can do that too:

```console
(gdb) break db_grow            # stop when the function is entered
(gdb) break main.c:88          # or at a line
(gdb) break record_grade if grade > 90    # only when a condition holds
(gdb) run < input.txt
(gdb) next                     # run one line, stepping over calls
(gdb) step                     # run one line, stepping into calls
(gdb) continue                 # run until the next breakpoint
(gdb) watch st->total          # stop whenever this variable changes
```

These are investigation tools: good for confirming a theory, slow for forming one.
A print at the same spot usually gets you there faster, and leaves a record you can read twice.

### Valgrind

```console
valgrind --leak-check=full ./program arg1 arg2
valgrind --leak-check=full --show-leak-kinds=all ./program    # include "still reachable" blocks
valgrind --track-origins=yes ./program                        # for uninitialised values: where they came from
```

Read the report from the top.
Every entry has a stack trace, innermost call first, and the line to look at is the first one in your own file.

* **`Invalid read of size N` / `Invalid write of size N`**: an access outside every live block.
  The next line says what the address is: `0 bytes after a block of size 4 alloc'd` is an overflow by one; `inside a block of size 32 free'd` is a use after free, followed by where the block was freed and where it was allocated; `Address 0x0 is not stack'd, malloc'd or (recently) free'd` is a `NULL` dereference.
* **`Conditional jump or move depends on uninitialised value(s)`**: a test on a variable nobody set, typically a field of a `malloc()`ed struct.
  `--track-origins=yes` adds where the memory was allocated.
* **`Invalid free() / delete / delete[] / realloc()`**: a double free, or a `free()` of a pointer that did not come from `malloc()`.
* **`HEAP SUMMARY`**: `allocs` and `frees` should match.
  The difference is the number of blocks never freed.
  Two or three allocations you did not make belong to stdio and are freed by the C library.
* **`LEAK SUMMARY`** sorts the unfreed blocks into kinds.
  `definitely lost` is a leak: no pointer to the block exists anywhere.
  `indirectly lost` blocks are reachable only through a lost one, the children of a leaked tree node.
  `possibly lost` means a pointer exists but into the middle of the block.
  `still reachable` means a pointer exists at exit and the program simply never called `free()`; common, usually harmless, and not what this session is about.
* **The stack trace under a leak points at the allocation**, because a leak has no moment of its own: there is no line where it happened, only a `free()` that never ran.
  Start from the allocation and follow the pointer to where it was lost.
* **`ERROR SUMMARY: 12 errors from 5 contexts`**: a context is a distinct stack trace, printed once however often it recurs.
  Fix the first context and rerun; later ones are often consequences of it.
* **What it cannot see**: a write that stays inside a block, like the histogram's; anything on the stack arrays of your own frames; and bugs on paths the run did not take.
  `0 errors from 0 contexts` means this run did nothing wrong, not that the program is right.
* **If it refuses to start** with `Private file creation failed` and a huge file descriptor limit, run `ulimit -n 1024` first.
  It is a property of the machine, not of your program.
