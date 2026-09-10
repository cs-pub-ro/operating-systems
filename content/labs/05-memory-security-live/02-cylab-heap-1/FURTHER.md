# Going Further: Overflow to an Exact Value (heap-1)

Optional.

## Things to try

1. Make the exploit read the two heap addresses from *Print Heap* output and compute the filler length automatically, instead of hardcoding it.
1. Change the target string in `chall.c`, rebuild, and confirm your parameterised exploit still wins with only a one-line change.
1. Overflow with the target value one byte short and read the failure message; then one byte long, past the terminator.

## Questions to answer

* What is the exact byte sequence `check_win()` needs to find in `safe_var`, terminator included?
* Why can you not simply type the payload at the menu prompt by hand?
* How would the payload differ if the target were a little-endian 8-byte address rather than a word?

## Discussion points

* **Choosing the value is the new skill**, and it is the one every later challenge builds on.
* **Offsets plus exact bytes** is the whole game from here on.
* **A parameterised exploit is reusable.** heap-0, heap-1 and the demos differ only in target and offset.

## References

* `man 3 strcmp`
* [pwntools packing helpers](https://docs.pwntools.com/en/stable/util/packing.html)
