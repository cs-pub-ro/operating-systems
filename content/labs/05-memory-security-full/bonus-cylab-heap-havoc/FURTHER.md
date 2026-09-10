# Going Further: Cross Two Structs (heap-havoc)

## Things to try

1. Lay out `struct internet` for the 32-bit build on paper (`priority` @0, `name` @4, `callback` @8), then verify each offset in `gdb`.
1. Leave the `i2->name` slot as filler instead of a valid address and watch where it faults — the `strcpy(i2->name, argv[2])` after the overflow dereferences it.
1. Rebuild 64-bit (drop `-m32`) and work out how the offsets and payload widths change.

## Questions to answer

* **In what order are the allocations made, and why does it matter?**
  `i1`, `i1->name`, `i2`, `i2->name`, in that order — so `i1->name`'s chunk is immediately followed by `i2`'s struct, which is why overflowing the *first* name reaches the *second* struct.
* **How far from `i1->name` to `i2->callback`?**
  Measured in `gdb`: `i2` starts 16 bytes after `i1->name`; then skip `i2->priority` (4) and `i2->name` (4) to reach `callback` at +24.
* **Why must `i2->name` survive as a valid writable address?**
  `main()` runs `strcpy(i2->name, argv[2])` *after* the overflow, so whatever you put in that slot is dereferenced; a bad value crashes before `callback` is ever called. The exploit uses `.bss`.
* **How do you find `winner()`?**
  It is in the symbol table (`objdump -d` / `ELF.symbols`); nothing calls it, but it is present because the binary is non-PIE and not stripped.

## Discussion points

* **Overflows are not confined to one object** — adjacent heap allocations are one contiguous region to a large enough write.
* **A callback several fields deep is still reachable**; you just step over the intervening fields correctly, keeping any that get dereferenced valid.
* **32-bit vs 64-bit changes the arithmetic, not the idea** — field and pointer widths differ; the technique does not.

## References

* `man 1 objdump`, `man 3 strcpy`
* [pwntools packing helpers](https://docs.pwntools.com/en/stable/util/packing.html)
