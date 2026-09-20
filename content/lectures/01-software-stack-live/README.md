# Session 01: The Software Stack

The plan of the first lecture, the demos run during it, and the points worth writing down.

This is the page used while the lecture is delivered.
The full version -- the same argument in prose, with the diagrams, the reference output and the reading -- is [`01-software-stack-full/`](../01-software-stack-full).

## What the lecture answers

1. **What are the layers?**
   What sits on what, from the instruction set up to a web framework, and what each layer adds.
1. **What is the operating system?**
   What it manages, what it arbitrates, and how a program asks it for something.
1. **What does a layer cost?**
   The trade-offs that decide how high in the stack to write a piece of software.
1. **What kinds of software component are there?**
   Applications and libraries, and what actually separates them.
1. **How do components interact?**
   User interfaces, APIs and protocols.

## Plan

| Part | Question | Demo | Figure |
| --- | --- | --- | --- |
| 00. Pitch | Why should a programmer care what is underneath? | [`00-pitch/`](demos/00-pitch) | -- |
| 01. Lecture map | What are we doing today? | -- | -- |
| 02. The software stack | What are the layers, and what does each give you? | [`02-software-stack/`](demos/02-software-stack) | [the stack](media/02-software-stack/software-stack.svg) |
| 03. The operating system | What is the kernel, and how do you talk to it? | [`02-software-stack/`](demos/02-software-stack) | [OS and syscall API](media/03-kernel/os-syscall.svg) |
| 04. Trade-offs | What do you give up by moving up or down? | [`04-versus/`](demos/04-versus) | [up and down](media/04-versus/software-software-versus.svg) |
| 05. Applications and libraries | What kinds of component are there? | -- | [apps and libs](media/05-apps-libs/libraries-and-apps.svg) |
| 06. Interaction | How do separate components talk? | [`06-software-interaction/`](demos/06-software-interaction) | [interaction](media/06-software-interaction/software-interaction.svg) |
| 07. Conclusion | What should survive the week? | -- | -- |

## Points to capture

Ten things to have in your notes when you leave.

1. Software is built in **layers**, and each layer offers an **interface** to the one above: ISA, system call API, C API, language API, framework API, UI.
1. An interface is a promise about *what*, and it is valuable in proportion to how little it says about *how*.
1. The **operating system** does three things: manages resources, arbitrates between programs, and provides system services.
1. Its API is the **system call API**, and it is entered through one controlled instruction, not by jumping wherever you like.
1. The kernel is a **library, not a process**: it runs when a program calls it or when a device interrupts, and it runs *on behalf of* that program.
1. A system call costs a mode switch --- hundreds of nanoseconds against a few for a function call --- which is why libc buffers.
1. **libc** sits between the two: it wraps system calls and adds everything the kernel deliberately does not do.
1. Moving **up** the stack buys development speed, features, portability and usually safety; moving **down** buys control, performance and lower overhead.
1. An **application** has an entry point and is started; a **library** has an interface and is called. Both are ordinary machine code in a file.
1. Components interact through a **UI** (a person on the other side), an **API** (code in the same process) or a **protocol** (a different process, possibly a different machine).

## Demos

Each directory below holds the commands to run and the one question to ask about the result.
The sources, the reference output and the explanations are in the corresponding [`01-software-stack-full/demos/`](../01-software-stack-full/demos) directory.

| Demo | Shows |
| --- | --- |
| [`00-pitch/01-copy-string`](demos/00-pitch/01-copy-string) | The same string built two ways, thirty times apart. |
| [`00-pitch/02-const-char-init`](demos/00-pitch/02-const-char-init) | One character of difference between a program that runs and one that crashes. |
| [`00-pitch/03-find-buffer-cache`](demos/00-pitch/03-find-buffer-cache) | The same command getting fifteen times faster by being run again. |
| [`00-pitch/04-python-string-edit`](demos/00-pitch/04-python-string-edit) | An assignment that does nothing and changes the complexity. |
| [`02-software-stack`](demos/02-software-stack) | The same message printed from five heights of the stack, counted in system calls. |
| [`04-versus`](demos/04-versus) | What a security guarantee costs, in nanoseconds. |
| [`06-software-interaction`](demos/06-software-interaction) | Four containers, three protocols, one web page. |

## Slides

The deck delivered in the room is [`slides/software-stack-live.html`](slides/software-stack-live.html), rendered from [`slides/software-stack-live.qmd`](slides/software-stack-live.qmd).
It is deliberately thin: the diagrams, the demo results, and nothing that is better said than read.
The [full deck](../01-software-stack-full/slides) carries the same structure with the detail filled in.
