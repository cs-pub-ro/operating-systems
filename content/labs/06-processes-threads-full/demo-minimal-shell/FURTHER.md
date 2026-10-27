# Going Further: A Minimal Shell

With answers.

## Things to try

1. **Leave out the `exit(127)` after a failed exec, and type a command that does not exist.**

   The child prints the error and goes on with the parent's code: it returns from `run_command()`, prints a prompt and reads the next line.
   There are now two shells reading the same terminal, and each line typed goes to one of them, unpredictably.
   `exit` only ends one of them; the second keeps the terminal.
   This is why the failure path after `exec()` always ends the child.
1. **Print the PID in both processes.**
   Right after `fork()`, add `printf("%d: fork returned %d\n", getpid(), pid)` before the `if`.

   Two lines: one from the parent, with the child's PID as the return value, one from the child, with 0.
   The order of the two lines varies between runs; after `fork()` the two processes are scheduled independently.
1. **Run the shell under `strace -f` and count the `execve()` calls for one `ls`.**

   One per directory of `PATH` until one succeeds, each of the failed ones returning `ENOENT`.
   `execlp()` is a loop in the C library around the one system call.
   With `execl("/usr/bin/ls", ...)` there is exactly one.
1. **Replace `exit(127)` with `_exit(127)` and look for a difference.**
   Then take the `fflush(stdout)` out of `read_line()`, run `./shell | cat`, and type a command that does not exist.

   With `exit()`, the prompt that was still in the parent's stdio buffer when `fork()` copied it is written twice: once by the child, when `exit()` flushes the copied buffer, once by the parent.
   `_exit()` ends the process without flushing, which is what a child that never got to run its own program should do.
   On a terminal, where stdout is line-buffered and the prompt was flushed, there is nothing in the buffer to duplicate, so the problem only shows when the output is a pipe or a file.

## Questions to answer

* **Why does starting a program take two system calls?**
  Because the two things, creating a process and loading a program into it, are independent, and the gap between them is useful.
  A shell uses the gap to set up redirections (session 10), change directory, drop privileges, or close files, in the child, before the new program starts, using ordinary code rather than a special API.
  Windows' `CreateProcess()` does both in one call and takes a structure of options to cover the same cases.
* **What does the child inherit from the parent across `fork()`, and what does it keep across `exec()`?**
  Across `fork()`, everything: a copy of the memory, the open files, the working directory, the environment, the signal dispositions.
  Across `exec()`, the memory is replaced, and nearly everything else is kept: the PID, the open files (unless marked close-on-exec), the working directory, the environment passed in.
  That is what makes the gap useful.
* **Why is the exit status 127 and not, say, 1?**
  Convention: shells reserve 126 for "found but not executable" and 127 for "not found", so that a script can tell those apart from a command that ran and failed.
  The child is pretending to be the command, and reporting in the command's place.
* **`fork()` copies the whole process. Is that not slow for a large one?**
  It would be, so the kernel does not copy the memory: both processes share the same pages, marked read-only, and a page is copied only when one of them writes to it (copy-on-write, lecture 04).
  A child that calls `exec()` at once touches almost nothing, and almost nothing is copied.

## Discussion points

* **`fork()` returns twice.**
  The line after it runs in two processes, and the code that follows has to be written knowing that.
  Every bug in a `fork()`-based program is a line that ran in the wrong process.
* **A successful `exec()` does not return.**
  Code after it is the failure path, and the failure path must leave the child.
* **The shell is the process that waits.**
  The prompt coming back is `waitpid()` returning; a shell that forgot to wait would be unusable, and one that waited for the wrong child would hang.

## References

* `man 2 fork`, `man 3 exec`, `man 2 execve`, `man 2 waitpid`, `man 2 _exit`
* `man 7 environ`
