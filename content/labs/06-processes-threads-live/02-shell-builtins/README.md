# Exercise: Builtin Commands

**Tools:** GCC, Make

## Goal

Make `cd` and `exit` work in your shell.
Afterwards you will be able to say why some commands cannot run as a child process and must be handled by the shell itself.

## Background

Every command so far ran in a child: fork, exec, wait.
`cd` cannot work that way.
A child that calls `chdir()` changes its *own* working directory and then exits; the shell, its parent, is left exactly where it was.
The same goes for `exit`: a child exiting ends the child, not the shell.

These are **builtins**: commands the shell runs itself, in its own process, instead of starting a program.
A real shell has a handful (`cd`, `exit`, `export`, ...); here you implement the two that matter.

`shell.c` now calls `run_builtin()` before `run_command()` for every line.
If `run_builtin()` handled the command it returns 1 and the shell reads the next line; otherwise it returns 0 and the line runs as a program, as before.

## Your Task

Open `shell.c` and complete the TODO in `run_builtin()`.

1. `exit` — end the shell with `exit()`.
1. `cd` — change directory with `chdir(argv[1])`; with no argument, use `getenv("HOME")`.
   Report a failed `chdir()` with `perror()` and keep the shell running.
1. Return 1 for either builtin, 0 for anything else.

## Build & Run

```console
make
./shell
```

```text
minish> cd /tmp
minish> pwd
/tmp
```

## Check Your Work

* `cd /tmp` then `pwd`: the directory reported is the one you changed to; `cd` with no argument then `pwd` reports your home directory.
* `cd /nonexistent` prints an error and the shell keeps running; `pwd` is unchanged.
* In `bash`, run `type cd` and `type ls`: one is a shell builtin, the other a program on `PATH`.
  Say why a shell could not do it the other way round.
* Run the shell under `strace -e trace=chdir` and type `cd /tmp`: the `chdir` happens in the shell's own process, with no `clone`/`execve` around it.
