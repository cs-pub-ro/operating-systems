# Instructor Notes: Copy a File, Three Ways

## Purpose

One program, three ways of obtaining the memory it copies through.
Work them in order — the point is the comparison, not any single variant.

If time is short, do **global-buffer** and **mmap** and describe `malloc` verbally.
The malloc variant's lesson (cleanup on every path) is re-taught by `03-in-memory-db` anyway; the mmap variant's is not taught anywhere else in the course.

## What each variant is for

| Variant | The point |
| --- | --- |
| `global-buffer` | Memory that needs no management at all — fixed at compile time, always present. |
| `malloc` | The same program, once every allocation has an owner and a lifetime. Count the `free()` calls. |
| `mmap` | The read/write loop disappears; I/O happens through page faults. |

## Points to hammer

* **In the malloc variant, count the TODOs out loud.**
  Most of them are `free()` on error paths, not the interesting part of the program.
  That imbalance *is* the lesson: one line of allocation creates bookkeeping at every exit.
  This is what `goto cleanup:` is for in C, and why RAII and `defer` exist elsewhere.
* **In the mmap variant, stop at the single `memcpy`.**
  That one line is the whole copy.
  The I/O still happens — as page faults — but nothing in the source says so.
* **The staging copies are deliberately redundant.**
  Both the global and malloc variants copy through a second buffer that a real program would not need.
  Say this explicitly, or a sharp student will (correctly) call it pointless.

## The skeletons do not compile until TODO 1 is done

In the **global-buffer** and **malloc** variants the buffer declaration *is* the first TODO, so the skeleton fails with:

```text
copy_file.c:43:36: error: 'buffer' undeclared (first use in this function)
```

That is intended — the error points straight at the missing declaration — but say so, or someone will report the skeleton as broken.
The **mmap** skeleton compiles as shipped and simply does nothing useful.

## Traps worth demonstrating

* **`mmap` failure is `MAP_FAILED`, not `NULL`.**
  `MAP_FAILED` is `(void *) -1`; checking for `NULL` silently accepts a failed mapping.
* **Forgetting `ftruncate`** does not produce an error from `mmap`.
  It produces `SIGBUS` when the pages are touched — a failure that arrives as a signal, later, from a different line.
* **`MAP_PRIVATE` on the destination** runs perfectly and produces an empty output file.
  A silent, total failure, and a good thirty seconds to spend.
* **`char local[BUFFER_SIZE]` in the global variant is on the stack**, not in BSS.
  At 1 MB that is already a large frame against an 8 MB default; raising `BUFFER_SIZE` is how someone later discovers stack overflow.

## Verification

```console
dd if=/dev/urandom of=input.bin bs=1M count=4
./copy_file input.bin output.bin
diff input.bin output.bin && echo "Files are identical"
```

Random data matters: a file of zeros would hide many byte-order and length bugs.

For the malloc variant, run `valgrind --leak-check=full`.
Worth pointing out that a run with no errors proves very little, because the error paths were never taken.

## Practical notes

* `make clean` in each directory; the `input.bin` / `output.bin` files are not in `.gitignore`, so remind students to remove them.
* `mmap` on an empty source file fails with `EINVAL` (length 0). Not handled in the demo; mention it if someone tries.
* Nothing here is timing-sensitive.
