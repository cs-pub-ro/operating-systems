# Going Further: Overflow a Heap Buffer (heap-0)

## Things to try

1. Dump both chunks in `gdb` and identify the 8-byte chunk header between them; explain the 48-byte distance as usable size plus metadata.
1. Find the smallest payload that still wins — one byte past the 48-byte gap is enough.
1. Rebuild with `INPUT_DATA_SIZE = 5` and re-measure: the request now fits the smallest chunk, so the gap shrinks to 32. Rebuild with `INPUT_DATA_SIZE = 48` and it grows to 64. The exploit that reads the two printed addresses keeps working; a hardcoded 48 does not.

## Questions to answer

* **Why is the distance larger than the requested bytes?**
  glibc allocates in 0x10 steps and never smaller than a 0x20-byte usable chunk. `INPUT_DATA_SIZE` is 32, so the request rounds up to a 0x30 (48-byte) usable region, and the next chunk starts 48 bytes on. *Print Heap* shows the exact gap.
* **Why is an inverted win condition the easiest case?**
  You only have to make `safe_var` differ from `"bico"` — any non-empty overwrite does it, so no precise value is required. That precision is what heap-1 adds.
* **How is `safe_var` changed at all, given nothing assigns to it?**
  Only through the overflow; that is the entire point of the challenge.

## Discussion points

* **Heap data is as reachable as stack data** when a neighbouring write is unbounded.
* **Measure, don't guess** — the program hands you both addresses.
* **`scanf("%s")` is the whole vulnerability**, exactly as in the demos.

## References

* `man 3 scanf`, `man 3 malloc`
* [pwntools tubes](https://docs.pwntools.com/en/stable/tubes.html)

## Credits

Adapted from the CyLab Academy heap0 challenge: <https://learn.cylabacademy.org/library/438>.
