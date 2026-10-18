# Instructor Notes: Reverse the Lines of a File

## Purpose

The fourth core exercise, and the one that uses the demo's last variant.
`01-xor-encrypt` had fixed sizes, `02-products` a fixed count with unknown lengths, `03-in-memory-db` an unknown count that grows; this one has a single block whose size is the input's and which is needed once, which is the case for `mmap()` rather than `malloc()`.
Say that it is a case, not a rule: the question to leave with is *when* the kernel is the right place to ask, and the answer is "big, one-shot, run-time sized".

It is short on purpose -- two calls, `mmap()` and `munmap()` -- so that the thinking is about the choice and the edge cases, not about the code.

## Expected solution

* **TODO 1** -- `mmap(NULL, size, PROT_READ | PROT_WRITE, MAP_PRIVATE | MAP_ANONYMOUS, -1, 0)`, compared against `MAP_FAILED`, with `goto fail_fd` on failure.
* **TODO 2** -- `munmap(buf, size)`, at the end and under the `fail_buf` label, which is where a failing `read_all()` jumps to.

The `fstat()` call, the `size == 0` guard, the read loop and the reversal are given, and so are the labels.
The live skeleton warns about nothing, because `fail_buf` is already used by the `read_all()` failure.

## The things worth drawing out

* **The empty file.** `mmap()` of length 0 is `EINVAL`, so a version without the guard prints `mmap: Invalid argument` for an empty file.
  The skeleton has the guard, so nobody hits this by accident; ask what it is for, then delete it and run `: > empty.txt` and let them see it.
  The right behaviour is to print nothing and exit 0, which is also what `tac` does.
* **`MAP_FAILED` is not `NULL`.** A `NULL` check compiles and never fires.
* **`munmap()` wants the length.** Ask who remembers the size of a `malloc()`'d block, and who remembers the size of a mapping.
* **`strace` on `big.txt`.** One `mmap()` of 78,888,897 bytes, one `munmap()`, no `brk()` growth; then swap in `malloc()`/`free()` and show the same two calls.
  That `malloc()` *is* `mmap()` at this size is the connection to lecture 03 and to the bonus.

## Common mistakes

* **`PROT_READ` only**, because "the program only reads the file": `read()` into the buffer then fails with `EFAULT`.
  Worth a minute: the buffer is written by the kernel on the program's behalf, and the mapping's permissions apply to that too.
* **Forgetting `MAP_ANONYMOUS`** and passing `fd`: that maps the file itself, and the program works, with no `read_all()` needed -- except that the read now overwrites the mapped file's private pages with the same bytes.
  It is the `FURTHER.md` item arriving early; say it is a valid other program, not this one.
* **`close(fd)` before `read_all()`**, by analogy with the "close after mmap" habit from file mappings.
  Here there is no mapping of the file; the descriptor is needed until the read is done.
* **Not unmapping under `fail_buf`.** Harmless at exit, but the habit is the point of the session.

## Verified reference values

Measured on Ubuntu 25.04 / glibc 2.41 / x86-64.

| Fact | Value |
| --- | --- |
| `input.txt` against `tac` | identical output |
| `input.txt` | 282 bytes; `strace` shows `mmap(NULL, 282, ...)` and `munmap(..., 282)` |
| `seq 1 10000000 > big.txt` | 78,888,897 bytes; one mapping of that size; 0.11 s warm |
| File without a final newline | last line printed first, without a newline, like `tac` |
| Empty file | prints nothing, exit status 0 |
| `mmap()` with length 0 | `EINVAL` |

## Practical notes

* There is no `make test`, on purpose: students compare with `tac` themselves.
  Ask how they compared (`diff`, `cmp`, `md5sum`), not only whether.
* `big.txt` is 79 MB; remind students to delete it, it is not in `.gitignore`.
* `valgrind` has nothing to say about an `mmap()`'d buffer -- it tracks the heap -- so this is the one core exercise where a clean Valgrind run is not the check.
  `strace` is.
* Nothing here is timing-sensitive.
