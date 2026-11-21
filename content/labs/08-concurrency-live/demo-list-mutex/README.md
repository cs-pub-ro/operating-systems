# Demo: A Linked List, and One Mutex

`thread-list-app.c` starts ten threads that each do two thousand random actions on one doubly-linked list of integers: add at the front, add at the back, insert at a position, remove from a position, search.
The list itself is in `list.c`, and is the one from the lecture: it keeps its size in a variable next to the nodes.
When the threads are done, the program prints the size the list kept and the number of nodes found by walking it; the two should be the same number.

Together with the teaching assistant you will run it a few times and look at how it ends.
Then you will fill in the two TODOs in `thread-list-app.c`: declare a mutex, and lock it around the statements that use the list.
Two things to look at afterwards: whether the two numbers agree on every run, and whether reading the size, which the position of an insert or a remove is chosen from, belongs inside the lock or outside it.
