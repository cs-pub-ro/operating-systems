# Going Further: A Queue That Loses Items

With answers.

## Things to try

1. **The other fix.**

   One condition variable with `broadcast`, and two with `signal`, both give the flag, and both run in 0.08 to 0.10 s with about 0.3 s of `sys` time.
   With eight threads the extra wake-ups of the broadcast are lost in the noise.
   The difference grows with the number of threads that sleep on the queue.
1. **With semaphores.**

   ```C
   void queue_put(struct queue *queue, long item)
   {
   	sem_wait(&queue->free_slots);
   	pthread_mutex_lock(&queue->lock);
   	queue->items[queue->tail] = item;
   	queue->tail = (queue->tail + 1) % queue->capacity;
   	pthread_mutex_unlock(&queue->lock);
   	sem_post(&queue->used_slots);
   }
   ```

   `queue_get()` is the mirror image.
   The loops are gone because a semaphore is the count and the wait in one: `sem_wait()` returns only to a thread that took one unit, so there is nothing to test again, and a post is never lost.
   The flag in 20 runs out of 20.

   With the mutex locked before the `sem_wait()`, a consumer that finds the queue empty goes to sleep on the semaphore holding the mutex.
   No producer can get in to put the item it is waiting for.
   That one is a real deadlock, and the classic mistake of this version.
1. **A way to stop.**

   `queue_close()` sets a `closed` flag under the lock and wakes up **every** waiting consumer, with `pthread_cond_broadcast(&queue->not_empty)`: all of them have to find out, not one.
   `queue_get()` waits `while (queue->count == 0 && !queue->closed)`, and afterwards returns the special value only if the queue is empty.
   An item that is still in a closed queue is delivered.
   Both points, broadcast for news that concerns everybody and "drain before you leave", are the subject of `bonus-boss-workers`.

## Questions to answer

* **Why does a second consumer break the `if` version?**
  With one consumer, nobody else can take the item between the signal and the consumer's return from the wait, so "woken up" does mean "there is an item".
  A second consumer can be awake at that moment and take it.
* **Why does a small capacity make the second flaw show?**
  The lost wake-up needs producers and consumers asleep at the same time.
  Producers sleep only on a full queue and consumers only on an empty one; a queue of 2 with 4 producers swings between the two all the time.
* **Who is the signal in `queue_get()` for?**
  For a producer waiting for a free slot.
  With one condition variable it can reach a consumer instead, which is the second flaw.

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
* `man 7 sem_overview`
* *Operating Systems: Three Easy Pieces*, chapters 30 and 31 — <https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf>, <https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf>
