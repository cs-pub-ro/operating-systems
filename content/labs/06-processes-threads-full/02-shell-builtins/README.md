# Exercise: Builtin Commands — Full

**Tools:** GCC, Make

## Goal

Add the two commands a shell cannot delegate to a child: `cd` and `exit`.
The idea is **builtins** — commands the shell runs in its own process — and the reason they exist.

## Background

So far every command ran in a child: `fork()`, `execvp()`, `waitpid()`.
That works because a command's effects are meant to live in the child and its output, not in the shell.

`cd` is the exact opposite.
Changing directory means calling `chdir()`, and `chdir()` changes the working directory *of the process that calls it*.
Done in a child, it changes the child's directory; the child then exits, and the shell — a separate process — is still where it started.
There is no way for a child to move its parent, so `cd` cannot be an external program.
`type cd` in `bash` says so: `cd is a shell builtin`, where `type ls` names a file.

`exit` is the same kind of command: it has to act on the shell's process, so the shell has to run it itself.

A command the shell runs in its own process is a **builtin**.
The shell checks each line against its builtins first, and only starts a program if none match:

```C
if (run_builtin(tokens))
        continue;       /* handled in the shell; next line */
run_command(tokens);    /* an ordinary program: fork + exec */
```

`run_builtin()` returns 1 when it recognised and ran a builtin, 0 otherwise.
For `cd`, the destination is `argv[1]`; with no argument, shells go to `$HOME`, read with `getenv("HOME")`.

## Build & Run

```console
make
./shell
```

```text
minish> cd /tmp
minish> pwd
/tmp
minish> cd
minish> pwd
/home/student
minish> cd /nonexistent
cd: No such file or directory
minish> exit
```

## Results and Explanations

* `cd /tmp` then `pwd` prints `/tmp`: the `chdir()` ran in the shell, so the change persisted into the next command.
  `pwd` is an external program, and it reports the shell's (now changed) directory because the child inherits it across `fork()`.
* `cd` with no argument goes to `$HOME`.
* `cd /nonexistent` prints `cd: No such file or directory` from `perror("cd")`, and the shell keeps running at its old directory.
* Under `strace -e trace=chdir`, `cd /tmp` is a single `chdir("/tmp") = 0` in the shell's own process — no `clone`, no `execve`.
  Compare with `ls`, which is `clone` + `execve` and no `chdir`.

The reason this exercise comes before the bonuses is that both of them keep these builtins: the background and chaining shells still have to handle `cd` and `exit` in the shell, around whatever they add.

## Going Further

See [`FURTHER.md`](FURTHER.md).

## References

* `man 2 chdir` — changing the working directory.
* `man 3 getenv` — reading an environment variable.
* `man 1 cd` — note it is documented as a shell builtin, not a program.
