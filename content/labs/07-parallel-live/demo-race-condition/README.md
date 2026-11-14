# Demo: A Race Condition, and a Mutex

`messages.c` starts several threads that each write messages to one shared file, a given number of times.
A message is one line, `thread <t>: message <i>`, written in three calls to `write()`: the thread's name, the word `message`, and the number.
Four threads writing a thousand messages each should leave four thousand whole lines in `messages.txt`, and nothing in the program looks as if it could do anything else.

Together with the teaching assistant you will run it a few times, with different numbers of threads and of messages, and look at how many lines come out whole, and at the file itself.
Then you will fill in the three TODOs in `messages.c`: declare a mutex, initialize it, and lock it around the statements that need it.
Two things to look at afterwards: whether every line is now whole on every run, and how long the program takes, with `time`, next to the same messages written by one thread.
