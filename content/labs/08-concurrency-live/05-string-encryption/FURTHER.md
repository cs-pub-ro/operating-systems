# Going Further: A Lock in the Wrong Place

Optional.

## Things to try

1. **No lock at all.**
   Remove the mutex, and take a block with an atomic operation instead: make `next` an `atomic_size_t` (`<stdatomic.h>`) and use `atomic_fetch_add()`.
   What does that one call do that the read and the write of the original did not?
1. **Change the size of a block.**
   Try `BLOCK` at 16, and at 1048576, with your corrected library, and compare the times.
   Where does the time go with very small blocks?
   What is lost with very large ones?
1. **Run the original under Helgrind**: `valgrind --tool=helgrind ./chall 0`.
   Which variable does the first report name, and which two lines of `encrypt_blocks()`?
1. **Count the blocks per thread.**
   Give each thread a counter of its own and print the eight counts at the end.
   Are they equal?
   Should they be?

## Questions to answer

* The broken version takes the lock once per block, and yours takes it once per block.
  Why is one more than fifty times slower than the other?
* The blocks never overlap.
  Why is that enough to make the encryption itself safe without a lock?
* In session 07 the same program needed no lock at all.
  What was given up there that this version has?

## Discussion points

* **A lock is around data, not around code.**
  "This is where the work happens, so this is where the lock goes" is how the mutex got where it was.
* **The shortest critical section is the one that holds only what is shared.**
  Here that is a read, a comparison and a write.
* **Partition first, synchronize what is left.**
  The blocks are a partition; the cursor is what is left.

## References

* `man 3 pthread_mutex_lock`
* `man 3 atomic_fetch_add` or <https://en.cppreference.com/w/c/atomic/atomic_fetch_add>
* Session 07, `02-string-encryption` — the cipher this one starts from
