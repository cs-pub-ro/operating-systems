# Session 04: Memory Debugging

This session is about finding memory bugs: what to do when a program crashes, prints the wrong thing, or looks fine and is not.

* Reading a backtrace with GDB to find *where* a program crashed.
* Adding prints to find out *why*.
* Finding memory leaks and invalid accesses with Valgrind.
* Recognising common bug patterns: a forgotten `free()`, a pointer overwritten, an index one too far, a `NULL` nobody checked.

## Learning objectives

By the end of this session you should be able to:

* Run a crashing program under GDB and read the backtrace up to the line of your own code where it died.
* Add print statements that narrow a bug down to one line, and remove them afterwards.
* Run a program under Valgrind, read a leak report and an invalid-access report, and go from the report to the line.
* Pick the tool from the symptom: a crash, a wrong answer, or no visible symptom at all.
* Say what each tool cannot see.

## Prerequisites and required tools

* Session 03 concepts: heap allocation with `malloc`/`realloc`/`free`, and who owns a heap block.
* A Linux environment with `gcc`, `make`, `gdb` and `valgrind` installed.
* For the binary-only bonus exercise: `objdump`, `nm`, `readelf` and Python 3.

Check that your system has all it needs for the lab, by downloading and running the [`check-prerequisites.sh` script](https://github.com/cs-pub-ro/operating-systems/blob/main/scripts/check-prerequisites.sh):

```console
wget http://raw.githubusercontent.com/cs-pub-ro/operating-systems/refs/heads/main/scripts/check-prerequisites.sh
chmod a+x check-prerequisites.sh
./check-prerequisites.sh
```

The script installs nothing.
It reports what is missing and prints the command that installs it on your distribution.

If something is missing, be sure to install and configure it.

## Getting the lab archive

Download [`04-memory-debugging.zip`](https://github.com/cs-pub-ro/operating-systems/raw/lab-archives/04-memory-debugging.zip), then unzip it and change into the directory it creates:

```console
wget https://github.com/cs-pub-ro/operating-systems/raw/lab-archives/04-memory-debugging.zip
unzip 04-memory-debugging.zip
cd 04-memory-debugging/
```

Work inside that directory for the rest of the session.

## Task order

The two demos come first, solved together with the teaching assistant.
The core exercises are then solved individually or in teams, in the numeric order shown.
Bonus exercises are optional: start them if you finish the core exercises, or take them home.

| Order | Task | Type | Objective |
| --- | --- | --- | --- |
| 1 | [`demo-in-memory-database`](demo-in-memory-database) | Demo | A crash and a wrong answer: GDB to find the line, a print to find the cause, Valgrind to confirm. |
| 2 | [`demo-memory-leak`](demo-memory-leak) | Demo | Correct output, and a copy of every input line left on the heap: read a Valgrind leak report. |
| 3 | [`01-config-parser`](01-config-parser) | Core | Two leaks in one program: find both in the Valgrind report, and decide who should free what. |
| 4 | [`02-longest-word`](02-longest-word) | Core | A leak caused by overwriting a pointer before freeing what it pointed to. |
| 5 | [`03-grade-histogram`](03-grade-histogram) | Core | A wrong answer and a clean Valgrind run: find an index one too far with a print. |
| 6 | [`04-csv-report`](04-csv-report) | Core | A crash inside the C library: read the backtrace up to your code, then find the input line behind it. |
| 7 | [`bonus-symbol-hash-table`](bonus-symbol-hash-table) | Bonus | Two bugs in a hash table: half of the symbols quietly dropped, and a use of freed memory after a removal. |
| 8 | [`bonus-json-parser`](bonus-json-parser) | Bonus | A one-byte heap overflow that never changes the output. |
| 9 | [`bonus-no-source-code`](bonus-no-source-code) | Bonus | A stack overflow in a compiled binary, with no source code. |

The two demos teach the routine every exercise uses afterwards: run the program, look at how it fails, pick the tool that matches the failure, go to the line it points at, and only then read the code.
Two ideas to keep for the whole session: **the symptom tells you which tool to reach for**, and **correct output is not proof that a program is correct**.

Each exercise directory has a `README.md` with the task itself.

## Debugging Cheatsheet

The three tools of the session, and the handful of things you need from each.
Every `Makefile` in the session compiles with `-g`, so that GDB and Valgrind can name files and lines; do the same in your own projects.

### Print debugging

The simplest tool, and often the fastest.
Print the values a suspicious line works with, right before it runs:

```C
fprintf(stderr, "record_grade: grade=%d bucket=%d\n", grade, bucket);
```

* Print to `stderr`: the messages do not mix with the program's output, and they reach the terminal even if the program crashes right after.
* Print values, not just "got here": a value that is `NULL`, `0`, negative or too large is usually the answer.
* `%d` for `int`, `%zu` for `size_t`, `%p` for a pointer, `%s` for a string you are sure is a string.
* Rebuild and rerun after every print you add, and remove them all once the bug is fixed.

### GDB: where did it crash?

```console
gdb ./program
(gdb) run arg1 arg2            # or: run < input.txt
(gdb) backtrace                # the chain of calls at the crash, innermost first
(gdb) frame 3                  # move to frame #3, the first one in your own code
(gdb) print variable           # a variable, a field (p->count), or an expression
(gdb) quit
```

* Frames at the top that belong to the C library (`strlen`, `printf`, `strtol`) are normal: the library was handed something bad.
  Walk down the list to the first frame in one of your files, and look there.
* `print` works on anything visible in the current frame: `print *db`, `print e->name`, `print db->capacity - 1`.

### Valgrind: what did the program do to memory?

```console
valgrind --leak-check=full ./program arg1 arg2
```

Read the report from the top:

* `Invalid read` / `Invalid write`: an access outside every live block, with the line that did it.
  If the block was freed earlier, the report also says where it was freed.
* `definitely lost: N bytes in M blocks`: a leak.
  The stack trace above it says where the lost blocks were **allocated**; the missing `free()` is somewhere after that.
* The result to aim for, every time: `All heap blocks were freed -- no leaks are possible` and `ERROR SUMMARY: 0 errors from 0 contexts`.
