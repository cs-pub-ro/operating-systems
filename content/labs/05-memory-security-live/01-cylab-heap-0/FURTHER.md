# Going Further: Overflow a Heap Buffer (heap-0)

Optional.

## Things to try

1. Dump both chunks in `gdb` and identify the chunk header between them.
   Explain the overflow distance (48 bytes) in terms of usable size plus metadata, not as a magic number.
1. Find the smallest payload that still wins.
1. Rebuild with `INPUT_DATA_SIZE` set back to 5 and re-measure: the gap shrinks to 32.
   Set it to 48 instead and the gap grows to 64. Why does the request size move `safe_var`?
1. Solve it against a local deployment (`deploy/`) as well as against the local binary, and compare the two.

## Questions to answer

* Why is the overflow distance larger than the bytes requested from `malloc`?
* The win condition is *inverted* — you win by making `safe_var` anything but its start value. Why does that make this the easiest challenge of the set?
* Nothing in the program assigns to `safe_var`. How is it changed at all?

## Discussion points

* **Data on the heap is exactly as reachable as data on the stack** if a nearby write is unbounded.
* **Measure, don't guess.** The program hands you both addresses.
* **`scanf("%s")` is the whole vulnerability**, the same as in the demos.

## References

* `man 3 scanf`, `man 3 malloc`
* [pwntools tubes](https://docs.pwntools.com/en/stable/tubes.html)

## Credits

Adapted from the CyLab Academy heap0 challenge: <https://learn.cylabacademy.org/library/438>.
