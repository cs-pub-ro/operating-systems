# Instructor Notes: A Minimal Shell

## Purpose

The first half of the session's material in the smallest program that shows it: a process is created by copying, programmed by replacing, and finished by waiting.
Everything about processes in the exercises is this demo with details added.

If you present only one demo, present this one; the thread demo can be described while `02-aggregate-matches` is introduced.

## Sequencing

Do the three TODOs in the order that makes each one's absence visible, and run the shell after each.

1. **TODO 2 first, without the fork.**
   Write only the `execlp()` and the error path, in `run_command()` as it is, and run `ls`.
   The listing appears, and the shell is gone: the prompt does not come back.
   Ask where the shell went.
   The answer, that `exec()` replaced the shell's program in the only process there was, is the whole point of `fork()`.
1. **TODO 1: add the fork, and the `if` that puts the exec in the child.**
   Run `ls` again.
   The listing appears and the shell survives, but the prompt is printed before or in the middle of the listing, because the parent did not wait.
1. **TODO 3: the wait.**
   Listing, then prompt.
1. **Type a command that does not exist.**
   The `perror()` and the `exit(127)` are the failure path of `exec()`; take the `exit()` out for a minute and let the room see two shells on one terminal.
1. **Type `ls -l`.**
   `No such file or directory`, because the whole line is the command name.
   This is the hand-over to `01-shell-chaining`.

## Points to hammer

* **`fork()` returns twice**, once in each process, and the code after it runs in both.
  Say it, then show it with a `printf()` of `getpid()` and the return value.
* **A successful `exec()` never returns.**
  The lines after it are the failure path, and the failure path must end the child.
* **The parent is the one that waits.**
  The prompt coming back *is* `waitpid()` returning.
* **Three library calls, three system calls, different names.**
  `strace -f -e trace=execve,clone,wait4` shows `clone()` for `fork()`, one `execve()` per `PATH` directory for `execlp()`, and `wait4()` for `waitpid()`.
  Thirty seconds, and it connects to session 02.

## Things that go wrong in the room

* **`execlp(command, NULL)`**, without the `argv[0]`.
  Compiles, runs the command with an empty argument list, and some commands then misbehave.
  The first argument is the file to run, the second is `argv[0]`.
* **The `NULL` at the end written as `0` or forgotten.**
  `execlp()` is variadic and reads arguments until it finds a null pointer; without one it reads garbage.
  `(char *) NULL` is the portable spelling.
* **`waitpid()` placed inside the `if (pid == 0)` block.**
  The child waits for itself and never gets anywhere; the parent prints the next prompt at once.
  Ask which process runs each line.
* **Testing `pid == 0` for the parent.**
  Zero is the child.
* **`strace -f` output looks like a lot.**
  Filter with `-e trace=execve,clone,wait4`, and say that the many failed `execve()` calls are the `PATH` search.

## Verified reference values

| Fact | Value |
| --- | --- |
| `strace -f -e trace=execve,clone,wait4`, one `ls` | one `clone(..., SIGCHLD)`, one failed `execve()` per `PATH` directory before `/usr/bin/ls`, one `wait4(<pid>, NULL, 0, NULL)`, one `SIGCHLD` |
| `nosuchcmd` | `nosuchcmd: No such file or directory`, child exits 127, shell continues |
| `ls -l` | `ls -l: No such file or directory` |

## Practical notes

* The shell has no `cd` and no quoting; neither is needed in this session.
* The prompt is flushed explicitly in `read_line()`, so the duplicated-buffer problem with `exit()` in the child does not show on a terminal.
  It is in `FURTHER.md` for anyone who asks about `_exit()`.
* Ctrl-D ends the shell cleanly; Ctrl-C kills it, and the foreground child with it, which is fine.
