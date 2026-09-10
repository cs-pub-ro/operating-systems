# Going Further: Leak and Overflow a PIE (heap-mayhem)

Optional.

## Things to try

1. Run the exploit twice and print the leaked base each time.
   Confirm it differs per run, and that a hardcoded address would have failed the second time.
1. Disable ASLR for one run (`setarch -R ./chall`) and compare the leaked base against `objdump`'s addresses.
1. Measure the account-to-account distance from the leaked addresses, then confirm it in `gdb`.
   Why compute it at runtime rather than trust a constant?

## Questions to answer

* A leaked `default_audit` pointer plus its offset gives you the load base. Why is that offset the same on every run?
* Why is `rename_account()` the right primitive for the overflow, and `create_account()` the wrong one?
* Which two things must be derived at runtime for the exploit to survive re-runs, and why?
* How did you find `secret_audit()`?

## Discussion points

* **PIE randomises the base, not the layout.** One leaked code pointer defeats it entirely.
* **An information leak plus a write is the standard modern exploit shape.** Neither half is enough alone.
* **Re-initialisation matters.** `rename_account()` leaving `balance`/`audit` untouched is what makes the overflow reach them intact.

## References

* `man 1 setarch` — running with ASLR disabled for comparison
* [pwntools ELF and ROP](https://docs.pwntools.com/en/stable/elf/elf.html)
