# Exercise: Overflow to an Exact Value (heap-1)

**Tools:** GDB, nc, pwntools

Can you control what the overflow writes?

## Goal

Repeat the heap-0 overflow, but this time make the neighbouring variable hold one *exact* value, not just a changed one.

## Background

The layout is the same as [`01-cylab-heap-0`](../01-cylab-heap-0): a writable `input_data` sits next to a `safe_var` you are not meant to touch.
The win condition is stricter here.
`safe_var` starts out `"bico"`, and `check_win()` now prints the flag only when `safe_var` equals exactly `"pico"`.

Disturbing the old value is no longer enough.
You have to choose the new bytes, which means your overflow has to end with exactly `pico` landing on `safe_var`.

The write path is the same unbounded `scanf("%s", input_data)`, so the bug is identical; only your payload changes.

## Your Task

1. Run the binary and use *Print Heap* to read the addresses of `input_data` and `safe_var`, then subtract them.
   The distance is larger than in the demo, so measure it: it is 64 bytes here.
1. Build a payload of that many filler bytes followed by the exact bytes `pico`, so `safe_var` reads `"pico"` once the write stops.
1. Trigger *Print Flag* and capture the flag, locally first, then from the remote service.

## Build & Run

```console
./chall
```

It reads `flag.txt` from the current directory.
A placeholder `flag.txt` is included so you can test locally; it is not the real flag.

Point your solve at the deployed service with netcat, typing the same menu choices you would type locally:

```console
nc 141.85.224.106 31011
```

## Check Your Work

You have solved it when the flag prints instead of "everything is still secure".
Work out the distance from the two printed addresses rather than by trial and error.
Think about what would change if the exact value were a numeric address rather than a readable word, because that is the next challenge.

Submit the flag: <https://ctf.security.cs.pub.ro/so>
