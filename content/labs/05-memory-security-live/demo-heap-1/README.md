# Demo: Set the Access Level (heap-1)

A warm-up heap overflow, solved together with the teaching assistant at the start of the session.

Same setup as [`demo-heap-0`](../demo-heap-0), with one difference that changes everything: this time you do not just need to *change* the neighbouring value on the heap, you need it to become one *specific* value — `access_level` must read exactly `"root"`.

Together with the teaching assistant you will find where `access_level` starts, then build an overflow whose trailing bytes spell the target string precisely.

The service is deployed at `141.85.224.106:31001`.

## Files

* `chall.c` — the challenge source code.
* `chall` — the compiled challenge binary.
  Run it locally with `./chall`; it reads `flag.txt` from the current directory, so drop a placeholder there to test.

## Hints

1. How can you tell where `access_level` starts?
1. What string does `check_win()` actually compare `access_level` against?

Submit the flag: https://ctf.security.cs.pub.ro/so/challenges#demo-heap-1-2
