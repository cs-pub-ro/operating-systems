# Demo: The Same Address, Twice

Two copies of one program, each printing the address of a global variable and the value it stored there.
The addresses match; the values do not.

## Goal

Show that an address names a byte *in a process*, not a byte in the machine: two processes can use the same address at the same time and never see each other's data.

## Background

`same_address.c` writes its own PID into a global variable and into a local one, prints where each lives, and waits.
It is built with `-no-pie`, so that the executable is loaded at the same fixed address in every run and the global lands at the same address every time; a position-independent executable would move with each run, which hides the point (see below).

## Build and run

Two terminals, one copy in each:

```console
make
./same_address
```

Leave both waiting at the prompt, then compare the two outputs.

## Results and explanations

```text
$ ./same_address                      | $ ./same_address
pid 1208074: &value = 0x404040,       | pid 1208081: &value = 0x404040,
             value = 1208074          |              value = 1208081
pid 1208074: &local = 0x7ffd94f8e304, | pid 1208081: &local = 0x7ffd1a2c0b24,
             local = 12080740         |              local = 12080810
pid 1208074: code   = 0x401253        | pid 1208081: code   = 0x401253
```

`value` is at `0x404040` in both processes, and holds a different number in each.
After both have written, press Enter in either: its value is still its own.
Neither write reached the other process, although both went to "the same address".

Two things follow:

* **An address is relative to a process.**
  `0x404040` is a name inside process 1208074's address space and a different name inside process 1208081's.
  The lecture calls the thing each process has a *virtual address space*, and the fact that one never reaches into the other is what isolation means.
* **The code is at the same address too.**
  `main()` is at `0x401253` in both, and there is one copy of the executable's code in memory, shared by the two processes.
  Same address, same bytes this time; the lecture's part 05 shows how both outcomes come from the same mechanism.

The local variable's address differs between the two runs: the stack is placed at a random position by the kernel for every new process (address space layout randomisation), while `-no-pie` pins the executable's own areas.

## Going further

* Remove `-fno-pic` and `-no-pie` from the `Makefile`, rebuild, and run twice: now `&value` differs between runs as well, because a position-independent executable is loaded at a random base.
  `setarch -R ./same_address` turns the randomisation off for one run and the addresses are stable again.
  Either way, two processes may share an address, and may not; what they never share is the byte.
* Run the two copies as different users, or run one under `gdb` and try to read the other's `value`: there is no address that reaches it.
  `ptrace()`, which `gdb` uses, is the kernel's door into another process, and it is a system call, not a memory access.

## References

* `man 2 mmap`, `man 8 ld.so` (position-independent executables), `man 1 setarch` (`-R`)
* `man 2 ptrace`
