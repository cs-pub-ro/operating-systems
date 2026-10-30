# Demo: Searching a File With Several Threads

`search.c` looks for a word in a large file, with as many threads as you ask for: the file is mapped into memory once, cut into equal parts, and each thread counts the matches in its own part.
Mapping the file and counting matches in a region are written; what is missing is cutting the file into regions, starting a thread on each, and waiting for them all.

Together with the teaching assistant you will generate a 64 MiB file with `gen_text`, fill in the three TODOs in `search.c`, and run the search with one, two, four and eight threads.
Two things to look at: the order the threads report in, and whether the per-thread counts add up to what `grep -o` finds.

Use the already existing `gen_text` file to create a new text file of a given size (`./gen_text out.txt 64`).
