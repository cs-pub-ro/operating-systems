# Going Further: A Lock in the Wrong Place

With answers.

## Things to try

1. **No lock at all.**

   ```C
   atomic_size_t next;
   ```

   ```C
   pos = atomic_fetch_add(&job->next, BLOCK);
   if (pos >= job->size)
   	break;
   ```

   `atomic_fetch_add()` reads the old value and writes the new one as one step that no other thread can get into the middle of; on x86-64 it is a single `lock xadd` instruction.
   That is the whole critical section, done by the processor.
   The flag in 20 runs out of 20, in the same 0.012 s as the mutex version: with blocks of 4096 characters, taking a block is too small a part of the work for the difference to show.
1. **Change the size of a block.**

   | `BLOCK` | Encryption time |
   | --- | --- |
   | 16 | 0.452 s |
   | 4096 | 0.012 s |
   | 1048576 | 0.012 s |

   With blocks of 16 characters there are four million of them, and taking one costs more than encrypting it: the threads spend their time queuing at the mutex.
   This is the granularity trade-off of lecture 08 from the other side: the critical section is as short as it can be, and it is entered far too often.
   With blocks of 1 MiB there are 65 blocks for 8 threads, and little room left to even out a thread that falls behind.
1. **Run the original under Helgrind.**

   The first report is a possible data race on `job->next`, between the read at the top of the loop in one thread and the write under the lock in another.
   One access is under the lock and the other is not: no lock in common.
1. **Count the blocks per thread.**

   They are not equal, and differ from run to run: a thread that started first, or that was not interrupted, took more.
   That is the point of sharing the work out at run time.
   With a fixed split, a thread that loses its core for a moment still has its whole part to do, and everybody waits for it.

## Questions to answer

* **Why is one version more than fifty times slower with the same number of lock calls?**
  Because of how long the lock is held: for a whole block's encryption in one, for three statements in the other.
  And because most of the encryption the slow version does is the same blocks done again.
* **Why is the encryption safe without a lock?**
  Two threads write the same memory only if they have the same block, and the lock around the cursor makes sure they do not.
  Disjoint data needs no lock; that was session 07.
* **What does this version have that session 07's did not?**
  Balance.
  The split adapts to how fast each thread actually runs.
  It pays for that with a shared cursor and a lock.

## Discussion points

* **A lock is around data, not around code.**
  "This is where the work happens, so this is where the lock goes" is how the mutex got where it was.
* **The shortest critical section is the one that holds only what is shared.**
  Here that is a read, a comparison and a write.
* **Partition first, synchronize what is left.**
  The blocks are a partition; the cursor is what is left.

## References

* `man 3 pthread_mutex_lock`
* <https://en.cppreference.com/w/c/atomic/atomic_fetch_add>
* Session 07, `02-string-encryption` — the cipher this one starts from
