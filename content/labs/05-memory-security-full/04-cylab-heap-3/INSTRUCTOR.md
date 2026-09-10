# Instructor Notes: Use-After-Free (heap-3)

## Purpose

The first bug in the session that is not an overflow.
The write primitive comes from a freed-but-retained pointer plus predictable tcache reuse.

## Expected solution

Free `x`, allocate 35 bytes, write `a[10]+b[10]+c[10]+"pico"`, then check win:

```python
OBJECT_SIZE = 35
PAYLOAD = b"A"*10 + b"B"*10 + b"C"*10 + b"pico"
```

## What to check for

* They chose the allocation size from `sizeof(struct object)`, and can explain the same-bin requirement.
* They can name the one-line fix (`x = NULL`).
* They laid out the payload to land `"pico"` on `flag`, respecting the `a`/`b`/`c` filler fields.

## Common stumbles

* Requesting a size in a different tcache bin, so the chunk is not reclaimed and the write misses.
* Getting the field layout wrong so `"pico"` lands short of `flag`.
* Freeing after allocating rather than before.

## Verified values

* `sizeof(struct object)` = 35. Payload as above. Deploy port 31013.
* Last run: green locally and against a local deployment.

## Practical notes

* The matching libc ships with the binary because tcache behaviour is an allocator implementation detail — a different glibc can change the reuse and confuse students comparing notes.
* Built `-no-pie`.
