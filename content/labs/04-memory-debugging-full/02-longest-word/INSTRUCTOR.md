# Instructor Notes: The Program That Is Right and Still Broken

## Purpose

The short, easy exercise of the session, and the deliberate opposite of the one before it.

In `01-grade-histogram` the output was wrong and Valgrind was silent.
Here the output is **right** and Valgrind is the only thing that objects.
Run the two together in the debrief; the pair is the lesson, and neither half makes the point on its own.

## Expected answer

```C
copy = strdup(word);
if (copy == NULL)
	return;

free(t->longest);
t->longest = copy;
t->length = len;
```

Three statements, and each of the other orderings is a different bug:

* Free **after** assigning — frees the new string, and the old one is still leaked.
* Free **before** allocating — a failed `strdup()` leaves `t->longest` dangling.
* Guard the free with `if (t->longest != NULL)` — harmless, but worth pointing out that `free(NULL)` is defined to do nothing.

A student who writes the correct three lines without thinking about the order has not finished the exercise.
Ask them what happens when `strdup()` fails.

## The arithmetic worth making them do

Four words in `input.txt` beat everything before them: `the`, `quick`, `jumped`, `extraordinarily`.
Four allocations, one freed by `main()`, three leaked:

```text
17 bytes in 3 blocks are definitely lost
```

`17 = 4 + 6 + 7`, each string plus its terminator.

Have them predict the block count and the byte count **before** running Valgrind.
It turns the report from a verdict they accept into a prediction they can check, and it is the fastest way to make the leak concrete for students who find "definitely lost" abstract.

## Points to hammer

* **A pointer variable holds one address.**
  Overwrite it and the previous block is unreachable — after that no code can free it, ever.
  A leak is not a mistake at a moment; it is the permanent absence of a future `free()`.
* **The leak report points at the allocation.**
  It has to: there is no line where the leak happened.
  Students routinely go to the `strdup()` line and try to fix *it*.
* **`free(NULL)` is legal**, which is why no special case for the first word is needed.
* **The output was correct the whole time.**
  Ask what test would have caught this. The answer is: no functional test, only a memory tool.
* **Leak categories.**
  "definitely lost" versus "still reachable" is worth thirty seconds; students will meet "still reachable" on real programs and panic about it.

## Other things students get wrong

* **Freeing in `tracker_report()`** instead of in `tracker_offer()`, which fixes the final block that was never the problem.
* **Removing the `strdup()` and storing the caller's pointer.**
  Now the tracker points into `main()`'s reused buffer and reports the last word read, not the longest.
  If someone does this, the output changes and they will notice — it is a useful failure.
* **Adding `free(t.longest)` twice in `main()`**, producing an invalid free.
* **Declaring victory on "0 errors" without `--leak-check=full`.**
  Plain `valgrind ./longest` reports the leak summary but not the details; insist on the full flag.

## Verified reference values

| Version | Result |
| --- | --- |
| Buggy | correct output; 17 bytes in 3 blocks definitely lost, 1 error from 1 context |
| Fixed | identical output; 6 allocs, 6 frees, 8,225 bytes; 0 errors from 0 contexts |

Six allocations, not four: the extra two are stdio's internal buffers, which the C library releases itself.
Someone always asks.

Edge cases on the fixed version: `printf 'aaa\n'` gives one word and no leak; empty input reports "no words at all" and must not crash; `printf 'zz\naaa\nbbbb\naaaaa\n'` exercises four consecutive record-setters in a row.

## Practical notes

* This is the shortest exercise in the session — most groups finish it in well under half the time they spent on `01-grade-histogram`.
  It is the natural place to catch up if the demo overran.
* Needs Valgrind to work at all, unlike `01-grade-histogram`.
  See the session-level notes for the `ulimit -n 1024` fix if Memcheck refuses to start.
