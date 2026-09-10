# Instructor Notes: Sort Products by Price

## Purpose

The second individual exercise, and the deliberate mirror of `01-xor-encrypt`.
XOR was the case where every size was known and `malloc` would have been pointless; this is the case where one size is decided by the input, so `malloc` is exactly right.
Say that pairing out loud — it is the whole reason both exercises exist, and it sets up `03-in-memory-db`, where the count is unknown too.

## Expected solution

Two TODOs:

* **TODO 1** — inside the read loop: `len = strlen(name_buf); products[count].name = malloc(len + 1);`, NULL-check, `memcpy(products[count].name, name_buf, len + 1)`.
* **TODO 2** — after printing: a loop that `free`s `products[i].name` for `i` in `0..count-1`.

The struct, the static array, the read loop, the `qsort` call and the printing are all given.

## The three things worth drawing out

* **Why the array is static but the name is not.** Two lines of the same struct, two different allocation strategies, chosen by what is known when. This is the point; if a student can explain it, they have the exercise.
* **The `+ 1`.** `malloc(strlen(name) + 1)`. Leaving it off is a one-byte heap overflow — invisible on most runs, caught by Valgrind, and the identical bug to the session-04 JSON parser. Worth connecting forward.
* **Free on every path.** The reference frees in the error branch as well as at the end. Students will do the end; ask them what happens to the names already allocated if the *next* `malloc` fails.

## Common mistakes

* **Storing the buffer pointer instead of copying** — `products[count].name = name_buf;`.
  Every product ends up pointing at the same buffer, and after the loop they all read as the last name. The fixed buffer is reused; the string has to be copied somewhere that lasts.
* **`malloc(strlen(name))`** without the `+ 1` — the overflow above.
* **Forgetting to free**, or freeing `MAX_PRODUCTS` names instead of `count` (touching uninitialised pointers past the ones actually read).
* **A subtracting comparator** — `return pa->price - pb->price;` — which wraps for unsigned prices. `products.txt` may not expose it; a crafted pair will.
* **Reaching for `realloc`/a growable array.** Not wrong, but not needed here — the count is fixed. That is next exercise's problem.

## Verified reference values

Measured on Ubuntu 24.04 / gcc 14.2 / x86-64.

| Fact | Value |
| --- | --- |
| `make test` on the shipped `products.txt` | prices come out in ascending order |
| Cheapest / dearest | `Cable organizer` at 7, `Standing desk` at 699 |
| Under Valgrind | 35 allocs, 35 frees (32 names + stdio), 0 bytes in use at exit, 0 errors |
| More than 32 products in the file | first 32 read, still leak-free |

## Practical notes

* `make clean` removes the `products` binary; it is the only build artefact, and it is in `.gitignore`.
* The program takes the file as an optional argument and defaults to `products.txt`, so `./products` alone works from the task directory.
* Nothing here is timing-sensitive.
