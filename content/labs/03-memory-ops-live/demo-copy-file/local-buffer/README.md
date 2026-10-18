# Demo: Copy a File Using a Local Buffer

The second of four variants of the file-copy program.
This one declares the buffer as a **local variable of `main()`**, so it lives on the stack: it appears when `main()` is entered, disappears when `main()` returns, and in between nothing allocates or releases it.

Together with the teaching assistant you will fill in the TODOs in `copy_file.c`, build it and copy a file.
Then look at what `size` says about this binary compared to the global-buffer one, check `ulimit -s`, and try a bigger `BUFFER_SIZE`: the stack is the one place among the four where the buffer can simply be too large.
