# Demo 02: Three Threads That Take Turns

**Directory**: `demo-02-ordered-print/`

`ordered.c` starts three threads, each printing one number in a loop: the first prints 1, the second 2, the third 3.
The output should be `1 2 3` on every line.
Nothing makes the threads take turns, so it is not.

A mutex is not enough here: it keeps the threads out of each other's way, and says nothing about whose turn it is.
A thread has to be able to **wait** until the turn is its own, without spinning, and to be woken up when the turn changes.
That is what a condition variable is for.

Together with the teaching assistant you will fill in the three TODOs in `ordered.c`: a shared variable that says whose turn it is, with a mutex and a condition variable; the wait before the print; the hand-over after it.
Two decisions are left open in the TODOs, and you will try both sides of each with more rounds (`./ordered 2000`): `if` or `while` around `pthread_cond_wait()`, and `pthread_cond_signal()` or `pthread_cond_broadcast()` to wake the others up.
