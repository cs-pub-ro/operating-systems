# Exercise 07: A Queue That Loses Items

**Tools:** GCC, Make, ps

**Directory**: `07-producer-consumer/`

## Goal

Repair a bounded queue shared by several producers and several consumers.
Afterwards you will be able to write the two waits of a producer-consumer queue, and to explain the two mistakes that nearly every first version has.

## Background

The producer-consumer problem is the most common synchronization pattern there is: some threads make items of work, other threads use them, and a queue of limited size sits between the two.
A pipe in the shell is one; so is the list of connections a web server has accepted and not yet answered.

`queue.c` is such a queue, over a circular buffer.

* `queue_put()` adds an item at the end, and has to wait while the queue is **full**.
* `queue_get()` takes the item at the front, and has to wait while the queue is **empty**.

`chall` starts four producers and four consumers on a queue with room for two items.
Every producer puts in twenty thousand items that no other producer makes, and the consumers take out as many as were put in.
Every item has to come out exactly once.

The library has a mutex and a condition variable, and both functions lock, test, wait, act, signal and unlock, in that order.
It would work with one producer and one consumer.
With four of each it has two separate flaws, and you have met both of them, in the demos.

## Your Task

1. Run `./chall` a few times and read the report.
1. **First flaw.**
   Follow a consumer that finds the queue empty and waits.
   When it wakes up, a second consumer may have run in between.
   Find the line that assumes it did not, and fix it, in both functions.
1. Run again, several times.
   The report changes.
1. **Second flaw.**
   Producers and consumers sleep on the same condition variable, and `pthread_cond_signal()` wakes one sleeper.
   Work out a sequence in which the thread that is woken up is one that cannot go on, and everybody ends up asleep.
   Then make that impossible.

## Build & Run

```console
make
./chall
```

## Check Your Work

* The flag has to be printed on every run; run it at least thirty times.
* After fixing the first flaw only, the symptom is of a different kind.
  Look at the stuck program with `./chall 0` and `ps -L -o lwp,stat,wchan:20 -p $(pidof chall)`, and say why this is not a deadlock in the sense of `04-deadlock`, although it looks the same from outside.
* There are two ways to fix the second flaw.
  Say which one you chose and what the other costs.
* Explain to the teaching assistant how an item can come out twice.

Submit the flag: <https://ctf.security.cs.pub.ro/so/challenges>
