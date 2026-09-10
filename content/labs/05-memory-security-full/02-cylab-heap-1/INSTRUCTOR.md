# Instructor Notes: Overflow to an Exact Value (heap-1)

## Purpose

The clone of `demo-heap-1`, and the first time students must *choose* the overwritten value rather than merely destroy it.
This is where packing and (soon) endianness get taught.

## Expected solution

```python
b"A" * 32 + b"pico"
```

## What to check for

* They understand `check_win()` compares against an exact string, terminator included.
* They can articulate what changes if the target were a raw address — this primes heap-2.

## Common stumbles

* Off-by-one in the filler, so the target lands one byte early or late.
* Forgetting that the comparison includes the terminator.

## Verified values

* Distance 32 bytes; payload `b"A" * 32 + b"pico"`. Deploy port 31011.
* Last run: green locally and against a local deployment.

## Practical notes

* Same weak build and shipped-libc rationale as heap-0.
