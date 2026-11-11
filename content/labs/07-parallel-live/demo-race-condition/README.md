# Demo: A Race Condition, and a Mutex

`counter.c` starts several threads that each add one to the same global variable, a given number of times.
Four threads adding a million times each should leave four million in the counter, and nothing in the program looks as if it could do anything else.

Together with the teaching assistant you will run it a few times, with different numbers of threads and of increments, and look at what the counter holds at the end.
Then you will fill in the three TODOs in `counter.c`: declare a mutex, initialize it, and lock it around the one statement that needs it.
Two things to look at afterwards: whether the result is now right on every run, and how much longer the program takes, with `time`.
