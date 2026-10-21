# Demo: Finding a Memory Leak With Valgrind

`shout` reads lines and prints each one in upper case, numbered.
Its output is right on every input, it never crashes, and the compiler has nothing to say about it.
It still has a bug: every line it reads is copied onto the heap and never given back.

The aim is to see what a leak looks like from the outside, which is nothing at all, and from Valgrind, which is a report that names the line the lost memory was allocated on.
Together with the teaching assistant you will run the program under Valgrind, read the report line by line, fix the leak, and run Valgrind again until it says that all heap blocks were freed.
