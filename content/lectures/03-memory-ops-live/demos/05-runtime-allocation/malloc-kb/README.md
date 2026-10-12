# Demo: What `malloc()` Asks the Kernel For

Ten `malloc()` calls of a given size, under `strace`.

## Run

```console
make
strace -e trace=brk,mmap,munmap ./malloc_kb 100
strace -e trace=brk,mmap,munmap ./malloc_kb 1000
```

## Ask

* Ten `malloc()`s, six `brk()`s. What is the allocator doing with the extra?
* The last `brk()` goes down. What did the program do to cause that?
* At 1000 KB every `malloc()` is an `mmap()`. Why is a big block not worth keeping in the heap?
* Where have you seen "libc decides when to cross" before?
