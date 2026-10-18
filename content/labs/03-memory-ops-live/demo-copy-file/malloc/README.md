# Demo: Copy a File Using a Heap Buffer

The third of four variants of the file-copy program.
This one asks the allocator for its buffer at run time with `malloc()`, which means the size need not be known when the program is compiled -- and that the buffer now has to be released on **every** path out of `main()`, including the error paths.

Together with the teaching assistant you will fill in the TODOs in `copy_file.c`, paying particular attention to the early returns, then run the result under `valgrind` to confirm nothing leaks.

There are more TODOs here than in the first two variants, and most of them are `free()` calls.
That imbalance is the point.
