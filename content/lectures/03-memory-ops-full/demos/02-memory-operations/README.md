# Demo: Memory Operations

Two demos for part 02, on what a program can do with memory and what stops it.

| Demo | What it shows |
| --- | --- |
| [`basic-memory-operations/`](basic-memory-operations) | The five operations in twelve lines -- allocate, write, read, execute, free -- and the one that faults. |
| [`memory-access/`](memory-access) | The same accesses against the areas a program already has: read and write data, read and execute code, and three ways to crash. |

The first shows that execute is a permission like any other; the second shows that every area has its own set.
