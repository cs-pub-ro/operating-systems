# Bonus: Leak and Overflow a PIE (heap-mayhem) — Solution

**Tools:** objdump, pwntools

This is the solving write-up, for a challenge that is already deployed.
How the challenge is built and deployed is in [`README.chall.md`](README.chall.md).
It is heap-havoc one notch harder: the same struct-to-struct overflow, but in a **PIE**, so no address can be hardcoded.

## Goal

Leak a code address to locate the binary at runtime, then overflow one account into the next and point its audit callback at a hidden function that prints the flag.

## The bug

```c
struct account {
        char name[24];
        long balance;
        void (*audit)(const struct account *);
};
```

Every account starts with `audit = default_audit`, and a never-referenced `secret_audit()` prints the flag.
`rename_account()` overwrites an existing account's `name` with `scanf("%s", ...)` — no length check — and, unlike `create_account()`, re-initialises nothing afterwards.
Accounts are allocated back-to-back in creation order, so a long enough name overflows past this account's own `balance`/`audit` and into the *next* account's fields.

## Why this one needs a script

Every other challenge in the session has a fixed layout, so you can type the solution by hand or script it with `printf`.
This binary is a PIE: the load base is randomised on every run, so the address of `secret_audit` is different each time.
You cannot know it in advance; you have to *read* a leaked address from the program and do arithmetic on it live, then send a payload built from the result.
That read-compute-send loop is what pwntools is for, and it is why there is a `solve/exploit.py` here but no `solve.sh`.
If you have not used pwntools, [`bonus-pwntools-primer`](../bonus-pwntools-primer) covers exactly the pieces this exploit uses.

## Defeating ASLR: the leak

`list_accounts()` prints each account's `audit` pointer.
For an untampered account that is the runtime address of `default_audit()`, a code address inside this binary.
The offsets of `default_audit` and `secret_audit` from the load base are fixed and known from the ELF, so one leak gives everything:

```python
base = leaked_default_audit_addr - exe.symbols["default_audit"]
secret_addr = base + exe.symbols["secret_audit"]
```

## The exploit, step by step

1. Create account 0 (`leak-me`) and account 1 (`victim`); account 1 lands right after account 0.
1. *List accounts* and read, from account 0's row, its heap address and its leaked `audit` pointer; read account 1's heap address too.
1. Compute `secret_addr` as above, and `delta = addr1 - addr0`, the account-to-account distance — measured at runtime, never hardcoded.
1. **Rename account 0** with `b"C" * (delta + 24 + 8) + p64(secret_addr)`: past its own fields, across the gap to account 1, past account 1's `name` (24) and `balance` (8), landing exactly on account 1's `audit`.
1. **Run audit on account 1** — it calls `secret_audit()`, which prints the flag.

Run it against the local binary, then the server:

```console
python3 exploit.py                                    # local ./chall
python3 exploit.py REMOTE HOST=141.85.224.106 PORT=31021
```

Because every address is derived from the leak, `solve/exploit.py` works unmodified against any ASLR base.

## References

* `man 1 objdump`, `man 1 setarch`
* [pwntools ELF](https://docs.pwntools.com/en/stable/elf/elf.html)
* [What is a PIE, and how ASLR uses it](https://en.wikipedia.org/wiki/Position-independent_code#Position-independent_executables)
