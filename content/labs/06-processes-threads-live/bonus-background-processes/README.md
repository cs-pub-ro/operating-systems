# Bonus: Background Processes

**Tools:** GCC, Make, ps

## Goal

Make the shell from `02-shell-builtins` run a command in the background when the line ends with `&`: start it, do not wait, and give the prompt back at once.
Afterwards you will be able to say what a zombie process is, why one exists, and how a parent collects a child that finished while the parent was busy.

## Background

`sleep 5 &` starts `sleep` and returns to the prompt immediately.
The shell still has to call `waitpid()` for that child at some point: a process that has ended stays in the process table, as a **zombie**, until its parent asks for its status, and a shell that never asks fills the table with its dead children.

The way to ask without blocking is `waitpid()` with the `WNOHANG` flag and `-1` as the PID, meaning "any child that has finished, if there is one".
Called in a loop before every prompt, it collects whatever finished since the last prompt and returns at once when nothing has.

Start from your finished `shell.c` of `02-shell-builtins`, or from the skeleton here: it is that shell with three TODOs added.

## Your Task

Open `shell.c` and complete the three TODOs.

1. **`reap_background()`** — collect every finished child with `waitpid(-1, NULL, WNOHANG)` in a loop, printing a line for each.
1. **`run_command()`** — when `background` is set, print the child's PID on `stderr` and return without waiting.
1. **`main()`** — when the last word is `&`, set `background` and drop that word before running the command.

## Build & Run

```console
make
./shell
```

```text
minish> sleep 5 &
[started 12345]
minish> echo meanwhile
meanwhile
minish>
[12345 finished]
minish>
```

## Check Your Work

* `sleep 5 &` gives the prompt back at once; the next prompt after five seconds reports the child finished.
* Start three background sleeps of different lengths and watch the order the finish lines arrive in.
* Comment out the body of `reap_background()`, run several `sleep 1 &`, wait, and from another terminal run `ps -C sleep -o pid,ppid,stat,cmd`.
  Find the lines in state `Z`, marked `<defunct>`, whose parent is your shell: those are the zombies that pile up when nobody waits.
* Run under `strace -e trace=wait4` and press Enter a few times after a `sleep 1 &`: find the `wait4(-1, ..., WNOHANG, ...)` calls, and what they return before and after the child ends.
