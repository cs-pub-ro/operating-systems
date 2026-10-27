# Going Further: The Last Batch Is Smaller

With answers.

## Things to try

1. **Spread the remainder.**

   With *n* files and *t* threads, `base = n / t` and `extra = n % t`; the first `extra` threads get `base + 1` files and the rest `base`.
   Batch *i* starts at `i * base + min(i, extra)`.
   For 57 and 6: 10, 10, 10, 9, 9, 9, starting at 0, 10, 20, 30, 39, 48.
   This is the usual way to partition when the parts should be as equal as possible; the batch-size interface of the exercise cannot express it, which is the point of the next item.
1. **Thread count instead of batch size.**

   `batch_size = (nfiles + nthreads - 1) / nthreads`, the same ceiling the other way round, and then the last batch is again the smaller one.
   A user thinks in threads ("use all my cores"); the program thinks in work per thread.
   Both interfaces end in the same partition code.
1. **Zero files.**

   The usage check (`argc < 4`) catches it first.
   Without that check: `nthreads` is `(0 + 9) / 10 = 0`, no thread is created, and the program reports zero files encrypted by zero threads, which is right.
   The ceiling formula is well-behaved at zero, which is one more reason to prefer it over `nfiles / batch_size + 1`.

## Questions to answer

* **Why does `(n + k - 1) / k` round up, and what is it for `n == 0`?**
  Any `n` that is not a multiple of `k` has a remainder between 1 and `k - 1`; adding `k - 1` pushes it past the next multiple, and division truncates back down to that multiple's quotient.
  A multiple of `k` gains less than `k` and is not pushed over.
  For `n == 0` the sum is `k - 1`, below `k`, and the result is 0.
* **What goes wrong without the `min`?**
  The last batch is told it has `nfiles - first` files, which is right, but every other batch is also told that, which is wrong: batch 0 would hold all 57.
  Or, with the formula written the other way, the last batch claims `batch_size` files and reads 3 names past the end of `argv`, which is a `NULL` and then whatever follows it in memory.
* **Does it matter that one thread has less work?**
  Not here: 7 files versus 10 ends 30% sooner and the join waits for the slowest anyway.
  It matters when the parts are big and few: 2 threads with 10 and 1 units of work finish when the first one does, and the second core idled for 90% of the time.
  Equal-as-possible partitioning (the first item) exists for that case.

## Discussion points

* **The remainder is where off-by-one bugs live**, and the code for the last part is the code tested least.
  Writing the general formula, rather than a special case for the last index, is how the last part gets the same testing as the others.
* **Round up, then clamp.**
  The number of parts is a ceiling, the size of the last part is a minimum, and the two have to agree: the ceiling guarantees `nfiles - first` is positive for every batch the loop visits.

## References

* `man 3 pthread_create`, `man 3 pthread_join`
