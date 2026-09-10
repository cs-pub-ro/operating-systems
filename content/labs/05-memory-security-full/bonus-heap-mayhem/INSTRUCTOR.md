# Instructor Notes: Leak and Overflow a PIE (heap-mayhem)

## Purpose

The capstone: the first PIE, so nothing can be hardcoded.
It forces the leak-then-overflow shape that the whole session has been building toward.

## Expected solution

1. Create accounts 0 and 1; *List* to leak account 0's `audit` pointer and both heap addresses.
1. `base = leak - default_audit_off`; `secret = base + secret_audit_off`.
1. `delta = addr1 - addr0`; rename account 0 with `b"C"*(delta + 24 + 8) + p64(secret)`.
1. Audit account 1.

## What to check for

* Every address is derived from the leak; nothing is a constant. Run it twice and confirm both succeed under fresh ASLR.
* They chose `rename_account()` over `create_account()` and can explain why.
* They measured the account delta at runtime.

## Common stumbles

* Hardcoding an address — works once, fails on the next run. The tell is a five-second `recvall` hang.
* Using `create_account()` for the overflow, which re-initialises `audit` and wipes the payload.
* Off-by in the filler: the payload must skip account 1's `name`(24) + `balance`(8) to land on `audit`.

## Verified values

* Struct: `name[24]`, `balance` (8), `audit` (8). Filler to account 1's `audit` = `delta + 24 + 8`.
* Deploy port 31021; ASLR deliberately left enabled.
* The exploit needs the binary present to read `default_audit`/`secret_audit` offsets.
* Last run: green locally against a genuinely randomised (ASLR-on) target.

## Practical notes

* Built as a PIE on purpose — the one challenge that keeps the mitigation, precisely so the leak is necessary.
* Take-home for almost everyone; budget no live-lab time for a full solve.
