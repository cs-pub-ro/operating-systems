# Instructor Notes: Adding Up What the Threads Found

## Purpose

The demo plus the thing a demo cannot do: the program uses what the threads found.
The return value of a thread, the second argument of `pthread_join()`, the lifetime rule behind them, and the boundary problem of any partition, in one short exercise.

## Expected answers

* **TODO 1**: `r->count = count_matches(...)`; `return &r->count;`
* **TODO 2**: join in order, `*(size_t *) result`, add to a `total` only `main()` writes.
* **TODO 3**: every part but the last gets `chunk + strlen(needle) - 1` bytes.

A student who stores the count in the region and ignores the returned pointer, or who returns `(void *) count` and casts it back, has a working program; ask for the lifetime rule in either case, and for the field-based version from the second.

## Things students get wrong

* **Returning the address of a local**: `size_t count = ...; return &count;`.
  gcc warns, `function returns address of local variable`, and then returns a null pointer in its place, at `-O0` as well as `-O2`; the join reads through `NULL` and the program segfaults.
  Insist on the warning being read: the crash is the compiler being kind, and another compiler would hand back a pointer into a dead stack that reads the right value often enough to ship.
* **Adding to `total` inside the thread.**
  Works most of the time on this file, which is the worst possible outcome.
  Ask who else writes `total`; the answer is the point of the whole session's design.
* **Joining in a different order** than the threads were started, or joining each thread right after creating it.
  The second one serialises the program: one thread runs at a time.
  Nothing is wrong with the count, so catch it by asking when the threads overlap.
* **Overlap of `strlen(needle)`**, or extending the last part too.
  The first double-counts a boundary-start match; the second reads past the mapping.
  Whether that faults depends on what the kernel happened to map next: on this machine it read five bytes of a neighbouring mapping and the total was still right, which is the worst kind of bug to have.
* **Comparing with `grep -c`**, which counts lines, not occurrences.
  `grep -o ... | wc -l` is the reference.

## Verified reference values

| Fact | Value |
| --- | --- |
| `grep -o kernel big.txt \| wc -l` | 569,022 |
| 1, 2, 3, 4, 7, 8 threads, after TODO 3 | 569,022 |
| 2, 4, 8 threads, before TODO 3 | 569,021, 569,019, 569,015 |
| `kernel schedules`, 4 threads | 26,131, same as `grep -o` |
| `k`, 4 threads | 1,705,869, same as `grep -o` |
| 4 threads, in order | 142,196; 142,729; 142,233; 141,864 |

Parts 0 to 2 count one more than in the demo: the planted boundary word is now caught by the part it starts in, and the last part is unchanged.

## Practical notes

* `big.txt` is the same file as the demo's; a student who kept it can copy it instead of generating it again.
* The quoted two-word needle needs quotes on the command line; the shell exercise's tokenizer cannot do that, which is a good aside.
* Timing is not the point and the file is too small to show it; the 512 MiB run in `FURTHER.md` is for the curious.
