# Instructor Notes: Background Processes

## Purpose

The part of the process lifecycle that `01-shell-chaining` skipped: a child that ends when its parent is not waiting.
The zombie is the concept; `WNOHANG` is the mechanism; `SIGCHLD` is the alternative to know about and not need yet.

## Expected answers

* **TODO 3**: `&` added to `is_operator()`, and treated like `;` in the run-or-skip condition.
* **TODO 4**: `if (background) { print pid; return 0; }` between the fork and the `waitpid()`; `run_line()` passes `next_op` being `&`.
* **TODO 5**: `while (waitpid(-1, NULL, WNOHANG) > 0) print;`

## Things students get wrong

* **`&` handled in `run_command()` by skipping the `fork()`**, or by exec'ing in the parent.
  The shell disappears; the demo's lesson, again.
* **`waitpid(pid, ..., WNOHANG)` with the background child's PID**, stored in one variable.
  Works for one background child; the second overwrites the first, which is never collected.
  Either `-1`, or a list.
* **A `SIGCHLD` handler**, with `printf()` in it, or installed without `SA_RESTART`.
  The first works until it does not (`man 7 signal-safety`); the second makes the shell exit the moment a background command ends, because the interrupted `fgets()` looks like Ctrl-D.
  A student who goes this way should do the `FURTHER.md` experiment before being satisfied.
* **Reaping only when a `&` command was typed**, rather than before every prompt.
  The children of earlier lines then stay zombies until the next `&`.
* **Treating the background command's status as unknown**, and making `&&` after `&` not run the next command.
  `bash` treats a backgrounded command as succeeded; the reference does too.

## Verified reference values

| Fact | Value |
| --- | --- |
| `sleep 1 & sleep 2 ; ps -C sleep -o pid,ppid,stat,cmd` | one line with `Z` and `[sleep] <defunct>`, PPID the shell |
| `sleep 2 & echo chained` | `[started N]`, `chained`, prompt; `[N finished]` at the prompt after 2 s |
| `strace -f -e trace=clone,wait4`, `sleep 1 &` then `sleep 2` | `wait4(-1, NULL, WNOHANG)` returns `ECHILD`, then 0, then the PID, then `ECHILD` |
| After `exit` with a background `sleep` running | the `sleep` continues, reparented to PID 1 or to a subreaper (`systemd --user` here) |

## Practical notes

* The `ps` one-liner has to be on one line in the student's shell, because every prompt reaps; it is written that way in the README.
  A second terminal with `ps --ppid <shell pid>` works too and shows the zombies of a shell that never reaps.
* The job messages go to `stderr`, like the status lines, and like `bash`'s own `[1] 12345`.
* Without job control there is no `fg`, no Ctrl-Z, and a background command that reads from the terminal competes with the shell for input.
  None of that is in scope; say so if asked and point at `man 1 bash`, *Job Control*.
