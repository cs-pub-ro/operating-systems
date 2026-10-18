# Exercise: Reverse the Lines of a File

**Tools:** GCC, Make, strace

## Goal

Print the lines of a file last to first, like `tac`, by reading the whole file into one buffer obtained with `mmap()`.
Afterwards you will be able to say when a buffer should come from the kernel directly rather than from `malloc()`, the stack or a global array -- and what you owe for it.

## Background

The program needs the whole file in memory at once: a line cannot be printed until everything after it has been.
So it needs a buffer as large as the file.
Which of the four kinds of buffer from the demo fits?

* A global or a local array has a size fixed at compile time, and the file's size is not known until the program runs.
  The stack could not hold hundreds of megabytes anyway.
* `malloc()` could do it.
  For a block this large it would call `mmap()` itself and hand the result on through the allocator.
* `mmap()` directly: an anonymous mapping of exactly the file's size, created once the size is known, zero-filled, and returned to the kernel the instant `munmap()` runs.
  Nothing is kept in a heap for later, because there is no later: the buffer is needed once.

That last property is the reason to pick it.
A large, one-shot buffer whose size comes from the input is the case `mmap()` fits best.

```c
void *mmap(void *addr, size_t length, int prot, int flags, int fd, off_t offset);
int munmap(void *addr, size_t length);
```

Open `reverse_lines.c`.
Reading the file into the buffer and walking it backwards are written; you provide the buffer, in two TODOs.

## Your Task

1. **TODO 1** -- obtain a buffer of that size from the kernel: an anonymous, private mapping that the program can read and write.
   Check the result the way `man 2 mmap` says to.
1. **TODO 2** -- release the buffer once the output has been written.
   A failing run reaches the buffer through a label at the end of `main()`; look at where it leaves from.

**Note:** the logic behind the reverse line printing is already implemented, you just need to add the buffer allocation.

## Build & Run

```console
make
./reverse_lines input.txt
```

## Check Your Work

* The lines come out last to first.
  `tac input.txt` is the reference; compare the two outputs, and think about how to compare them without reading both by eye.
* Try a file whose last line has no newline at the end, and an empty file (`: > empty.txt`).
  The skeleton already stops before asking for a mapping when the file is empty; work out what `mmap()` would have done with a length of zero.
* Run it under `strace -e trace=mmap,munmap,brk` on `input.txt`.
  Among the start-up calls, find the one mapping that is yours and the call that releases it; nothing else about the process's memory should have changed.
* Make a large file (`seq 1 10000000 > big.txt`, about 80 MB) and run under `strace` again.
  The mapping is as large as the file, and it is gone at the end.
  Compare `./reverse_lines big.txt | tail -3` with `tac`.
* Bring to the teaching assistant: what `malloc()` would have done with the same request, and what, if anything, would be different.
