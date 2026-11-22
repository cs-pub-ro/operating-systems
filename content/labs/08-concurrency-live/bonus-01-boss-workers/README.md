# Bonus 01: A Boss and Its Workers

**Tools:** GCC, Make, ps

**Directory**: `bonus-01-boss-workers/`

## Goal

Repair a boss-workers scheme in which work is lost and workers never go home.
Afterwards you will be able to end a set of waiting threads cleanly, which is the part of this pattern that is hardest to get right.

## Background

One thread, the boss, has a list of items to be done.
It does none of them itself: it hands them, one at a time, to a number of worker threads, and waits for them to finish.
It is the producer-consumer pattern with one producer, and it is how a web server hands connections to its threads.

`boss.c` implements it with the smallest queue there can be, a **desk** with room for one item.

* The boss waits until the desk is empty, puts an item on it, and wakes a worker up.
* A worker waits until there is an item on the desk, takes it, tells the boss that the desk is free, and goes off to do the work, with the lock released.
* When the boss has handed out the last item, it sets `stop` and wakes the workers up, so that they leave their loop and end.
  The boss then joins them.

`boss_run()` does all of that: it starts the workers, hands out the items `0` to `nitems - 1`, and returns when everything is over.
`chall` calls it twenty times, with eight workers and two thousand items, and checks after each call that every item was done exactly once.

Handing out the work is the easy half, and the code for it is close to right.
The hard half is the end: a worker asleep on a condition variable has to be told that no more work is coming, every worker has to be told, and no item may be lost in the telling.

## Your Task

There are three flaws, marked by the three TODOs in `boss.c`, and they show one after another.

1. Run `./chall`.
   Look at the stuck program (`./chall 0`, and `ps -L` from a second terminal) and count the threads.
1. **Who is woken up.**
   The boss and the workers sleep on the same condition variable.
   Find a signal that can reach a thread that cannot use it, and fix that, everywhere it happens.
1. **Who is told that it is over.**
   Look at the wake-up the boss sends after setting `stop`, and at how many workers there are.
1. Run again, several times, once the program no longer stops.
   Read the complaint, and note which item it is about.
1. **The last item.**
   Follow a worker that wakes up and finds both an item on the desk and `stop` set.

## Build & Run

```console
make
./chall
```

## Check Your Work

* The flag has to be printed on every run; run it at least thirty times.
* The item that gets lost is always the same one.
  Explain to the teaching assistant why it is that one, and why not in every round.
* Say what the boss does between putting the last item on the desk and setting `stop`, and whether it should do something more.
* Check, by reading your code, that `work()` is called with the lock released.
  Say what the program would be if it were not.
