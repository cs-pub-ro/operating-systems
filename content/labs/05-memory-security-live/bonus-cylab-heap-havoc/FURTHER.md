# Going Further: Cross Two Structs (heap-havoc)

Optional.

## Things to try

1. Lay out `struct internet` on paper for the 32-bit build (`priority`, `name`, `callback`), then verify each field's offset in `gdb`.
1. Try leaving the `name` field (between the overflow start and `callback`) as filler instead of a valid address, and watch where it crashes.
   Which `strcpy()` dereferences it?
1. Rebuild 64-bit (drop `-m32`) and work out how the offsets and the payload change.

## Questions to answer

* In what order are the two structs and their name buffers allocated, and how does that decide which overflow reaches which struct?
* How many bytes from the start of the first name buffer to the second struct's `callback` field?
* Why must the second struct's `name` pointer survive your overflow as a valid writable address?
* How did you find `winner()`, given nothing calls it?

## Discussion points

* **Overflows are not confined to one object.** Adjacent heap allocations are one contiguous region to a big enough write.
* **A function pointer several fields deep is still reachable**; you just have to step over the fields in between correctly.
* **32-bit vs 64-bit changes the arithmetic, not the idea.** Field widths and pointer sizes differ; the technique does not.

## References

* `man 1 objdump`, `man 3 strcpy`
* [pwntools packing helpers](https://docs.pwntools.com/en/stable/util/packing.html)
