# Demo: Copy a File Using a Global Buffer

**Tools:** GCC, Make

## Goal

Copy a file through a **static global buffer**, and see that this kind of memory needs no allocation, no release, and exists before `main()` is entered.
The first of three variants of the same program; the other two obtain their buffer in different ways.

## Background

### Static global memory

A buffer declared at file scope:

```C
static char buffer[BUFFER_SIZE];
```

is placed by the compiler in the **BSS segment** if it is zero-initialised, or the **data segment** if given an explicit initialiser.
Only BSS costs nothing on disk — it is a note in the executable saying "reserve this much, zeroed".
The kernel maps the region into the address space before `main()` runs.

There is no `malloc()` and no `free()`: the memory is simply always there, for the entire lifetime of the process.
That is its advantage and also its limitation — the size is fixed when the program is compiled, and the memory is occupied whether the program uses it or not.

### `memcpy`

```C
void *memcpy(void *dest, const void *src, size_t n);
```

Copies exactly `n` bytes.
The regions **must not overlap**; `memmove()` is the one that tolerates overlap.

## Build & Run

```console
make
dd if=/dev/urandom of=input.bin bs=1M count=4
./copy_file input.bin output.bin
diff input.bin output.bin && echo "Files are identical"
make clean
```

## Results and Explanations

### Step 1 — the global buffer

```C
static char buffer[BUFFER_SIZE];
```

`static` at file scope means "not visible outside this translation unit", not "allocated differently" — a plain global would live in the same place.
Being zero-initialised, it lands in BSS and costs nothing in the executable file.

### Step 2 — the copy through a staging array

```C
char local[BUFFER_SIZE];
memcpy(local, buffer, bytes_read);
```

This is deliberately redundant: a real program would call `fwrite()` straight from `buffer`.
The extra copy exists so that `memcpy()` appears explicitly and so that there is a second buffer to compare against the heap variant.

Note where `local` lives: it is an automatic array, so it is on the **stack**, not in BSS.
With `BUFFER_SIZE` at 1 MB this is already an uncomfortably large stack frame — the default thread stack is 8 MB — and it is worth pointing out that this is exactly the kind of declaration that causes a stack overflow when someone later raises `BUFFER_SIZE`.

### Step 3 — writing, and the short-write check

```C
size_t bytes_written = fwrite(local, 1, bytes_read, dst);
if (bytes_written != bytes_read) {
	fprintf(stderr, "fwrite: short write\n");
	fclose(src);
	fclose(dst);
	return EXIT_FAILURE;
}
```

`fwrite` returns the number of *items* written, which is why the item size is 1 and the count is `bytes_read`.
Checking the result matters: a full disk reports itself here and nowhere else.

Note that the two `fclose()` calls have to be repeated on this error path.
There is nothing to `free()` in this variant, so that is the whole cleanup — which is precisely the contrast the `malloc` variant is about to draw.

## References

* `man 3 memcpy`, `man 3 memmove`
* `man 3 fread`, `man 3 fwrite`
* `man 1 size` — shows the text/data/bss breakdown of the built program
