# Demo: Debugging an In-Memory Database with GDB and Valgrind

This is the same growable in-memory database from the previous session — except this copy has **three memory bugs** in it.
None of them is a typo you can spot by staring at the file; every line looks reasonable on its own.

The aim is not to guess, but to learn a **procedure**: run the program, observe how it fails, and use a tool to walk backwards from the failure to the line that caused it.
The three bugs are deliberately chosen to fail in three different ways — a crash, a wrong answer, and nothing visible at all — because each one needs a different tool to find it.

Together with the teaching assistant you will fix them one at a time, in the order the program reveals them, rebuilding and rerunning after each fix.
Along the way you will use GDB breakpoints, watchpoints and `print`, and read a Valgrind report.

Note the third bug in advance: a program that produces exactly the right output is **not** necessarily a correct program.
