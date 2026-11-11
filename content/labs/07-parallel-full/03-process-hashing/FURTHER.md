# Going Further: Hashing Files With Several Processes

With answers.

## Things to try

1. **Wait with `wait()` instead of `waitpid()`.**

   ```C
   for (i = 0; i < nfiles; i++) {
   	pid = wait(&status);
   	for (j = 0; j < nfiles; j++)
   		if (pids[j] == pid)
   			printf("done: %s\n", files[j]);
   }
   ```

   `wait()` returns whichever child ends first, so the "done" lines come in finishing order.
   The `pids` array is what connects a PID back to a file: the kernel knows the child only by number.
1. **Do not start them all at once.**

   ```C
   running = 0;
   for (i = 0; i < nfiles; i++) {
   	if (running == limit) {
   		wait(&status);
   		running--;
   	}
   	/* fork and exec, as before */
   	running++;
   }
   while (running-- > 0)
   	wait(&status);
   ```

   At most `limit` children exist at a time: when the limit is reached, the parent waits for any one of them before starting the next.
   On 16 files and 12 processors the time is the same as starting everything.
   The difference is in what the machine is asked for: with 256 large files, start-everything means 256 processes reading 256 files at once, competing for memory and for the disk; a limit of `nproc` gets the same work done in the same time with twelve.
1. **Leave the second loop out.**

   The parent prints its summary and exits at once, and the shell prints its prompt; the digests then appear after the prompt, as the children finish.
   The children were orphaned when the parent exited and were adopted by `init` (or the user's `systemd`), which waits for them.
   Nothing is lost except the parent's knowledge of whether they succeeded, and the exit status of the program, which is now always 0.
1. **Count the system calls.**

   `strace -f -c` reports 16 `clone` calls and a `wait4` per child, sometimes one more: a `wait4` interrupted by the `SIGCHLD` of another child is restarted, and counted twice.
   The `execve` count is 16 times the number of directories in `PATH` up to the one that holds `md5sum`, plus one for `hash_files` itself; all but 17 fail with `ENOENT`.
   `execl("/usr/bin/md5sum", ...)` would make exactly 17, and would break on a system that keeps `md5sum` elsewhere.
1. **Compare with one process.**

   `time md5sum $(cat files.txt)` takes 0.32 s: one process, sixteen files, one after another, slightly faster than sixteen processes one after another (0.35 s), because it starts one program rather than sixteen.
   Sixteen processes at once take 0.047 s.
   For 16 MiB files the 2 ms it costs to start a process is nothing; for thousands of files of a few bytes, starting a process per file would cost far more than hashing, and one process would win.

## Questions to answer

* **The children all write to the same terminal with no lock, and no line is cut in two.
  Why not?**
  Each line is one `write()` system call, and the kernel carries out a `write()` to a terminal or a pipe as a unit.
  The lock exists; it is inside the kernel.
* **What decides the order of the lines?**
  The order in which the children finish, which depends on how the scheduler shared out the processors.
  Nothing in the program controls it.
* **What happens to a child that ends before the parent gets to its `waitpid()`?**
  It becomes a zombie: its memory is released, and an entry with its exit status stays until the parent collects it.
  The `waitpid()` then returns at once.
* **A child inherits the whole `files` array, although it needs one name.
  What does that copy cost?**
  Almost nothing.
  `fork()` copies page tables, not pages; the memory is shared, read-only, until one side writes, and the child writes hardly anything before `exec()` discards it all.

## Discussion points

* **Parallel means started before the previous one is done.**
  The same calls in the same number, with the wait moved four lines down, is the whole difference between sequential and parallel here.
* **Processes share nothing, so they race on nothing.**
  No child can damage another's memory, and none of them needed a lock.
  The price is that a child cannot hand back more than an exit status without help from the kernel, which is the subject of later sessions.
* **More workers than cores is not more speed.**
  It works, the scheduler shares the cores out, and it costs memory and context switches for nothing.

## References

* `man 2 fork`, `man 3 exec`, `man 2 wait`
* `man 1 md5sum`, `man 1 strace`
