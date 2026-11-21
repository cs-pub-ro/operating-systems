# Going Further: Five Threads That Take Turns

With answers.

## Things to try

1. **One condition variable per thread.**

   ```C
   static pthread_cond_t my_turn[MAX_THREADS];

   void turn_take(int id)
   {
   	pthread_mutex_lock(&lock);
   	while (turn != id)
   		pthread_cond_wait(&my_turn[id], &lock);
   	pthread_mutex_unlock(&lock);
   }

   void turn_pass(int id)
   {
   	pthread_mutex_lock(&lock);
   	turn = (id + 1) % num_threads;
   	pthread_cond_signal(&my_turn[turn]);
   	pthread_mutex_unlock(&lock);
   }
   ```

   `signal` is enough: at most one thread sleeps on each condition variable.
   The `while` is still needed, for spurious wake-ups.
   The flag came out in 20 runs out of 20.
1. **Semaphores instead.**

   ```C
   static sem_t my_turn[MAX_THREADS];

   void turns_init(int count)
   {
   	int i;

   	num_threads = count;
   	for (i = 0; i < count; i++)
   		sem_init(&my_turn[i], 0, i == 0 ? 1 : 0);
   }

   void turn_take(int id)
   {
   	sem_wait(&my_turn[id]);
   }

   void turn_pass(int id)
   {
   	sem_post(&my_turn[(id + 1) % num_threads]);
   }
   ```

   The mutex and `turn` are gone because the semaphores hold the state themselves: exactly one of them is at one, and that is whose turn it is.
   A semaphore is a counter with a wait built in, so there is no separate variable to protect.
   The flag came out in 20 runs out of 20.
1. **Count the wake-ups.**

   With one condition variable, each hand-over wakes up to four threads and three of them go back to sleep: for ten thousand messages, up to thirty thousand wake-ups that did nothing.
   With five, there are none, apart from spurious ones.
1. **Wait with `if`.**

   Thread 3 sleeps, waiting for `turn == 2`.
   Thread 1 passes the turn to thread 2 and broadcasts.
   Thread 3 is woken up, does not test again, returns from `turn_take()` and prints, at the same time as thread 2, or before it.
   It then sets `turn` to 3, although thread 2 has not passed it on yet.

## Questions to answer

* **Why is `pthread_cond_signal()` not enough with one condition variable?**
  The sleepers wait for different things, and `signal` wakes one without knowing which is which.
* **Which line relies on `turn` still being `id` during the print?**
  The `while (turn != id)` of every other thread: it is what makes them wait.
* **Where is the memory that a semaphore has and a condition variable lacks?**
  In `turn`.
  A thread that arrives after the hand-over was announced does not need the announcement: it reads `turn`, under the lock, and sees that it may go.

## Discussion points

* **The state is in the variable, not in the condition variable.**
  The condition variable is a waiting room; `turn` is what decides.
* **A wake-up that a thread cannot use is wasted work.**
  Broadcasting to four sleepers so that one can go on costs four context switches where one would do.
* **Strict alternation is the opposite of parallelism.**
  Five threads that take turns do the work of one thread, with the cost of five.
  The exercise is about the mechanism; a real program that needs this order would use one thread.

## References

* `man 3 pthread_cond_wait`, `man 3 pthread_cond_broadcast`
* `man 7 sem_overview`
