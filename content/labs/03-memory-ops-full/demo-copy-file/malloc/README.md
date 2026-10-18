# Demo: Copy a File Using a Heap Buffer

**Tools:** GCC, Make, Valgrind

## Goal

Copy a file through a **heap buffer** obtained with `malloc()`, and see what it costs to have to release memory on every path out of a function.

## Background

```C
void *malloc(size_t size);
void  free(void *ptr);
```

`malloc(size)` asks the allocator in the C library for `size` bytes, returning a pointer to the first one or `NULL` on failure.
The memory persists until `free(ptr)` is called; it is **not** released when a variable goes out of scope.

Unlike the global and local buffers, the size need not be known at compile time, the block can be as large as the heap allows, and the memory is only occupied while it is needed.
The price is that every allocation now has an owner and a lifetime, and the compiler will not remind you about either.

Forgetting `free()` is a **memory leak**.
`valgrind` and AddressSanitizer (`-fsanitize=address`) find them.

## Build & Run

```console
make
dd if=/dev/urandom of=input.bin bs=1M count=4
./copy_file input.bin output.bin
diff input.bin output.bin && echo "Files are identical"
valgrind --leak-check=full ./copy_file input.bin output.bin
make clean
```

## Results and Explanations

### Step 1 -- allocate the buffer

```C
buffer = malloc(BUFFER_SIZE);
if (!buffer) {
	perror("malloc");
	goto fail;
}
```

`buffer` is declared as `unsigned char *` with the other variables at the top of `main()`; the assignment is the line this variant is about.

The `NULL` check is not optional.
On Linux with default overcommit settings `malloc` rarely fails for a 1 MiB request, which is exactly why untested error paths rot.

### Free on the early exits

Every way out of `main()` after the allocation must release it.
The error paths do it through one more label at the end of the function:

```C
fail_dst:
	fclose(dst);
fail_src:
	fclose(src);
fail_buffer:
	free(buffer);
fail:
	return -1;
```

The failure of `fopen()` for the source file jumps to `fail_buffer`: the buffer exists and nothing else does.
A failure of the write jumps to `fail_dst`, and falls through all three.
The allocation is one line; the bookkeeping it creates is one more label, and a `goto` on every path that can reach it.
Without the labels it would be a `free()` repeated before every `return`, which is exactly the code that rots when a new exit is added.

This is what `goto cleanup:` exists for in C, and why RAII exists in C++ and `defer` in Go.

### Step 2 -- the write

The short-write path now has three things to close or free before it returns, instead of two.
It jumps to `fail_dst`, and the labels do the rest.

### Step 3 -- free on success

```C
free(buffer);
```

The path everyone remembers, and the only one that a quick manual test exercises.

### What Valgrind reports

```text
  in use at exit: 0 bytes in 0 blocks
total heap usage: 6 allocs, 6 frees, 1,061,808 bytes allocated
ERROR SUMMARY: 0 errors from 0 contexts
```

One of those allocations is the buffer; the rest are stdio's.
If a `free()` is missing from an error path, this ordinary run still looks perfect -- the error path never executed.
This is why leaks survive testing, and why the tool matters more than the inspection.

### What the kernel saw

```console
strace -e trace=brk,mmap,munmap ./copy_file input.bin output.bin
```

Among the start-up mappings there is one extra `mmap()`, of 1,052,672 bytes, and one extra `munmap()` at the end.
That is the megabyte plus the allocator's header, rounded up to whole pages.
A request this large is above the allocator's threshold (128 KB by default), so `malloc()` did not carve it out of the heap: it asked the kernel for a fresh area, and `free()` gave the area back.
Keep that in mind for the last variant, which makes those two calls itself.

## References

* `man 3 malloc`, `man 3 free`
* `man 1 valgrind`, [Valgrind quick start](https://valgrind.org/docs/manual/quick-start.html)
* `man 3 mallopt` -- `M_MMAP_THRESHOLD`, the size above which `malloc()` uses `mmap()`
