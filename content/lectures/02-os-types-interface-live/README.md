# Session 02: OS Types and the OS Interface

The plan of the second lecture, the demos run during it, and the points worth writing down.

This is the page used while the lecture is delivered.
The full version -- the same argument in prose, with the diagrams, the reference output and the reading -- is [`02-os-types-interface-full/`](../02-os-types-interface-full).

Lecture 01 said the operating system is one layer of the software stack.
This lecture opens that layer: what it is made of, the interface it offers, the hardware boundary behind the interface, what the boundary costs, and the design choices that follow.

## What the lecture answers

1. **Why is there an operating system at all?**
   The two things it does that no application can do for itself: provide common features, and enforce isolation.
1. **What is it made of, and how do you talk to it?**
   A library you do not link, reached through the system call interface.
1. **What makes the boundary a boundary?**
   User mode and kernel mode, enforced by the hardware, and why that is not the same as root and non-root.
1. **The boundary is expensive; how do you pay less?**
   Buffer in user space, or push work into the kernel.
1. **Where should the code live?**
   OS types and virtualization as the same protection-against-performance trade-off.

## Plan

| Part | Question | Demo | Figure |
| --- | --- | --- | --- |
| 00. Pitch | Why is there an operating system at all? | [`00-pitch/`](demos/00-pitch) | -- |
| 01. What makes an OS | What is an operating system made of? | [`01-make-os/`](demos/01-make-os) | [OS types](media/01-make-os/os-types.svg) |
| 02. The OS interface | How does a program ask the kernel for something? | [`02-os-interface/`](demos/02-os-interface) | -- |
| 03. Privileged domains | What makes the boundary a boundary? | [`03-privileged-domain/`](demos/03-privileged-domain) | [mode vs identity](media/03-privileged-domain/domains-vs-privilege.svg) |
| 04. Optimizing the interface | The boundary is expensive; how do you pay less? | [`04-optimize-os-interface/`](demos/04-optimize-os-interface) | -- |
| 05. OS types | Where should the code live? | -- | -- |
| 06. Virtualization | What runs the operating system? | -- | [virtualization](media/06-virtualization/virtualization.svg) |
| 07. Conclusion | What should survive the week? | -- | -- |

## Points to capture

Ten things to have in your notes when you leave.

1. The operating system has a **dual role**: it provides the features every program needs, and it enforces isolation between programs.
1. Even a bare program runs mostly **kernel instructions**; the OS is always there, doing work you did not ask for by name.
1. The OS is a **library you do not link and cannot trust the way a library trusts its caller**, shared by every program at once.
1. You reach it through the **system call interface**: a call number in `rax`, arguments in registers, the `syscall` instruction, result back in `rax`.
1. **libc calls are not system calls.** libc decides when to cross into the kernel, and often crosses far less than the code appears to ask.
1. The **user/kernel boundary is enforced by the hardware**: a privileged instruction faults in user mode, with no software check involved.
1. **Mode is not identity.** Kernel/user is a hardware mode; root/non-root is a software identity; they are orthogonal, and root still faults on `cli`.
1. A **system call costs hundreds of nanoseconds** because of the boundary, so performance work is about crossing it less often.
1. Two directions to cross less: **buffer in user space** (batch the crossings) or **push work into the kernel** (remove them, like `sendfile()`).
1. **OS types and virtualization** are the same trade-off made structurally: more in the kernel buys performance and attack surface; a hypervisor is to OSes what an OS is to applications.

## Demos

Each directory below holds the commands to run and the one question to ask about the result.
The sources, the reference output and the explanations are in the corresponding [`02-os-types-interface-full/demos/`](../02-os-types-interface-full/demos) directory.

| Demo | Shows |
| --- | --- |
| [`00-pitch`](demos/00-pitch) | Even a bare `Hello, World!` runs a hundred thousand to a million instructions, almost all of them the kernel's. |
| [`01-make-os/unikraft`](demos/01-make-os/unikraft) | The smallest specialised OS, built for one program, is still 240 KB and 800 symbols. |
| [`02-os-interface/syscalls`](demos/02-os-interface/syscalls) | A program that talks to the kernel through nothing but the `syscall` instruction. |
| [`02-os-interface/syscall-overhead`](demos/02-os-interface/syscall-overhead) | The same trivial write as a system call and as a function call: about seventy times apart. |
| [`03-privileged-domain`](demos/03-privileged-domain) | A privileged instruction crashes an ordinary process -- and still crashes it under `sudo`. |
| [`04-optimize-os-interface/fwrite`](demos/04-optimize-os-interface/fwrite) | User-space buffering turns per-byte system calls into per-kilobyte ones. |
| [`04-optimize-os-interface/sendfile`](demos/04-optimize-os-interface/sendfile) | `sendfile()` beats a read/send loop by keeping the data in the kernel. |

## Slides

The deck delivered in the room is [`slides/os-types-interface-live.html`](slides/os-types-interface-live.html), rendered from [`slides/os-types-interface-live.qmd`](slides/os-types-interface-live.qmd).
It is deliberately thin: the diagrams, the demo results, and nothing that is better said than read.
The [full deck](../02-os-types-interface-full/slides) carries the same structure with the detail filled in.
