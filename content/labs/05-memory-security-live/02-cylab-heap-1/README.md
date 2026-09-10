# Exercise: Overflow to an Exact Value (heap-1)

**Tools:** GDB, pwntools

Can you control your overflow?

## Goal

Repeat the heap-0 overflow, but this time land a *specific* value in the neighbouring variable rather than merely disturbing it.

The service is deployed at `141.85.224.106:31011`.

## Background

The layout is the same as [`01-cylab-heap-0`](../01-cylab-heap-0): a writable `input_data` next to a `safe_var` you are not supposed to touch.
The difference is the win condition — `check_win()` now requires `safe_var` to equal exactly `"pico"`.
Destroying the old value is no longer enough; you have to choose the new one.

## Your Task

1. Find where `safe_var` starts, the same way as before.
1. Build a payload of filler followed by the exact target bytes, so that when the overflow stops, `safe_var` holds precisely what `check_win()` compares against.
1. Capture the flag locally, then against the remote service.

## Build & Run

```console
./chall
```

It reads `flag.txt` from the current directory; create a placeholder to test locally.

## Check Your Work

You have solved it when the flag prints.
Think about what would go wrong if the target were a numeric address instead of a readable word — that is exactly the next challenge, so have your answer ready to discuss.

Submit the flag:

- Link SO CTF: https://ctf.security.cs.pub.ro/so/challenges#02-cylab-heap-1-4
- Link CyLab Academy: <https://learn.cylabacademy.org/library/439>
