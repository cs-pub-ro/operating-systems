# Exercise: The Program That Is Right and Still Broken

**Tools:** GCC, Make, Valgrind

## Goal

Reference (leak-free) implementation of the longest-word program.
The exercise exists to make one point: this program's output is correct on every input anyone would test it with, and it is broken anyway.

## Background

The program reads whitespace-separated words from standard input and reports how many there were and which one was the longest:

```C
struct tracker {
	char *longest;	/* heap copy of the longest word seen so far */
	size_t length;	/* its length                                */
	size_t words;	/* how many words we have looked at           */
};
```

`main()` reads each word into a buffer it reuses, so the tracker cannot simply remember the pointer — it has to keep its own copy, which `strdup()` allocates on the heap.
That single sentence is the whole design, and the whole bug: **the struct owns the string it points to**, and an owner has obligations.

Files:

* `main.c` — the fixed implementation.
* `input.txt` — twenty-one sample words.

## Build & Run

```console
make
./longest < input.txt
```

```text
read 21 words
longest word: extraordinarily (15 characters)
```

Exactly the same output as the buggy version — that is the point of the exercise.
The difference only appears under Valgrind.

```console
valgrind --leak-check=full ./longest < input.txt
```

```text
==2745183== HEAP SUMMARY:
==2745183==     in use at exit: 0 bytes in 0 blocks
==2745183==   total heap usage: 6 allocs, 6 frees, 8,225 bytes allocated
==2745183==
==2745183== All heap blocks were freed -- no leaks are possible
==2745183==
==2745183== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

Same allocation count as the buggy version; every block now has a matching `free`.

## Results and Explanations

### The bug

`tracker_offer()` replaced the longest word seen so far with a fresh copy:

```C
t->longest = strdup(word);
```

A pointer variable holds exactly one address.
Assigning a new one over it drops the only reference to the previous heap copy — and once the last pointer to a block is gone, **no code in the universe can free it**.
That is what a leak is: not a mistake at some particular moment, but the permanent absence of a future `free()`.

The fix releases the old string before taking ownership of the new one:

```C
copy = strdup(word);
if (copy == NULL)
	return;		/* out of memory: keep the previous winner */

free(t->longest);
t->longest = copy;
t->length = len;
```

Two details in there are worth more than the fix itself:

* **`free(NULL)` is legal and does nothing.**
  The very first word therefore needs no special case — no `if (t->longest != NULL)` around the `free`.
* **The order matters, twice over.**
  `strdup()` runs *before* the `free()`, so that a failed allocation leaves the previous winner intact rather than destroying it.
  And the `free()` runs *before* the assignment, because after the assignment the old address is gone.
  Swap either pair and the fix becomes a different bug.

### Which blocks leaked

Four words in `input.txt` are longer than every word before them: `the`, `quick`, `jumped` and `extraordinarily`.
So the program makes four heap copies, `main()` frees the last one, and the first three are lost:

```text
==...== 17 bytes in 3 blocks are definitely lost in loss record 1 of 1
==...==    definitely lost: 17 bytes in 3 blocks
```

Seventeen bytes is `4 + 6 + 7` — each string plus its terminator.
The arithmetic is worth doing by hand once, because it turns the leak report from a verdict into a prediction you can check.

### Reading a leak report

Notice what the stack trace in a leak report points at: the **allocation** site, `strdup()` inside `tracker_offer()`.

It cannot point anywhere else.
A leak has no moment at which it happens — there is no line where something went wrong, only a line that never ran.
The best a tool can do is tell you where the orphaned block came from and leave the reasoning to you.
This is the practical difference between a leak report and an invalid-access report, which names the exact instruction that misbehaved.

`--leak-check=full` also sorts leaks into four categories, and the distinction matters:

* **definitely lost** — no pointer to the block exists anywhere. This is a real leak.
* **indirectly lost** — reachable only through a definitely-lost block, e.g. the children of a leaked tree node.
* **possibly lost** — a pointer exists, but into the middle of the block rather than to its start.
* **still reachable** — a pointer exists at exit; the program simply never freed it.
  Common, often harmless, and not what this exercise is about.

### The lesson

**A correct answer is not a correctness proof.**

This program passes every functional test anyone would write for it.
It would pass code review.
It leaks a little more memory for every word that sets a new record, which on a 21-word input is 17 bytes and on a long-running process is an outage.

The general rule the fix expresses: **an owner must release the old resource before taking a new one.**
Most memory bugs are unclear ownership rather than unclear code, which is why "who owns this pointer?" is usually a faster question than "what does this line do?".

## References

* `man 3 strdup`, `man 3 free` — in particular that `free(NULL)` is defined to do nothing
* `man 1 valgrind`, and the [Valgrind manual on leak categories](https://valgrind.org/docs/manual/mc-manual.html#mc-manual.leaks)
