# Instructor Notes: Copy a File, Four Ways

## Purpose

One program, four ways of obtaining the buffer it copies through: a global, a local, `malloc()`, `mmap()`.
The copy loop is identical in all four; only the line that creates the buffer changes, and with it what the rest of the program owes.
Work them in order -- the point is the comparison, not any single variant.

If time is short, do **global-buffer**, **malloc** and **mmap**, and describe the local one in a sentence while the global one is on the screen (same thing, in `main()`'s frame, and it is the one that can overflow).
The `malloc` lesson (cleanup on every path) is re-taught by `03-in-memory-db`; the `mmap` material is used by `04-reverse-lines` and `bonus-malloc-tuning` and is not introduced anywhere else.

## What each variant is for

| Variant | The point |
| --- | --- |
| `global-buffer` | Memory that needs no management at all: fixed at compile time, present before `main()`, in BSS. |
| `local-buffer` | Also unmanaged, but per call and on the stack, and the stack is small: the one variant that can be too big. |
| `malloc` | Sized at run time, and every allocation has an owner and a lifetime. Count the `free()` calls. |
| `mmap` | The same, from the kernel directly: what `malloc()` does for large blocks, done by hand. |

## Points to hammer

* **Only one line changes.**
  Put two variants side by side and `diff` them.
  Everything the demo is about is in that diff and in the extra label at the end of `main()`.
* **In the `malloc` and `mmap` variants, read the labels at the end of `main()` out loud.**
  Each resource has a label, the labels are in reverse order of acquisition, and every failure jumps to the one that matches what is open at that point.
  One line of allocation creates one more label and a `goto` on each path that can reach it; that is the bookkeeping, and it is the lesson.
  This is the `goto cleanup` idiom of C, and why RAII and `defer` exist elsewhere.
  Ask what happens to a new exit added later: with the labels it is one `goto`, without them it is a `free()` somebody forgets.
* **Run `malloc` and `mmap` under `strace -e trace=brk,mmap,munmap`.**
  At 1 MiB the traces have the same shape: `malloc()` was a wrapper around `mmap()`, asking for 1,052,672 bytes (header and page rounding) where the direct call asks for 1,048,576.
  Then ask what calling `mmap()` directly still buys (the decision is yours; the memory is zero; the release reaches the kernel now) and costs (page granularity; a system call per block).
  `bonus-malloc-tuning` is this question with numbers.
* **`size` the four binaries.**
  The megabyte is in `bss` for the global variant and nowhere in the other three.

## The skeletons do not compile until TODO 1 is done

In all four variants the buffer declaration *is* the first TODO, so each skeleton fails with:

```text
copy_file.c:44:36: error: 'buffer' undeclared (first use in this function); did you mean 'setbuffer'?
```

That is intended -- the error points straight at the missing declaration -- but say so, or someone will report the skeleton as broken.
The line number differs per variant.
The `fail_dst`, `fail_src` and, in two variants, `fail_buffer` labels are already written: the students supply the `goto`s that reach them.

The TODOs say what is needed and why, not what to type.
The reference sources in this directory are the answer key; the room should arrive at them, not be read them.

## Traps worth demonstrating

* **The local buffer at 16 MiB.**
  Change `BUFFER_SIZE`, rebuild, run: `Segmentation fault`, before a byte is copied, with no call to blame.
  `ulimit -s` (8192 KB) explains it; `ulimit -s unlimited` confirms it and is not a fix.
  The other three variants take the change without noticing.
* **`mmap()` failure is `MAP_FAILED`, not `NULL`.**
  `MAP_FAILED` is `(void *) -1`; a `NULL` check silently accepts a failed mapping.
* **`munmap()` needs the length.**
  Students used to `free()` leave it out or pass the wrong one.
  The kernel does not keep a size per allocation the way the allocator does.
* **A `malloc` variant with one `free()` missing passes Valgrind** on a normal run, because the error path never ran.
  Remove the `free(buffer)` under the `fail_buffer` label, run normally, then run with a missing source file under Valgrind.

## Verification

```console
dd if=/dev/urandom of=input.bin bs=1M count=4
./copy_file input.bin output.bin
diff input.bin output.bin && echo "Files are identical"
```

Random data matters: a file of zeros would hide many length bugs.

For the `malloc` variant, `valgrind --leak-check=full`: 6 allocs, 6 frees (one is the buffer, the rest stdio), 0 errors.
Worth pointing out that a run with no errors proves very little, because the error paths were never taken.

## Verified reference values

Measured on Ubuntu 25.04 / glibc 2.41 / x86-64.

| Fact | Value |
| --- | --- |
| `ulimit -s` | 8192 KB; the local variant at 16 MiB segfaults, at 1 MiB works |
| `strace`, `malloc` and `mmap` variants | one `mmap()` and one `munmap()` more than the global and local ones: 1052672 bytes for `malloc`, 1048576 for `mmap` |
| `size` (built with `-g`) | global: bss 1048608; local, `malloc`, `mmap`: bss 16 |
| `malloc` variant under Valgrind | 6 allocs, 6 frees, 0 errors |

## Practical notes

* The demo writes `input.bin` / `output.bin` into the working directory and these are not in `.gitignore`.
  Remind students to clean up.
* The `mmap` variant maps nothing but the buffer.
  Mapping the files themselves is in `FURTHER.md`, on purpose: it is a different topic (page cache, `MAP_SHARED`, `ftruncate()`, `SIGBUS`) and this session has enough.
* Nothing here is timing-sensitive.
