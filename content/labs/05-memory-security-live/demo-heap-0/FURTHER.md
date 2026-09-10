# Going Further: Flip the Lock (heap-0)

Optional.

## Things to try

1. Inspect the two chunks in `gdb` (`x/8gx input_data`) and find the chunk-size and metadata bytes between them.
   How much of the "distance" between the two buffers is your data, and how much is allocator bookkeeping?
1. Change the payload so it overflows `lock_state` with a single non-NUL byte.
   What is the smallest write that still wins?
1. Rebuild the source with a larger requested size for `diary_entry` and re-measure the distance.
   Does the win payload change?

## Questions to answer

* Why does writing more than 5 bytes reach `lock_state`, when both buffers asked `malloc` for only 5?
* What in the source lets `scanf` write past the end of the buffer?
* Would this still work if the author had used `fgets(diary_entry, 5, stdin)` instead?

## Discussion points

* **Heap memory is not safe memory.** "It's not on the stack" says nothing about whether a write is bounded.
* **The bug is the missing length, not the heap.** `scanf("%s", ...)` has no idea how big the destination is.
* **Read the layout, don't guess it.** The program prints both addresses; the overflow distance is a subtraction, not a guess.

## References

* `man 3 scanf` — on `%s` and why it needs a width
* `man 3 malloc` — on chunk sizes and rounding
