#!/usr/bin/env python3

"""Three ways to build a string of N characters, one character at a time.

Python strings are immutable: `s = s + "a"` cannot write into `s`, it has to
build a brand new string of len(s) + 1 characters and copy the old one into it.
Doing that N times copies 1 + 2 + ... + N characters, which is O(N^2).

CPython hides this.  When the string being extended has exactly one reference
left, the interpreter knows nobody can tell the difference and resizes it in
place instead, which brings the loop back to O(N).  Keeping a second reference
alive -- the `shared` column -- takes the shortcut away and shows the cost the
language semantics actually imply.

A `bytearray` is mutable, so writing into it is a write, with no copy and no
shortcut needed.
"""

import time


def concat_plain(n):
    """s = s + 'a', with CPython free to resize the string in place."""
    s = ""
    for _ in range(n):
        s = s + "a"
    return s


def concat_shared(n):
    """The same loop, with a second reference blocking the in-place resize."""
    s = ""
    for _ in range(n):
        keep = s            # noqa: F841  (the point is that it holds a reference)
        s = s + "a"
    return s


def mutate_bytearray(n):
    """A mutable buffer, written one byte at a time."""
    ba = bytearray(n)
    for i in range(n):
        ba[i] = 0x61
    return ba


def timed(function, n):
    start = time.perf_counter()
    function(n)
    return time.perf_counter() - start


def main():
    print(f"{'N':>8}  {'plain':>10}  {'shared':>10}  {'bytearray':>10}")
    for n in (10000, 20000, 40000, 80000, 160000):
        plain = timed(concat_plain, n)
        shared = timed(concat_shared, n)
        buffer = timed(mutate_bytearray, n)
        print(f"{n:>8}  {plain:>9.4f}s  {shared:>9.4f}s  {buffer:>9.4f}s")

    print()
    print("Doubling N doubles the 'plain' and 'bytearray' columns: both are O(N).")
    print("It quadruples the 'shared' column, which is the O(N^2) of immutability.")


if __name__ == "__main__":
    main()
