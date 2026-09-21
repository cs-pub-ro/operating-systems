# Demo: Build Hello, World with Unikraft

[Unikraft](https://github.com/unikraft/unikraft) builds a *unikernel*: a single bootable image that is one application and just enough operating system to run it, and nothing else.
It is about as small as an operating system gets, and it is still not small.

## Goal

Give "the operating system" a size and a shape.
By building the most specialised OS image possible -- one that exists only to print one line -- you get a lower bound on what an operating system is, and it is far above zero.

## Background

A general-purpose kernel like Linux carries drivers, filesystems, a scheduler, a network stack and a system-call interface for thousands of programs it has never seen.
A unikernel throws all of that away except what its one application uses, and links the result into a single image that boots on bare metal or under a hypervisor.
There is no user/kernel split inside it, because there is only one application and it is trusted; this is the *single address space operating system* (SASOS) idea, and it is one of the OS types discussed in part 05.

So a unikernel is the best case for "how little OS can there be".
The answer, even here, is a few hundred kilobytes.

## Build and run

First install the [package requirements](https://github.com/unikraft/catalog-core?tab=readme-ov-file#requirements).
Then build and run the image with the helper script:

```console
./do-all-unikraft-helloworld.sh
```

It clones the Unikraft catalogue and core, builds the `c-hello` application for QEMU/x86-64, and boots it.

## Results and explanations

The application prints `Hello, World!` and the machine halts.
Look at what it took to do that:

```console
$ cd catalog-core/c-hello/

$ ls -lh workdir/build/c-hello_qemu-x86_64
-rwxr-xr-x 1 user user 241K ... workdir/build/c-hello_qemu-x86_64

$ nm workdir/build/c-hello_qemu-x86_64.dbg | wc -l
855
```

A quarter of a megabyte and over eight hundred symbols, for a program whose own contribution is one `printf`.
Everything else is the operating system: memory setup, a minimal libc, the boot code, the console driver that turns `printf` into characters on the QEMU serial line.

That is the takeaway.
Even after removing the scheduler-for-many-processes, the driver-for-every-device and the interface-for-every-program that a general kernel carries, what remains is still substantial -- because "run one program on a machine" is itself a large job once you count booting, memory, and talking to hardware.

## Going further

* Compare the image size with a statically linked Linux `hello` (`gcc -static`), which is around 800 KB, and ask where the difference goes: the Linux binary assumes a kernel underneath it, the unikernel *is* the kernel.
* Browse [`makelinux.github.io/kernel/map`](https://makelinux.github.io/kernel/map/) for the other extreme: everything a general-purpose kernel contains, which the unikernel leaves out.
* Read about the other OS types in part 05 of the session; the unikernel is the far end of "put everything in one address space".

## References

* [Unikraft](https://unikraft.org/) and its [catalogue](https://github.com/unikraft/catalog-core)
* [Interactive Linux kernel map](https://makelinux.github.io/kernel/map/)
* Anil Madhavapeddy et al., [*Unikernels: Library Operating Systems for the Cloud*](https://anil.recoil.org/papers/2013-asplos-mirage.pdf)
