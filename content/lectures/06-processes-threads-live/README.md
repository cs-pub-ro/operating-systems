# Session 06: Processes and Threads

The plan of the sixth lecture, the demos run during it, and the points worth writing down.

This is the page used while the lecture is delivered.
The full version -- the same argument in prose, with the diagrams, the reference output and the reading -- is [`06-processes-threads-full/`](../06-processes-threads-full).

Lectures 03 to 05 were about memory, and that memory belongs to a process.
This lecture is the process itself: what it is made of, how it is created and waited for, and the two ways to get a second thing running, another process or another thread.
It is the first lecture on compute: memory was where a program keeps things, and from here the subject is how it runs.

## What the lecture answers

1. **What is running on this machine right now?**
   Hundreds of processes from hundreds of programs; one program using many cores; a process with dozens of threads.
1. **What is a process made of?**
   An address space, which holds the code and data, and one or more threads, which run.
1. **What does it take to run, and what do threads share?**
   An instruction pointer and a stack; threads share the whole address space, each with its own stack.
1. **How is a process created, waited for and ended?**
   By another process, in a tree under PID 1; a zombie is unwaited, an orphan is re-parented.
1. **How is a thread created?**
   From a function, with `pthread_create()` and `pthread_join()`.
1. **What are the raw calls, and what is underneath?**
   `fork()` copies, `exec()` replaces; `fork()` and `pthread_create()` are both `clone()`.

## Plan

| Part | Question | Demo | Figure |
| --- | --- | --- | --- |
| 00. Pitch | What is running right now? | [`00-pitch/`](demos/00-pitch) | [the storyline](media/00-pitch/storyline.svg) |
| 01. Running an application | What is a process made of? | [`01-run-apps/`](demos/01-run-apps) | [two halves](media/01-run-apps/process-threads.svg) |
| 02. The process address space | What does it hold, and from where? | -- | [zones](media/02-address-space/memory-areas.svg) |
| 03. Threads | What does it take to run, and what is shared? | [`03-threads/`](demos/03-threads) | [shared space](media/03-threads/threads-shared-space.svg) |
| 04. Process operations | How is a process made, waited for, ended? | [`04-process-ops/`](demos/04-process-ops) | [lifecycle](media/04-process-ops/process-lifecycle.svg), [zombie/orphan](media/04-process-ops/orphan-zombie.svg) |
| 05. Thread operations | How is a thread created and joined? | [`05-thread-ops/`](demos/05-thread-ops) | [create/join](media/05-thread-ops/thread-operations.svg) |
| 06. fork() and exec() | What are the raw calls underneath? | [`06-fork-exec/`](demos/06-fork-exec) | [fork/exec](media/06-fork-exec/fork-exec.svg) |
| 07. Conclusion | What should survive the week? | -- | -- |

## Storyline / Narrative

The lecture follows one thread from start to finish, and the figure below walks through it, station by station: [the storyline](media/00-pitch/storyline.svg).

1. **The hook:** 620 processes from 377 programs, one `ffmpeg` at 641% of a CPU, one process with 56 threads that all see the same memory.
   Running an application means making a process; a process uses many cores because it has many threads.
1. **A process is two halves:** an address space that holds code and data, and one or more threads that run.
   The kernel keeps a process control block for the whole thing and a thread control block per thread.
1. **The address space, recapped:** a list of zones with a role and an origin, built from the executable and grown at run time, with one stack per thread.
   The threads share all of it bar each other's stacks.
1. **What a thread is:** an instruction pointer, what to run, and a stack pointer to a stack, how execution is stored.
   Give a CPU those two and it has a flow of execution.
1. **What threads share:** one address space, the code, the globals, the heap; each keeps only its own ~8 MB stack.
1. **Processes make processes:** created, waited for, ended; every process has a parent, so the system is a tree under PID 1.
1. **Zombies and orphans:** a finished child not yet waited for is a zombie; a child whose parent ended is an orphan, adopted by PID 1.
   Waiting is a duty.
1. **Threads from a function:** `pthread_create()` runs a function in a new thread; `pthread_join()` waits and returns its result.
   Give each thread its own memory and no lock is needed.
