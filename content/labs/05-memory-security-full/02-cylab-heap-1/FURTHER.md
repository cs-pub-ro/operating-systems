# Going Further: Overflow to an Exact Value (heap-1)

## Things to try

1. Make the exploit parse the two *Print Heap* addresses and compute the filler length itself, so it survives a rebuild with different buffer sizes.
1. Change the target string in `chall.c`, rebuild, and confirm a parameterised exploit wins with a one-line edit.
1. Overflow with the target one byte short, then one byte long, and read each failure.

## Questions to answer

* **What exact bytes must `safe_var` hold?**
  `"pico"` followed by a NUL. `strcmp` walks both strings to their terminators, so the byte after `"pico"` matters too — here it is supplied by the buffer's existing contents / the terminator, which is why `b"pico"` suffices without an explicit `\x00`.
* **Why can't you just type the payload at the menu?**
  You can for a printable target like `"pico"`, but the moment the value contains non-printable bytes (the next challenge is an address), typing is impossible and packing is mandatory.
* **How would an 8-byte little-endian address differ?**
  You would append `p64(value)` instead of a word, and byte order would matter — the bridge to heap-2.

## Discussion points

* **Choosing the value is the new skill**, and every later challenge needs it.
* **Offset plus exact bytes** is the whole game from here.
* **One exploit, many challenges** — heap-0, heap-1 and both demos differ only in offset and target.

## References

* `man 3 strcmp`
* [pwntools packing helpers](https://docs.pwntools.com/en/stable/util/packing.html)
