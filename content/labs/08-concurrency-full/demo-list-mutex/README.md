# Demo: A Linked List, and One Mutex

**Tools:** GCC, Make

## Goal

Reference version of the list demo: ten threads change one doubly-linked list at the same time, and one mutex, held around every use of the list, keeps it whole.

## Background

The list is the one from lecture 08: a sentinel node, `next` and `prev` pointers, and a `list_size` variable kept next to the nodes.
Adding a node is four pointer assignments and an increment.

```C
p->next = head->next;
p->prev = head;
head->next->prev = p;
head->next = p;

list_size++;
```

Between the first assignment and the last, the list is in a state that no reader should see: a node that points into the list and that the list does not point to yet.
One thread in the middle of those lines, and another thread walking or changing the same nodes, is all it takes.

A mutex makes the five lines, and every other group of lines that uses the list, into critical sections: a thread that holds the mutex finishes its change before any other thread looks.

Files:

* `thread-list-app.c` — the threads, and the mutex.
* `list.c`, `list.h` — the list; not changed, and not thread-safe by itself.
* `utils/utils.h` — the `DIE()` macro.

## Build & Run

```console
make
./thread-list-app
```

```text
size kept by the list: 9045, nodes found by walking it: 9045
```

The number changes from one second to the next, because the random actions are seeded from the clock.
What does not change is that the two numbers are equal.

## Results and Explanations

### Without the mutex

Thirty runs of the program as it is in the live half, thirty segmentation faults, most of them after a few lines of this:

```text
reached head when removing. not good.
reached head when removing. not good.
Segmentation fault (core dumped)
```

The message comes from `list_remove_item()`, which walks `pos` nodes from the head and finds itself back at the head: the list is shorter than `list_size` says.
The crash comes a moment later, from a pointer to a node that another thread freed.
Every one of these is two threads inside the pointer assignments at once: a node linked in by one thread and unlinked by the other, an increment of `list_size` lost, a `free()` of a node that a walk is standing on.

### With the mutex

```C
static pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
```

```C
pthread_mutex_lock(&mutex);
size = list_get_size(head);
pos = size ? rand_r(&seed) % size : 0;

switch (action) {
/* ... one list operation ... */
}
pthread_mutex_unlock(&mutex);
```

One lock for the whole list: the head, every node and the size are one piece of state, and there is no way to give each thread a part of it.
The search is inside the lock too, although it changes nothing, because a node it is looking at can be freed by a thread that removes.

`PTHREAD_MUTEX_INITIALIZER` is enough for a mutex that is a global variable; `pthread_mutex_init()` is for one that is created at run time, such as a field of a structure, which is how the next tasks do it.

### Where the critical section starts

The lock is taken before the size is read, not just before the list is changed.

With the lock taken only around the `switch`, the program still gives equal numbers on every run: thirty out of thirty.
That is because `list_insert_item()` and `list_remove_item()` both cope with a position that is past the end, which is what a stale size produces.
It is still wrong, twice over.

* Reading `list_size` while another thread writes it is a data race, and a program with a data race has no defined behaviour in C, whatever it happened to do in thirty runs.
* The position was chosen for a list that no longer exists by the time it is used.
  Here that only makes the random choice a little less uniform.
  In `03-toctou` the same pattern, a decision taken on a value read under one lock and used under another, gives a name to two owners.

A critical section starts at the first thing the thread reads that its later steps rely on.

### What it costs

Ten threads holding one lock around everything they do are not running in parallel: the program takes 0.09 s, and its `user` time is about the same as its `real` time, where ten threads that really ran side by side would show ten times more.
The lock made the program correct, and sequential.
That trade is the subject of lecture 08's part on granularity, and of `bonus-synchronized-db` at the end of this session.

## References

* `man 3 pthread_mutex_lock`, `man 3 pthread_mutex_init`
* Lecture 08, part 04, *Partitioning and synchronization* — the demo this one is taken from
