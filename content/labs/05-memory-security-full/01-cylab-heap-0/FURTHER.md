# Going Further: Overflow a Heap Buffer (heap-0)

## Things to try

1. Dump both chunks in `gdb` and identify the 8-byte chunk header between them; explain the 32-byte distance as usable size plus metadata.
1. Find the smallest payload that still wins — one byte past the 32-byte gap is enough.
1. Rebuild with `INPUT_DATA_SIZE = 40` and re-measure: the request now needs a larger chunk, so the gap grows. The exploit that reads the two printed addresses keeps working; a hardcoded 32 does not.

## Questions to answer

* **Why is the distance larger than the 5 requested bytes?**
  glibc's smallest usable chunk on 64-bit holds 0x18 bytes and is allocated in 0x10 steps; a 5-byte request becomes a 0x20-byte usable region, and the next chunk starts 32 bytes on. *Print Heap* shows the exact gap.
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
