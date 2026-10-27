# Exercise: A Shell With Arguments and Chaining

**Tools:** GCC, Make

## Goal

Extend the demo's shell so that commands take arguments, `ls -l -a /tmp`, and so that several commands can go on one line, joined by `;`, `&&` and `||`.
Afterwards you will be able to pass an argument list to a new program, and read a child's exit status and act on it.

## Background

The demo's shell handed the whole line to `execlp()` as the command name, which is why `ls -l` was "not found".
A command is a list of words: the program to run, then its arguments, the same list the program receives as `argv`.
`execvp()` takes that list as an array, terminated by a `NULL` pointer, and looks the first word up in `PATH`.

```C
int execvp(const char *file, char *const argv[]);
```

The three operators decide whether the next command runs, from how the previous one ended:

| Line | Second command runs |
| --- | --- |
| `a ; b` | always |
| `a && b` | only if `a` succeeded, exit status 0 |
| `a \|\| b` | only if `a` failed, exit status other than 0 |

The exit status comes from `waitpid()`, packed into an `int` together with other information: whether the child exited at all, or was killed by a signal, and which.
`man 2 waitpid` has the macros that unpack it.

`shell.c` has the reading, a tokenizer that splits the line into words at spaces and tabs, and the loop that cuts the word list into commands at the operators.
Operators are words too, so they have to be surrounded by spaces: `a && b`, not `a&&b`.

## Your Task

Open `shell.c` and complete the two TODOs.

1. **`run_command()`** — fork, exec and wait, as in the demo, with `execvp()` and the command's `argv[]`.
   Take the status apart: return the exit code if the child exited, 128 plus the signal number if a signal killed it, 127 if the command could not be run.
   Print a line on `stderr` for anything other than a normal exit with 0, so that you can see what the shell saw.
1. **`run_line()`** — decide, for each command on the line, whether it runs: always after `;`, after `&&` only if the last command that ran succeeded, after `||` only if it failed.

## Build & Run

```console
make
./shell
```

```text
minish> ls -l -a /tmp
minish> gcc -o prog prog.c && ./prog || echo build failed
```

`exit` or Ctrl-D ends the shell.

## Check Your Work

* `ls -l Makefile` prints the long listing; `echo one two three` prints the three words.
  Compare each with the same command in your usual shell.
* `false && echo yes || echo no` and `true || echo skipped && echo ran`: predict what each line prints before running it, then check.
  Do the same lines in `bash` and compare.
* `ls /nonexistent || echo fallback`: the error from `ls`, then the fallback, and a status line from your shell in between.
* A command that does not exist, with `;` and a second command after it: the second one runs, and the status reported is 127.
* Run `sleep 10` and kill it from another terminal with `kill -9 <pid>`, or `kill -11`.
  The shell reports a signal, not an exit code, and the number matches.
* Run your shell under `strace -f -e trace=execve,clone,wait4` and type a chain of three commands.
  Count the forks and the waits, and find where the chain stopped early.
