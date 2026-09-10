# Demo: Copy a File Using a Heap Buffer

**Tools:** GCC, Make, Valgrind

## Goal

Copy a file through a **heap buffer** obtained with `malloc()`, and see what it costs to have to release memory on every path out of a function.

## Background

```C
void *malloc(size_t size);
void  free(void *ptr);
```

`malloc(size)` asks the C runtime — and ultimately the kernel — for `size` bytes, returning a pointer to the first one or `NULL` on failure.
The memory persists until `free(ptr)` is called; it is **not** released when a variable goes out of scope.

Unlike the global buffer, the size need not be known at compile time, and the memory is only occupied while it is needed.
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

### Step 1 — allocate the read buffer

```C
char *buffer = malloc(BUFFER_SIZE);
if (!buffer) {
	perror("malloc");
	return EXIT_FAILURE;
}
```

The `NULL` check is not optional.
On Linux with default overcommit settings `malloc` rarely fails for a 1 MB request, which is exactly why untested error paths rot.

### Steps 2, 3 and 6 — free on the early exits

Every early return after the allocation must release it:

```C
free(buffer);
return EXIT_FAILURE;
```

**Count the TODOs in this file.** Most of them are `free()` calls on error paths, not the interesting part of the program.
That imbalance is the lesson of the variant: the allocation is one line, and the bookkeeping it creates is spread across every exit from the function.

This is what `goto cleanup:` exists for in C, and why RAII exists in C++ and `defer` in Go.

### Steps 4 and 5 — the per-chunk buffer

```C
char *write_buf = malloc(bytes_read);
if (!write_buf) {
	perror("malloc write_buf");
	fclose(src);
	fclose(dst);
	free(buffer);
	return EXIT_FAILURE;
}
memcpy(write_buf, buffer, bytes_read);

size_t bytes_written = fwrite(write_buf, 1, bytes_read, dst);
free(write_buf);
if (bytes_written != bytes_read) {
	...
}
```

Note the ordering: `write_buf` is freed **before** the short-write check, so that the error path does not have to free it too.
Freeing as early as correctness allows is what keeps the number of cleanup paths down.

Note also that this allocates and frees once **per chunk**, inside the loop.
That is wasteful — the buffer could be allocated once outside — and it is done here so that the leak has somewhere to hide.

### Step 7 — free on success

```C
free(buffer);
```

The path everyone remembers, and the only one that a quick manual test exercises.

### What Valgrind reports

A correct implementation ends with all blocks freed and no errors.
If a `free()` is missing from an error path, the ordinary run still looks perfect — the error path never executed.
This is why leaks survive testing, and why the tool matters more than the inspection.

## References

* `man 3 malloc`, `man 3 free`
* `man 1 valgrind`, [Valgrind quick start](https://valgrind.org/docs/manual/quick-start.html)
* `man 3 memcpy`
