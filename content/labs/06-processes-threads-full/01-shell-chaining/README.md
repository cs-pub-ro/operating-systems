# Exercise: A Shell With Arguments and Chaining

**Tools:** GCC, Make

## Goal

Reference implementation of the shell with arguments and chaining.
Commands take arguments, several commands go on one line, and `;`, `&&` and `||` decide from each command's exit status whether the next one runs.

## Background

The demo's `execlp()` took the command's words as separate C arguments, which only works when the number of words is known when the program is written.
A shell does not know it, so it builds an array and uses the array-taking variant:

```C
int execvp(const char *file, char *const argv[]);
```

`argv[0]` is the program, the rest are its arguments, and the array ends with a `NULL` pointer.
That array is, byte for byte, what the new program receives as its own `argv`; the shell is the one that builds it.

The exit status reaches the parent through `waitpid()`'s second argument, as an `int` that packs several facts:

| Macro | Meaning |
| --- | --- |
| `WIFEXITED(status)` | the child called `exit()` or returned from `main()` |
| `WEXITSTATUS(status)` | the low 8 bits of what it passed to `exit()`; only meaningful if `WIFEXITED` |
| `WIFSIGNALED(status)` | a signal killed the child |
| `WTERMSIG(status)` | which signal; only meaningful if `WIFSIGNALED` |

The operators:

| Line | Second command runs |
| --- | --- |
| `a ; b` | always |
| `a && b` | only if `a` succeeded, exit status 0 |
| `a \|\| b` | only if `a` failed, exit status other than 0 |

Files:

* `shell.c` — the shell, with both TODOs filled in.

## Build & Run

```console
make
./shell
```

```text
minish> ls -a -l Makefile
-rw-rw-r-- 1 razvan razvan 135 Oct 27 01:03 Makefile
minish> false && echo yes || echo no
[exit status 1]
no
minish> true || echo skipped && echo ran
ran
minish> ls /nope || echo fallback
ls: cannot access '/nope': No such file or directory
[exit status 2]
fallback
minish> nosuch ; echo after
nosuch: No such file or directory
[exit status 127]
after
minish> && echo bad
syntax error near '&&'
minish> exit
```

The `[exit status N]` lines are the shell's own, on `stderr`, and appear only for a command that did not exit with 0.

## Results and Explanations

### TODO 1 — `run_command()`

```C
pid = fork();
if (pid < 0) {
	perror("fork");
	return 127;
}

if (pid == 0) {
	execvp(argv[0], argv);
	perror(argv[0]);
	exit(127);
}

if (waitpid(pid, &status, 0) < 0) {
	perror("waitpid");
	return 127;
}

if (WIFSIGNALED(status)) {
	fprintf(stderr, "[killed by signal %d]\n", WTERMSIG(status));
	return 128 + WTERMSIG(status);
}

if (WEXITSTATUS(status) != 0)
	fprintf(stderr, "[exit status %d]\n", WEXITSTATUS(status));

return WEXITSTATUS(status);
```

The same three calls as the demo.
`execvp()` receives the array that `run_line()` prepared: the command's words, with a `NULL` written over the operator that followed them.

The status is unpacked in two steps.
A child that a signal killed has no exit code, so `WIFSIGNALED` is tested first and the function returns 128 plus the signal number, the convention every shell uses so that a script can tell `exit 9` from `kill -9`.
Otherwise `WEXITSTATUS` is the code.
`WIFEXITED` is not tested explicitly because, with the default options, `waitpid()` returns only for a child that exited or was killed, and the first case has been handled.

The `exit(127)` after a failed `execvp()` is the demo's failure path, and now it also carries meaning: 127 is what the parent will see, and `||` will act on it.

### TODO 2 — `run_line()`

```C
if (strcmp(op, ";") == 0 ||
    (strcmp(op, "&&") == 0 && status == 0) ||
    (strcmp(op, "||") == 0 && status != 0))
	status = run_command(&tokens[start]);
```

The loop around it was given: it finds the end of the current command, remembers the operator there and overwrites it with the `NULL` that `execvp()` wants, then moves `start` past it.
`op` is the operator *before* the command, initialised to `;` so that the first command always runs.

The condition is the whole semantics of the three operators.
Two details carry it:

* `status` is updated only by a command that ran.
  A skipped command leaves it alone, so in `false && echo d || echo e` the `||` sees `false`'s status, not `echo d`'s, and `echo e` runs; the same line in `bash` does the same.
* The chain is left to right with no precedence: `a || b && c` is `(a || b) && c`.
  That is also `bash`'s rule, which surprises people who expect `&&` to bind tighter.

### What the kernel saw

```console
printf 'false && echo yes || echo no\nexit\n' | strace -f -e trace=clone,wait4 ./shell 2>&1 | grep -v execve
```

Two `clone()` calls and two `wait4()` calls for three commands: `false` ran, `echo yes` was skipped without a process being created, `echo no` ran.
A skipped command costs nothing, because the decision is taken in the shell before `fork()`.

## References

* `man 3 exec`, `man 2 waitpid`, `man 2 fork`
* `man 1 bash` — *Lists* and *Exit Status*
* `man 7 signal` — the signal numbers behind `128 + n`
