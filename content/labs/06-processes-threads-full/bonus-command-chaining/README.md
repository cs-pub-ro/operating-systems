# Bonus: Command Chaining — Full

**Tools:** GCC, Make

## Goal

Reference solution for the capstone shell: the background shell from `bonus-background-processes`, extended so several commands go on one line, joined by `;`, `&&` and `||`, each deciding from the previous command's exit status whether the next one runs.
This is where the exit status, the one byte a process says to its parent, is finally read and acted on.

## Background

The shell already has arguments, the `cd`/`exit` builtins, and background `&`.
What is new is reading the exit status and the three list operators.

`waitpid()`'s second argument is an `int` that packs several facts, unpacked with macros:

| Macro | Meaning |
| --- | --- |
| `WIFEXITED(status)` | the child called `exit()` or returned from `main()` |
| `WEXITSTATUS(status)` | the low 8 bits it passed to `exit()`; only if `WIFEXITED` |
| `WIFSIGNALED(status)` | a signal killed the child |
| `WTERMSIG(status)` | which signal; only if `WIFSIGNALED` |

The operators decide, from the last status, whether the next command runs:

| Line | Second command runs |
| --- | --- |
| `a ; b` | always |
| `a && b` | only if `a` succeeded, exit status 0 |
| `a \|\| b` | only if `a` failed, exit status other than 0 |

`shell.c` keeps the tokenizer (which also splits at `;`), `is_operator()` (knowing all four operators), `reap_background()` and `run_builtin()`.
`run_line()` cuts the word list into commands at the operators; `&` still backgrounds the command before it.

## Build & Run

```console
make
./shell
```

```text
minish> false && echo yes || echo no
[exit status 1]
no
minish> true || echo skipped && echo ran
ran
minish> ls /nope || echo fallback
ls: cannot access '/nope': No such file or directory
[exit status 2]
fallback
minish> cd /tmp && pwd
/tmp
minish> sleep 5 & echo meanwhile
[started 74925]
meanwhile
minish> && echo bad
syntax error near '&&'
minish> exit
```

The `[exit status N]` lines are the shell's own, on `stderr`, and appear only for a command that did not exit with 0.

## Results and Explanations

### Reading the status — `run_command()`

```C
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

A child that a signal killed has no exit code, so `WIFSIGNALED` is tested first, and the function returns 128 plus the signal number — the convention every shell uses so a script can tell `exit 9` from `kill -9`.
Otherwise `WEXITSTATUS` is the code.
`WIFEXITED` is not tested explicitly because, with the default options, `waitpid()` returns only for a child that exited or was killed, and the first case is handled.
The `exit(127)` after a failed `execvp()` now carries meaning too: 127 is what the parent sees, and `||` acts on it.

### Running or skipping — `run_line()`

```C
background = next_op != NULL && strcmp(next_op, "&") == 0;

if (strcmp(op, ";") == 0 || strcmp(op, "&") == 0 ||
    (strcmp(op, "&&") == 0 && status == 0) ||
    (strcmp(op, "||") == 0 && status != 0)) {
	if (run_builtin(&tokens[start]))
		status = 0;
	else
		status = run_command(&tokens[start], background);
}
```

The loop around it was given: it finds the end of the current command, remembers the operator there, overwrites it with the `NULL` that `execvp()` wants, and moves `start` past it.
`op` is the operator *before* the command, initialised to `;` so the first command always runs.

Three things carry the semantics:

* **`status` updates only when a command runs.**
  A skipped command leaves it alone, so in `false && echo d || echo e` the `||` sees `false`'s status, and `echo e` runs; `bash` does the same.
* **Builtins run in the chain too.**
  `run_builtin()` is tried first; a builtin counts as success (status 0) for the operator that follows, so `cd /tmp && pwd` works.
* **Left to right, no precedence.**
  `a || b && c` is `(a || b) && c`, which is also `bash`'s rule.

### What the kernel saw

```console
printf 'false && echo yes || echo no\nexit\n' | strace -f -e trace=clone,wait4 ./shell 2>&1 | grep -v execve
```

Two `clone()` calls and two `wait4()` calls for three commands: `false` ran, `echo yes` was skipped with no process created, `echo no` ran.
A skipped command costs nothing, because the decision is taken in the shell before `fork()`.

## References

* `man 3 exec`, `man 2 waitpid`, `man 2 fork`
* `man 1 bash` — *Lists* and *Exit Status*
* `man 7 signal` — the signal numbers behind `128 + n`
