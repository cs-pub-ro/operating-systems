# Bonus: Leak and Overflow a PIE (heap-mayhem)

**Tools:** GDB, objdump, pwntools

A small "account vault" service: create accounts, list them, rename them, and audit them.
Every account gets audited on request — nothing to worry about, right?

## Goal

Defeat ASLR by leaking a code pointer, then use a heap overflow to redirect an audit callback to a function that prints the flag.

The service is deployed at `141.85.224.106:31021`.
## Background

Each account is a heap struct with a name, a balance, and an `audit` function pointer that is called when the account is audited.
Every account's `audit` starts as `default_audit`; a `secret_audit` function prints the flag, and nothing ever points an account at it.

This binary is a **PIE**: every address is randomised on each run, so nothing can be hardcoded.
But two facts rescue you.
*List accounts* prints each account's `audit` pointer — a real code address inside this binary — and the offset between any two functions in the binary is fixed regardless of where it loads.
Separately, `rename_account()` overwrites an existing account's name with an unbounded `scanf("%s", ...)` and re-initialises nothing, and accounts are allocated back-to-back — so a long name overflows into the next account's fields.

## Your Task

1. Create two accounts and *List* them; from the leaked `default_audit` pointer and its known offset, compute the binary's load base, then `secret_audit`'s runtime address.
1. Measure the distance between two adjacent accounts from the leaked addresses (do not hardcode it).
1. Rename the first account with an overflow that reaches the second account's `audit` field and overwrites it with `secret_audit`'s address.
1. Audit the second account and capture the flag, locally then remotely.

## Build & Run

```console
./chall
```

It reads `flag.txt` from the current directory; create a placeholder to test locally.

## Check Your Work

You have solved it when auditing the tampered account calls `secret_audit` and the flag prints.
Everything you use must be derived at runtime from the leak — if any address in your exploit is a constant, it will work once and fail on the next run. Be ready to explain why.

Submit the flag: https://ctf.security.cs.pub.ro/so/challenges#bonus-heap-mayhem-8
