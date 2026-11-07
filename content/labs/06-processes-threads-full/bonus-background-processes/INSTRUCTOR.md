# Instructor Notes: Background Processes

## Purpose

The part of the process lifecycle the foreground shell skipped: a child that ends when its parent is not waiting.
The zombie is the concept; `WNOHANG` is the mechanism; `SIGCHLD` is the alternative to know about and not need yet.
It builds on `02-shell-builtins` and adds only `&`, so it is a genuine take-home: twenty minutes once that exercise exists.

## Expected answers

* **`reap_background()`**: `while (waitpid(-1, NULL, WNOHANG) > 0) print;`
* **`run_command()`**: `if (background) { print pid; return; }` between the fork and the `waitpid()`.
* **`main()`**: if the last token is `"&"`, set `background` and drop the token (`tokens[--ntokens] = NULL`).

## Things students get wrong

* **`&` handled by skipping the `fork()`**, or exec'ing in the parent: the shell disappears; the demo's lesson, again.
* **`waitpid(pid, ..., WNOHANG)` with the one background PID**, stored in a single variable: it works for one child, but a second overwrites the first, which is never collected.
  Either `-1`, or a list.
* **A `SIGCHLD` handler** with `printf()` in it, or without `SA_RESTART`: the first works until it does not (`man 7 signal-safety`); the second makes the shell exit the moment a background command ends, because the interrupted `fgets()` looks like Ctrl-D.
  A student who goes this way should do the `FURTHER.md` experiment before being satisfied.
* **Reaping only when a `&` command was typed**, rather than before every prompt: the children of earlier lines then stay zombies.
* **`&` not separated by a space**: `sleep 5&` is one word; the tokenizer splits only at whitespace.
  Say it once.

## Verified reference values

| Fact | Value |
| --- | --- |
| `sleep 5 &` | `[started N]`, prompt at once; `[N finished]` at the first prompt after 5 s |
| `strace -f -e trace=clone,wait4`, `sleep 1 &` then `sleep 2` | `wait4(-1, NULL, WNOHANG)` returns `ECHILD`, then 0, then the PID, then `ECHILD` |
| `reap_background()` body removed, many `sleep 1 &` | `Z`/`<defunct>` lines under the shell's PID in `ps` from another terminal |
| After `exit` with a background `sleep` running | the `sleep` continues, reparented to PID 1 or to a subreaper (`systemd --user` here) |

## Practical notes

* To see a real zombie, comment out the reaping and look from a second terminal (`ps -C sleep -o pid,ppid,stat,cmd`): the shell reaps before every prompt, so an in-shell observation is collected before it can be printed.
  The richer one-line demonstration, with the zombie visible between two commands, needs the operators, so it lives in `bonus-command-chaining`.
* The job messages go to `stderr`, like `bash`'s own `[1] 12345`.
* Without job control there is no `fg`, no Ctrl-Z, and a background command that reads from the terminal competes with the shell for input.
  Out of scope; point at `man 1 bash`, *Job Control*, if asked.
