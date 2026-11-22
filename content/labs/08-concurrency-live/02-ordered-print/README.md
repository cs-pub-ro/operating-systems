# Exercise 02: Five Threads That Take Turns

**Tools:** GCC, Make

**Directory**: `02-ordered-print/`

## Goal

Write, from an empty library, the synchronization that makes five threads print their numbers in order, round after round.
Afterwards you will be able to build a wait on a condition variable without a model to copy from.

This exercise is buildup of `demo-02-ordered-print`.

## Background

`chall` starts five threads.
Each one runs the same loop, two thousand times:

```C
turn_take(id);
print_message(id);
turn_pass(id);
```

`print_message()` is in the executable, and prints the number of the thread, `id + 1`.
It must not be called by two threads at once, and it notices when it is.
`turn_take()` and `turn_pass()` are in the library, `turns.c`, and at the moment they do nothing.

The output has to be `1 2 3 4 5` on every line.
The executable shows the first four rounds and checks all two thousand.

This is the demo with three threads, with two differences.
The number of threads is not fixed: the library is told how many there are by `turns_init()`.
And the waiting and the passing are two separate functions, with the printing between them and outside your code: `turn_take()` has to return, and the other four threads still have to be kept out until `turn_pass()` is called.

## Your Task

1. **The shared state** — whose turn it is, a mutex, and what the threads wait on.
   Set it up in `turns_init()`; the first turn is thread 0's.
1. **`turn_take()`** — return only when it is the turn of the thread that called.
1. **`turn_pass()`** — give the turn to the next thread, and after the last to the first, and make sure the next thread finds out.

## Build & Run

```console
make
./chall
```

## Check Your Work

* The flag has to be printed on every run; run it twenty times.
* A program that stops, with the time-out message, is a different failure from one that prints out of order.
  If you get one of them, say which decision in your code it comes from before you change it.
* If your `turn_take()` releases the mutex before it returns, `print_message()` is called with no lock held: explain to the teaching assistant what keeps the other threads from printing at that moment.
  If it returns with the mutex locked, say which function unlocks it, and what you think of a lock taken in one function and released in another.
* Look at how many threads are woken up every time the turn is passed, and how many of them can go on.

Submit the flag: <https://ctf.security.cs.pub.ro/so/challenges>
