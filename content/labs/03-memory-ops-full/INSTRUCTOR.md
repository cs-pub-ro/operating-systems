# Instructor Notes: Session 03 — Memory Operations

Notes for preparing and running the session.
Per-task notes are in `INSTRUCTOR.md` inside each task directory.

## Check this before the session: Valgrind

On machines with a very high open-file limit — common in containers and on some lab images — Valgrind refuses to start:

```text
Valgrind: FATAL: Private file creation failed.
The current file descriptor limit is 1073741804.
```

The fix is `ulimit -n 1024` in the shell first.
This affects every task in the session and has nothing to do with the student's code, so it is worth testing on the lab image and telling everyone up front.

## The through-line

The session is about **who owns a piece of memory and when it is released**.

1. **`demo-copy-file`** asks the same question three ways: global (compiler decides, nobody cleans up), heap (you decide, you clean up on every path), mapped (the kernel provides it, and the copy loop disappears).
1. **`01-xor-encrypt`** is the case where the question does not arise: fixed sizes, static buffers, nothing owned, nothing to leak — the baseline the dynamic exercises are measured against.
1. **`02-products`** brings in the first owner: a static array of structs, but each name `malloc`'d to a length known only at run time, and freed on every path.
1. **`03-in-memory-db`** makes ownership dynamic, and introduces the `realloc` idiom.
1. **`bonus-in-mem-database`** makes it symmetric, and introduces hysteresis.

The practical point running through all of it: **the happy path proves nothing**.
Every bug here lives on a path a casual test never takes.
That is the argument for Valgrind being a required tool, and it is worth making explicitly rather than assuming students infer it.

## The two bugs the session is built around

* **`db->records = realloc(db->records, ...)`** — the line most students write.
  On failure `realloc` returns `NULL` *and leaves the original block allocated*, so this leaks the block and loses all the data.
  `03-in-memory-db` is designed to provoke it.
* **`count <= capacity - CHUNK` on a `size_t`** — when `capacity` is 0 this wraps to a huge value and the code attempts an 18-exabyte `realloc`.
  `bonus-in-mem-database` is designed to provoke it.

Both read as obviously correct. Let students hit them.

## Timing and pacing

The demo has three variants and they take a while.
If time is short, do **global-buffer** and **mmap**, and describe the malloc variant verbally: its lesson (cleanup on every path) is re-taught by `03-in-memory-db`, whereas the mmap material appears nowhere else in the course.

`bonus-in-mem-database` requires the student's own finished `03-in-memory-db`, so it is genuinely a take-home task for most of the room.

## Demonstrations worth the time

* In the malloc variant, **count the TODOs out loud** — most are `free()` calls on error paths.
  One line of allocation, bookkeeping at every exit. This is why `goto cleanup:`, RAII and `defer` exist.
* In the mmap variant, **stop at the single `memcpy`**.
  That line is the whole file copy; the I/O is page faults, and nothing in the source says so.
* **Forgetting `ftruncate`** produces `SIGBUS` when the pages are touched, not an error from `mmap`.
  A failure that arrives as a signal from a different line is a good thing to show once.
* **`MAP_PRIVATE` on the destination** runs perfectly and writes nothing to the file.

## Verified reference values

| Fact | Value |
| --- | --- |
| `03-in-memory-db` with the shipped `input.txt` (10 records) | count 10, capacity 12 (`0 -> 4 -> 8 -> 12`) |
| `bonus-in-mem-database` with the shipped `input.txt` | count 3, capacity 4; records `alice`, `carol`, `grace` |
| Both under Valgrind | 0 errors, all heap blocks freed |
| `mmap` failure value | `MAP_FAILED`, i.e. `(void *) -1` — **not** `NULL` |

The bonus reference solution uses **shift down**, so insertion order is preserved.
A student using **swap with last** gets the same records in a different order; that is correct and should not be marked down.

## Practical notes

* The demo writes `input.bin` / `output.bin` into the working directory and these are not in `.gitignore`.
  Remind students to clean up.
* Use `/dev/urandom` for the test file: a file of zeros hides length and byte-order bugs.
* Insist on the empty-input case for the database (`./db < /dev/null`).
  It is the case nobody tests, and where a missing `NULL` guard surfaces.
* Nothing in this session is timing-sensitive.
