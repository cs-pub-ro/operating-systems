---
parent: Lab 8 - Synchronization
nav_order: 2
---

# Task: Wrap The For

Navigate to the `labs/lab-08/tasks/wrap-the-for/` directory, run `make skels` and open the `support/src` directory.

Here you will find two source files:

* race_condition_inner_mutex
* race_condition_outer_mutex

Following the pattern used in `race_condition_inner_mutex.c` go in `race_condition_outer_mutex.c` move the calls to `pthread_mutex_lock()` and `pthread_mutex_unlock()` outside the `for` statements so that the critical sections become the entire statement.
To see the time difference between the two implementations all you have to do is enter `tests/` and run the checker.

```bash
cd ../tests/
./checker.sh
```

You should see in the terminal:

```bash
Test passed
```

[Quiz](../../../quizzes/coarse-vs-granular-critical-section.md)
