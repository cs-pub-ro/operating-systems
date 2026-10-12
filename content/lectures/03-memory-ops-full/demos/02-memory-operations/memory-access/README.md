# Demo: Permissions Are Per Area

Read, write and execute, tried against the data area and the code area of a program.
Four combinations work; three, commented out, each crash.

## Goal

Show that every area of a process has its own permissions, that the permissions follow from the area's role, and that any access outside them is a segmentation fault.

## Background

`memory-access.c` has a global array `data[]`, which the compiler places in `.data` (`rw-`), and a function `exec_do_nothing()`, placed in `.text` (`r-x`).
Three helpers read from, write to and jump to an address.
`main()` runs the four allowed combinations, and has three more commented out:

```c
	//do_exec("executing .data section", &data[0]);
	//do_write("writing to .text section", exec_do_nothing, 77);
	//do_read("reading from NULL", NULL);
```

## Build and run

```console
make
./memory-access
```

Then uncomment one of the three lines at a time, rebuild and run again.

## Results and explanations

As shipped:

```text
$ ./memory-access
reading from .data section
writing to .data section
reading from .text section
executing .text section
```

Reading data, writing data, reading code and running code all work.
Reading code is allowed because `.text` is `r-x`: the program may look at its own instructions, which debuggers and some runtimes rely on.

Each of the commented lines faults, for a different reason:

| Line | Area | Permissions | Why it faults |
| --- | --- | --- | --- |
| execute `.data` | data | `rw-` | no execute permission: `SEGV_ACCERR` |
| write `.text` | code | `r-x` | no write permission: `SEGV_ACCERR` |
| read `NULL` | none | -- | address 0 is in no area at all: `SEGV_MAPERR` |

The first two are the same mechanism as the [basic-memory-operations demo](../basic-memory-operations): the address exists, the access kind is wrong.
The third is the other kind of fault, and the common one: an address that belongs to no area.
The kernel leaves the lowest pages of every address space unmapped on purpose, so that a `NULL` pointer dereference -- the most frequent bug in C -- crashes at once rather than quietly reading whatever happened to be at address zero.

Permissions are what turns the areas of part 03 from bookkeeping into protection.
The code of a program cannot be overwritten by a stray pointer, its data cannot be executed by a stray jump, and nothing can be done through a pointer that was never set.

## Going further

* Run each crashing variant under `strace` and compare the `si_code` of the `SIGSEGV`: `SEGV_ACCERR` for the first two, `SEGV_MAPERR` for the third.
* `readelf -S memory-access | grep -E 'text|data'` shows the section flags (`AX` for allocate-execute, `WA` for write-allocate) that the loader turns into area permissions.
* Build with `-Wl,-N` (or `-Wl,--omagic`) and the write to `.text` succeeds: that linker flag makes the code segment writable, the way it was on systems before the `NX` bit.

## References

* `man 2 sigaction` (`SEGV_MAPERR`, `SEGV_ACCERR`), `man 7 signal`
* `man 1 readelf`, `man 1 ld` (`-N`)
