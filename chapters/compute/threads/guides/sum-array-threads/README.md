# Sum array Threads

## Spreading the Work Among Other Threads

Compile the code in `chapters/compute/threads/guides/sum-array-threads/support/c/sum_array_threads.c` and run it using 1, 2, 4 and 8 threads as you did before.
Each thread runs the `calculate_array_part_sum()` function and then finishes.
Running times should be _slightly_ smaller than the implementation using processes.
This slight time difference is caused by process creation actions, which are costlier than thread creation actions.
Because a process needs a separate virtual address space (VAS) and needs to duplicate some internal structures such as the file descriptor table and page table, it takes the operating system more time to create it than to create a thread.
On the other hand, threads belonging to the same process share the same VAS and, implicitly, the same OS-internal structures.
Therefore, they are more lightweight than processes.
