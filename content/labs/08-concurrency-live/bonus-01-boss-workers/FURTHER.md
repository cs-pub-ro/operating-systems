# Going Further: A Boss and Its Workers

Optional.

## Things to try

1. **A poison pill.**
   Remove `stop`.
   Instead, after the last item, have the boss put a special item on the desk, `-1`, once for every worker; a worker that takes it ends.
   What happened to the three flaws?
   What did it cost?
1. **A boss that waits for the desk.**
   Keep `stop`, and make the boss wait for the desk to be empty before it sets it.
   Does the worker still need to check the desk when it sees `stop`?
1. **A bigger desk.**
   Replace the desk with the queue of `07-producer-consumer`.
   How does the time of `./chall` change, and why?
1. **Workers that hand back results.**
   Change `work()`, on paper, to return a number, and have `boss_run()` return the sum.
   Where do the workers put their results, and what protects that place?

## Questions to answer

* Why is `pthread_cond_signal()` right when the boss announces an item, and wrong when it announces the end?
* The desk has room for one item.
  What does the boss do while all the workers are busy?
* The workers are started and ended on every call of `boss_run()`.
  What does that cost when the function is called twenty times?

## Discussion points

* **Starting is easy; stopping is the design.**
  Every scheme with waiting threads needs an answer to "how do they find out that it is over", and the answer has to reach all of them.
* **Drain before you leave.**
  "Stop" should mean "no more work is coming", not "drop what is there".
* **Signal for one, broadcast for all.**
  An item is of use to one worker; the end concerns every one of them.

## References

* `man 3 pthread_cond_signal`, `man 3 pthread_cond_broadcast`, `man 3 pthread_join`
