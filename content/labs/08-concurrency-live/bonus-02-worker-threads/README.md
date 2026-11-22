# Bonus 02: A Pool of Worker Threads

**Tools:** GCC, Make, ps, GDB

**Directory**: `bonus-02-worker-threads/`

## Goal

Repair a thread pool: worker threads that are started once and then run whatever tasks they are given.
Afterwards you will be able to say what "all the work is done" means when tasks can create tasks, and to wait for it without polling.

## Background

This builds on `bonus-01-boss-workers`, and changes three things.

* **The workers stay.**
  `pool_create()` starts them, and they live until `pool_destroy()`; in between, the pool is used as many times as needed.
* **Anybody can be the boss.**
  `pool_submit()` adds a task, a function and its argument, and may be called from any thread, **including from inside a task** that a worker is running.
* **The queue has no limit.**
  The tasks wait in a linked list, so submitting never has to wait.

Since no single thread hands out the work, no single thread knows when there is none left.
`pool_wait()` answers that question: it returns when every task submitted so far has finished, including the tasks that those tasks submitted.

`chall` uses the pool to add up the numbers of a range.
The task for a large range adds nothing: it cuts the range in two and submits a task for each half.
Only ranges of a hundred thousand numbers or fewer are added up.
One task is submitted from `main()`, it becomes two, then four, and so on, and `pool_wait()` has to return only when the last small range is done.
The pool is used like this for ten rounds, and then destroyed.

`pool.c` has three flaws, and the first one you will meet stops the program at once.

## Your Task

1. Run `./chall`.
   It stops.
   Start it from GDB (`gdb ./chall`, `run 0`, Ctrl-C, `thread apply all bt 8`) and find a thread that is waiting for a mutex inside `pool_submit()`.
   Look at what the frames below `pool_submit()` in that thread are, and find out who holds the mutex.
1. **The task and the lock** — fix that.
   The same change answers another question: how many tasks could run at the same time before it?
1. Run again; the program now stops somewhere else, or not at all.
   Go on to the next two flaws in either order.
1. **`pool_wait()`** — it polls, it reads shared data without the lock, and it waits for the wrong thing.
   Decide what the pool has to count for this function to have something to wait for, where that count goes up and where it goes down, and wait for it on a condition variable.
1. **`pool_destroy()`** — the end of `bonus-01-boss-workers`, again.

## Build & Run

```console
make
./chall
```

## Check Your Work

* The flag has to be printed on every run; run it at least thirty times.
* When `pool_wait()` returns too early, the executable reports a sum that is too small in one round, and sometimes one that is too **large** in the next.
  Explain the second to the teaching assistant.
* "The queue is empty" and "the work is done" are different.
  Give the moment, in a run of this executable, at which the first is true and the second is not.
* In your version, say where exactly a task counts as finished, relative to the tasks it submitted being counted, and why that order matters.

Submit the flag: <https://ctf.security.cs.pub.ro/so/challenges>
