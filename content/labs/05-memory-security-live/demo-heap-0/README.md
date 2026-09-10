# Demo: Flip the Lock (heap-0)

A warm-up heap overflow, solved together with the teaching assistant at the start of the session.

The program keeps two things on the heap: a diary entry you are allowed to write to, and a `lock_state` variable the author is sure you cannot reach.
"My data isn't on the stack, so it should be safe... right?"

Together with the teaching assistant you will run the binary, read the two heap addresses it prints, work out how far apart they are, and overflow the diary entry far enough to change `lock_state` — winning as soon as it is no longer `"shut"`.

The service is deployed at `141.85.224.106:31000`.

## Files

* `chall.c` — the challenge source code.
* `chall` — the compiled challenge binary.
  Run it locally with `./chall`; it reads `flag.txt` from the current directory, so drop a placeholder there to test.

## Hints

What part of the heap do you have control over, and how far is it from `lock_state`?

Submit the flag: https://ctf.security.cs.pub.ro/so/challenges#demo-heap-0-1
