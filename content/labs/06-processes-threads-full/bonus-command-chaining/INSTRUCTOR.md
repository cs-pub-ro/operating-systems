# Instructor Notes: Command Chaining

## Purpose

The capstone shell: the background shell with the two things that make the exit status matter — reading it, and the `;`, `&&`, `||` operators that act on it.
It builds on `bonus-background-processes` (arguments, builtins, background, reaping all present), so the new work is the status macros and the run-or-skip logic.

## Expected answers

* **TODO 1 (`run_command`)**: after `waitpid(pid, &status, 0)`, test `WIFSIGNALED` / `WTERMSIG` first (return `128 + sig`), then `WEXITSTATUS`; print a stderr line for anything but a clean 0.
* **TODO 2 (`run_line`)**: run after `;` or `&`, after `&&` if `status == 0`, after `||` if `status != 0`; try `run_builtin()` first (status 0 for a builtin), else `run_command()` with `background`; update `status` only when a command ran.

The tokenizer, the cutting loop and `is_operator()` are given: the exercise is about processes and the status, not parsing.

## Things students get wrong

* **`return status;`** with the raw `waitpid()` status: `false` then reports 256.
  `&&` still works (256 != 0), which hides the bug until a `$?` comparison.
  Ask what `status` holds; `man 2 waitpid` has the layout.
* **`WEXITSTATUS` on a signalled child**: returns 0, so `sleep 10 && echo done`, with the sleep killed, prints `done`.
  The signal case has to be tested first.
* **Updating `status` for a skipped command**: `false && echo d || echo e` then prints nothing.
  Compare with `bash`.
* **Forgetting the builtin in the chain**: running `cd` through `run_command()` inside `run_line()`, so `cd /tmp && pwd` changes nothing.
* **Precedence**: students expect `&&` to bind tighter than `||`, as in C; shells go left to right.
* **Operators without spaces**: `a&&b` is one word; `;` needs no spaces.
  Say so once.

## Verified reference values

| Input | Output |
| --- | --- |
| `false && echo yes \|\| echo no` | `[exit status 1]`, `no` |
| `true \|\| echo skipped && echo ran` | `ran` |
| `ls /nope \|\| echo fallback` | `ls`'s error, `[exit status 2]`, `fallback` |
| `nosuch ; echo after` | `nosuch: No such file or directory`, `[exit status 127]`, `after` |
| `cd /tmp && pwd` | `/tmp` |
| `&& echo bad` | `syntax error near '&&'` |
| `sleep 10` killed with `kill -9` | `[killed by signal 9]`, status 137 |
| `false && echo yes \|\| echo no` under `strace -f -e trace=clone,wait4` | 2 `clone()`, 2 `wait4()` |

## Practical notes

* Status lines go to `stderr`, so they never mix into a pipe; on a terminal both streams interleave in order.
* `$?` is in `FURTHER.md`, a good extension for a fast group.
* Testing the signal path needs a second terminal: `kill -9 <pid>` from there, PID from `ps`.
* `&` still backgrounds, so the zombie one-liner (`sleep 1 & sleep 2 ; ps ...`) works here and is the clean way to show a zombie between two commands.
