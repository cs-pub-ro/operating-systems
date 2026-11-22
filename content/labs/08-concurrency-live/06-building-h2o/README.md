# Exercise 06: Building H2O

**Tools:** GCC, Make

**Directory**: `06-building-h2o/`

## Goal

Make threads leave in groups: two hydrogen and one oxygen, a molecule at a time.
Afterwards you will be able to make threads wait for each other with a mutex, a condition variable and counters, and to say what each counter guarantees and what it does not.

## Background

This is a classic synchronization problem.
Hydrogen threads and oxygen threads arrive in any order.
A hydrogen thread calls `hydrogen()`, which has to call `release_hydrogen()` once before it returns; an oxygen thread calls `oxygen()`, which has to call `release_oxygen()` once.
The releases must come out in groups of three, each group two hydrogen and one oxygen, in any order inside the group: `HHO`, `HOH` and `OHH` are molecules, `HHH` and `OOH` are not.

`chall` has four hydrogen threads and two oxygen threads that keep bringing atoms until twenty thousand hydrogen and ten thousand oxygen have been brought.
The release functions are in the executable and record the order.

So far a thread waited for a **condition on data**: enough eggs, its turn.
Here a thread waits for **other threads**: a hydrogen atom cannot leave until another hydrogen and an oxygen are there to leave with it.
The tools are the ones you know, a mutex and a condition variable; what is new is the data the condition is written on.

`h2o.c` keeps four counters, all under one mutex.

* `waiting_h` and `waiting_o` count the atoms that have arrived and are not part of a molecule yet.
* `tickets_h` and `tickets_o` count permissions to leave.
  `form()` turns two waiting hydrogen and one waiting oxygen into two hydrogen tickets and one oxygen ticket, and wakes everybody up.
  A thread waits until there is a ticket of its kind, takes it, and releases its atom.

That makes sure an atom leaves only as part of a molecule.
It does not make sure the molecules leave one after another.

## Your Task

1. Run `./chall` and look at the first releases it shows.
1. Read `form()`, `hydrogen()` and `oxygen()`.
   On paper, with four hydrogen threads and two oxygen threads waiting, follow the counters and find how six tickets can be out at once.
   Which groups of three can the releases then come in?
1. **`form()`** - form a molecule only when the one before it has left.
   Decide what, among the counters, tells you that it has.
1. **`hydrogen()` and `oxygen()`** - a thread takes its ticket in one place and releases its atom in another.
   Find what can happen between the two, and close it.
1. Make sure the next molecule is formed when one has left, and not only when a new atom arrives.

## Build & Run

```console
make
./chall
```

## Check Your Work

* The flag has to be printed on every run; run it at least thirty times.
* Do steps 3 and 4 one at a time and run `./chall` after each: neither is enough alone, and the number of molecules that come out right tells you how far each one goes.
* If the program times out, count: is there a moment when a molecule could be formed and no thread is going to call `form()`?
* Explain to the teaching assistant why the three releases of one molecule cannot be mixed with those of the next.
* Replace `pthread_cond_broadcast()` with `pthread_cond_signal()`, run it, and explain what you see.

Submit the flag: <https://ctf.security.cs.pub.ro/so/challenges>
