# Going Further: Hijack a Function Pointer (heap-2)

## Things to try

1. Overwrite the pointer with an address that is not `win()` and catch the crash in `gdb`; read `$rip` at the fault — it is the value you supplied.
1. Find `win()` three ways — `objdump -d`, `nm`, and `ELF.symbols` — and confirm they agree.
1. The challenge reads only 4 bytes as the pointer (`*(int *)x`). On a 64-bit build, when is a 4-byte address enough?

## Questions to answer

* **What does `check_win()` do with `x`?**
  It casts `x`'s first 4 bytes to a function pointer and calls it — no comparison at all, an actual indirect call.
* **Why does byte order matter, and which does x86 use?**
  The bytes are interpreted as an integer address; x86 is little-endian, so the least significant byte comes first. `p64()`/`p32()` produce that order; typing the address by hand produces the reverse.
* **Why is a 4-byte read enough here?**
  The binary is non-PIE and links low, so `win()`'s address fits in 32 bits; the high bytes are zero. On a PIE or a high-loaded target this would truncate the address and fail.
* **Why is a function-pointer overwrite worse than a data overwrite?**
  It converts memory corruption into control-flow hijack: you no longer influence what the program computes, you choose what it executes.

## Discussion points

* **Data corruption became control-flow hijack** the instant the corrupted value was something the program calls.
* **Endianness is mandatory** once the payload is an address.
* **`win()` present but uncalled** is the classic CTF shape; the bug is that the overflow can reach it.

## References

* `man 1 objdump`, `man 1 nm`
* [pwntools ELF](https://docs.pwntools.com/en/stable/elf/elf.html)
