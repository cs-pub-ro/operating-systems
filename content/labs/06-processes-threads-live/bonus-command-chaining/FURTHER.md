# Going Further: Command Chaining

Optional.

## Things to try

1. **Add `$?`.**
   Make `echo $?` print the status of the last command, the way `bash` does.
   Where does the value have to live, and who sets it?
1. **Mix the operators on one line and compare with `bash`.**
   `false || echo a && echo b`, `true && false || echo c`, `false && echo d || echo e`.
   Work out the rule `bash` follows for a chain of mixed `&&` and `||`, and whether your shell follows the same one.
1. **Replace `execvp()` with `execv()`** and type `ls`, then `/usr/bin/ls`.
   What did the `p` buy?
1. **Run a chain of ten commands under `strace -f -c`** and look at the counts for `clone`, `execve` and `wait4`.

## Questions to answer

* Why can the exit status not simply be the return value of `waitpid()`?
* `bash` reports 128 plus the signal number for a command killed by a signal.
  Where does the 128 come from, and what would go wrong without it?
* Which process runs the `perror()` after a failed `execvp()`, and why must it `exit()` right after?
* A command skipped because of `&&` does not change the status.
  What does `false && false || echo x` print, and why?

## Discussion points

* **The exit status is the only thing a process says to its parent** when it ends, and it is one byte.
  Everything shells do with `&&`, `||`, `if` and `while` is built on it.
* **A builtin counts as a command in the chain.**
  `cd /tmp && ls` works because the builtin runs first and reports success.
* **Three operators, one loop.**
  A shell's grammar for a line is mostly "the previous status decides the next command", and `run_line()` is that grammar.

## References

* `man 3 exec`, `man 2 waitpid`
* `man 1 bash` — *Lists* and *Exit Status*
