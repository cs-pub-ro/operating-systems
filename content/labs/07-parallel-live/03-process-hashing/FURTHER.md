# Going Further: Hashing Files With Several Processes

Optional.

## Things to try

1. **Wait with `wait()` instead of `waitpid()`**: it returns whichever child ends first, and its PID.
   Print the name of the file each time a child is collected.
   You now have to find a file from a PID; what do you need to keep for that?
1. **Do not start them all at once.**
   With 256 files the program starts 256 processes on a machine with a handful of cores.
   Keep at most `nproc` children alive: start that many, then start a new one each time `wait()` returns.
   Time it against the start-everything version on 64 small files and on 16 large ones.
1. **Leave the second loop out** and run.
   The hashes are still printed.
   Where does the prompt of your shell appear, and what are the children's parents by the time they end?
1. **Count the system calls**: run under `strace -f -c -e trace=clone,execve,wait4` and read the three counts.
   Then explain the number of `execve()` calls with `strace -f -e trace=execve` and your `PATH`.
1. **Compare with one process.**
   `md5sum` takes several files: `time md5sum $(cat files.txt)` hashes them all in one process, one after another.
   Which is faster, and at what number or size of files would it be the other way round?

## Questions to answer

* The children all write to the same terminal, with no lock, and no line is ever cut in two by another.
  Why not?
* The lines come out in a different order from run to run.
  What decides the order?
* The parent waits for the children in the order it started them.
  What happens to a child that ends before the parent gets to its `waitpid()`?
* A child inherits the whole `files` array, although it needs one name.
  What does that copy cost, and when is it paid?

## Discussion points

* **Parallel means started before the previous one is done.**
  The same calls in the same number, with the wait moved four lines down, is the whole difference between sequential and parallel here.
* **Processes share nothing, so they race on nothing.**
  No child can damage another's memory, and none of them needed a lock.
  The price is that a child cannot hand back more than an exit status without help from the kernel, which is the subject of later sessions.
* **More workers than cores is not more speed.**
  It works, the scheduler shares the cores out, and it costs memory and context switches for nothing.

## References

* `man 2 fork`, `man 3 exec`, `man 2 waitpid`
* `man 1 md5sum`, `man 1 ps`
