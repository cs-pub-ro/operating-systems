# Demo: Python Strings Are Immutable, Except When It Would Be Slow

Building a string one character at a time is linear.
Add an assignment that has no effect on the result, and the same loop becomes quadratic.

## Goal

Show that a language's *semantics* and a language's *implementation* are two different things, and that performance follows the implementation while correctness follows the semantics.

## Background

Python strings are immutable.
`s = s + "a"` cannot write into `s`; it has to allocate a new string of `len(s) + 1` characters, copy the old contents into it, append the new character, and rebind the name.
Doing that *N* times copies 1 + 2 + … + *N* characters, which is O(N²).

Except that it usually is not, because CPython cheats.
When the string being extended has exactly one reference left, nobody in the program can tell the difference between a new string and a resized old one, so the interpreter calls `realloc()` and extends it in place.
The loop is then O(N), and the immutability is a fiction maintained for the programmer's benefit.

The cheat is easy to take away.
Assign `s` to a second name first, and the reference count is two, so the interpreter must do what the semantics say.

```python
keep = s            # the shortcut cannot apply any more
s = s + "a"
```

`keep` is never read.
It exists only to hold a reference.

A `bytearray` needs none of this: it is mutable, so writing a byte into it is a write.

## Build and run

```console
python3 string_vs_bytearray.py
```

## Results and explanations

```text
       N       plain      shared   bytearray
   10000     0.0003s     0.0007s     0.0002s
   20000     0.0006s     0.0019s     0.0004s
   40000     0.0011s     0.0084s     0.0008s
   80000     0.0021s     0.0380s     0.0016s
  160000     0.0043s     0.1662s     0.0029s
```

Read down the columns rather than across the rows.

* **plain** doubles when *N* doubles: 0.0003, 0.0006, 0.0011, 0.0021, 0.0043.
  That is O(N), and it is the in-place `realloc()` at work.
* **bytearray** doubles as well, and is a little faster still, because it never allocates after the first line.
* **shared** quadruples: 0.0007, 0.0019, 0.0084, 0.0380, 0.1662.
  That is O(N²), and it is what the language actually promises.

At *N* = 160 000 the difference between the two string columns is a factor of forty, and it keeps growing.
The only difference in the source is an assignment to a variable nobody reads.

What to take from it:

* **The fast path is not part of the contract.**
  It is an optimisation in one implementation of one interpreter.
  Hand the string to a function, store it in a list, keep it in a closure -- anything that takes a second reference -- and the quadratic behaviour returns, with no warning and no error.
* **The right fix is to change the interface, not to chase the optimisation.**
  Collect the pieces into a list and `"".join(pieces)` at the end, or write into a `bytearray` or an `io.StringIO`.
  Those are O(N) by construction rather than by luck.
* This is the same lesson as [`01-copy-string/`](../01-copy-string), one layer up.
  There it was a C library that could not know a length; here it is an interpreter that cannot write into a value it has promised is constant.

## Going further

* Delete the `keep = s` line and confirm that the `shared` column collapses onto the `plain` one.
* Replace `concat_plain` with `"".join("a" for _ in range(n))` and compare.
* Run the same three loops under PyPy, or under a different CPython version, and see which columns change.
  That is the clearest possible demonstration that only the `shared` column is describing the language.
* Use `sys.getrefcount(s)` inside the loop to watch the reference count that decides which path is taken.

## References

* [Python `bytearray`](https://docs.python.org/3/library/stdtypes.html#bytearray)
* [`sys.getrefcount()`](https://docs.python.org/3/library/sys.html#sys.getrefcount)
* CPython's `unicode_concatenate()` in `Python/ceval.c` is where the in-place resize is decided
</content>
