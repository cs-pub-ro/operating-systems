# Demo: Set the Access Level (heap-1)

A warm-up heap overflow, solved together with the teaching assistant at the start of the session.

Same setup as [`demo-heap-0`](../demo-heap-0), with one difference that changes everything.
This time you must not just *change* the neighbouring value, you must make it one *specific* value: `access_level` has to read exactly `"root"`.
So the trailing bytes of your overflow have to spell the target precisely, not just be anything.

Together with the teaching assistant you will find where `access_level` starts and build an overflow whose tail is exactly `"root"`.

## Files

* `chall.c` — the challenge source code.
* `chall` — the compiled binary.
* `flag.txt` — a placeholder flag, so `./chall` works locally. It is not the real flag.

## Running it

Locally:

```console
./chall
```

Against the deployed service, with netcat — type the same things you would type locally:

```console
nc 141.85.224.106 31001
```

## Hint

What string does `check_win()` compare `access_level` against, and where does `access_level` start?
Use "Print Heap", read the two addresses, and subtract.

Submit the flag: <https://ctf.security.cs.pub.ro/so>
