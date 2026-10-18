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

The session is about **where a piece of memory comes from, who owns it, and when it is released**.

1. **`demo-copy-file`** asks the same question four ways, one line of difference each: global (compiler decides, loader provides, nobody cleans up), local (same, per call, on a small stack), heap (you decide, you clean up on every path), mapped (the kernel provides, you clean up on every path).
1. **`01-xor-encrypt`** is the case where the question does not arise: fixed sizes, static buffers, nothing owned, nothing to leak — the baseline the dynamic exercises are measured against.
1. **`02-products`** brings in the first owner: a static array of structs, but each name `malloc`'d or `strdup`'d to a length known only at run time, and freed on every path.
1. **`03-in-memory-db`** makes ownership dynamic, and introduces the `realloc` idiom.
1. **`04-reverse-lines`** goes past the allocator: one block as large as the input, once, from the kernel with `mmap`.
1. **`bonus-in-mem-database`** makes ownership symmetric, and introduces hysteresis.
1. **`bonus-malloc-tuning`** opens `malloc` up: a policy with settings, a five-fold speed-up, and a bug the defaults were hiding.

The practical point running through all of it: **the happy path proves nothing**.
Every bug here lives on a path a casual test never takes, or in a property of the memory the default configuration happens to provide.
That is the argument for Valgrind being a required tool, and it is worth making explicitly rather than assuming students infer it.

## The TODOs say what, not how

The skeletons' TODO comments describe what is needed and why, and deliberately not the lines to type; the READMEs likewise.
Students are meant to work out `realloc`'s failure contract, `mmap`'s failure value and the empty-file case themselves, and to find out from the tests whether they did.
When a student asks "but what do I write", answer with the question the TODO poses, not with the code; the reference sources in this directory are for after.

## The bugs the session is built around

* **`db->records = realloc(db->records, ...)`** — the line most students write.
  On failure `realloc` returns `NULL` *and leaves the original block allocated*, so this leaks the block and loses all the data.
  `03-in-memory-db` is designed to provoke it.
* **`count <= capacity - CHUNK` on a `size_t`** — when `capacity` is 0 this wraps to a huge value and the code attempts an 18-exabyte `realloc`.
  `bonus-in-mem-database` is designed to provoke it.
* **`mmap()` of length 0** — `EINVAL`, so a `tac` that does not think about the empty file reports an error for a perfectly good input.
  `04-reverse-lines` is designed to provoke it.
* **"Fresh memory is zero"** — true of pages from the kernel, false of a reused heap block.
  `bonus-malloc-tuning` is designed to provoke it, by making the allocator reuse memory.

All of them read as obviously correct. Let students hit them.

## Timing and pacing

The demo has four variants.
If time is short, do **global-buffer**, **malloc** and **mmap**, and describe the local one in a sentence while the global one is on screen (same thing, in `main()`'s frame; the one that can overflow).
The malloc lesson is re-taught by `03-in-memory-db`; the mmap variant is what `04-reverse-lines` builds on and is not introduced anywhere else.

The four core exercises fit a session for a group that has done sessions 01 and 02 properly; `04-reverse-lines` is short by design (three calls) and should not be dropped to save time, because it is the only place the `mmap` choice is practised.

`bonus-in-mem-database` requires the student's own finished `03-in-memory-db`, and `bonus-malloc-tuning` is mostly explaining measurements, so both are genuinely take-home tasks for most of the room.

## Demonstrations worth the time

* In the demo, **`diff` two variants**: everything the demo is about is in the one changed line and the extra lines on the error paths.
* In the `malloc` and `mmap` variants, **count the TODOs out loud** — four of six are a release on a path out of the function.
  One line of allocation, bookkeeping at every exit. This is why `goto cleanup:`, RAII and `defer` exist.
* **`strace -e trace=brk,mmap,munmap` on the `malloc` and `mmap` variants.**
  Same calls, at 1 MiB.
  That `malloc` is `mmap` for large blocks is the thread that runs through `04-reverse-lines` and the tuning bonus.
* **The local buffer at 16 MiB.**
  Segmentation fault before a byte is copied, no call to blame, `ulimit -s` as the explanation.
* **`./frames` and then the two-tunable run**, if a group reaches the bonus: five times faster, and a hundred million corrupt pixels, on the same binary.

## Verified reference values

| Fact | Value |
| --- | --- |
| `03-in-memory-db` with the shipped `input.txt` (10 records) | count 10, capacity 12 (`0 -> 4 -> 8 -> 12`) |
| `bonus-in-mem-database` with the shipped `input.txt` | count 3, capacity 4; records `alice`, `carol`, `grace` |
| Both under Valgrind | 0 errors, all heap blocks freed |
| `04-reverse-lines` | identical to `tac`; one `mmap()` of the file's size, one `munmap()` |
| `bonus-malloc-tuning`, 100 frames | 1.6 s / 3.2 M faults default; 0.33 s / 32 k faults tuned; 0.5 s fixed |
| `mmap` failure value | `MAP_FAILED`, i.e. `(void *) -1` — **not** `NULL` |

The bonus reference solution for the database uses **shift down**, so insertion order is preserved.
A student using **swap with last** gets the same records in a different order; that is correct and should not be marked down.

## Practical notes

* The demo writes `input.bin` / `output.bin` into the working directory and these are not in `.gitignore`.
  Remind students to clean up; the same for `big.txt` in `04-reverse-lines`.
* Use `/dev/urandom` for the demo's test file: a file of zeros hides length bugs.
* Insist on the empty-input case for the database (`./db < /dev/null`) and for the reversal (`: > empty.txt`).
  They are the cases nobody tests, and where a missing guard surfaces.
* `strace` is on the prerequisites list for this session now, for the demo's `mmap` variant, `04-reverse-lines` and the tuning bonus; `check-prerequisites.sh` checks for it.
* Nothing in the core of this session is timing-sensitive; the tuning bonus reports times, but its ratios are what count.
