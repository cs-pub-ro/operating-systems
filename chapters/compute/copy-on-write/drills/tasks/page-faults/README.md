# Minor and Major Page Faults

The code in `chapters/compute/copy-on-write/drills/tasks/page-faults/support/page_faults.c` generates some minor and major page faults.
Open 2 terminals: one in which you will run the program, and one which will monitor the page faults of the program.
In the monitoring terminal, run the following command:

```console
watch -n 1 'ps -eo min_flt,maj_flt,cmd | grep ./page_faults | head -n 1'
```

Compile the program and run it in the other terminal.
You must press `enter` one time, before the program will prompt you to press `enter` more times.
Watch the first number on the monitoring terminal;
it increases.
Those are the minor page faults.

## Minor Page Faults

A minor page fault is generated whenever a requested page is present in the physical memory, as a frame, but that frame isn't allocated to the process generating the request.
These types of page faults are the most common, and they happen when calling functions from dynamic libraries, allocating heap memory, loading programs, reading files that have been cached, and many more situations.
Now back to the program.

The monitoring command already starts with some minor page faults, generated when loading the program.

After pressing `enter`, the number increases, because a function from a dynamic library (libc) is fetched when the first `printf()` is executed.
Subsequent calls to functions that are in the same memory page as `printf()` won't generate other page faults.

After allocating the 100 Bytes, you might not see the number of page faults increase.
This is because the "bookkeeping" data allocated by `malloc()` was able to fit in an already mapped page.
The second allocation, the 1GB one, will always generate one minor page fault - for the bookkeeping data about the allocated memory zone.
Notice that not all the pages for the 1GB are allocated.
They are allocated - and generate page faults - when modified.
By now you should know that this mechanism is called [copy-on-write](../../copy-on-write/reading/copy-on-write.md).

Continue with pressing `enter` and observing the effects util you reach opening `file.txt`.

Note that neither opening a file, getting information about it, nor mapping it in memory using `mmap()`, generate page faults.
Also note the `posix_fadvise()` call after the one to `fstat()`.
With this call we force the OS to not cache the file, so we can generate a **major page fault**.

## Major Page Faults

Major page faults happen when a page is requested, but it isn't present in the physical memory.
These types of page faults happen in 2 situations:

- a page that was swapped out (to the disk), due to lack of memory, is now accessed - this case is harder to show
- the OS needs to read a file from the disk, because the file contents aren't present in the cache - the case we are showing now

Press `enter` to print the file contents.
Note the second number go up in the monitoring terminal.

Comment the `posix_fadvise()` call, recompile the program, and run it again.
You won't get any major page fault, because the file contents are cached by the OS, to avoid those page faults.
As a rule, the OS will avoid major page faults whenever possible, because they are very costly in terms of running time.

If you're having difficulties solving this exercise, go through [this](../../../guides/fork-faults.md) reading material.
