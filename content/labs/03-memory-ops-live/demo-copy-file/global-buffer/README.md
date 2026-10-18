# Demo: Copy a File Using a Global Buffer

The first of four variants of the same program: a small `cp`, taking a source and a destination file as command-line arguments, reading the source block by block into a buffer and writing each block out.
The four variants differ in exactly one thing: where the buffer comes from.
This one uses a **static global array** -- memory laid out by the compiler before `main()` ever runs, that exists for the whole life of the process, with nothing to allocate and nothing to release.

Together with the teaching assistant you will fill in the TODOs in `copy_file.c`, build it, copy a file and check the result byte for byte.
Keep an eye on where the buffer lives and what that costs: the next three variants copy exactly the same bytes through memory obtained in three other ways.
