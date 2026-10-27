# Going Further: A Shell With Arguments and Chaining

With answers.

## Things to try

1. **Add `cd` as a built-in.**
   Try it as an external command first: write it as if it were any other program, and find out why it has no effect.

   The child calls `chdir()` and exits, and the parent's working directory is what it was: the directory is per process, and the child was a different one.
   Anything that must change the shell's own state, `cd`, `exit`, `export`, has to run in the shell's process, which is what a built-in is.
   The reference `exit` is one; `cd` is `if (strcmp(tokens[0], "cd") == 0) chdir(tokens[1])` in `main()`, before `run_line()`.
1. **Add `$?`.**
   Make `echo $?` print the status of the last command, the way `bash` does.

   The status has to survive from one line to the next, so it leaves `run_line()` and becomes a variable of `main()`'s, or a static; `run_line()` returns its final `status`.
   Then, before running a command, replace any token equal to `$?` with that number formatted into a buffer.
   That is the beginning of expansion, which real shells do for every `$name` and every `*`.
1. **Mix the operators on one line and compare with `bash`.**

   `false || echo a && echo b` prints `a` and `b`; `true && false || echo c` prints `c`; `false && echo d || echo e` prints `e`.
   The rule is left to right, no precedence, status updated only by commands that ran; the reference and `bash` agree on all three.
1. **Replace `execvp()` with `execv()`** and type `ls`, then `/usr/bin/ls`.

   `ls: No such file or directory`, because `execv()` takes a path and does not search; `/usr/bin/ls` works.
   The `p` is a loop over `PATH` in the C library, which `strace` showed as one `execve()` per directory.
1. **Run a chain of ten commands under `strace -f -c`.**

   Ten `clone`, ten `wait4`, and as many `execve` as `PATH` entries tried; a `;` chain of `true`s is the cheapest way to count.

## Questions to answer

* **Why can the exit status not simply be the return value of `waitpid()`?**
  `waitpid()` returns the PID of the child it collected, or -1, and has to: with several children the caller needs to know which one ended.
  The status is a second result, so it goes through a pointer.
* **Where does `128 + signal` come from?**
  Exit codes are 0 to 255, and programs use the low ones.
  Shells report a signal death as 128 plus the signal number so that it cannot be confused with an exit code a program would use, and so that `$?` is always a number.
  Without the 128, `kill -1` would look like `exit 1`.
* **Which process runs the `perror()` after a failed `execvp()`, and why must it `exit()`?**
  The child.
  Without the exit, the child returns from `run_command()` into the shell's loop and there are two shells on the terminal.
  With it, the parent sees 127 and `||` works on a command that was not found.
* **What does `false && false || echo x` print?**
  `x`: the second `false` is skipped, the status stays at 1 from the first, and `||` sees 1.

## Discussion points

* **`argv` is a convention between a shell and a program.**
  The shell builds the array, `exec` copies it into the new process's memory, `main()` receives it.
  Nothing in the kernel knows what `-l` means, and the quoting rules that decide where one argument ends are entirely the shell's.
* **The exit status is one byte, and it is the only thing a process says to its parent when it ends.**
  Every `if`, `while`, `&&` and `||` in every shell script is built on that byte.
  Anything richer, output, files, signals, is a separate channel.
* **Built-ins exist because some commands have to change the shell itself.**
  The fork boundary is also a state boundary: what the child changes, the child keeps.

## References

* `man 3 exec`, `man 2 waitpid`, `man 2 chdir`
* `man 1 bash` — *Lists*, *Exit Status*, *Shell Builtin Commands*
