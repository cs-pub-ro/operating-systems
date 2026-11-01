# Demo: Set the Access Level (heap-1) — Solution

**Tools:** nc, GDB, pwntools

This is the solving write-up, for a challenge that is already deployed.
How the challenge is built and deployed is in [`README.chall.md`](README.chall.md).
It is a deliberate twin of [`02-cylab-heap-1`](../02-cylab-heap-1) — same bug, different overflow distance — so solving it together makes the second core challenge quick.

## Goal

Overflow the diary buffer so it spills into `access_level`, and make `access_level` read exactly `"root"`.

## The bug

`init()` allocates two adjacent heap buffers:

```c
diary_entry  = malloc(DIARY_ENTRY_SIZE);   /* "meh." */
access_level = malloc(ACCESS_LEVEL_SIZE);  /* "user" */
```

`write_diary()` copies your input into `diary_entry` with `scanf("%s", diary_entry)`, which stops at whitespace, never at the buffer size.
So a long enough write runs off the end of `diary_entry` and into `access_level`, which the allocator placed right after it.
Unlike heap-0, any overwrite is not enough: `check_win()` prints the flag only when `access_level` is exactly `"root"`.

```c
if (!strcmp(access_level, "root")) {
        /* print the flag */
}
```

This is the first challenge where you *choose* the overwritten value instead of just destroying it.
The bytes you send land in memory in the order you send them, so the tail of the payload must be exactly the target string.
That "bytes land in a chosen order" idea is what heap-2 later turns into writing a precise address.

## Finding the overflow distance

Do not guess it. The program's *Print Heap* option prints both addresses:

```text
diary_entry  @ 0x...2a0
access_level @ 0x...2c0     (difference = 0x20 = 32 bytes)
```

The gap is 32 bytes: glibc rounded each 5-byte request up to a usable chunk and added metadata.
So 32 filler bytes reach `access_level`, and the next four bytes must be `root`.

## Solving it

All three forms do the same thing: write `32` filler bytes followed by `root` (menu option 2), then print the flag (option 4).

### By hand, over nc

```console
nc 141.85.224.106 31001
```

1. Choose `1` (Print Heap) and subtract the two addresses to confirm the distance is 32.
1. Choose `2` (Write to diary) and send 32 `A`s followed by `root`:
   `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAroot`
1. Choose `4` (Print Flag).

### Shell script

`solve/solve.sh` builds that input with `printf` and sends it:

```console
./solve.sh                      # against a local ./chall (uses the placeholder flag.txt)
./solve.sh 141.85.224.106 31001 # against the deployed service
```

### pwntools

`solve/exploit.py` does the same in Python:

```console
python3 exploit.py                                   # local ./chall
python3 exploit.py REMOTE HOST=141.85.224.106 PORT=31001
```

## References

* `man 3 scanf`, `man 3 strcmp`
* [pwntools documentation](https://docs.pwntools.com/)
