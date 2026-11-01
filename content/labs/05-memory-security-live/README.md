# Session 05: Memory Security

This session turns a memory-safety bug into an exploit.
You are given small CTF-style programs, each with one deliberate bug on the heap.
You find the bug, trigger it, and make the program hand you a secret flag.

The bugs you will meet:

* A heap buffer overflow that spills into the variable or struct next to it.
* Overwriting a function pointer so the program jumps to code you picked.
* A use-after-free, where the allocator hands back memory the program still points to.

## Learning objectives

By the end of this session you should be able to:

* Explain how a heap buffer overflow can corrupt the variable or struct field next to it.
* Build an overflow payload that sets a target to one exact value, with the bytes in the right order.
* Overwrite a function pointer on the heap and send control flow to code of your choosing.
* Explain what a use-after-free is, and how allocator reuse turns it into a write.

## Prerequisites and required tools

* Session 04 concepts: heap layout, and using `gdb` to inspect memory.
* A Linux environment with `gdb`, `objdump`, `nc` (netcat) and `python3`.
* [pwntools](https://docs.pwntools.com/) for the last challenge, which needs a script; the rest you can solve by hand.
* Basic familiarity with two's complement, endianness, and reading disassembly.

Check that your system has everything, by downloading and running the [`check-prerequisites.sh` script](https://github.com/cs-pub-ro/operating-systems/blob/main/scripts/check-prerequisites.sh):

```console
wget http://raw.githubusercontent.com/cs-pub-ro/operating-systems/refs/heads/main/scripts/check-prerequisites.sh
chmod a+x check-prerequisites.sh
./check-prerequisites.sh
```

The script installs nothing.
It reports what is missing and prints the command that installs it on your distribution.

If something is missing, install it before the lab.

## How these challenges work

Each task is a CTF challenge.
You get the source (`chall.c`) and the compiled binary (`chall`).
You find the memory-safety bug and use it to make the program print a secret `flag.txt`.

**Solve it locally first.**
Run the binary with `./chall`.
It opens `flag.txt` in the current directory, and a placeholder `flag.txt` is included in each challenge folder, so you can test straight away.
That placeholder is *not* the real flag; it only lets you confirm your exploit works.

**Then capture the real flag from the remote service.**
The real flag lives only on the server your teaching assistant deploys.
Each challenge has its own address and port, shown in the challenge's `README.md` and on the CTF platform.
Connect to it with netcat:

```console
nc 141.85.224.106 31010
```

Everything you would type into `./chall` locally, you type into this `nc` session instead.
When your exploit is a script, point it at the same host and port.

### Using the CTF platform

The challenges and the flag submission live on the SO CTF platform: <https://ctf.security.cs.pub.ro/so>.

1. Open <https://ctf.security.cs.pub.ro/so> and register an account (or log in if you already have one).
1. Open the **Challenges** page to see the list of challenges for this session.
1. Open a challenge to read its description, find its remote address and port, and download its files if the platform hosts them there.
1. Solve the challenge: find the bug, test locally against the placeholder flag, then connect to the remote service with `nc` and capture the real flag.
1. Paste the flag into the challenge's **submit** box to score the points.

The flag is the whole string the program prints, for example `SO{...}`.

## Getting the lab archive

You can also download every challenge at once from the course repository.
Download [`05-memory-security.zip`](https://github.com/cs-pub-ro/operating-systems/raw/lab-archives/05-memory-security.zip), unzip it, and change into the directory it creates:

```console
wget https://github.com/cs-pub-ro/operating-systems/raw/lab-archives/05-memory-security.zip
unzip 05-memory-security.zip
cd 05-memory-security/
```

Work inside that directory for the rest of the session.

## Task order

The demos are solved together with the teaching assistant at the start, as warm-ups.
The core exercises are solved on your own or in teams, in the order shown; each one adds one idea to the one before.
Bonus exercises are optional and harder; take them once the core exercises are done.

| Order | Task | Type | Objective |
| --- | --- | --- | --- |
| 1 | [`demo-heap-0`](demo-heap-0) | Demo | Overflow a heap buffer to flip an adjacent "lock" variable. |
| 2 | [`demo-heap-1`](demo-heap-1) | Demo | Overflow a heap buffer to set an adjacent variable to one exact value. |
| 3 | [`01-cylab-heap-0`](01-cylab-heap-0) | Core | A basic heap overflow: change a "safe" variable you are not meant to reach. |
| 4 | [`02-cylab-heap-1`](02-cylab-heap-1) | Core | The same overflow, but the target must become one exact value. |
| 5 | [`03-cylab-heap-2`](03-cylab-heap-2) | Core | Overflow into a function pointer and hijack control flow. |
| 6 | [`04-cylab-heap-3`](04-cylab-heap-3) | Core | Exploit a use-after-free through allocator (tcache) reuse. |
| 7 | [`bonus-cylab-heap-havoc`](bonus-cylab-heap-havoc) | Bonus | Overflow one heap struct into the next to reach a hidden function-pointer field. |
| 8 | [`bonus-pwntools-primer`](bonus-pwntools-primer) | Bonus | Learn pwntools tubes and address packing, the tools the last challenge needs. |
| 9 | [`bonus-heap-mayhem`](bonus-heap-mayhem) | Bonus | Leak a code address to beat ASLR in a PIE, then overwrite a callback. |

Each demo uses the same bug as the core challenge that follows it, but the exact overflow distance is different, so measure it fresh on each program rather than reusing the number.

Each challenge directory has a `README.md` with the task and hints.

## Pwntools Cheatsheet

Most challenges here you can solve by hand or with a one-line shell script.
For the ones that need a script, [pwntools](https://docs.pwntools.com/) is the standard tool.
The essentials:

```python
from pwn import *

io = process("./chall")            # run the local binary
io = remote("141.85.224.106", 31010)   # or connect to the deployed service

io.recvuntil(b"Enter your choice: ") # read output up to this text
io.sendline(b"2")                    # send a line (adds the newline for you)

payload = b"A" * 48 + p64(0x401196)  # 48 filler bytes, then an 8-byte address
io.sendline(payload)                 #   p64 = 64-bit little-endian, p32 = 32-bit

print(io.recvall(timeout=5).decode(errors="replace"))  # read whatever is left
```

* `p64(x)` / `p32(x)` turn a number into bytes in the order the machine expects (little-endian).
  Typing an address by hand gets the byte order wrong; let `p64`/`p32` do it.
* Payloads are `bytes`, not `str`: write `b"..."`, and send numbers as `p64(...)`.
* Run a script against the local binary with no arguments, and against the server by editing the `remote(...)` line.

There is a fuller version of this cheatsheet, and a hands-on walk-through, in [`bonus-pwntools-primer`](bonus-pwntools-primer).
