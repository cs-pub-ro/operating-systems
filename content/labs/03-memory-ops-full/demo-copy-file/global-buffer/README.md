# Demo: Copy a File Using a Global Buffer

**Tools:** GCC, Make

## Goal

Copy a file through a **static global buffer**, and see that this kind of memory needs no allocation, no release, and exists before `main()` is entered.
The first of four variants of the same program; the other three obtain their buffer in other ways, and nothing else about them changes.

## Background

The program is a small `cp`: it reads the source file one block at a time into a buffer and writes each block to the destination.

```C
while ((bytes_read = fread(buffer, 1, BUFFER_SIZE, src)) > 0) {
	size_t bytes_written = fwrite(buffer, 1, bytes_read, dst);
	...
}
```

The loop is the same in all four variants.
What differs is the one line that brings `buffer` into existence, and what that line obliges the rest of the program to do.

### Static global memory

A buffer declared at file scope:

```C
static unsigned char buffer[BUFFER_SIZE];
```

is placed by the compiler in the **BSS segment** if it is zero-initialised, or the **data segment** if given an explicit initialiser.
BSS costs nothing on disk -- it is a note in the executable saying "reserve this much, zeroed" -- and the loader creates the area before `main()` runs.

There is no `malloc()` and no `free()`: the memory is simply always there, for the entire lifetime of the process.
That is its advantage and its limitation: the size is fixed when the program is compiled, and the memory is occupied whether the program uses it or not.

## Build & Run

```console
make
dd if=/dev/urandom of=input.bin bs=1M count=4
./copy_file input.bin output.bin
diff input.bin output.bin && echo "Files are identical"
make clean
```

## Results and Explanations

### Step 1 -- the global buffer

```C
static unsigned char buffer[BUFFER_SIZE];
```

`static` at file scope means "not visible outside this translation unit", not "allocated differently" -- a plain global would live in the same place.
Being zero-initialised, it lands in BSS, and `size` shows it:

```text
$ size copy_file
   text    data     bss     dec     hex filename
   2770     664 1048608 1052042  100d8a copy_file
```

A megabyte of BSS, and `ls -l copy_file` is still about 20 KB, most of it the debug information `-g` adds: the buffer takes space in the running process, not in the file.

### Step 2 -- writing, and the short-write check

```C
size_t bytes_written = fwrite(buffer, 1, bytes_read, dst);

if (bytes_written != bytes_read) {
	fprintf(stderr, "fwrite: short write\n");
	goto fail_dst;
}
```

`fwrite` returns the number of *items* written, which is why the item size is 1 and the count is `bytes_read`.
Checking the result matters: a full disk reports itself here and nowhere else.

The error path does not clean up by itself: it jumps to a label at the end of `main()`.

```C
fail_dst:
	fclose(dst);
fail_src:
	fclose(src);
fail:
	return -1;
```

The labels are in the reverse order of the acquisitions, so jumping to the one that matches what is open and falling through the rest undoes exactly that.
Each failure in `main()` goes to the label of the last resource it holds, and the cleanup is written once.
There is nothing but two files to release in this variant -- which is precisely the contrast the `malloc` and `mmap` variants are about to draw.

## References

* `man 3 fread`, `man 3 fwrite`
* `man 1 size` -- the text/data/bss breakdown of the built program
