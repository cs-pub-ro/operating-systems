# Going Further: Hashing Files With Several Threads

With answers.

## Things to try

1. **A fixed number of threads, and a shared index.**

   ```C
   static int next_job;
   static pthread_mutex_t next_lock = PTHREAD_MUTEX_INITIALIZER;

   static void *worker(void *arg)
   {
   	int i;

   	for (;;) {
   		pthread_mutex_lock(&next_lock);
   		i = next_job++;
   		pthread_mutex_unlock(&next_lock);

   		if (i >= njobs)
   			break;

   		jobs[i].failed = md5_file(jobs[i].path, jobs[i].hex) < 0;
   	}

   	return NULL;
   }
   ```

   The jobs are no longer handed out by the main thread; each worker takes the next one for itself.
   `next_job` is read and written by every worker, so taking a job is a critical section: read the index and advance it, as one step.
   The hashing is outside the lock, where the time goes.

   With 4 workers the 16 files take 0.27 s, with 6 workers 0.24 s, with 12 workers 0.20 s: twelve threads do what sixteen did, and the number no longer depends on how many files there are.
   This is a thread pool at its smallest.
1. **Take the mutex out of that version.**

   `i = next_job++` is a load, an add and a store, like `total++` in `01-substring-search` without its lock.
   Two workers can read the same index, and then both hash the same file, both writing the same `jobs[i]`.
   The output is still right: the two write the same digest, and a lost update only ever holds the index back, so no file is skipped.
   The bug is work done twice, and it is invisible unless it is looked for.
   With a counter per job of how many times it was hashed, on 200 files of 1 MiB and 12 workers, 5 runs in 60 had a file hashed twice.
   A race does not have to produce a wrong answer to be a race, and the next change to the program, a worker that frees or reuses something when it is done with a job, turns this one into a crash.
1. **Hold the lock for too long.**

   With the unlock after the call to `md5_file()`, the output is right and the time is that of the sequential program: 0.97 s with 12 workers.
   One thread hashes at any moment; the others wait for the lock.
   A lock around the work is the surest way to make a parallel program sequential, and nothing but a clock will say so.
1. **Give two threads one `struct md5_ctx`.**

   `md5_update()` reads `ctx->buflen`, copies bytes to `ctx->buf + ctx->buflen`, and writes `ctx->buflen` back; `md5_block()` reads and writes `ctx->state`.
   Two threads in there together would overwrite each other's bytes in the buffer and lose updates to the length and the state, and the digest would be garbage, a different one on every run.
   The function is safe to call from several threads only because each call has its own context.
   A version with a `static struct md5_ctx` would need a lock around the whole computation, and would then be sequential.
1. **Make one file much larger than the others.**

   With one 512 MiB file among fifteen of 16 MiB, the run takes as long as that one file takes one thread, about two seconds, and fifteen threads are idle for nearly all of it.
   More threads do not help: a file is hashed by one thread, because every MD5 block depends on the one before.
   One thread per item balances the load only when the items are the same size.

## Questions to answer

* **The threads all call `md5_file()` at once, with no lock.
  What would it have to contain for that to be wrong?**
  State that outlives a call or is shared between calls: a global, a `static` local, or a buffer that it hands back a pointer to.
  `strtok()`, and `localtime()` with its static result, are library functions of that kind, and each has a variant with `_r` in its name that keeps its state in the caller's memory.
* **Each thread writes into its own element of an array the main thread later reads.
  Why is there no race?**
  Different elements are different memory, and the main thread reads element *i* only after joining thread *i*.
* **The lines come out in list order here and in a random order with processes.
  What is different?**
  Who prints.
  The work finishes in an unpredictable order in both; here the results are kept and printed by one thread in an order of its choosing, and there each worker printed for itself as it finished.
* **What would `exit(1)` in a thread have done?**
  Ended the process, and with it every other thread, in the middle of whatever they were doing.
  A child process that exits ends only itself.

## Discussion points

* **Threads can hand back data; processes hand back a status.**
  The result here is a string in shared memory, read after a join.
* **A function is safe for threads when it keeps its state to itself.**
  Locals, and memory the caller owns, are per call.
  Globals and `static` variables are per program, and a function that uses them needs a lock or a rewrite.
* **A work queue is a shared variable.**
  The moment the threads decide for themselves what to work on next, that decision is a critical section, and a short one.
* **Compare like with like.**
  "Processes were faster than threads" was true of these two programs and false as a statement about processes and threads.

## References

* `man 3 pthread_create`, `man 3 pthread_join`, `man 3 pthread_mutex_lock`
* `man 7 attributes` — what the manual means by *MT-Safe*
* RFC 1321, *The MD5 Message-Digest Algorithm*
