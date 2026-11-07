# Bonus: Background Processes — Full

**Tools:** GCC, Make, ps, strace

## Goal

Reference solution for the shell with `&`.
A command whose line ends in `&` is started and not waited for; the shell collects it later, before a prompt, so no finished child is left as a zombie for longer than one prompt.
It builds on `02-shell-builtins`: the builtins and `run_command()` are unchanged, and three pieces are added.

## Background

### What a zombie is

When a process ends, the kernel frees its memory, closes its files, and keeps one thing: the process-table entry, with the exit status in it.
That entry stays until the parent calls `wait()` or `waitpid()`, because the status has to be kept *somewhere* until the parent asks for it.
A process in that state is a **zombie**: `ps` shows it with state `Z` and `<defunct>` after its name; it uses no memory and no CPU, and it occupies a PID.

A parent that never waits accumulates zombies, one per child, until it exits; then they are reparented to `init` (PID 1) or to the nearest *subreaper* (on a desktop, usually the user's `systemd` instance), which waits for them.
The shell is the parent of every command it runs, so it has to wait for every one — including the ones it did not wait for at the time.

### Collecting without blocking

```C
pid_t waitpid(pid_t pid, int *status, int options);
```

With `pid == -1`, any child will do.
With `options == WNOHANG`, the call returns 0 instead of blocking when no child has finished, and -1 with `errno == ECHILD` when there are no children at all.
A loop on `waitpid(-1, NULL, WNOHANG) > 0` therefore collects every finished child and stops at once when there is nothing left.

The shell runs that loop before printing each prompt: a child that finished while the shell was busy, or sitting at the prompt, is collected the next time the user presses Enter.

### The other way: `SIGCHLD`

The kernel sends the parent a `SIGCHLD` signal every time a child ends.
A handler for it can run the same `WNOHANG` loop and collect the child at once, with no prompt involved.
It is the right design for a program with no natural moment to poll, such as a server; for a shell it is harder than it looks:

* The handler may call only async-signal-safe functions (`man 7 signal-safety`): `waitpid()` and `write()` are, `printf()` is not.
* The shell is nearly always blocked in the `read()` behind `fgets()`.
  Unless the handler is installed with `SA_RESTART`, that `read()` fails with `EINTR`, `fgets()` returns `NULL`, and the shell takes it for Ctrl-D and exits the moment a background child ends.

The reference uses the polling loop; `FURTHER.md` has the `SIGCHLD` experiment for anyone who wants it.

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
minish>
[74923 finished]
minish> exit
```

The `[74923 finished]` line appears at the first prompt after the five seconds: `reap_background()` collected it before printing that prompt.

## Results and Explanations

### Collecting — `reap_background()`

```C
static void reap_background(void)
{
	pid_t pid;

	while ((pid = waitpid(-1, NULL, WNOHANG)) > 0)
		fprintf(stderr, "[%d finished]\n", (int) pid);
}
```

`main()` calls it before each `read_line()`.
It cannot collect a foreground child by mistake: a foreground child was already collected by `run_command()`'s own blocking `waitpid()` before the loop returned, so by the time this runs, every remaining child is a background one.

### Not waiting — `run_command()`

```C
if (background) {
	fprintf(stderr, "[started %d]\n", (int) pid);
	return;
}
```

placed after the `fork()` and the child's `exec` branch, before the foreground `waitpid()`.
The parent has forked, the child is running, and the parent simply does not wait.

### Detecting `&` — `main()`

```C
background = 0;
if (strcmp(tokens[ntokens - 1], "&") == 0) {
	background = 1;
	tokens[--ntokens] = NULL;
}
```

The `&` has to be a word of its own (a space before it), because the tokenizer splits only at whitespace.
Dropping it from the array keeps it out of the program's `argv`.

### What the kernel saw

```console
printf 'sleep 1 &\nsleep 2\nexit\n' | strace -f -e trace=clone,wait4 ./shell
```

```text
wait4(-1, NULL, WNOHANG, NULL)          = -1 ECHILD (No child processes)
clone(..., SIGCHLD, ...)                = 74950
[started 74950]
wait4(-1, NULL, WNOHANG, NULL)          = 0
clone(..., SIGCHLD, ...)                = 74951
wait4(74951, ...)                       = 74951
wait4(-1, NULL, WNOHANG, NULL)          = 74950
wait4(-1, NULL, WNOHANG, NULL)          = -1 ECHILD (No child processes)
```

The first `wait4(-1, WNOHANG)` finds no children; after `sleep 1 &` starts, the second finds one still running and returns 0; the blocking `wait4(74951)` is the foreground `sleep 2`; the last loop collects the background `sleep 1` and stops on `ECHILD`.

## References

* `man 2 waitpid` — `WNOHANG`, `-1`, `ECHILD`
* `man 7 signal` — `SIGCHLD`; `man 2 sigaction`; `man 7 signal-safety`
* `man 1 ps` — process state codes
* `man 1 bash` — *Job Control*, for what a real shell does with `&`
