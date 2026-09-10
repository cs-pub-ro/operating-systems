# Instructor Notes: demo-heap-0

## Purpose

A warm-up, solved together at the board.
It is a near-clone of `01-cylab-heap-0`; the point is to walk the whole workflow once so the matching core challenge is a quick win and the room starts with momentum.

## Do this live, slowly

1. Run `./chall`, choose *Print Heap*, and read the two addresses aloud.
1. Subtract them on the board: the gap is **32 bytes**, not the 5 that were requested. Explain the rounding once.
1. Build the payload in pwntools: `b"A" * 32 + "XXXX"`.
1. Write (option 2), then trigger the win (option 4). Flag appears.
1. Show the same script pointed at the deployment with `REMOTE HOST=... PORT=...`.

## Points to make

* The overflow distance is **measured**, never guessed.
* `lock_state` starts as "shut" and nothing in the code ever changes it — the only way it moves is the overflow.
* `scanf("%s")` is the entire bug.

## Verified values

* Overflow distance: 32 bytes. Winning payload: `b"A" * 32 + "XXXX"`.
* Deploy port: 31000.
* Last run: green, local and against a local deployment.

## Practical notes

* Built weak on purpose (no canary, no PIE). Say so, so nobody thinks real targets look like this.
* Docker is the only host requirement for the pipeline.
