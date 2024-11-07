# libc `FILE` struct

Now, we will take a short look at how the [file descriptors](../../reading/file-descriptors.md) are handled in libc.
The Software Stack chapter has taught us that applications generally interact with libraries which expose wrappers on top of syscalls.
The most important library in a POSIX system (such as Linux) is libc.
Among many others, it provides higher-level abstractions over I/O-related syscalls.

**Musl** (read just like "muscle") is a lightweight implementation of libc, which exposes the same API that you have used so far, while also being fit for embedded and OS development.
For example, [Unikraft](https://unikraft.org/) [unikernels](https://unikraft.org/docs/concepts/) may [use musl](https://github.com/unikraft/lib-musl).

First, it provides a `struct` that groups together multiple data that is necessary when handling files.
We know from the example in `support/simple-file-operations/file_operations.c` that the file handler employed by libc is `FILE *`.
`FILE` is just a `typedef` for [`struct _IO_FILE`](https://elixir.bootlin.com/musl/v1.2.3/source/src/internal/stdio_impl.h#L21).
Here are the most important fields in `struct _IO_FILE`:

```c
struct _IO_FILE {
    int fd;         /* File descriptor */

    unsigned flags; /* Flags with which `open()` was called */

    int mode;       /* File permissions; passed to `open()` */

    off_t off;      /* File offset from where to read / write */

    /**
     * Internal buffer used to make fewer costly `read()`/`write()`
     * syscalls.
     */
    unsigned char *buf;
    size_t buf_size;

    /* Pointers for reading and writing from/to the buffer defined above. */
    unsigned char *rpos, *rend;
    unsigned char *wend, *wpos;

    /* Function pointers to syscall wrappers. */
    size_t (*read)(FILE *, unsigned char *, size_t);
    size_t (*write)(FILE *, const unsigned char *, size_t);
    off_t (*seek)(FILE *, off_t, int);
    int (*close)(FILE *);

    /* Lock for concurrent file access. */
    volatile int lock;
};
```

As you might have imagined, this structure contains the underlying file descriptor, the `mode` (read, write, truncate etc.) with which the file was opened, as well as the offset within the file from which the next read / write will start.

Libc also defines its own wrappers over commonly-used syscalls, such as `read()`, `write()`, `close()` and `lseek()`.
These syscalls themselves need to be implemented by the driver for each file system.
This is done by writing the required functions for each syscall and then populating [this structure](https://elixir.bootlin.com/linux/v6.0.9/source/include/linux/fs.h#L2093) with pointers to them.
You will recognise quite a few syscalls: `open()`, `close()` `read()`, `write()`, `mmap()` etc.

## `printf()` Buffering

1. Navigate to `buffering/support/printf_buffering.c`.
   Those `printf()` calls obviously end up calling `write()` at some point.
   Run the code under `strace`.

   [Quiz: What syscall does `printf` use?](../../drills/questions/strace-printf.md)

   Since there is only one `write()` syscall despite multiple calls to `printf()`, it means that the strings given to `printf()` as arguments are kept _somewhere_ until the syscall is made.
   That _somewhere_ is precisely that buffer inside `struct _IO_FILE` that we highlighted above.
   Remember that syscalls cause the system to change from user mode to kernel mode, which is time-consuming.
   Instead of performing one `write()` syscall per call to `printf()`, it is more efficient to copy the string passed to `printf()` to an **internal buffer** inside libc (the `unsigned char *buf` from above) and then at a given time (like when the buffer is full for example) `write()` the whole buffer.
   This results in far fewer `write()` syscalls.

1. Now, it is interesting to see how we can force libc to dump that internal buffer.
   The most direct way is by using the `fflush()` library call, which is made for this exact purpose.
   But we can be more subtle.
   Add a `\n` in some of the strings printed in `buffering/support/printf_buffering.c`.
   Place them wherever you want (at the beginning, at the end, in the middle).
   Recompile the code and observe its change in behaviour under `strace`.

   [Quiz: How to get data out of `printf`'s buffer?](../../drills/questions/flush-libc-buffer.md)

   Now we know that I/O buffering **does happen** within libc.
   If you need further convincing, check out the Musl implementation of [`fread()`](https://elixir.bootlin.com/musl/v1.2.3/source/src/stdio/fread.c#L6), for example.
   It first copies the [data previously saved in the internal buffer](https://elixir.bootlin.com/musl/v1.2.3/source/src/stdio/fread.c#L16):

   ```c
   if (f->rpos != f->rend) {
       /* First exhaust the buffer. */
       k = MIN(f->rend - f->rpos, l);
       memcpy(dest, f->rpos, k);
       f->rpos += k;
       dest += k;
       l -= k;
   }
   ```

   Then, if more data is requested and the internal buffer isn't full, it refills it using [the internal `read()` wrapper](https://elixir.bootlin.com/musl/v1.2.3/source/src/stdio/fread.c#L27).
   This wrapper also places the data inside the destination buffer.
