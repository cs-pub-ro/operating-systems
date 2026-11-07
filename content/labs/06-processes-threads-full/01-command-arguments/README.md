# Exercise: Commands With Arguments — Full

**Tools:** GCC, Make

## Goal

Extend the minimal shell so that a command can carry arguments: `ls -l /tmp`, not only `ls`.
The one new idea is `execvp()`, which takes an argument array instead of a single name.

## Background

The demo ran a command with `execlp(command, command, NULL)`: the whole line became one program name.
`ls -l` was therefore looked up as a program called `ls -l`, which does not exist.

A command line is a list of words.
The first is the program; the rest are its arguments; together they are the array the program sees as its own `argv`.
The kernel does not parse that line — the shell does, and passes the result to `execvp()`:

```C
int execvp(const char *file, char *const argv[]);
```

`execvp()` looks `file` up in `PATH` (the `p`) and takes the arguments as a vector (the `v`), a NULL-terminated array of `char *`.
The provided `tokenize()` produces exactly that: it splits the line at spaces and tabs and leaves the array ending in a `NULL` pointer, so `tokens` can be passed straight to `execvp()`.

Only the child calls `execvp()`, because a successful `execvp()` never returns: it replaces the program.
Anything after it runs only on failure, which is why the child reports the error and exits with 127, the status shells use for "command not found or not runnable".

## Build & Run

```console
make
./shell
```

```text
minish> ls -l /tmp
minish> echo one two three
one two three
minish> exit
```

## Results and Explanations

* `echo one two three` prints the three words because they reached `echo` as `argv[1]`, `argv[2]`, `argv[3]`.
  In the demo the same line would have failed: there was no program named `echo one two three`.
* `ls -l` now works: `argv` is `{"ls", "-l", NULL}`, and `ls` reads `-l` as the long-listing flag.
* A missing command prints `name: No such file or directory` from the child's `perror()`, and the shell keeps running because only the child exited.
* Under `strace -f -e trace=execve`, typing `ls -l` shows one `execve("/usr/bin/ls", ["ls", "-l"], ...)` that returns 0; the shell's own process is untouched because the exec happened in the child.

The exit status is still ignored here; reading it is `bonus-command-chaining`'s job.
`exit` is still a plain `strcmp` in `main()` rather than a real builtin, which is the next exercise.

## Going Further

See [`FURTHER.md`](FURTHER.md).

## References

* `man 3 exec` — the `exec` family, and what the letters `l`, `v` and `p` mean.
* `man 2 waitpid` — waiting for a child.
