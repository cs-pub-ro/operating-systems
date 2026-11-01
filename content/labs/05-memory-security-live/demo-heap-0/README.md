# Demo: Flip the Lock (heap-0)

A warm-up heap overflow, solved together with the teaching assistant at the start of the session.

The program keeps two things on the heap: a diary entry you may write to, and a `lock_state` variable the author is sure you cannot reach.
"My data isn't on the stack, so it must be safe... right?"
You win as soon as `lock_state` is no longer `"shut"`.

Together with the teaching assistant you will run the binary, read the two heap addresses it prints, work out how far apart they are, and overflow the diary entry far enough to change `lock_state`.

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
nc 141.85.224.106 31000
```

## Hint

How far is the diary entry from `lock_state`?
Use "Print Heap", read the two addresses, and subtract.

Submit the flag: <https://ctf.security.cs.pub.ro/so>
