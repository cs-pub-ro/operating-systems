# Exercise: Reverse the Lines of a File

**Tools:** GCC, Make, strace

## Goal

Reference implementation of a `tac`: the lines of a file, last to first, through one buffer as large as the file, obtained from the kernel with `mmap()` and returned with `munmap()`.
The exercise is the session's case for calling `mmap()` directly: a large, one-shot buffer whose size is known only at run time.

## Background

A line cannot be printed until everything after it has been read, so the program holds the whole file in memory and walks it backwards.
That buffer is sized by the input, may be hundreds of megabytes, and is needed exactly once.

Of the four kinds of buffer in the demo, two are ruled out by the size being unknown at compile time (a global array, a local array), and the stack would be too small regardless.
`malloc()` would work, and for a request this large would itself call `mmap()` and return the area through the allocator.
Calling `mmap()` directly takes the allocator out of the picture: the memory is zero-filled, page-granular, and goes back to the kernel the instant `munmap()` runs, instead of sitting in a heap for a next request that will never come.

```c
void *mmap(void *addr, size_t length, int prot, int flags, int fd, off_t offset);
int munmap(void *addr, size_t length);
```

For an anonymous buffer: `NULL` address, the size wanted, `PROT_READ | PROT_WRITE`, `MAP_PRIVATE | MAP_ANONYMOUS`, descriptor `-1`, offset `0`.
Failure is `MAP_FAILED`, which is `(void *) -1`, not `NULL`.

Files:

* `reverse_lines.c` -- the completed implementation.
* `input.txt` -- seven lines to try it on.

## Build & Run

```console
make
./reverse_lines input.txt
make test
```

`make test` compares the output with `tac input.txt`.

## Results and Explanations

### Step 1 -- how large is the file

```c
if (fstat(fd, &st) < 0) { ... }
size = (size_t)st.st_size;
```

`fstat()` answers for an open descriptor what `stat()` answers for a path.
Asking the descriptor rather than the path means the size belongs to the file that was actually opened.

### The empty file

```c
if (size == 0) {
	close(fd);
	return EXIT_SUCCESS;
}
```

`mmap()` with a length of zero fails with `EINVAL`: an area is at least one page.
An empty file has no lines, so the program prints nothing and succeeds, without asking for a buffer.
This is the case the TODO asks you to think about, and the one a first version usually gets wrong by reporting an error for a perfectly good file.

### Step 2 -- the buffer

```c
buf = mmap(NULL, size, PROT_READ | PROT_WRITE,
	   MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
if (buf == MAP_FAILED) { ... }
```

The kernel creates a new area of `size` bytes rounded up to whole pages, zero-filled, and returns its start.
No page is allocated yet; each one is faulted in when `read_all()` first writes to it.

`read_all()` is given, and is the loop from session 02: `read()` may return fewer bytes than asked, so it is called until the buffer is full.
Reading into a `PROT_READ`-only mapping would fail with `EFAULT`, which is why the buffer has to be writable.

### The walk

```c
while (i-- > 0) {
	if (buf[i] == '\n' && i + 1 < size) {
		fwrite(buf + i + 1, 1, line_end - (i + 1), stdout);
		line_end = i + 1;
	}
}
fwrite(buf, 1, line_end, stdout);
```

A line is everything up to and including its newline.
Walking from the end, each newline found marks the start of the line after it, which is printed at once; the condition `i + 1 < size` skips the file's final newline, which ends the last line rather than starting a new one.
What is left at the front, up to the first newline, is the first line, printed last.
A last line without a newline is printed without one, which is what `tac` does too.

### Step 3 -- giving it back

```c
munmap(buf, size);
```

Unlike `free()`, `munmap()` needs the length: the kernel keeps areas, not allocations, and an area can be released in part.
The error path in `read_all()`'s caller unmaps too; the one for `fstat()` has nothing to unmap yet.

### What the kernel saw

```text
$ strace -e trace=mmap,munmap,brk ./reverse_lines input.txt > /dev/null
...
mmap(NULL, 282, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x737afe193000
munmap(0x737afe193000, 282)             = 0
+++ exited with 0 +++
```

The program's own mapping is the one of 282 bytes -- the size of `input.txt` -- and it is unmapped at the end.
No `brk()` beyond the start-up ones: the heap was never used for the file.

```text
$ seq 1 10000000 > big.txt
$ ls -l big.txt
-rw-rw-r-- 1 so so 78888897 ... big.txt
$ strace -e trace=mmap,munmap,brk ./reverse_lines big.txt > /dev/null
...
mmap(NULL, 78888897, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x79e9a8cc4000
munmap(0x79e9a8cc4000, 78888897)        = 0
$ time ./reverse_lines big.txt > /dev/null
real    0m0.109s
```

The same two calls, with the file's size as the length.
A tenth of a second for 79 MB, most of it the kernel copying the file into the buffer and faulting its 19,260 pages in.

### What `malloc()` would have done

Replace the mapping with `malloc(size)` and `free()`, and `strace` shows the same `mmap()` and `munmap()` for `big.txt`: above its threshold the allocator does exactly this.
For a tiny file it does not; the block comes from the heap, `brk()` grows it, and `free()` leaves the memory there for later.
The direct call makes the behaviour the same at every size, and makes it the program's decision rather than the allocator's.

## References

* `man 2 mmap`, `man 2 munmap`
* `man 2 fstat`, `man 2 read`
* `man 1 tac`
* `man 3 mallopt` -- `M_MMAP_THRESHOLD`
