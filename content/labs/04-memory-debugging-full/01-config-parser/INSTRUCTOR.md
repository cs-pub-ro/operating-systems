# Instructor Notes: The Config Parser That Forgets

## Purpose

The first exercise students do alone, and a direct build-up from `demo-memory-leak`: the same report, twice, with two different owners to find.
It is meant to be the easy one.
A student who has followed the demo should need the report, the two block counts and ten minutes.

## Expected answer

Two lines:

```C
		free(cfg->settings[i].value);	/* in config_free(), next to the key */
```

```C
		free(value);			/* in main(), after the printf() */
```

Either on its own makes one loss record disappear and leaves the other; insist on a Valgrind run that ends with `All heap blocks were freed`.

## The arithmetic worth making them do

Before they read any code, have them match the two records to the two allocation sites from the counts alone:

* six settings in `config.txt`, six blocks in record 2, allocated in `config_add()`;
* four lookups in `main()`, three of them found, three blocks in record 1, allocated in `config_get()`.

The bytes work too: 30 characters plus three terminators is 33, and 49 characters plus six is 55.
Matching the numbers to the code before touching it is the habit the exercise is for.

## Points to hammer

* **Valgrind groups leaks by where the blocks were allocated.**
  Two records means two allocation sites, not two bugs per se; here they happen to be both.
* **Count what a struct owns.**
  Two `strdup()` calls in `config_add()` need two `free()` calls in `config_free()`.
  Line the allocations and the releases up and the missing one is obvious.
* **Read the comment above the function that returns a pointer.**
  "The caller owns the copy" is a `free()` the caller has to write.
  Every library has functions like this; `strdup()`, `getline()` and `realpath()` are three from the C library alone.
* **`free(NULL)` is legal.**
  The `(not set)` path needs no special case.

## Other things students get wrong

* **Freeing inside `config_get()`** before returning the copy.
  The pointer `main()` receives is then dangling; Valgrind reports `Invalid read` inside `printf()`.
  Ask who owns the copy, and whether a function may free what it has just handed over.
* **Changing `config_get()` to return `cfg->settings[i].value` itself.**
  It removes the leak, and it changes the contract: the comment is now wrong, and a caller that keeps the pointer past `config_free()` has a use after free.
  Acceptable if they update the comment and can say what the caller lost; it makes a good discussion.
* **Fixing one record and stopping**, because the report got shorter.
  Shorter is not clean.
* **Freeing `value` only when it is not `NULL`.**
  Harmless; point at `man 3 free`.
* **Looking for the leak in `trim()` or `config_load()`**, where the string handling is, rather than following the stack trace.
  The trace names the function; make them start there.

## Verified reference values

| Version | Result |
| --- | --- |
| Buggy | correct output; 18 allocs, 9 frees; 88 bytes in 9 blocks definitely lost, in two records (33 bytes in 3 blocks from `config_get()`, 55 bytes in 6 blocks from `config_add()`) |
| FIX 1 only | 18 allocs, 15 frees; 33 bytes in 3 blocks definitely lost |
| Both fixes | identical output; 18 allocs, 18 frees, 8,805 bytes; 0 errors from 0 contexts |

Eighteen allocations: six keys, six values, three copies, and three of stdio's own (`stdout`, and the `FILE` and its buffer for the config file).

## Practical notes

* Needs Valgrind to work at all; see the session-level notes for the `ulimit -n 1024` fix.
* `config.txt` is written so that one looked-up key is missing on purpose, to exercise the `NULL` path of the fix.
  If a student adds `timeout` to the file, the first record grows to four blocks and the exercise still works.
