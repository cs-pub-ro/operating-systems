# Reading Linux Directories

**Everything in Linux is a file.**
This statement says that the Linux OS treats every entry in a file system (regular file, directory, block device, char device, link, UNIX socket) as a file.
This unified approach simplifies file handling, allowing a single interface to interact with various types of entries.
Let's see how this works in practice:

1. Navigate to `guides/reading-linux-dirs/support/` and checkout `dir_ops.c`.
   This code creates a directory `dir`, if it does not exists, and attempts to open it the same way we would open a regular file.
   Compile and run the code.

   ```console
   student@os:~/.../reading-linux-dirs/support$ ./dir_ops
   12:45:34 FATAL dir_ops.c:17: fopen: Is a directory
   ```

   The error message is crystal clear: we cannot use `fopen()` on directories.
   So the `FILE` structure is unsuited for directories.
   Therefore, this handler is not generic enough for a regular Linux filesystem, and we have to use a lower-level function.

   [Quiz - What syscall does fopen() use?](../../drills/questions/fopen-syscall.md)

1. Now that we know that `fopen()` relies `openat()`, let's try using [`open()`](https://man7.org/linux/man-pages/man2/open.2.html), which wraps `openat()` but offers a simpler interface.

   Inspect, compile and run the code `dir_ops_syscalls.c`.

   ```console
   student@os:~/...reading-linux-dirs/support$ ./dir_ops_syscalls
   Directory file descriptor is: 3
   ```

   This output proves that the `open()` syscall is capable of also handling directories, so it's closer to what we want.

   **Note:** that it is rather uncommon to use `open()` for directories.
   Most of the time, [`opendir()`](https://man7.org/linux/man-pages/man3/opendir.3.html) is used instead.

In conclusion, the key difference between `fopen()` and `open()` is in the type of handler they return.
The `FILE` structure from `fopen()` is suited only for regular files, while the **file descriptor** returned by `open()` is more flexible.
The differences between the two handlers are explored in the [file descriptors section](../../../file-descriptors/reading/file-descriptors.md).
