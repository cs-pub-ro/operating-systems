# Going Further: A Queue That Loses Items

Optional.

## Things to try

1. **The other fix.**
   If you used two condition variables, try one condition variable with `pthread_cond_broadcast()`, or the other way round.
   Both get the flag.
   Compare the `sys` time of `time ./chall` for the two.
1. **With semaphores.**
   Two counting semaphores, `free_slots` starting at the capacity and `used_slots` starting at zero, and a mutex for the buffer.
   A producer waits on `free_slots` and posts `used_slots`; a consumer does the opposite.
   Where did the two `while` loops go?
   What happens if the mutex is locked before the `sem_wait()` instead of after?
1. **A way to stop.**
   The consumers of the executable know how many items to take.
   A real consumer does not.
   Add `queue_close()`, after which `queue_get()` returns a special value once the queue is empty instead of waiting.
   Which threads have to be woken up when the queue is closed, and with which call?

## Questions to answer

* With one producer and one consumer, the `if` version is correct.
  Why does a second consumer break it?
* The capacity of the queue is 2, and there are 4 producers.
  Why does a small capacity make the second flaw show?
* `queue_get()` signals after taking an item.
  Who is that signal for?

## Discussion points

* **A wake-up is a hint.**
  Between the signal and the moment the woken thread holds the lock again, any other thread may have run.
  The condition is tested again, every time.
* **One condition variable per condition.**
  "Not full" and "not empty" are different facts, of interest to different threads.
  Putting both on one condition variable means every signal may go to somebody who cannot use it.
* **The queue is the boundary between threads.**
  Producers and consumers share nothing else, so all the synchronization of the program is in one small file.
  That is the reason the pattern is used everywhere.

## References

* `man 3 pthread_cond_wait`, `man 3 pthread_cond_signal`, `man 3 pthread_cond_broadcast`
* *Operating Systems: Three Easy Pieces*, chapter 30, *Condition Variables* — the same two flaws, step by step
