# Going Further: demo-heap-0

## Things to try

1. Dump both chunks in `gdb` (`x/8gx diary_entry`) and pick out the chunk-size word between them.
   The 32-byte distance is usable size plus metadata, not a magic number.
1. Find the smallest winning payload.
   For demo-heap-0, "XXXX" is only there to be non-empty (heap-0 style) or to match exactly (heap-1 style); how few bytes can you get away with?
1. Re-run against a local deployment and diff the exploit invocation against the local-binary one.

## Questions to answer

* **Why does writing past 5 bytes reach `lock_state`?**
  glibc rounds the 5-byte request up to a 0x20-byte usable chunk and lays the next allocation immediately after; the printed addresses show the exact 32-byte gap.
* **What makes the overflow possible?**
  `scanf("%s", ...)` has no length limit; it stops only at whitespace.
* **What would `fgets(diary_entry, 5, stdin)` have changed?**
  It caps the write at 4 bytes plus a terminator, so the overflow disappears — the bug is the missing length, not the heap.

## Discussion points

* **Heap memory is not "safe" memory.** Adjacency plus an unbounded write is all it takes.
* **Read the layout from the program.** The overflow distance is a subtraction of two printed addresses.
* **This is the template.** 01-cylab-heap-0 is the same moves; students should breeze through it after the demo.

## References

* `man 3 scanf`, `man 3 malloc`
* [pwntools documentation](https://docs.pwntools.com/)
