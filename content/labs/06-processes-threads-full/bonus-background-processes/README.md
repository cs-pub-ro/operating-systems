# Bonus: Background Processes

**Tools:** GCC, Make, ps, strace

## Goal

Reference solution for the shell with `&`.
A command followed by `&` is started and not waited for; the shell collects it later, before a prompt, so that no finished child is left as a zombie for longer than one prompt.

## Background

### What a zombie is

When a process ends, the kernel frees its memory, closes its files, and keeps one thing: the process table entry, with the exit status in it.
That entry stays until the parent calls `wait()` or `waitpid()`, because the status has to be kept *somewhere* until the parent asks for it.
A process in that state is a **zombie**: `ps` shows it with state `Z` and `<defunct>` after its name, it uses no memory and no CPU, and it occupies a PID.

A parent that never waits accumulates zombies, one per child, until it exits; then they are reparented, to `init` (PID 1) or to the nearest process that volunteered as a *subreaper* (on a desktop, usually the user's `systemd` instance), and the new parent waits for them.
The shell is the parent of every command it runs, so it has to wait for every one, including the ones it did not wait for at the time.

### Collecting without blocking

```C
pid_t waitpid(pid_t pid, int *status, int options);
```

With `pid == -1`, any child will do.
With `options == WNOHANG`, the call returns 0 instead of blocking when no child has finished, and -1 with `errno == ECHILD` when there are no children at all.
A loop on `waitpid(-1, &status, WNOHANG) > 0` therefore collects every finished child and stops at once when there is nothing more to collect.

The shell calls that loop before printing each prompt.
A child that finished while the shell was waiting for a foreground command, or sitting at the prompt, is collected the next time the user presses Enter, which is as soon as the shell can print anything anyway.

### The other way: `SIGCHLD`

The kernel sends the parent a `SIGCHLD` signal every time a child ends (the first demo's `strace` showed it arriving).
A handler for it can run the same `WNOHANG` loop and collect the child at once, with no prompt involved.
It is the right design for a program with no natural moment to poll, such as a server; for a shell it is harder to get right than it looks:

* The handler runs at any point in the shell's code, between any two instructions.
  It may call only async-signal-safe functions (`man 7 signal-safety`): `waitpid()` and `write()` are, `printf()` is not.
* A blocking system call in progress when the signal arrives is interrupted.
  The shell is nearly always blocked in the `read()` behind `fgets()`, at the prompt; unless the handler was installed with `SA_RESTART`, that `read()` fails with `EINTR`, `fgets()` returns `NULL`, and the shell takes it for Ctrl-D and exits, the moment a background command ends.
* `waitpid(-1, ...)` in the handler collects *any* child.
  A foreground child that ends while `run_command()` is already blocked in its own `waitpid()` is collected by that call first, so the two rarely collide; but a child that ends in the window between `fork()` and that call is taken by the handler, and `run_command()` gets `ECHILD` and no status.
  Rare is not never, and the fix is a list of background PIDs that the handler waits for by PID, which is the beginning of a job table.

The reference uses the polling loop.
The TODO in the skeleton names both, so that a student who knows `SIGCHLD` from the lecture can try it; `FURTHER.md` has the experiment.

Files:

* `shell.c` — `01-shell-chaining`'s solution with the three TODOs filled in.

## Build & Run

```console
make
./shell
```

```text
minish> sleep 5 &
[started 74923]
minish> echo meanwhile
meanwhile
minish> sleep 2 & echo chained
[started 74925]
chained
minish>
[74923 finished]
[74925 finished]
minish> sleep 1 & sleep 2 ; ps -C sleep -o pid,ppid,stat,cmd
[started 74940]
    PID    PPID STAT CMD
  74940   74922 Z    [sleep] <defunct>
[74940 finished]
minish> exit
```

The `ps` line is the zombie: `sleep 1` finished a second before `ps` ran, and nothing had collected it yet, because no prompt had been printed since.
Its parent, 74922, is the shell.
The `[74940 finished]` line that follows is the collection, before the next prompt.

## Results and Explanations

### TODO 3 — `&` is an operator

```C
return strcmp(word, ";") == 0 || strcmp(word, "&&") == 0 ||
       strcmp(word, "||") == 0 || strcmp(word, "&") == 0;
```

And in `run_line()`, `&` before a command behaves as `;` does: the command runs regardless of the status.
`bash` does the same, and gives a background command a status of 0 for the purposes of `&&`.

### TODO 4 — not waiting

```C
if (background) {
	fprintf(stderr, "[started %d]\n", (int) pid);
	return 0;
}
```

placed in `run_command()` after the `fork()` and the child's `exec` branch, before the `waitpid()`.
The parent has forked, the child is running, and the parent simply does not wait.
`run_line()` decides: the command is a background one when the operator *after* it is `&`:

```C
status = run_command(&tokens[start],
		     next_op != NULL && strcmp(next_op, "&") == 0);
```

### TODO 5 — collecting

```C
static void reap_background(void)
{
	pid_t pid;

	while ((pid = waitpid(-1, NULL, WNOHANG)) > 0)
		fprintf(stderr, "[%d finished]\n", (int) pid);
}
```

Called by `main()` before each `read_line()`.
It cannot collect a foreground child by mistake, because the foreground child was already collected by `run_command()`'s blocking `waitpid()` before `run_line()` returned; by the time this loop runs, every remaining child is a background one.
That is the property the `SIGCHLD` version does not have.

### What the kernel saw

```console
printf 'sleep 1 &\nsleep 2\nexit\n' | strace -f -e trace=clone,wait4 ./shell
```

```text
wait4(-1, NULL, WNOHANG, NULL)          = -1 ECHILD (No child processes)
clone(child_stack=NULL, flags=...|SIGCHLD, ...) = 74950
[started 74950]
wait4(-1, NULL, WNOHANG, NULL)          = 0
clone(child_stack=NULL, flags=...|SIGCHLD, ...) = 74951
wait4(74951, ...)                       = 74951
--- SIGCHLD {si_pid=74950, ...} ---
--- SIGCHLD {si_pid=74951, ...} ---
wait4(-1, NULL, WNOHANG, NULL)          = 74950
wait4(-1, NULL, WNOHANG, NULL)          = -1 ECHILD (No child processes)
```

The first `wait4(-1, WNOHANG)` finds no children at all; the second finds one, still running, and returns 0; the blocking `wait4(74951)` is the foreground `sleep 2`, during which both `SIGCHLD`s arrive and are ignored; the last loop collects the background `sleep 1` and stops on `ECHILD`.

## References

* `man 2 waitpid` — `WNOHANG`, `-1`, `ECHILD`
* `man 7 signal` — `SIGCHLD`; `man 2 sigaction`; `man 7 signal-safety`
* `man 1 ps` — process state codes
* `man 1 bash` — *Job Control*, for what a real shell does with `&`
