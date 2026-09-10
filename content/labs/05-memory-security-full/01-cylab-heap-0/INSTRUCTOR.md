# Instructor Notes: Overflow a Heap Buffer (heap-0)

## Purpose

The first challenge students solve alone, immediately after `demo-heap-0` (its clone).
If the demo landed, this should take minutes; it is a confidence builder, not a puzzle.

## Expected solution

32 filler bytes to cross the gap, then anything non-empty:

```python
b"A" * 32 + b"XXXX"
```

## What to check for

* They read the distance from *Print Heap*, not by guessing. If someone hardcodes 32 without knowing why, ask them to rebuild with a bigger `INPUT_DATA_SIZE` and watch it break.
* They can say why the gap is 32, not 5.

## Common stumbles

* Sending the payload before selecting *Write to buffer*.
* Expecting `safe_var` to need a specific value — that is the next challenge; here anything wins.

## Verified values

* Distance 32 bytes; payload `b"A" * 32 + b"XXXX"`. Deploy port 31010.
* Last run: green locally and against a local deployment.

## Practical notes

* No canary, no PIE, on purpose.
* Same libc ships with the binary because heap layout is allocator-specific.
