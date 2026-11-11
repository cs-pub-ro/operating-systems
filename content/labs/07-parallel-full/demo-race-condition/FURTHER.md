# Going Further: A Race Condition, and a Mutex

With answers.

## Things to try

1. **Look at the increment in assembly.**

   ```console
   objdump -d counter | grep -A 20 '<increment>:'
   ```

   Two of the lines mention `counter`, and there is an `add $0x1` between them.
   Without optimization, `counter++` is three instructions: a `mov` that loads the counter into a register, an `add` of one to the register, and a `mov` that stores the register back.
   A thread can be interrupted, or simply overtaken by a thread on another core, between any two of them.
1. **Lock around the whole loop instead of around the increment.**

   ```C
   pthread_mutex_lock(&counter_lock);
   for (i = 0; i < increments; i++)
   	counter++;
   pthread_mutex_unlock(&counter_lock);
   ```

   The answer is right and the program is as fast as the one without a mutex, 0.012 s: four lock operations instead of four million.
   It is also not parallel at all: the threads run one after another, each for its whole loop.
   For this program that is the best there is, and it shows the trade: a longer critical section means fewer lock operations and less running side by side.
1. **Count in a local, add once.**

   ```C
   long local = 0;

   for (i = 0; i < increments; i++)
   	local++;

   pthread_mutex_lock(&counter_lock);
   counter += local;
   pthread_mutex_unlock(&counter_lock);
   ```

   Right, parallel, and the fastest of all, at 0.002 s: the loop runs without any lock, on a variable no other thread can see, and the shared counter is touched once per thread.
   This is the shape of the first exercise.
1. **Give each thread its own mutex**, declared as a local in `increment()`.

   The program compiles, every thread locks and unlocks without ever waiting, and the counter is as wrong as it was with no mutex.
   A mutex excludes only the threads that lock the same one.
1. **Forget the unlock.**

   The first thread to lock goes round its loop and locks again, a mutex it already holds, and waits for itself for ever.
   The other threads wait for it.
   The program hangs with no processor use, which is what a deadlock looks like from outside; Ctrl-C ends it.
1. **Build with `-O2`** and run the version without the mutex.

   The counter is right, on practically every run.
   The compiler has turned the loop into a single addition of `increments`, so each thread touches the counter once instead of a million times, and the window for the race is one instruction wide.
   Nothing was fixed: the program is still wrong, and now it fails once in a great while, by a whole thread's share, instead of always.

## Questions to answer

* **Why is `i` not a problem, when every thread increments it too?**
  It is a local variable, on each thread's own stack: there are four of them.
  Globals, `static` variables and the heap are shared; stacks are per thread.
* **Is the result of the unprotected program ever more than the expected total?**
  No.
  An increment can be lost, by being overwritten, but nothing can add one that was not asked for.
  It can be much less: one thread can read the counter early, sleep through thousands of other increments, and then write its stale value plus one over all of them.
* **Would the race exist on a machine with one core?**
  Yes, less often: a thread can be preempted between its read and its write, and another scheduled in between.
  More cores make the race likelier, not possible.
* **Does the main thread need the lock to print the counter?**
  Not here: it prints after joining every thread, when nobody else can be writing.
  The join is what makes that read safe.

## Discussion points

* **A race is a property of the program, not of a run.**
  The output of one run, right or wrong, says little.
  The argument that a program has no race is made by reading it: which variables are shared, and what protects each.
* **Locks are a convention.**
  The compiler does not know which mutex goes with which data.
  A comment next to the declaration, saying what the lock protects, is the only place that knowledge lives.
* **Correctness costs, and the cost depends on the design.**
  The same counter, with the same mutex, takes 0.23 s with a lock per increment and 0.002 s with a lock per thread.

## References

* `man 3 pthread_mutex_lock`
* `man 1 objdump`
* `man 7 futex`
