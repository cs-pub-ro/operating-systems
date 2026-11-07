# Bonus: Command Chaining

**Tools:** GCC, Make

## Goal

Make the shell from `bonus-background-processes` put several commands on one line, joined by `;`, `&&` and `||`, each deciding from how the last one ended whether the next one runs.
Afterwards you will be able to read a child's exit status and act on it.

## Background

So far a line held one command.
A real shell joins several:

| Line | Second command runs |
| --- | --- |
| `a ; b` | always |
| `a && b` | only if `a` succeeded (exit status 0) |
| `a \|\| b` | only if `a` failed (status other than 0) |

The decision needs the exit status, which `waitpid()` packs into an `int` together with other facts: whether the child exited, or a signal killed it and which.
`man 2 waitpid` has the macros that unpack it: `WIFSIGNALED`, `WTERMSIG`, `WEXITSTATUS`.

`shell.c` is your background shell with a tokenizer that also splits at `;`, `is_operator()` knowing all four operators, and a loop (`run_line()`) that cuts the word list into commands at the operators.
`&` still backgrounds the command before it; `;`, `&&` and `||` are the new part.
Operators are words: `;` may touch its neighbours (`ls;pwd`), but `&&`, `||` and `&` need spaces (`a && b`, not `a&&b`).

## Your Task

Open `shell.c` and complete the two TODOs.

1. **`run_command()`** — take the child's status apart and return it: the exit code, 128 plus the signal number if a signal killed it, 127 if it could not run.
   Print a line on `stderr` for anything other than a clean exit with 0.
1. **`run_line()`** — decide, for each command, whether it runs, from the operator in front of it and the last status.
   Try `run_builtin()` first; otherwise call `run_command()` with the background flag.

## Build & Run

```console
make
./shell
```

```text
minish> gcc -o prog prog.c && ./prog || echo build failed
minish> sleep 5 & echo meanwhile
```

`exit` or Ctrl-D ends the shell.

## Check Your Work

* `false && echo yes || echo no` and `true || echo skipped && echo ran`: predict each before running, then compare with `bash`.
* `ls /nonexistent || echo fallback`: the error, then the fallback, with a status line between.
* `cd /tmp && pwd`: the builtin runs in the chain, and `pwd` prints `/tmp`.
* A command that does not exist, then `;` and another: the second runs, and the status reported for the first is 127.
* `sleep 10`, killed from another terminal with `kill -9 <pid>`: the shell reports a signal, not an exit code, and the number matches.
* `sleep 1 & sleep 2 ; ps -C sleep -o pid,ppid,stat,cmd` on one line: find the `Z`/`<defunct>` zombie, whose parent is your shell, collected before the next prompt.
