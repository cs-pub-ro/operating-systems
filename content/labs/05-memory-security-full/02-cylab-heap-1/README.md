# Exercise: Overflow to an Exact Value (heap-1)

**Tools:** GDB, pwntools, Docker

## Goal

Reference solution for heap-1.
It is heap-0 with one extra demand: the corrupted neighbour must become one *specific* value, not merely a different one.

## Background

The layout is identical to [`01-cylab-heap-0`](../01-cylab-heap-0): two adjacent 5-byte buffers, `input_data` (writable) and `safe_var` (the target).
Only the win condition changes:

```c
if (!strcmp(safe_var, "pico")) {
        /* print the flag */
}
```

`safe_var` starts out `"bico"`; it now has to read exactly `"pico"`.

## The bug

The same unbounded `scanf("%s", input_data)` in `write_buffer()`.
Overflowing `input_data` reaches `safe_var`; the difference from heap-0 is purely in what you put there.

## The exploit

Same 32-byte distance to `safe_var`, but the payload's tail must be the exact string the check compares against — terminator and all handled by the comparison:

```python
OVERFLOW_PAYLOAD = b"A" * 32 + b"pico"
```

This is where *choosing* the overwritten value replaces merely destroying it — the skill every later challenge builds on.
See `solve/exploit.py`.

## Build, run and solve

Docker is the only requirement.
Four-stage pipeline — `build/` → `publish/` → `deploy/` (port `31011`) → `solve/` — each with its own README.
The `flag` here is copied into the container as `flag.txt` at deploy time.

## References

* `man 3 strcmp`
* [pwntools packing helpers](https://docs.pwntools.com/en/stable/util/packing.html)
* Original challenge: <https://learn.cylabacademy.org/library/439>
