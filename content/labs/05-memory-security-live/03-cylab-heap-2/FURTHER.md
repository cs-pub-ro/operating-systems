# Going Further: Hijack a Function Pointer (heap-2)

Optional.

## Things to try

1. Point the overwritten pointer at an address that is *not* `win()` and observe the crash in `gdb`.
   Read `$rip` (or `$eip`) at the fault: it is the value you supplied.
1. Find `win()`'s address three ways — `objdump -d`, `nm`, and pwntools' `ELF.symbols` — and confirm they agree.
1. The challenge reads only 4 bytes as the pointer. On a 64-bit build, when is that enough, and when would it not be?

## Questions to answer

* `check_win()` does not compare `x` to anything. What does it do instead?
* Why does the byte order of the address matter, and which order does x86 use?
* What makes a function-pointer overwrite more dangerous than overwriting a plain data variable?

## Discussion points

* **Data corruption became control-flow hijack** the moment the corrupted value was something the program *calls*.
* **Endianness is not optional** when the payload is an address.
* **`win()` existing but never being called** is the classic CTF shape; the bug is that you can reach it.

## References

* `man 1 objdump`, `man 1 nm`
* [pwntools ELF](https://docs.pwntools.com/en/stable/elf/elf.html)
