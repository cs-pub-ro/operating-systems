# Going Further: Five Threads That Take Turns

Optional.

## Things to try

1. **One condition variable per thread.**
   Replace the single condition variable with an array, one for each id, and wake up only the thread whose turn it has become.
   Is `pthread_cond_signal()` enough now?
   Does the wait still need its `while`?
1. **Semaphores instead.**
   Give every thread a semaphore (`sem_t`, `sem_init()`, `sem_wait()`, `sem_post()`), all at zero except thread 0's, which starts at one.
   `turn_take()` and `turn_pass()` become one line each.
   What happened to the mutex, and to the variable that said whose turn it was?
1. **Count the wake-ups.**
   Add a counter to `turn_take()` that counts how many times a thread came back from `pthread_cond_wait()` and found the turn was not its own.
   Print it from a destructor function, or look at it in GDB.
   Compare the version with one condition variable and the version with five.
1. **Wait with `if` instead of `while`**, and run a few times.
   Follow, on paper, the first thread that prints out of turn.

## Questions to answer

* With one condition variable, why is `pthread_cond_signal()` not enough?
* `turn` is still equal to `id` while thread `id` prints.
  Which line of your code relies on that?
* A semaphore remembers a `sem_post()` that nobody was waiting for.
  A condition variable does not remember a signal.
  Where does the condition-variable version keep that memory instead?

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
