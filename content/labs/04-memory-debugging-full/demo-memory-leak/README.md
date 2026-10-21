# Demo: Finding a Memory Leak With Valgrind

**Tools:** GCC, Make, Valgrind

## Goal

Reference version of `shout`, with its one leak removed.
The demo exists to show what a memory leak looks like from the outside, which is nothing, and how to read the Valgrind report that finds it.

## Background

The program reads lines from standard input and prints each one in upper case, numbered.
`main()` reads every line into the same buffer, so `upper_copy()` cannot hand back a pointer into it: it allocates a copy on the heap and returns that.

```C
/*
 * Return an upper-case copy of s.
 *
 * The copy is allocated on the heap, because the caller keeps reusing its
 * own line buffer. Whoever calls this function owns the copy.
 */
static char *upper_copy(const char *s)
```

The last sentence of that comment is the whole demo.
`main()` owns the copy, and the buggy version of `main()` never freed it.

Files:

* `main.c` — the fixed implementation.
* `input.txt` — six lines.

## Build & Run

```console
make
./shout < input.txt
```

```text
  1: THE PROGRAM PRINTED THE RIGHT ANSWER
  2: AND THE TEACHING ASSISTANT SAID IT WAS NOT FINISHED
  3: SO WE RAN IT UNDER VALGRIND
  4: AND VALGRIND SAID: DEFINITELY LOST
  5: EVERY LINE WE READ WAS COPIED TO THE HEAP
  6: AND NOT ONE OF THE COPIES WAS EVER FREED
```

The buggy version prints exactly the same thing.
That is the point of the demo.

## Results and Explanations

### What the leak looks like without Valgrind

Nothing.
The output is right, the exit status is 0, and `-Wall -Wextra` has nothing to say.
The only sign is that the process gets bigger the longer it runs: on ten thousand lines of input, the buggy version holds about 60 KB more than the fixed one when it exits, and the number grows with every line.
Nobody notices that on a program that runs for a second; everybody notices it on a server that runs for a month.

### The report

```console
valgrind --leak-check=full ./shout < input.txt
```

On the buggy version:

```text
==1476722== HEAP SUMMARY:
==1476722==     in use at exit: 241 bytes in 6 blocks
==1476722==   total heap usage: 8 allocs, 2 frees, 8,433 bytes allocated
==1476722==
==1476722== 241 bytes in 6 blocks are definitely lost in loss record 1 of 1
==1476722==    at 0x484A858: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==1476722==    by 0x109238: upper_copy (main.c:25)
==1476722==    by 0x1092D9: main (main.c:44)
==1476722==
==1476722== LEAK SUMMARY:
==1476722==    definitely lost: 241 bytes in 6 blocks
==1476722==    indirectly lost: 0 bytes in 0 blocks
==1476722==      possibly lost: 0 bytes in 0 blocks
==1476722==    still reachable: 0 bytes in 0 blocks
==1476722==         suppressed: 0 bytes in 0 blocks
==1476722==
==1476722== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```

Read it from the top:

* **`HEAP SUMMARY`.**
  Eight allocations, two frees: six blocks were never given back, and they add up to 241 bytes.
  The two blocks that *were* freed are not ours; they are the buffers stdio keeps behind `stdin` and `stdout`, and the C library frees them at exit.
* **The loss record.**
  `241 bytes in 6 blocks are definitely lost` says what was lost; the stack trace under it says where those blocks were **allocated**: `malloc()`, called by `upper_copy()` at line 25, called by `main()` at line 44.
  It does not say where the `free()` is missing, because there is no such place.
  A leak is not an event; it is the absence of one.
  The report can only tell you where the orphaned blocks came from, and leave the rest to you.
* **`LEAK SUMMARY`.**
  *Definitely lost* means that at exit no pointer to the block existed anywhere, so nothing could ever have freed it.
  The other kinds are explained in the session's cheatsheet; the one you will meet most is *still reachable*, which means a pointer did exist and the program simply did not call `free()` before exiting.
* **`ERROR SUMMARY`.**
  With `--leak-check=full`, a definite leak counts as an error.

Six blocks for six lines, and 241 bytes is the size of `input.txt` plus six terminating zeros.
That arithmetic is worth doing once by hand, because it turns the report from a verdict into a prediction you can check.

### Without `--leak-check=full`

```console
valgrind ./shout < input.txt
```

```text
==1476736==    definitely lost: 241 bytes in 6 blocks
==1476736== Rerun with --leak-check=full to see details of leaked memory
```

The totals are there and the stack trace is not.
Always run with the flag; the line number is the whole point.

### The fix

```C
		lineno++;
		printf("%3u: %s", lineno, shout);

		/*
		 * FIX: main() owns the copy, so main() frees it, once it is
		 * done with it. Without this line the pointer is overwritten
		 * by the next iteration and the block can never be freed.
		 */
		free(shout);
```

Two questions decide where the line goes.
*Who* frees: the owner, which the comment above `upper_copy()` says is the caller.
*When*: as soon as the owner is done with the block, which is right after the `printf()`, inside the loop, so that every iteration cleans up after itself.
Putting the `free()` before the `printf()` trades the leak for a use of freed memory, which Valgrind reports as an `Invalid read` inside `printf()`; putting it after the loop frees only the last copy.

### Confirming the result

```console
valgrind --leak-check=full ./shout < input.txt
```

```text
==1476794== HEAP SUMMARY:
==1476794==     in use at exit: 0 bytes in 0 blocks
==1476794==   total heap usage: 8 allocs, 8 frees, 8,433 bytes allocated
==1476794==
==1476794== All heap blocks were freed -- no leaks are possible
==1476794==
==1476794== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

Same allocations, and now every one has its `free()`.
**"All heap blocks were freed"** plus **"0 errors from 0 contexts"** is the result to aim for in every program from now on.

### The lesson

**Correct output proves nothing about memory.**
This program passes every test that checks what it prints, and it is still broken.

**Every heap block has an owner**, and the owner's job is to call `free()` exactly once, when it is done.
A function that returns heap memory must say in its comment that the caller becomes the owner; a caller that reads that comment knows it has a `free()` to write.
Most leaks are not a line that is wrong but an owner that forgot.

## References

* `man 1 valgrind`, and the [Valgrind quick start guide](https://valgrind.org/docs/manual/quick-start.html)
* [The Memcheck manual on leak kinds](https://valgrind.org/docs/manual/mc-manual.html#mc-manual.leaks)
* `man 3 malloc`, `man 3 free`
