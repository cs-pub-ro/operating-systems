# Memory Corruption

For this practice item, you will need to identify the programming mistake that makes it possible to corrupt memory.

Navigate to the `memory-corruption/` directory in the lab archive (or `chapters/data/working-with-memory/drills/tasks/memory-corruption/` if you are working directly in the repository) run `make skels` and enter `support/src/`.
Inspect the source file `segfault.c`.

1. What does the program do? (this could be a quiz in the final form)
1. Compile and run it.
   What happens?
1. Debug the program and find the line that causes the segfault.
   **Note**: Although using `printf()` calls is a viable option, we strongly suggest you use GDB.
1. Fix the program and check your changes by running the `checker.sh` script in `support/tests/`.
1. Analyze the corresponding Python and D implementation.

What is the expected result in each case?
Why?
Run the programs and see what happens.

If you're having difficulties solving this exercise, go through [this](../../../reading/working-with-memory.md) reading material.
