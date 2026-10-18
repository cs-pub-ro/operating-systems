# Demo: Copy a File Using a Heap Buffer

The third of four variants of the file-copy program.
This one asks the allocator for its buffer at run time with `malloc()`, which means the size need not be known when the program is compiled -- and that the buffer now has to be released on **every** path out of `main()`, including the error paths.

Together with the teaching assistant you will fill in the TODOs in `copy_file.c`, paying particular attention to the labels at the end of `main()` and to which of them each failure has to reach, then run the result under `valgrind` to confirm nothing leaks.

Compare the labels at the end of `main()` with the ones in the first two variants.
That difference is the point.
