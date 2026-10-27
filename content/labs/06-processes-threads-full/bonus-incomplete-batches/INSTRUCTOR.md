# Instructor Notes: The Last Batch Is Smaller

## Purpose

Two lines of arithmetic, and the most common off-by-one in parallel code.
A take-home for most groups, and a ten-minute item for a group that finished the core exercises.

## Expected answers

* **TODO 5**: `nthreads = (nfiles + batch_size - 1) / batch_size;`
* **TODO 6**: `nfiles = min(batch_size, nfiles - first)`, written as a conditional expression.

## Things students get wrong

* **`nfiles / batch_size + 1`**, which gives one extra, empty thread when the division is exact; with 60 files and batches of 10 there are 7 threads and the last has 0 files, and `b->files[b->nfiles - 1]` in the message reads before the array.
  The README's prediction list includes an exact multiple for this reason.
* **`if (i == nthreads - 1) nfiles = nfiles % batch_size`**, which is 0 for an exact multiple.
  Same symptom.
* **Forgetting to delete the "not a multiple" check**, and reporting the exercise as impossible.
* **The last batch being correct and the one-pass check being skipped**, so that a bug in TODO 5 goes unnoticed; see the core exercise's notes.

## Verified reference values

| Input | Threads | Last batch |
| --- | --- | --- |
| 57 files, batch 10 | 6 | 7: `file-51.bin .. file-57.bin` |
| 57 files, batch 57 | 1 | 57 |
| 57 files, batch 100 | 1 | 57 |
| 57 files, batch 1 | 57 | 1 |
| 64 files, batch 8 | 8 | 8, same as the core exercise |

After one pass all 57 files differ from `data.orig/`; after two, `diff -r` is silent.

## Practical notes

* The shipped skeleton is the core exercise's skeleton plus the two TODOs; students are expected to bring their own solution of the first four.
  A student who did not finish the core exercise should do that first.
* `gen_files.sh` defaults to 57 here; both scripts take the count as an argument.
