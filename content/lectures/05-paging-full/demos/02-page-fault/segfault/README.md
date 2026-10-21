# Demo: Eight Accesses, Two Kinds of No

One page, mapped read-write or read-only, accessed eight ways.
Six succeed; the other two end in `SIGSEGV`, for two different reasons that the program itself prints.

## Goal

Attach the two segmentation faults to the two questions the kernel asks in a page fault: is the address in a zone at all (`SEGV_MAPERR`), and does the zone allow this kind of access (`SEGV_ACCERR`).

## Background

`segfault.c` maps two pages and unmaps the second, so that the address right after the first page is guaranteed to be in no zone.
Depending on the argument it maps the page read-write or read-only, and reads or writes either inside the page or one byte past it.
A `SIGSEGV` handler installed with `sigaction()` prints the faulting address and the `si_code` the kernel attached, then exits.

Without the unmapped second page, an out-of-bounds access would often land in whichever zone the kernel placed next to ours and succeed silently; that is how most out-of-bounds bugs behave, and it is why the demo makes the hole explicit.

## Build and run

```console
make
./segfault
for i in 1 2 3 4 5 6 7 8; do ./segfault $i; echo "exit $?"; done
```

## Results and explanations

```text
$ ./segfault
./segfault <option>
  1 - read access on write perm
  2 - write access on write perm
  3 - out-of-bounds read access on write perm
  4 - out-of-bounds write access on write perm
  5 - read access on read perm
  6 - write access on read perm
  7 - out-of-bounds read access on read perm
  8 - out-of-bounds write access on read perm
```

| case | page | access | result |
| --- | --- | --- | --- |
| 1 | `rw-` | read inside | ok |
| 2 | `rw-` | write inside | ok |
| 3 | `rw-` | read past the end | `SIGSEGV`, `SEGV_MAPERR` |
| 4 | `rw-` | write past the end | `SIGSEGV`, `SEGV_MAPERR` |
| 5 | `r--` | read inside | ok |
| 6 | `r--` | write inside | `SIGSEGV`, `SEGV_ACCERR` |
| 7 | `r--` | read past the end | `SIGSEGV`, `SEGV_MAPERR` |
| 8 | `r--` | write past the end | `SIGSEGV`, `SEGV_MAPERR` |

```text
$ ./segfault 6
Reserve ro page with mmap.
Write to first byte in page.
SIGSEGV at 0x7dd401855000: SEGV_ACCERR: the zone forbids this access
$ ./segfault 3
Reserve rw page with mmap.
Read out of bounds.
SIGSEGV at 0x755bca209000: SEGV_MAPERR: no zone covers the address
```

Every one of the eight accesses starts the same way: the instruction forms an address, the MMU finds no valid entry for its page (the page has never been touched), and traps.
What differs is the kernel's verdict:

* Cases 1, 2 and 5 are inside the zone and allowed: a minor fault, a zeroed frame, the entry made valid, the instruction retried.
  The program never notices.
* Case 6 is inside the zone, but the zone is `r--` and the access is a write: `SEGV_ACCERR`, and a signal instead of a frame.
* Cases 3, 4, 7 and 8 touch an address in no zone: `SEGV_MAPERR`, whatever the access and whatever the neighbouring page's permissions.

The hardware did the same thing in all eight.
The list of zones is what turned one event into a frame, a kill for the wrong access, or a kill for the wrong address.

`strace` shows the signal as the kernel sent it, with the same code:

```text
$ strace -e trace=none ./segfault 3 2>&1 | grep SIGSEGV
--- SIGSEGV {si_signo=SIGSEGV, si_code=SEGV_MAPERR, si_addr=0x77857c232000} ---
```

## Going further

* Remove the `munmap()` of the second page and run cases 3 and 4 a few times: sometimes they still fault, sometimes they read or write a byte of whatever zone happens to follow, and the program exits normally.
  That is what an out-of-bounds bug looks like in a real program, and why lab 04 uses tools to find it.
* Map the page `PROT_NONE` and every access, read or write, is `SEGV_ACCERR`: a zone exists, and allows nothing.
  Guard pages at the end of each thread's stack are made this way.
* Run case 6 under `gdb`: `info proc mappings` shows the zone as `r--p`, and `p $_siginfo._sifields._sigfault.si_addr` the address.

## References

* `man 2 sigaction` (`SEGV_MAPERR`, `SEGV_ACCERR`), `man 7 signal`, `man 2 mmap`, `man 2 mprotect`
