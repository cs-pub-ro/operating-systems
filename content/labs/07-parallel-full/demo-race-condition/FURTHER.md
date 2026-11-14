# Going Further: A Race Condition, and a Mutex

With answers.

## Things to try

1. **Watch the calls interleave.**

   ```console
   strace -f -e trace=write -o trace.txt ./messages 2 3
   ```

   Each line of `trace.txt` starts with the ID of the thread that made the call.
   On a run with broken lines, the three calls of one thread are not next to each other: a `write(3, "thread 1", 8)` of one thread sits between the `write(3, ": message ", 10)` and the `write(3, "0\n", 2)` of the other.
   `<unfinished ...>` and `<... write resumed>` mark a call that was waiting while another thread's went ahead.
1. **Lock around the whole loop instead of around the three calls.**

   ```C
   pthread_mutex_lock(&log_lock);
   for (i = 0; i < messages; i++) {
   	/* format, then the three put() calls */
   }
   pthread_mutex_unlock(&log_lock);
   ```

   Every line is whole, the file holds all of thread 0's messages, then all of thread 1's, and so on, and the program takes 0.71 s for 4 × 100,000 messages, as long as one thread writing all of them.
   The threads now run one after another, each for its whole loop: four lock operations instead of 400,000, and no running side by side at all.
   For this program that costs nothing, because nothing could run side by side anyway.
1. **Write each message with one call, and no mutex.**

   ```C
   snprintf(line, sizeof(line), "thread %ld: message %ld\n", id, i);
   put(line);
   ```

   Every line is whole, on every run, and 4 × 100,000 messages take 0.45 s, the fastest of all.
   The critical section has become a single `write()`, and the kernel already carries out each `write()` to a file whole.
   That is not the end of locking, though, only a lock that has moved: the kernel holds a lock of its own on the file around every call, and that is what keeps the line together.
   It works because the whole message can be made one call; a critical section that cannot be, such as two writes to two different files that must stay in step, still needs the mutex.
1. **Give each thread its own mutex**, declared as a local in `write_messages()`.

   The program compiles, every thread locks and unlocks without ever waiting, and the lines are as broken as they were with no mutex.
   A mutex excludes only the threads that lock the same one.
1. **Forget the unlock.**

   The first thread to lock writes its first message, goes round its loop and locks again, a mutex it already holds, and waits for itself for ever.
   The other threads wait for it.
   The program hangs with no processor use, which is what a deadlock looks like from outside; Ctrl-C ends it.
1. **Let each thread open the file itself**, with `open(LOG_FILE, O_WRONLY)` at the start of `write_messages()`, and write through that descriptor, with the mutex still in place.

   With 4 × 1,000 messages the file holds 1,000 lines, all of them whole, and 3,000 messages are gone.
   Each `open()` gives a descriptor with its own file offset, starting at 0, so the four threads write over each other, and the mutex cannot help: the three calls of a message stay together, at a position another thread then writes over.
   Opening with `O_APPEND` as well brings back all 4,000 lines, because every `write()` then goes to the end of the file as it is at that moment, wherever the descriptor's offset was.
1. **Use `stdio` instead of `write()`**: a shared `FILE *` from `fdopen()`, and `fputs()` in place of `put()`.

   The lines are broken just as before.
   Every `stdio` call locks the `FILE` while it runs, so one `fputs()` is never cut, but nothing keeps three of them together.
   One `fprintf()` per message is whole, for the same reason one `write()` is.
   `stdio` exposes its lock, too: `flockfile()` and `funlockfile()` around several calls are this demo's mutex, already built into every `FILE`.

## Questions to answer

* **Why is a line never cut in the middle of one call, into `threthread 0ad 1`?**
  The kernel carries out each `write()` to a regular file as one step: POSIX requires it, and Linux holds a lock on the file around the call.
  The program writes to a file for that reason.
  A terminal makes no such promise, and a pipe only for writes of up to `PIPE_BUF` bytes, 4,096 on Linux.
* **Is any message lost without the mutex?**
  No.
  Every call writes its bytes at the end of what is already there, so the file holds every piece of every message, and as many newlines as there were messages; only the order of the pieces is wrong.
  Compare the sixth thing to try, where messages are lost and a mutex does not help.
* **Would the race exist on a machine with one core?**
  Yes, less often: a thread can be preempted between two of its calls, and another scheduled in between.
  More cores make the race likelier, not possible.
* **Does the main thread need the lock to count the lines?**
  Not here: it reads the file after joining every thread, when nobody else can be writing.
  The join is what makes that read safe.
* **With the mutex, the lines of the threads still come out mixed together. Is that a race as well?**
  No.
  The order in which threads get the lock is not defined, and the program never asked for one.
  What it asked for is that each message be whole, and it is: the message is the unit the mutex protects.

## Discussion points

* **A race is a property of the program, not of a run.**
  The output of one run, right or wrong, says little.
  The argument that a program has no race is made by reading it: what is shared, and what protects each use of it.
* **A critical section is defined by what has to look indivisible, not by a variable.**
  Here no variable of the program is shared for writing at all; the shared thing is the file, and the three calls are indivisible because a message has to be.
* **Locks are a convention.**
  The compiler does not know which mutex goes with which data.
  A comment next to the declaration, saying what the lock protects, is the only place that knowledge lives.
* **Correct and fast are separate questions.**
  The mutex made the program correct and cost almost nothing, because the file was already used by one thread at a time.
  What made it fast was one call per message, and what would make it faster still is giving up the shared file: a file per thread, merged afterwards.

## References

* `man 3 pthread_mutex_lock`
* `man 2 write`, `man 2 open` (`O_APPEND`)
* `man 3 flockfile`
* `man 1 strace`
