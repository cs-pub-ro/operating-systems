# Demo: Two Ways to Build the Same String

Two programs assemble the string `John, Paul, George, Joel` ten million times and print how long it took.
They produce the same 24 characters, they call the same standard library, and one of them takes around thirty times longer than the other.

## Goal

Show that the cost of a library call is a property of its *interface*, not only of its implementation, and that no amount of optimisation inside `strcat()` can remove a cost the signature of `strcat()` forces on it.

## Background

`strcat(dst, src)` appends `src` to the end of `dst`.
The only thing it is given is the address where `dst` starts, so before it can copy anything it has to find where `dst` ends, and the only way to do that is to read forward from the beginning until it meets the terminating `'\0'`.

That is the whole demo.
In `copy-string.c` the destination gets longer with every call, so the four calls of one round walk 0, then 6, then 12, then 20 characters before they write a single byte.
In `copy-string-improved.c` the program already knows how long each piece is, because the pieces are string literals, so every `strcpy()` starts writing immediately.

The bytes written are identical.
What disappears is the repeated re-reading of what has already been written.

## Build and run

```console
make
./copy-string
./copy-string-improved
```

## Results and explanations

```text
$ ./copy-string
result: 'John, Paul, George, Joel'
time passed: 309604 microseconds

$ ./copy-string-improved
result: 'John, Paul, George, Joel'
time passed: 10475 microseconds
```

Both print the same string, which is the point: this is not a comparison between a correct program and a faster wrong one.

The ratio on the machine these numbers were taken on is about 30x.
Yours will differ; what should reproduce is that the gap is large and stable across runs, and that it grows if you make the pieces longer.

Three things are worth saying out loud about this result.

* **glibc's `strcat()` is not slow.**
  It is hand-written, it uses SIMD instructions to scan sixteen or thirty-two bytes at a time, and it is almost certainly faster than anything you would write.
  It still loses, because it is being asked to do work that the other program simply does not do.
* **The missing information is the length.**
  A C string does not carry its length; it carries a terminator, and the length has to be recovered by scanning.
  Languages whose strings carry a length -- Pascal, Rust, Go, Python -- cannot lose this way, and pay for it with a bigger string representation.
  That is a trade-off, not a mistake.
* **The shape of the cost is worse than the constant.**
  Building a string of *n* pieces with `strcat()` is O(n²) in the length of the result.
  Doubling the number of pieces roughly quadruples the time, while the `strcpy()` version doubles it.
  A thirty-times constant is annoying; a quadratic is a bug waiting for a bigger input.

## Going further

* Raise `NUM_ROUNDS`, or add more pieces to the string, and check that the gap widens the way the O(n²) argument predicts.
* Rewrite the `strcat()` version to keep a running `size_t len` and call `strcpy(big_string + len, piece)`, updating `len` as it goes.
  It should land within noise of `copy-string-improved`.
  This is exactly what a length-carrying string type does for you.
* Look at what the compiler did: `gcc -O2 -S copy-string-improved.c` will often replace `strcpy()` of a literal with an inline store, because it knows the length at compile time.
  Ask yourself why it cannot do the same for `strcat()`.
* Session 01 of the lab takes this apart properly, in [`demo-copy-string`](../../../../../labs/01-software-stack-full/demo-copy-string) and [`01-string-functions`](../../../../../labs/01-software-stack-full/01-string-functions).

## References

* `man 3 strcat`, `man 3 strcpy`
* [Back to Basics: Why C strings are the way they are](https://www.joelonsoftware.com/2001/12/11/back-to-basics/), Joel Spolsky -- the "Shlemiel the painter" algorithm is this demo
</content>
