# Going Further: Overflow a Heap Buffer (heap-0)

Optional.

## Things to try

1. Dump both chunks in `gdb` and identify the chunk header between them.
   Explain the overflow distance in terms of usable size plus metadata, not as a magic number.
1. Find the smallest payload that still wins.
1. Rebuild with `INPUT_DATA_SIZE` set to 40 and re-measure.
   Does the allocator now put `safe_var` further away, and why?
1. Solve it against a local deployment (`deploy/`) as well as against the local binary, and diff the two exploit invocations.

## Questions to answer

* Why is the overflow distance larger than the 5 bytes requested?
* The win condition is *inverted* — you win by making `safe_var` anything but its start value. Why does that make this the easiest challenge of the set?
* Nothing in the program assigns to `safe_var`. How is it changed at all?

## Discussion points

* **Data on the heap is exactly as reachable as data on the stack** if a nearby write is unbounded.
* **Measure, don't guess.** The program hands you both addresses.
* **`scanf("%s")` is the whole vulnerability**, the same as in the demos.

## References

* `man 3 scanf`, `man 3 malloc`
* [pwntools tubes](https://docs.pwntools.com/en/stable/tubes.html)
