# Bonus: A pwntools Primer

**Tools:** python3, pwntools

A short, hands-on tutorial.
Do it before `bonus-heap-mayhem`, which is the one challenge you cannot solve by hand.

## Goal

Learn just enough [pwntools](https://docs.pwntools.com/) to talk to a challenge from Python: open a connection, send and receive, and put an address into a payload in the right byte order.

## Background

pwntools is a Python library for exploit scripts.
It gives you a *tube*: one object that talks to either a local program or a network service, with the same methods.

```python
from pwn import *

io = process("./chall")                 # a local program
io = remote("141.85.224.106", 31012)    # a network service
```

You read and write through the tube:

```python
io.recvuntil(b"Enter your choice: ")    # read until this text, then stop
io.sendline(b"2")                       # send "2" and a newline
data = io.recvall(timeout=5)            # read everything until it closes
```

Everything is `bytes` (`b"..."`), not `str`.

### Packing addresses

An address is a number, but it travels as bytes, least significant first (little-endian).
Typing the digits in reading order gets it backwards.
Let pwntools pack it:

```python
p64(0x401196)   # 64-bit -> b"\x96\x11\x40\x00\x00\x00\x00\x00"
p32(0x80491f6)  # 32-bit
u64(b"\x96\x11\x40\x00\x00\x00\x00\x00")   # bytes back to a number
```

You can read a symbol's address straight out of a non-PIE binary:

```python
exe = ELF("chall", checksec=False)
print(hex(exe.symbols["win"]))
```

## Your Task

Use `03-cylab-heap-2` as your practice target: it needs exactly one packed address.

1. Write a script that opens the local binary with `process("./chall")`.
1. Read `ELF("chall").symbols["win"]`, and build the payload `b"A" * 32 + p64(win)`.
1. Send menu option `2`, then the payload, then option `4`, and print what comes back.
1. Change `process("./chall")` to `remote("141.85.224.106", 31012)` and run it against the deployed service.

Compare your script with the reference `03-cylab-heap-2/solve/exploit.py`.

## Build & Run

```console
python3 primer.py
```

If `pwntools` is missing, install it with `pipx install pwntools` (see the prerequisites script).

## Check Your Work

Your script should print the flag with no typing on your part, both locally and against the remote service.
If it hangs for five seconds and prints nothing, the payload reached the program but did not win: re-check the filler length and the packed address, and talk it through with the teaching assistant.

Submit flags on the platform: <https://ctf.security.cs.pub.ro/so>
