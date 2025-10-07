# Wrap the Whole `for` Statements in Critical Sections

Navigate to the `wrap-the-for/` directory of the extracted archive (or `chapters/compute/synchronization/drills/tasks/wrap-the-for/` if you are working directly in the repository), run `make skels`, and open the `support/src` directory.

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

[Quiz](../drills/questions/coarse-vs-granular-critical-section.md)
