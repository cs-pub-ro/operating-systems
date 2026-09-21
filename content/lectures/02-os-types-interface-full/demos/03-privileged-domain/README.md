# Demo: Privileged Instructions Fault in User Mode

Two tiny assembly programs try to run a privileged instruction from an ordinary process.
Both are killed the instant they reach it.
This is the hardware half of the user/kernel boundary: not a policy the kernel enforces in software, but something the CPU refuses to do.

## Goal

Show that "user mode cannot do X" is enforced by the processor itself.
The kernel does not need to check for these instructions; the hardware faults on them, and the kernel only gets involved to clean up the corpse.

## Background

The x86-64 processor runs in one of several privilege levels; applications run at the least privileged (ring 3), the kernel at the most privileged (ring 0).
A handful of instructions are defined to work only at ring 0, because they control the machine as a whole:

* `cli` clears the interrupt flag, which would let a process stop the kernel from ever regaining the CPU.
* `mov rax, cr3` reads control register 3, which holds the physical address of the current page tables -- the mechanism that keeps processes out of each other's memory.

Each program prints `first`, executes the forbidden instruction, and tries to print `second`.
If the instruction were allowed, both lines would appear.

## Build and run

```console
make
./cli
./cr3
```

## Results and explanations

Only the first line is ever printed:

```console
$ ./cli
first
Segmentation fault (core dumped)

$ ./cr3
first
Segmentation fault (core dumped)
```

The program never reaches `second`.
The instruction did not "fail" and return an error; the CPU raised a general-protection fault, the kernel caught it, found no handler in the process, and killed it.
`dmesg` records the fault from the kernel's side:

```console
$ dmesg | tail -2
traps: cli[137349] general protection fault ip:40112f sp:... error:0 in cli[...]
traps: cr3[137358] general protection fault ip:40112f sp:... error:0 in cr3[...]
```

Three things to take from it.

* **The boundary is in silicon.**
  There is no `if` in the kernel that rejects `cli`.
  The processor is built so that the instruction traps at ring 3, and that trap is the only thing that runs.
  A software check could be bypassed; this cannot.
* **This is why the `syscall` instruction exists.**
  A process cannot do privileged work directly, so it asks the kernel to do it, through the one controlled entry point.
  `syscall` is the sanctioned way to have ring-0 work done on your behalf, precisely because instructions like these are off-limits.
* **Privilege is not the same as being root.**
  Running these as `root` changes nothing: they still fault.
  `root` is a user-space identity the kernel uses for permission checks; ring 0 is a hardware mode.
  They are orthogonal, which is the distinction the diagram in this part of the lecture draws out.

## Going further

* Run `./cli` as `root` and confirm it still crashes: the mode and the identity are different axes.
* Disassemble with `objdump -d cli` and find the `cli` instruction at the faulting `ip` from `dmesg`.
* Read `man 2 iopl` and `man 2 ioperm` for the narrow, deliberately guarded ways a process can be granted some hardware access -- and note how much ceremony that takes, compared with the instruction just working in the kernel.

## References

* Intel SDM Vol. 3, "Protection" -- privilege levels and privileged instructions
* `man 7 capabilities` -- the user-space side of "who may ask the kernel for what"
