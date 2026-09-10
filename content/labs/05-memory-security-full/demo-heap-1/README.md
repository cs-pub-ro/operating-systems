# Demo: Set the Access Level (heap-1)

**Tools:** GDB, pwntools, Docker

## Goal

Reference solution for the demo-heap-1 warm-up, a near-clone of [`02-cylab-heap-1`](../02-cylab-heap-1): same bug and distance, a specific target value.

## Background

`diary_entry` and `access_level` are two adjacent 5-byte heap allocations.
`access_level` starts out `"user"`, and `check_win()` requires it to read exactly `"root"`:

```c
if (!strcmp(access_level, "root")) {
        /* print the flag */
}
```

## The bug

The unbounded `scanf("%s", diary_entry)` in `write_diary()` overflows into `access_level`.

## The exploit

Same 32-byte distance as demo-heap-0, with the exact target string as the tail:

```python
OVERFLOW_PAYLOAD = b"A" * 32 + b"root"
```

See `solve/exploit.py`.

## Build, run and solve

Docker is the only requirement.
Four-stage pipeline — `build/` → `publish/` → `deploy/` (port `31001`) → `solve/`.
The `flag` here is copied into the container as `flag.txt` at deploy time.

## References

* `man 3 strcmp`
* [pwntools packing helpers](https://docs.pwntools.com/en/stable/util/packing.html)
