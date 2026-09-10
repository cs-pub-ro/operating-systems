# Going Further: Leak and Overflow a PIE (heap-mayhem)

## Things to try

1. Run the exploit twice and print the leaked base each time — it differs per run, proving a hardcoded address would fail the second time.
1. Run once with ASLR disabled (`setarch -R ./chall`) and compare the leaked base against `objdump`'s addresses.
1. Measure the account-to-account distance from the leak, then confirm it in `gdb`.

## Questions to answer

* **Why is the leaked-pointer offset the same on every run?**
  PIE randomises the *load base*, but the layout inside the binary is fixed at link time. `secret_audit - default_audit` is a constant, so `leak - default_audit_offset` recovers the base every time.
* **Why `rename_account()` and not `create_account()`?**
  `create_account()` re-initialises `balance` and `audit` after writing the name, undoing any overflow. `rename_account()` writes only the name and touches nothing else, so the overflow into the next account's fields survives.
* **What must be derived at runtime, and why?**
  `secret_audit`'s absolute address (from the leaked base) and the account-to-account distance (from the two leaked heap addresses). Both change per run; hardcoding either breaks the exploit on the next launch.
* **How do you find `secret_audit()`?**
  From the symbol table; nothing calls it, but its offset is known and added to the recovered base.

## Discussion points

* **PIE randomises the base, not the layout** — one leaked code pointer defeats it.
* **Leak + write is the standard modern exploit shape**; neither half suffices alone.
* **Re-initialisation is a security property** — `rename_account()` leaving `audit` untouched is precisely what makes the overflow reach it.

## References

* `man 1 setarch`, `man 1 objdump`
* [pwntools ELF and symbols](https://docs.pwntools.com/en/stable/elf/elf.html)
