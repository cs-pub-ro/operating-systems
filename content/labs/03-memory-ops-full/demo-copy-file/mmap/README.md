# Demo: Copy a File Using `mmap`

**Tools:** GCC, Make

## Goal

Copy a file by mapping both source and destination into the process address space, so that the copy becomes a single `memcpy()` between two pointers and the read/write loop disappears entirely.

## Background

```C
void *mmap(void *addr, size_t length, int prot, int flags, int fd, off_t offset);
```

| Parameter | Meaning |
| --- | --- |
| `addr` | Preferred start address; `NULL` lets the kernel choose. |
| `length` | Number of bytes to map. |
| `prot` | `PROT_READ`, `PROT_WRITE`, or both. |
| `flags` | `MAP_PRIVATE` — copy-on-write, changes never reach the file. `MAP_SHARED` — changes are written back. |
| `fd` | File descriptor of the file to map. |
| `offset` | Offset within the file; must be page-aligned. |

Returns the mapped address, or `MAP_FAILED` (**not** `NULL`) on error.

After a successful `mmap()` the file descriptor may be closed: the mapping holds its own reference to the file.

```C
int ftruncate(int fd, off_t length);
int munmap(void *addr, size_t length);
int msync(void *addr, size_t length, int flags);
```

A file must already be at least `length` bytes long before it can back a mapping of that size, which is what `ftruncate()` is for.
`munmap()` releases a mapping; `msync(..., MS_SYNC)` forces dirty pages of a `MAP_SHARED` mapping out to the file first.

## Build & Run

```console
make
dd if=/dev/urandom of=input.bin bs=1M count=4
./copy_file input.bin output.bin
diff input.bin output.bin && echo "Files are identical"
make clean
```

## Results and Explanations

### Step 1 — map the source, read-only

```C
void *src_map = mmap(NULL, file_size, PROT_READ, MAP_PRIVATE, src_fd, 0);
if (src_map == MAP_FAILED) {
	perror("mmap source");
	close(src_fd);
	return EXIT_FAILURE;
}
close(src_fd);
```

`MAP_PRIVATE` because the source is only read; nothing should ever propagate back to it.
The check is against `MAP_FAILED`, not `NULL` — a common mistake, and `MAP_FAILED` is `(void *) -1`.

### Step 2 — unmap on the error paths

Every error path created after this point must `munmap(src_map, file_size)`.
The same bookkeeping burden as the `malloc` variant, with a different function name.

### Step 3 — size the destination

```C
if (ftruncate(dst_fd, (off_t)file_size) < 0) { ... }
```

Without this the destination is an empty file, and mapping `file_size` bytes of it would succeed but touching those pages would raise `SIGBUS`.
This is the detail that catches people: `mmap` does not extend a file, and the failure arrives later, as a signal, rather than as an error return.

### Step 4 — map the destination, read-write, shared

```C
void *dst_map = mmap(NULL, file_size, PROT_READ | PROT_WRITE,
		     MAP_SHARED, dst_fd, 0);
```

`MAP_SHARED` is what makes the writes reach the file.
With `MAP_PRIVATE` the program would run, the `memcpy` would succeed, and the destination file would remain empty — a silent, complete failure.

### Step 5 — the copy

```C
memcpy(dst_map, src_map, file_size);
```

**This one line is the entire copy.**
Both mappings are ordinary pointers into the address space; no `read()`, no `write()`, no loop.

The I/O still happens, of course — it happens as **page faults**.
Touching an unmapped page of the source traps into the kernel, which reads that page from disk and resumes the instruction; touching a destination page allocates it in the page cache and marks it dirty.
The interesting part is that this is invisible in the source code: the transfer is driven by the memory accesses themselves.

### Step 6 — flush and release

```C
msync(dst_map, file_size, MS_SYNC);
munmap(src_map, file_size);
munmap(dst_map, file_size);
```

`munmap` alone does not guarantee the data has reached the disk; it only removes the mapping.
The kernel would write the dirty pages back eventually, but `msync` with `MS_SYNC` is what makes the moment defined.

### Comparing the three variants

| | Where the buffer lives | Sized at | Cleanup | Copy loop |
| --- | --- | --- | --- | --- |
| global | BSS | compile time | none | yes |
| `malloc` | heap | run time | `free()` on every path | yes |
| `mmap` | the file itself, via the page cache | run time | `munmap()` on every path | **no** |

The `mmap` version has one further property worth naming: the data is never copied into a buffer of the program's own at all.
The source pages are the page cache; the destination pages are the page cache.
The `memcpy` moves bytes from one part of the kernel's cache to another, with no user-space staging buffer in between.

It also has a hard limitation the others do not: the whole file must fit in the address space at once.
On 64-bit that is rarely a problem; on 32-bit, a 3 GB file cannot be copied this way.

## References

* `man 2 mmap`, `man 2 munmap`, `man 2 msync`, `man 2 ftruncate`
* `man 7 signal` — on `SIGBUS` from touching pages past the end of a file
* `man 5 proc` — `/proc/self/maps` shows the mappings of a running process
