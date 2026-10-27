# Going Further: Background Processes

Optional.

## Things to try

1. **Do it with `SIGCHLD`.**
   Install a handler with `sigaction()` that runs the `WNOHANG` loop, and take the call out of `main()`.
   Then type `sleep 1 &` and `sleep 3`, and see what happens to the foreground command's status when the background one finishes first.
   `man 7 signal-safety` says which functions a handler may call; `printf()` is not one of them.
1. **Never reap.**
   Take the loop out, start a hundred `sleep 0 &`, and look at `ps -o pid,stat,cmd --ppid <shell pid>` from another terminal.
   Then quit the shell and look again.
   Who collected them?
1. **A background command that writes.**
   `ls -l / &`, then keep typing.
   What happens to the prompt, and what does `bash` do about it?
1. **`exit` with a background child still running.**
   What happens to the child, and what is its parent afterwards?

## Questions to answer

* Why does the kernel keep a zombie around at all, instead of removing a finished process at once?
* `waitpid(-1, ...)` collects *any* child.
  Why is that safe to call before the prompt, and when would it steal a child that some other code was about to wait for?
* `WNOHANG` returns 0 when children exist but none has finished, and -1 with `ECHILD` when there are no children.
  Why does the loop need to stop on both?
* What does `[started 12345]` have in common with `bash`'s `[1] 12345`, and what does `bash`'s `1` add?

## Discussion points

* **A process ends twice.**
  Once when it exits, and once when its parent collects it; the zombie is the gap between the two, and the exit status is what the gap keeps.
* **Polling versus being told.**
  The `WNOHANG` loop asks at a convenient moment; `SIGCHLD` interrupts at an inconvenient one.
  Polling is simpler and good enough for a shell with a prompt; a server with no prompt needs the signal.
* **The parent's duty.**
  Every `fork()` creates an obligation to `wait()`, in the foreground now or in the background later.
  A program that forgets is a program that leaks processes.

## References

* `man 2 waitpid` — `WNOHANG`, and the `-1` PID
* `man 7 signal`, `man 2 sigaction`, `man 7 signal-safety`
* `man 1 ps` — process states, `Z` among them
