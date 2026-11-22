# Exercise 01: A Binary Search Tree for Eight Threads

**Tools:** GCC, Make, Valgrind (Helgrind)

**Directory**: `01-binary-tree/`

## Goal

Make a binary search tree safe to use from several threads at once, with a mutex that belongs to the tree.
Afterwards you will be able to decide where a lock goes in a data structure whose functions are recursive, and which of its functions need it.

This exercise is a build-up of `demo-01-list-mutex`.

## Background

`tree.c` is a library: a binary search tree of integers with no duplicates, with `tree_insert()`, `tree_remove()`, `tree_contains()`, `tree_size()` and `tree_walk()`.
It is correct for one thread, and has no synchronization at all.

`chall` starts eight threads on one tree.
Each thread has four thousand keys that no other thread uses: it inserts all of them, looking some of them up right after, then removes every second one.
Because the keys are private, every call has one right answer, whatever the other threads are doing, and the tree at the end has to hold exactly the keys that were not removed.

This is the list demo again, with two differences.
The mutex goes **inside** the tree, as a field of `struct tree`, because the executable cannot lock for you: it only has a pointer to a structure it cannot see into.
And insertion and removal are recursive: the functions the executable calls are short, and the work is done by `insert_node()` and `remove_node()`, which call themselves.

A `pthread_mutex_t` that is a field cannot use `PTHREAD_MUTEX_INITIALIZER`; it is set up with `pthread_mutex_init()` and released with `pthread_mutex_destroy()`.
A mutex of the default kind must not be locked again by the thread that already holds it: the thread would wait for itself.

## Your Task

Run the executable first, several times, and read what it reports.
Then open `tree.c` and go through the TODOs.

1. **The mutex** - a field of `struct tree`, initialized in `tree_create()`, destroyed in `tree_destroy()`.
1. **`tree_insert()` and `tree_remove()`** - lock around what must not be interleaved.
   Decide whether the lock goes in these functions or in the recursive ones below them, and why.
1. **`tree_contains()`** - decide whether a function that changes nothing needs the lock.
   The function has more than one `return`.
1. **`tree_size()` and `tree_walk()`** - the same question.

## Build & Run

```console
make
./chall
```

## Check Your Work

* The flag has to be printed on every run; run it twenty times.
* Before you fix anything, collect the different ways the unprotected tree fails, over ten runs or so.
  For two of them, say what two threads must have been doing at the same moment.
* Lock in `tree_insert()` and `tree_remove()` only, leave the other functions as they were, and run twenty times.
  Look at how often you get the flag, and decide what that says about the library, and about the test.
* Run that same version under Helgrind, `valgrind --tool=helgrind ./chall 0`, and read the first report.
  Then run your final version under it.
* Be ready to explain to the teaching assistant why the lock is not taken in `insert_node()`.