1. **fork() and exec():** `fork()` copies the process and returns twice; `exec()` replaces the program and does not return.
   `posix_spawn()` is the two wrapped together.
1. **One primitive underneath:** `fork()` copies, `pthread_create()` shares, and both are `clone()` with different flags.
   Copy for isolation, share for cooperation.
1. **What should survive the week:** a process is an address space plus one or more threads; the threads share the space, each with its own stack; a process is made by another and waited for; a second flow of control is another process or another thread, and both are `clone()`.
   Next time: 3,412 threads on 14 cores, so most are waiting, and the scheduler that decides which run.

## Points to capture

Ten things to have in your notes when you leave.

1. **A process is an address space plus one or more threads.** The space holds the code and data; the threads execute. The kernel keeps a PCB per process and a TCB per thread.
1. **The address space is shared by all of a process's threads.** It is the list of zones of lectures 03 to 05, built from the executable and grown at run time.
1. **A thread is an instruction pointer and a stack pointer.** The IP says what to run; the SP points at the thread's stack, which holds the call chain and the locals.
1. **Threads share everything but their stacks.** Same code, same globals, same heap, same open files; one stack each, about 8 MB, a new zone per thread.
1. **A process is created by another process** and must be **waited for**; `waitpid()` gives the exit status, read with `WIFEXITED()` and `WEXITSTATUS()`.
1. **Processes form a tree under PID 1.** Every process has a parent; the init process is the root.
1. **Zombie and orphan.** A zombie has ended but not been waited for; an orphan has lost its parent and is adopted, and reaped, by PID 1.
1. **A thread is created from a function** with `pthread_create()` and waited for with `pthread_join()`, which returns the thread's result.
1. **`fork()` copies and returns twice; `exec()` replaces and does not return.** The pair makes and launches a process; `posix_spawn()` wraps them.
1. **`fork()` and `pthread_create()` are both `clone()`.** A process is a `clone` that copies the address space; a thread is a `clone` that shares it.

## Demos

Each directory below holds the sources, the commands to run and the question to ask about the result.

| Demo | Shows |
| --- | --- |
| [`00-pitch/processes-and-threads`](demos/00-pitch/processes-and-threads) | 620 processes, 377 programs, 3,412 threads between them. |
| [`00-pitch/libx264`](demos/00-pitch/libx264) | One `ffmpeg` process at 641% CPU: one process, many threads, many cores. |
| [`01-run-apps/threads-in-address-space`](demos/01-run-apps/threads-in-address-space) | 56 threads under `/proc`, one identical address space. |
| [`03-threads/ip-sp`](demos/03-threads/ip-sp) | Same function, same IP; a different SP per thread, ~8 MB apart. |
| [`03-threads/new-stack-area`](demos/03-threads/new-stack-area) | A new ~8 MB stack zone appears per thread. |
| [`04-process-ops/posix_spawn`](demos/04-process-ops/posix_spawn) | Create a child, wait for it, read its exit status. |
| [`04-process-ops/zombie`](demos/04-process-ops/zombie) | An ended child not yet waited for: `Z`, `<defunct>`. |
| [`04-process-ops/orphan`](demos/04-process-ops/orphan) | A child re-parented to `systemd` after its parent exits. |
| [`05-thread-ops/create-join`](demos/05-thread-ops/create-join) | Threads summing a slice each, joined and added, no lock. |
| [`06-fork-exec/fork-exec`](demos/06-fork-exec/fork-exec) | `posix_spawn` by hand: `fork()` then `exec()`. |
| [`06-fork-exec/strace`](demos/06-fork-exec/strace) | Both paths trace to `clone`/`clone3` and `execve`. |

## Slides

The deck delivered in the room is [`slides/processes-threads-live.html`](slides/processes-threads-live.html), rendered from [`slides/processes-threads-live.qmd`](slides/processes-threads-live.qmd).
It is deliberately thin: the diagrams, the demo results, and nothing that is better said than read.
The [full deck](../06-processes-threads-full/slides) carries the same structure with the detail filled in.
