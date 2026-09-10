# Bonus: Leak and Overflow a PIE (heap-mayhem)

**Tools:** GDB, objdump, pwntools, Docker

## Goal

Reference solution for heap-mayhem, one notch past heap-havoc: the binary is a **PIE**, so no address can be hardcoded.
The exploit has to leak a code address first, then use it to aim a heap overflow at a hidden callback.

## Background

```c
struct account {
        char name[24];
        long balance;
        void (*audit)(const struct account *);
};
```

Every account's `audit` starts as `default_audit`.
A second function, `secret_audit()`, prints the flag and is never pointed at by anything.

## The bug

`rename_account()` overwrites an already-allocated account's `name` with `scanf("%s", ...)` — no length check — and, unlike `create_account()`, re-initialises nothing afterwards.
Accounts are allocated back-to-back in creation order, so a long enough name overflows past this account's own `balance`/`audit` and into the *next* account's fields.

## Defeating ASLR: the leak

`list_accounts()` prints each account's `audit` pointer.
For an untampered account that is the runtime address of `default_audit()` — a code address inside this binary.
The offsets of `default_audit` and `secret_audit` from the load base are fixed and known from the ELF, so one leak gives everything:

```python
base = leaked_default_audit_addr - default_audit_offset
secret_addr = base + secret_audit_offset
```

## The exploit

1. Create account 0 (`leak-me`) and account 1 (`victim`); account 1 lands right after account 0.
1. `list_accounts()` leaks account 0's `audit` pointer and both accounts' heap addresses — the account-to-account distance is measured from these at runtime, not hardcoded.
1. Compute `secret_audit()`'s runtime address as above.
1. **Rename account 0** with `b"C" * (delta + 24 + 8) + p64(secret_addr)`: past its own fields, across the gap to account 1, past account 1's `name`+`balance`, landing exactly on account 1's `audit`.
1. **Run audit on account 1** — it calls `secret_audit()`, which prints the flag.

Because every address is derived from the leak, `solve/exploit.py` works unmodified against any ASLR base.

## Build, run and solve

Docker is the only requirement.
Four-stage pipeline — `build/` (default PIE) → `publish/` → `deploy/` (port `31021`, ASLR left enabled on purpose) → `solve/` (needs the binary present to read the two symbol offsets).
The `flag` here is copied into the container as `flag.txt` at deploy time.

## References

* `man 1 objdump`, `man 1 setarch`
* [pwntools ELF](https://docs.pwntools.com/en/stable/elf/elf.html)
* [What is a PIE, and how ASLR uses it](https://en.wikipedia.org/wiki/Position-independent_code#Position-independent_executables)
