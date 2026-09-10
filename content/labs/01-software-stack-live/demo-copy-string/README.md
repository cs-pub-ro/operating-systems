# Demo: Copy String

Two programs build the very same string (`"John, Paul, George, Joel "`) a hundred million times: one with repeated `strcat()` calls, the other with `strcpy()` calls at precomputed offsets.
The C code looks equally innocent in both cases, but the measured times are not close.
The aim of the demo is to see that a standard library call can hide an algorithmic cost, and that knowing what a function does internally is what lets you write measurably faster code.

Together with the teaching assistant you will fill in the TODO areas in `copy-string.c` and `copy-string-improved.c`, build both programs with `make`, run them, and discuss why the numbers differ.
