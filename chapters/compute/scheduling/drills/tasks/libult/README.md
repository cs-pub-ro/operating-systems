# Another Time Slice

Enter the `chapters/compute/scheduling/drills/tasks/libult/support/` folder and go through the practice items below.

1. Modify the time slice set to the timer to 2 seconds.
Re-run the code in `test_ult.c`.
Notice that now no context switch happens between the 2 created threads because they end before the timer can fire.

1. Now change the `printer_thread()` function in `test_ult.c` to make it run for more than 2 seconds.
See that now the prints from the two threads appear intermingled.
Add prints to the `handle_sigprof()` function in `threads.c` to see the context switch happen.

If you're having difficulties solving this exercise, go through [this](../../../guides/libult.md) reading material.
