# Demo: `malloc()` Under `strace`

The same 4 MB as one `malloc()` and as 1024 small ones, with `strace` counting.

## Run

```console
make
strace -e trace=brk,mmap,munmap ./malloc_size_entire 1024
strace -c -e trace=brk,mmap,munmap ./malloc_size_pages 1024
```

## Ask

* One `malloc()`, one `mmap()` of 4,198,400 bytes. Where did the extra 4 KB come from?
* 1024 `malloc()`s, 35 `brk()`s. What is the allocator doing between system calls?
* Neither trace says how much of the 4 MB is in physical memory. What would?
