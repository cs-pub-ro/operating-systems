# Demo: One Fault per Page, Once

A program counting its own page faults around each step.

## Run

```console
make
./page_faults
```

## Ask

* 0 for the `mmap()`, 1024 for the first write, 0 for the second. What happened in each of the 1024?
* After the first write, who translates the addresses: the kernel or the hardware?
* Reading first costs 1024 faults, and writing afterwards costs 1024 again. What did the kernel map on the read, if not a fresh page?
