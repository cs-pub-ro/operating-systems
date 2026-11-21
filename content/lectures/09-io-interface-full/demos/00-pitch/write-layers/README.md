# Buffered and Cached I/O Writes

When writing to a file, data may be buffered in user space (at libc level) or in kernel space (in the buffer cache).
The use of the buffers improves performance:
- Reduces the number of system calls by buffering data in user space, before sending it to the kernel.
- Reduced the number of disk writes by buffering in kernel space, before sending it to the disk.

We show 4 different builds / runs:

1. A run that employs the `fwrite()` call, making use of the user space libc buffering.
1. A run that exmploys the `write()` call that doesn't use the user space buffer, but uses the buffer cache in the kernel.
1. A run that opens the file with `O_DIRECT` bypassing the buffer cache in the kernel (and the user space buffer).
1. A run that opens the file with `O_DIRECT | O_SYNC` bypassing the buffer cache in the kernel (and the user space buffer) and ensuring data gets written to disk.

To test them, first build:

```console
make
```

Then run them all:

```console
$ ./fwrite
time passed 238059 microseconds

$ ./fwrite
time passed 237562 microseconds

$ ./write
time passed 624822 microseconds

$ ./write
time passed 584839 microseconds

$ ./write_o_direct
time passed 994531 microseconds

$ ./write_o_direct
time passed 874598 microseconds

$ ./write_o_direct_o_sync
time passed 991273 microseconds

$ ./write_o_direct_o_sync
time passed 893143 microseconds
```

Conclusions of the run:

1. Using buffered `fwrite()` calls provides the best times.

1. Using `write()` instead of `fwrite()` causes double duration.

1. Adding `O_DIRECT`, to bypass the buffer cache increases the duration.

1. Adding further `O_SYNC` to force the writing of data to disk doesn't increase duration, likely because data is written very quickly to disk when using `O_DIRECT` (though `O_DIRECT` doesn't guarantee this).
