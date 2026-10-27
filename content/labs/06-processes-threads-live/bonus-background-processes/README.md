# Bonus: Background Processes

**Tools:** GCC, Make, ps

## Goal

Make the shell from `01-shell-chaining` run a command in the background when the line ends with `&`: start it, do not wait, and give the prompt back at once.
Afterwards you will be able to say what a zombie process is, why one exists, and how a parent collects a child that finished while the parent was busy.

## Background

`sleep 5 &` starts `sleep` and returns to the prompt immediately.
The shell still has to call `waitpid()` for that child at some point: a process that has ended stays in the process table, as a **zombie**, until its parent asks for its status, and a shell that never asks fills the table with its dead children.

The way to ask without blocking is `waitpid()` with the `WNOHANG` flag and `-1` as the PID, meaning "any child that has finished, if there is one".
Called in a loop before every prompt, it collects whatever finished since the last prompt and returns at once when nothing did.
The other way is to have the kernel tell the shell when a child ends, with the `SIGCHLD` signal; it is harder to get right and not needed here.

The shipped `shell.c` is the skeleton of `01-shell-chaining` with three TODOs added: `&` as an operator, a `background` flag for `run_command()`, and a `reap_background()` function that `main()` already calls before every prompt.
Start from your finished `shell.c` and bring the new TODOs over, or paste your finished pieces into the shipped file.

## Your Task

1. **TODO 3** — make `&` an operator.
   It ends the command before it, like `;`, and the command after it always runs.
1. **TODO 4** — in `run_command()`, when `background` is set, print the child's PID on `stderr` and return 0 without waiting.
   In `run_line()`, a command runs in the background when the operator after it is `&`.
1. **TODO 5** — `reap_background()`: collect every finished child with `waitpid(-1, ..., WNOHANG)` in a loop, printing a line for each.

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

* `sleep 5 &` gives the prompt back at once; the next prompt after the five seconds reports the child finished.
* `sleep 2 & echo chained` prints the echo immediately; `sleep 1 ; echo waited` does not.
* The zombie, on one line so that no prompt comes in between: `sleep 1 & sleep 2 ; ps -C sleep -o pid,ppid,stat,cmd`.
  Find the line with state `Z` and `<defunct>`, and say what its parent is.
  Then take the `WNOHANG` loop out, run several `sleep 1 &`, wait, and look again from another terminal.
* Start three background sleeps of different lengths and watch the order the finish lines arrive in.
* Run under `strace -f -e trace=clone,wait4` and type `sleep 1 &`, then press Enter a few times.
  Find the `wait4(-1, ..., WNOHANG, ...)` calls, and what they return before and after the child ends.
