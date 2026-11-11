# Demo: How Much Faster Do More Threads Make It?

`count_chars.c` fills a 256 MiB buffer with letters and counts how many of them are an `e`.
It does both with one thread, and prints how long each of the two took.

Together with the teaching assistant you will fill in the four TODOs in `count_chars.c`, so that the counting is split between as many threads as the first argument says, the way the search of session 06 was.
Then you will run the program under `time` with 1, 4, 8 and 32 threads, and with the number that `nproc` prints.

```console
time ./count_chars 4
```

Three numbers to follow from one run to the next: the time of the counting, the time of the filling, and the `real` time of the whole program.
The question to leave with: why does doubling the threads stop halving the time, and what would have to change for the whole program to run eight times faster?
