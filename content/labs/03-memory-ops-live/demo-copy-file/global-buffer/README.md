# Demo: Copy a File Using a Global Buffer

The first of three variants of the same program: a small `cp`, taking a source and a destination file as command-line arguments.
This variant stages the data through a **static global buffer** — memory that exists for the whole lifetime of the process, laid out by the compiler before `main()` ever runs, with no allocation and nothing to release.

Together with the teaching assistant you will fill in the TODOs in `copy_file.c`, build it, copy a file and check the result byte for byte.
Keep an eye on where the buffer lives and what that costs: the next two variants copy exactly the same bytes with the memory obtained in two very different ways.
