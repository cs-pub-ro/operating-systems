# Demo: Flip the Lock (heap-0)

**Tools:** GDB, pwntools, Docker

## Goal

Reference solution for the demo-heap-0 warm-up.
It is a deliberate near-clone of [`01-cylab-heap-0`](../01-cylab-heap-0) — same bug, same overflow distance, different names — so that solving it together makes the first core challenge quick.

## Background

`init()` allocates two adjacent 5-byte buffers:

```c
diary_entry = malloc(DIARY_ENTRY_SIZE);   /* "meh." */
lock_state  = malloc(LOCK_STATE_SIZE);    /* "shut" */
```

`lock_state` starts out `"shut"`, and `check_win()` prints the flag as soon as it is anything else.

## The bug

`write_diary()` copies player input into `diary_entry` with `scanf("%s", diary_entry)` — no length limit — so writing past the usable chunk size overflows into `lock_state`, which sits right after it.

## The exploit

Same shape as heap-0: 32 filler bytes reach `lock_state`, then anything non-empty overwrites `"shut"`:

```python
OVERFLOW_PAYLOAD = b"A" * 32 + b"XXXX"
```

See `solve/exploit.py`.

## Build, run and solve

Docker is the only requirement.
Same four-stage pipeline as every challenge in the session — `build/` → `publish/` → `deploy/` (port `31000`) → `solve/` — each with its own README.
The `flag` in this directory is copied into the container as `flag.txt` at deploy time.

## References

* `man 3 scanf`, `man 3 malloc`
* [pwntools documentation](https://docs.pwntools.com/)
