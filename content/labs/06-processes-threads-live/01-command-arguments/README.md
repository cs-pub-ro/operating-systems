# Exercise: Commands With Arguments

**Tools:** GCC, Make

## Goal

Extend the demo's shell so a command can take arguments: `ls -l /tmp`, not just `ls`.
Afterwards you will be able to hand a new program its argument list the way a shell does.

## Background

The demo gave the whole line to `execlp()` as one command name, so `ls -l` was looked up as a program literally called `ls -l` and not found.
A command is really a list of words: the program to run, then its arguments, which is exactly what the program receives as its own `argv`.

`execvp()` takes that list as a NULL-terminated array and looks the first word up in `PATH`:

```C
int execvp(const char *file, char *const argv[]);
```

`shell.c` already reads the line and splits it into such an array with `tokenize()`: `tokens[0]` is the program and the array ends in `NULL`.

## Your Task

Open `shell.c` and complete the one TODO in `run_command()`.

1. Fork, as in the demo.
1. In the child, call `execvp()` with the command's `argv`; if it returns, report the error and leave with `exit(127)`.
1. In the parent, wait for the child with `waitpid()`.

## Build & Run

```console
make
./shell
```

```text
minish> ls -l /tmp
minish> echo one two three
```

`exit` or Ctrl-D ends the shell.

## Check Your Work

* `echo one two three` prints the three words; `ls -l Makefile` prints the long listing.
  Compare each with the same command in your usual shell.
* `ls -l` now works where it did not in the demo; say why in one sentence.
* A command that does not exist prints an error and leaves the shell running.
* Run the shell under `strace -f -e trace=execve` and type `ls -l`: find the one `execve` that succeeds and the argument array it carries.
