# Instructor Notes: Builtin Commands

## Purpose

The exercise that introduces shell state and the one reason a command cannot be a child: `cd` and `exit` act on the shell's own process.
It is short, and it is the base both bonuses build on — they keep `run_builtin()` and add one feature around it.

## The one idea

Make the room predict, before running it, what `cd /tmp` in a child would do.
Most expect the shell to move; it does not.
Then show it: a version with `cd` run through `run_command()` (fork + `chdir` + exit) leaves `pwd` unchanged.
That failure is the whole exercise — a child cannot change its parent's directory, because the directory is per-process and `fork()` gave the child its own copy.

## Points to hammer

* **`run_builtin()` returns 1 or 0**, and `main()` uses it to choose: builtin handled, or ordinary program.
* **`cd` with no argument goes to `$HOME`.** `getenv("HOME")` can be `NULL` in a stripped environment; fall back to `/`.
* **A failed `cd` must not kill the shell.** `perror("cd")` and carry on.
* **`exit` is `exit()`**, called straight from the builtin: there is nothing to return to.

## Things that go wrong

* **Running `cd` through `run_command()`** anyway: compiles, runs, changes nothing.
  This is the bug to provoke on purpose.
* **`chdir(argv[1])` with no argument**: `argv[1]` is `NULL`, and `chdir(NULL)` fails; guard it with the `$HOME` fallback.
* **Returning 0 after handling `cd`**, so `main()` then also tries to run `cd` as a program and prints `cd: No such file or directory`.

## Verified reference values

| Fact | Value |
| --- | --- |
| `cd /tmp` then `pwd` | `/tmp` |
| `cd` (no arg) then `pwd` | `$HOME` |
| `cd /nonexistent` | `cd: No such file or directory`, shell continues |
| `strace -e trace=chdir`, `cd /tmp` | one `chdir("/tmp") = 0` in the shell's process |

## Practical notes

* No quoting still: `cd "a b"` does not work, and need not.
* `exit` with a status argument is left for `FURTHER.md`; here `exit` is `exit(0)`.
