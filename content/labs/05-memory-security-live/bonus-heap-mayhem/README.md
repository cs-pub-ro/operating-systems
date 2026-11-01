# Bonus: Leak and Overflow a PIE (heap-mayhem)

**Tools:** objdump, pwntools

A small "account vault": create accounts, list them, rename them, audit them.
Every account is audited on request — nothing to worry about, right?

This is the one challenge in the session that needs a script.
If you have not used pwntools, do [`bonus-pwntools-primer`](../bonus-pwntools-primer) first.

## Goal

Beat ASLR by leaking a code address, then overflow one account into the next to redirect its audit callback to a function that prints the flag.

The service is deployed at `141.85.224.106:31021`.

## Background

Each account is a heap struct with a name, a balance, and an `audit` function pointer called when the account is audited.
Every account starts with `audit = default_audit`.
Another function, `secret_audit`, prints the flag, and nothing ever points an account at it.

This binary is a **PIE**: every address is randomised on each run, so you cannot hardcode anything.
Two facts rescue you.

* *List accounts* prints each account's `audit` pointer — a real code address inside the binary.
  The distance between any two functions in the binary is fixed, so one leaked pointer reveals where `secret_audit` is this run.
* `rename_account()` overwrites an existing account's name with an unbounded `scanf("%s", ...)` and changes nothing else, and accounts sit back-to-back, so a long name overflows into the next account's fields.

## Your Task

1. Create two accounts and *List* them.
   From the leaked `default_audit` pointer and its known offset, compute the load base, then `secret_audit`'s address this run.
1. Measure the distance between the two accounts from their leaked addresses; do not hardcode it.
1. Rename the first account with an overflow that reaches the second account's `audit` field and sets it to `secret_audit`.
1. Audit the second account to capture the flag.

Because the leak changes every run, this has to be a script: see `solve/exploit.py`.

## Build & Run

Look around by hand first, locally or over the network:

```console
./chall
nc 141.85.224.106 31021
```

It reads `flag.txt` from the current directory; a placeholder `flag.txt` is included, so `./chall` works right away.
The placeholder is not the real flag.

Run the exploit against the local binary, then the server:

```console
python3 solve/exploit.py
python3 solve/exploit.py REMOTE HOST=141.85.224.106 PORT=31021
```

## Check Your Work

You have solved it when auditing the tampered account calls `secret_audit` and the flag prints.
Every address in your exploit must be derived at runtime from the leak; if any is a constant, it will work once and fail on the next run, and you should be ready to explain why.

Submit the flag: <https://ctf.security.cs.pub.ro/so>
