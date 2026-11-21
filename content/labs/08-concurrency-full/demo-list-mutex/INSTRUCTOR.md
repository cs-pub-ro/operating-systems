# Instructor Notes: A Linked List, and One Mutex

## Purpose

A warm-up that connects the lecture to the lab and session 07 to session 08: the same list students saw in lecture 08, crashing on the projector, and the one tool they already know fixing it.
Keep it short; the condition variable in the next demo is where the new material starts.

## Running it

1. `make`, then `./thread-list-app` three or four times: a segmentation fault every time, usually after `reached head when removing. not good.`
1. Open `list.c` at `list_add_item()` and ask which lines must not be interleaved.
1. TODO 1 and TODO 2, typed with the room.
1. Run again: two equal numbers.
1. Move the lock below the two lines that read the size and choose the position, run again, and ask whether the program is now wrong.
   It gives equal numbers; the discussion is the point.

## Expected answers

* **TODO 1**: `static pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;`
* **TODO 2**: `pthread_mutex_lock(&mutex);` before `size = list_get_size(head);`, `pthread_mutex_unlock(&mutex);` after the `switch`.

## Things students get wrong

* **A lock in every `case`.**
  Correct, and five times the typing; ask for one pair.
* **No lock around the search**, "because it only reads".
  The same conversation as session 07's bonus; a search can stand on a node that is being freed.
* **`unlock` inside a `case` before the `break`**, and nothing in the other cases.
  The next thread waits for ever; this is the first hang of the session, and worth showing with `ps -L`.

## Verified reference values

| Fact | Value |
| --- | --- |
| Skeleton, 30 runs | 30 segmentation faults |
| Reference, 30 runs | the two numbers equal on every run, around 9,000 |
| Lock around the `switch` only, 30 runs | the two numbers equal on every run |
| Reference, time | 0.09 s, `user` about equal to `real` |

## Practical notes

* The sources are copies of `content/lectures/08-concurrency-full/demos/04-partitioning-synchronization/list/`, with the `USE_MUTEX` switch of the lecture replaced by TODOs.
* `-Wno-unused-parameter` is in the `Makefile` because `list_get_size()` and others take a `head` they do not use.
* The seed is `time(NULL)`: two runs within the same second do exactly the same actions.
