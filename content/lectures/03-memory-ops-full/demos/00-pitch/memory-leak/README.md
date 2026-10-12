# Demo: Memory You Forget to Free Is Gone

A task scheduler creates a million tasks and processes the urgent ones.
Each processed task is freed; the name inside it is not.

## Goal

Show a memory leak as it happens in real code -- one `free()` short, forty bytes at a time -- and the tool that finds it.
It is the "correctness" and "efficiency" reason of the pitch, and it is lab 03's `valgrind` requirement before lab 03.

## Background

`task.c` is a cut-down version of the kind of loop that runs in an embedded scheduler.
`createTask()` allocates a `Task` and, separately, a copy of its name with `strdup()`; `processHighPriorityTasks()` handles every task above priority 5 and frees the `Task`.
It does not free `task->name`.
Every twentieth iteration processes about half the tasks created so far, so the leak is proportional to the run: 4,000 names by the end.

The name is a nod to the 1997 Mars Pathfinder lander, whose resets came from a task-scheduling bug (a priority inversion rather than a leak, but in a system of exactly this shape, where every byte and every microsecond was accounted for).
On a spacecraft there is no restart button, and a leak of forty bytes per task is a mission ended in a few weeks.

## Build and run

```console
make
valgrind ./task > /dev/null
valgrind --leak-check=full ./task > /dev/null
```

The program prints a line per processed task; `> /dev/null` keeps that out of the way.

## Results and explanations

```text
$ valgrind --leak-check=full ./task > /dev/null
==758988== HEAP SUMMARY:
==758988==     in use at exit: 39,556 bytes in 4,000 blocks
==758988==   total heap usage: 20,001 allocs, 16,001 frees, 262,986 bytes allocated
==758988==
==758988== 39,556 bytes in 4,000 blocks are definitely lost in loss record 1 of 1
==758988==    at 0x484A858: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==758988==    by 0x4939EDE: strdup (strdup.c:42)
==758988==    by 0x109253: createTask (task.c:25)
==758988==    by 0x1093F0: main (task.c:52)
==758988==
==758988== LEAK SUMMARY:
==758988==    definitely lost: 39,556 bytes in 4,000 blocks
```

Read it from the bottom up.
20,001 allocations and 16,001 frees: 4,000 blocks were never freed.
They were allocated by `strdup()`, called from `createTask()` at `task.c:25`: the names.
"Definitely lost" means no pointer to them exists any more -- the `Task` that held the only pointer was freed -- so nothing could free them even if it wanted to.

The fix is one line, `free(tasks[i]->name);` before `free(tasks[i]);`, and `valgrind` then reports `All heap blocks were freed -- no leaks are possible`.

Two things to notice about the shape of the bug:

* **The program is correct.**
  It prints the right output and exits with status 0.
  A leak is not a crash; it is a program that slowly becomes impossible to run.
* **The leak is in the pair, not in either call.**
  `malloc()` and `strdup()` are both right; `free(tasks[i])` is right.
  The bug is that every allocation needs its own `free()`, and the second one is missing.
  Lab 03's rule, "free on every path", is this bug generalised.

## Going further

* Raise the loop count tenfold and watch `rss` in `top` climb through the run; that is what a leak looks like without `valgrind`.
* `valgrind --leak-check=full --show-leak-kinds=all` adds "still reachable" blocks: memory that was not freed but could have been.
  The cleanup loop at the end of `main()` is there so that only the real leak shows.
* Lab 03's [`03-in-memory-db`](../../../../../labs/03-memory-ops-full/03-in-memory-db) and the [`demo-copy-file`](../../../../../labs/03-memory-ops-full/demo-copy-file) variants use the same tool as a pass/fail check.

## References

* `man 1 valgrind`, [the Memcheck manual](https://valgrind.org/docs/manual/mc-manual.html)
* Mike Jones, [What really happened on Mars?](https://www.cs.cmu.edu/afs/cs/user/raj/www/mars.html)
