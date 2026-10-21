# Demo: Debugging an In-Memory Database

This is the growable in-memory database from the previous session, with **two bugs** planted in it.
Every line looks reasonable on its own; staring at the file is not how they are found.

The aim is the routine, not the bugs: run the program, look at how it fails, and use a tool to get from the failure to the line.
The first bug crashes the program: GDB shows where, and one print shows why.
The second one makes the program print a wrong answer and nothing else: a print shows what moved, and Valgrind confirms it.

Together with the teaching assistant you will fix the two bugs one at a time, in the order the program reveals them, rebuilding and rerunning after each fix.
