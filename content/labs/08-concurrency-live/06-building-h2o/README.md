# Exercise: Building H2O

**Tools:** GCC, Make

## Goal

Make threads leave in groups: two hydrogen and one oxygen, a molecule at a time.
Afterwards you will be able to use a semaphore to count places and a barrier to make a fixed number of threads wait for each other, and to say what each of them guarantees and what it does not.

## Background

This is a classic synchronization problem.
Hydrogen threads and oxygen threads arrive in any order.
A hydrogen thread calls `hydrogen()`, which has to call `release_hydrogen()` once before it returns; an oxygen thread calls `oxygen()`, which has to call `release_oxygen()` once.
The releases must come out in groups of three, each group two hydrogen and one oxygen, in any order inside the group: `HHO`, `HOH` and `OHH` are molecules, `HHH` and `OOH` are not.

`chall` has four hydrogen threads and two oxygen threads that keep bringing atoms until twenty thousand hydrogen and ten thousand oxygen have been brought.
The release functions are in the executable and record the order.

So far a thread waited for a **condition on data**: enough eggs, its turn.
Here a thread waits for **other threads**: a hydrogen atom cannot leave until another hydrogen and an oxygen are there to leave with it.
Two tools are made for this.

* A **semaphore** (`sem_t`, `<semaphore.h>`) is a counter that cannot go below zero.
  `sem_wait()` takes one from it, and sleeps while it is zero; `sem_post()` adds one, and wakes a sleeper up.
  A semaphore that starts at `n` lets at most `n` threads be between their `sem_wait()` and their `sem_post()`.
  Unlike a mutex, it has no owner: any thread may post.
* A **barrier** (`pthread_barrier_t`) is a meeting point for a fixed number of threads.
  `pthread_barrier_wait()` sleeps until that many threads are waiting, then lets all of them go at once, and is ready for the next group.

`h2o.c` uses two semaphores: one that lets in two hydrogen threads at a time, one that lets in one oxygen thread.
That limits how many atoms of each kind are released at the same moment, and does nothing to make them leave together.

## Your Task

1. Run `./chall` and look at the first releases it shows.
1. Read `hydrogen()` and `oxygen()`, and explain where the `HHH` comes from: follow one hydrogen thread through `sem_wait()`, the release and `sem_post()`, and ask what it waited for.
1. Make the three threads of a molecule wait for each other before any of them releases.
1. Make sure a thread of the **next** molecule cannot release before all three of this one have.
   Look at where each thread gives its place back.

`h2o_init()` is where anything you add is set up.

## Build & Run

```console
make
./chall
```

## Check Your Work

* The flag has to be printed on every run; run it at least thirty times, because one of the mistakes that can be made here shows only now and then.
* If the program times out, count: how many threads of each kind can be waiting at your meeting point, and can that ever be three of the wrong mix?
* Explain to the teaching assistant why the three threads that meet are always two hydrogen and one oxygen, and never three hydrogen.
* Move the `sem_post()` to before the release, run thirty times, and explain what you see.
