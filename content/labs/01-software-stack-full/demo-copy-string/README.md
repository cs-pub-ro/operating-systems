# Demo: Copy String

**Tools:** GCC, Make

## Goal

Show that two ways of building the same string, both written with ordinary `<string.h>` calls, differ measurably in cost — and that the difference comes from what the library function has to *find out* before it can do its job.

## Background

Two programs build the same string, `"John, Paul, George, Joel "`, 100,000,000 times and report the elapsed time:

* `copy-string` — uses `strcat()` repeatedly.
  `strcat(dst, src)` must walk `dst` from the beginning to find its null terminator before it can copy anything.
* `copy-string-improved` — uses `strcpy()` at precomputed offsets, writing each fragment directly to its final position without re-scanning.

A C string does not carry its length.
`strcat()` therefore cannot know where `dst` ends; it has to look, on every single call.
The caller, on the other hand, *does* know — the fragment lengths are compile-time constants — and simply refuses to throw that knowledge away.

## Build & Run

```console
make
./copy-string
./copy-string-improved
make clean
```

Each program prints the elapsed time in microseconds, for example:

```text
time passed 3241847 microseconds
time passed 891203 microseconds
```

The absolute numbers depend on the machine; the ratio between them is the result.

## Results and Explanations

### `copy-string` (slow)

```C
bigString[0] = '\0';
strcat(bigString, "John, ");
strcat(bigString, "Paul, ");
strcat(bigString, "George, ");
strcat(bigString, "Joel ");
```

With four consecutive `strcat()` calls:

* the 1st call scans 0 characters before appending;
* the 2nd call scans 6 characters (`"John, "`);
* the 3rd call scans 12 characters (`"John, Paul, "`);
* the 4th call scans 20 characters (`"John, Paul, George, "`).

That is 38 characters scanned to write 25.
The redundant scanning grows with the number of fragments, and it repeats on every one of the 100,000,000 iterations.

### `copy-string-improved` (fast)

```C
strcpy(bigString, "John, ");
strcpy(bigString + 6, "Paul, ");
strcpy(bigString + 6 + 6, "George, ");
strcpy(bigString + 6 + 6 + 8, "Joel ");
```

`strcpy()` copies bytes from source to destination without scanning the destination first.
The target offset is a constant known at compile time, so each fragment goes straight to its final position and nothing is scanned twice.

Note that the offsets are the lengths of the *preceding* fragments accumulated: 6 for `"John, "`, another 6 for `"Paul, "`, then 8 for `"George, "`.
Getting one of these wrong is the classic mistake here, and it produces a wrong string rather than a crash.

### Why the difference matters

`strcat()` is O(n) in the current length of the destination string.
Called k times to build a string of total length L, the total work is O(L·k) per iteration.

`strcpy()` with explicit offsets is O(1) per fragment beyond the fragment length itself, giving O(L) per iteration.

For four fragments this is "only" a constant-factor improvement, and it is already clearly visible at 10⁸ iterations.
The exercise `01-string-functions` takes the same idea further: when the number of fragments grows, the same scanning turns the whole loop from linear into quadratic.

## References

* `man 3 strcat`, `man 3 strcpy`, `man 3 memcpy`
* Joel Spolsky, [Back to Basics](https://www.joelonsoftware.com/2001/12/11/back-to-basics/) — the origin of the "Shlemiel the painter" description of repeated `strcat`
