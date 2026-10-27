# Instructor Notes: A Shell With Arguments and Chaining

## Purpose

The demo's three calls, done unassisted, plus the two things the demo left out: the argument array, and the exit status.
The chaining is what makes the status matter; without `&&` and `||` nobody would unpack it.

## Expected answers

* **TODO 1**: `fork()`, `execvp(argv[0], argv)` with `perror()` and `exit(127)` on failure, `waitpid(pid, &status, 0)`, then `WIFSIGNALED` / `WTERMSIG` before `WEXITSTATUS`.
* **TODO 2**: one condition: run after `;`, after `&&` if `status == 0`, after `||` if `status != 0`; assign the result to `status` only when the command ran.

The tokenizer and the loop that cuts the line into commands are given, and that is deliberate: the exercise is about processes, not parsing.

## Things students get wrong

* **`execvp(argv[0], &argv[1])`**, dropping the program from its own argument list.
  The command then sees its first argument as `argv[0]` and misbehaves.
  The array passed is the whole command, program included.
* **`return status;`** with the raw `waitpid()` status.
  `false` then reports 256, and `&&` still works, because 256 is not 0; `||` with `exit 1` versus `kill` confusions follow.
  Ask what `status` holds; `man 2 waitpid` has the layout.
* **`WEXITSTATUS` on a signalled child.**
  Returns 0 for a child killed by `SIGKILL`, so `sleep 10 && echo done`, with the sleep killed from outside, prints `done`.
  The signal case has to be tested first.
* **Updating `status` for a skipped command**, usually by setting it to 0.
  `false && echo d || echo e` then prints nothing.
  Compare with `bash`.
* **Precedence.**
  Students who know `&&` binds tighter than `||` in C expect the same here; shells do not do that, and `bash` is the reference.
* **Operators without spaces around them.**
  `a&&b` is one word to the tokenizer; say so once, up front.

## Verified reference values

| Input | Output |
| --- | --- |
| `false && echo yes \|\| echo no` | `[exit status 1]`, `no` |
| `true \|\| echo skipped && echo ran` | `ran` |
| `ls /nope \|\| echo fallback` | `ls`'s error, `[exit status 2]`, `fallback` |
| `nosuch ; echo after` | `nosuch: No such file or directory`, `[exit status 127]`, `after` |
| `&& echo bad` | `syntax error near '&&'` |
| `sleep 10` killed with `kill -9` | `[killed by signal 9]`, status 137 |
| `false && echo yes \|\| echo no` under `strace -f -e trace=clone,wait4` | 2 `clone()`, 2 `wait4()` |

## Practical notes

* The status lines go to `stderr` so that they never mix with a command's output in a pipe; on a terminal both streams interleave in the right order.
* No quoting, no `cd`, no `$?`: all three are in `FURTHER.md`, and the first two are good questions for a student who finishes early.
* Testing the signal path needs a second terminal, or a script run with `sh` that does `kill -9 $$`; `kill` typed into the student's shell works too, since it is an external command, given the PID from `ps` in another terminal.
