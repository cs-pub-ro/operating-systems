# Going Further: Background Processes

With answers.

## Things to try

1. **Do it with `SIGCHLD`.**

   ```C
   static void on_sigchld(int sig)
   {
   	(void) sig;
   	while (waitpid(-1, NULL, WNOHANG) > 0)
   		;
   }
   ```

   installed with `sigaction()`, collecting silently because `printf()` is not allowed in a handler.
   Install it with `sa_flags = 0` first, type `sleep 1 &`, and wait at the prompt: a second later the shell exits.
   The signal interrupted the `read()` behind `fgets()`, which returned `NULL`, which the shell takes for end of input; `strace -e trace=read` shows the `read(0, ...)` ending in `ERESTARTSYS (To be restarted if SA_RESTART is set)`.
   With `SA_RESTART` the read is restarted and the shell survives, and the foreground statuses are still reported, because `run_command()` is normally already blocked in its own `waitpid()` when the child ends and gets there first.
   The remaining race, a child that ends between `fork()` and that `waitpid()`, is rare enough that twenty runs of `false` do not show it, and real enough that a real shell keeps a job table and waits by PID.
1. **Never reap.**

   A hundred `Z` lines under the shell's PID, each `[sleep] <defunct>`.
   Quit the shell, and they are gone: orphaned processes, zombies included, are reparented to `init` or to the nearest subreaper, whose job includes waiting for them.
   `ps -o ppid` on one of them before the shell exits says the shell; there is no "after", because the new parent collects them within milliseconds.
1. **A background command that writes.**

   The listing lands on top of the prompt and on top of whatever is being typed; the terminal is shared and nobody owns it.
   `bash` has the same problem and solves part of it with job control: a background job that *reads* from the terminal is stopped with `SIGTTIN`, and one that writes is allowed to, unless `stty tostop` is set.
   Session 10's redirection is the usual answer: `cmd > out.txt &`.
1. **`exit` with a background child running.**

   The child keeps running: it is a separate process, and the shell's exit does not affect it.
   Its parent is gone, so it is reparented, and `ps -o ppid` on it shows PID 1 or the subreaper (`systemd --user` on this machine), which will collect it when it ends.
   `bash` does the same for a plain `&` job; `nohup` and `disown` exist for the signal side of the question, which this shell does not have.

## Questions to answer

* **Why keep a zombie at all?**
  Because the exit status has to be delivered to the parent, and the parent may not be ready to receive it.
  The process table entry is the mailbox; the memory and files are already gone.
  Removing the entry at exit would lose the status for every parent that was not already blocked in `wait()`.
* **When would `waitpid(-1)` steal a child?**
  Whenever two pieces of code in the same process are both waiting: a `SIGCHLD` handler and a foreground `waitpid(pid)`, or a library that forks internally and the application's reaper.
  The polling loop in the reference is safe only because it runs when no other wait is in progress.
  The general rule is that whoever forked a child is the one who waits for it, by PID.
* **Why stop on both 0 and -1?**
  0 means "children exist but none has finished": looping again would spin until one does.
  -1 with `ECHILD` means "no children": looping again would spin forever.
  `> 0` covers both.
* **`[started 12345]` versus `[1] 12345`.**
  Both report the PID; `bash`'s `1` is a job number, an index into its job table, which is what makes `fg`, `bg`, `kill %1` and `wait %1` possible.
  The job table is the list the `SIGCHLD` item needs; this shell has no table, and so no job control.

## Discussion points

* **A process ends twice**, and the zombie is the gap between exiting and being collected.
  The gap holds exactly one thing, the exit status.
* **Polling versus being told.**
  The `WNOHANG` loop asks at a convenient moment and is trivially safe; `SIGCHLD` interrupts at an arbitrary one and needs async-signal-safe code and care about who waits for whom.
  A shell has a convenient moment, the prompt; a server does not.
* **Every `fork()` is an obligation to `wait()`.**
  In the foreground, now; in the background, later; in a handler, carefully.
  A program that forgets leaks process table entries, which are a finite resource.

## References

* `man 2 waitpid`, `man 2 wait`
* `man 2 sigaction`, `man 7 signal`, `man 7 signal-safety`
* `man 1 bash` — *Job Control*; `man 1 nohup`
* `man 1 ps`, `man 5 proc` — `/proc/<pid>/status`, `State: Z (zombie)`
