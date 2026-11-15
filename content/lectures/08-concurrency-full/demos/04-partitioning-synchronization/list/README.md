# Demo: A Shared List

Ten threads add to, remove from and search one doubly-linked list, without a lock and then with one.

## Goal

See what a race does to a data structure made of pointers, and why a list is synchronized rather than partitioned.

## Background

`list.c` is a doubly-linked list of integers with a sentinel head: add at the front, add at the back, insert at a position, remove at a position, search.
It also keeps the number of items in a variable, `list_size`.

`thread-list-app.c` fills the list with 1,024 items and starts ten threads; each does 2,000 random operations.
At the end it prints the size the list kept and the number of nodes found by walking it.

The same source builds twice:

| Program | Around each operation |
| --- | --- |
| `thread-list-app` | nothing |
| `thread-list-app-mutex` | `pthread_mutex_lock()` and `pthread_mutex_unlock()` |

The random numbers come from `rand_r()` with a seed each thread owns, so the threads share the list and nothing else.

## Build and run

```console
make
./thread-list-app
./thread-list-app-mutex
```

Run each a few times.

## Results and explanations

Without the lock:

```text
$ ./thread-list-app
Segmentation fault (core dumped)
$ ./thread-list-app
reached head when removing. not good.
Segmentation fault (core dumped)
$ ./thread-list-app
Segmentation fault (core dumped)
```

Adding a node is four pointer writes:

```c
p->next = head->next;
p->prev = head;
head->next->prev = p;
head->next = p;
```

Between any two of them the list is broken: a node that is half linked, a `prev` that disagrees with a `next`.
A thread that walks the list at that moment follows a pointer that is wrong, and a thread that removes a node another thread has just freed follows a pointer into freed memory.
With the counter of the pitch, a race gave a wrong number.
Here it gives a crash, and it is lucky when it does: a list that is silently wrong would be worse.

With the lock:

```text
$ ./thread-list-app-mutex
size kept by the list: 9002, nodes found by walking it: 9002
$ ./thread-list-app-mutex
size kept by the list: 8975, nodes found by walking it: 8975
```

Every operation, from reading the size to the last pointer write, is between `lock()` and `unlock()`, so no thread ever sees the list half changed.
That stretch of code is a critical section, and the mutex lets one thread at a time into it.

The price is that the ten threads take turns:

```text
$ \time -v ./thread-list-app-mutex
        Elapsed (wall clock) time (h:mm:ss or m:ss): 0:00.11
        Voluntary context switches: 10353
$ \time -v taskset -c 0 ./thread-list-app-mutex
        Elapsed (wall clock) time (h:mm:ss or m:ss): 0:00.10
        Voluntary context switches: 69
```

Ten cores finish no sooner than one, and go through 10,353 context switches to get there: a thread that finds the lock taken is blocked, and woken when it is released.

**Why not partition?**
The sum splits: thread 3 can add its numbers without knowing what thread 5 is doing.
The list does not: every node points at its two neighbours, an insert at position 40 walks 40 nodes that other threads are changing, and the size belongs to all of them.
There is no way to hand each thread a piece that nobody else touches, short of giving each thread a list of its own.

## Going further

* Run `taskset -c 0 ./thread-list-app` several times.
  On one core the unlocked version usually finishes. Is it correct?
* In `thread-list-app.c`, move the call to `list_get_size()` above `lock()`.
  Every access to the list is still locked. What can go wrong now?
* Run `valgrind --tool=helgrind ./thread-list-app` and read the first report.
* Replace the single mutex with one that only `list_search_item()` skips.
  Searching does not change the list. Is it safe without the lock?

## References

* `man 3 pthread_mutex_lock`
* `man 3 rand_r`
* Remzi and Andrea Arpaci-Dusseau, *Operating Systems: Three Easy Pieces*, chapter 29, [Lock-based Concurrent Data Structures](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks-usage.pdf)
* [Helgrind](https://valgrind.org/docs/manual/hg-manual.html), Valgrind's thread error detector
