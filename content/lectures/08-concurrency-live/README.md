# Session 08: Concurrency

The plan of the eighth lecture, the demos run during it, and the points worth writing down.

This is the page used while the lecture is delivered.
The full version -- the same argument in prose, with the diagrams, the reference output and the reading -- is [`08-concurrency-full/`](../08-concurrency-full).

Lecture 07 ended with a warning: the threads that share a CPU also share memory, and a context switch can land between any two instructions.
This lecture is about what follows: one sum that eight threads get wrong, the two things that cause it, and the two cures, not sharing and taking turns.
It is the third lecture on compute: lecture 06 was what runs, lecture 07 was when, and this one is what happens when several run over the same data.

## What the lecture answers

1. **Why do eight threads get a sum wrong, and take longer doing it?**
   One sum, six programs: one wrong, one right and fast, three right and slow.
1. **When does a thread lose the CPU, and does it get a say?**
   Four triggers; two are involuntary, driven by the timer, and land between any two instructions.
1. **What is concurrency, and what can it break?**
   Threads alive at the same time, in parallel or not; the coherence and the consistency of the data they share.
1. **What exactly goes wrong, and what causes it?**
   `sum += i` is a load, an add and a store; shared data, plus preemption or several cores.
1. **How is it put right?**
   Partition: a piece per thread, nothing shared. Synchronize: a critical section, one thread at a time.
1. **What does taking turns cost, and how does it go wrong?**
   Serialized work and contention; a deadlock; a race between a check and an action.

## Plan

| Part | Question | Demo | Figure |
| --- | --- | --- | --- |
| 00. Pitch | Why are eight threads wrong, and slower? | [`00-pitch/`](demos/00-pitch) | [the storyline](media/00-pitch/storyline.svg), [six sums](media/00-pitch/six-sums.svg) |
| 01. Reminder: leaving the CPU | When does a thread lose the CPU? | -- | [four triggers](media/01-reminder/thread-states.svg) |
| 02. Concurrency | What is it, and what can it break? | -- | [turns, or at once](media/02-concurrency/concurrency-parallelism.svg), [coherence and consistency](media/02-concurrency/coherence-consistency.svg) |
| 03. Root causes | What goes wrong, and why? | [`03-root-causes/`](demos/03-root-causes) | [the lost update](media/03-root-causes/lost-update.svg) |
| 04. Partitioning and synchronization | Not sharing, or taking turns? | [`04-partitioning-synchronization/`](demos/04-partitioning-synchronization) | [two answers](media/04-partitioning-synchronization/partition-synchronize.svg) |
| 05. Problems with synchronization | What do locks cost, and how do they go wrong? | [`05-synchronization-problems/`](demos/05-synchronization-problems) | [the chain](media/05-synchronization-problems/the-chain.svg), [locks go wrong](media/05-synchronization-problems/locks-go-wrong.svg) |
| 06. Conclusion | What should survive the week? | -- | -- |

## Storyline / Narrative

The lecture follows one thread from start to finish, and the figure below walks through it, station by station: [the storyline](media/00-pitch/storyline.svg).

1. **The hook:** one sum, forty million additions, six programs.
   One thread: right, in 15 ms. Eight threads: wrong, differently each run, and three times slower.
1. **Flashback, the switch:** a thread leaves the CPU when it blocks, yields, runs out of time slice, or is outranked.
   The last two come from the timer and can land between any two instructions.
1. **Taking turns, or at once:** concurrent threads are alive at the same time; on one core they interleave, on several they run in parallel.
   Parallelism makes work faster; concurrency is what makes it go wrong, and needs no second core.
1. **Shared data:** threads share memory.
   Coherence: every thread sees the same value. Consistency: the same program gives the same result every time. The hook lost both.
1. **The lost update:** `sum += i` is load, add, store.
   Two threads load 5, both store 6: two additions, and the sum moved by one.
1. **Two culprits:** shared data, plus preemption (typically 14% lost on one core) or several cores (about 80% lost on all of them).
   One instruction is safe on one core; one locked instruction is safe everywhere.
1. **Don't share:** a partial sum per thread, added up at the end.
   Right, in 2 ms: eight times faster than one thread.
1. **Share with a lock:** a list does not split, and ten threads on one list end in a segmentation fault.
   Lock, change the list, unlock: a critical section, one thread at a time.
1. **The kernel shares too:** eight threads that map and unmap their own pages take fifteen times longer than eight processes.
   One address space, one lock in the kernel, and nothing in the source to show for it.
1. **Locks cost:** atomic 17 times slower than one thread, mutex 80 times, spinlock 250 times.
   One lock per thread: 3 ms. One lock per addition: 308 ms.
1. **Locks go wrong:** two locks in opposite orders, and the program stops at 0% CPU with no error.
   A check and an action locked separately, and the shop sells an item it no longer has.
1. **What should survive the week:** a race needs shared data, plus preemption or several cores; partition what you can, synchronize what is left, keep critical sections few and short, take locks in one order.
   Next time: the threads stop computing and start waiting, for files, for devices, for each other.

## Points to capture

Ten things to have in your notes when you leave.

1. **Concurrent:** alive over the same period. **Parallel:** running at the same instant. One core can have the first without the second.
1. **`sum += i` is three steps:** load, add, store. A thread that stops between them holds a stale copy.
1. **A race condition:** the result depends on how the threads interleave. The lost update is the simplest one.
1. **A race needs shared data, plus one of:** preemption, between two instructions, on one core; or several cores, on the memory bus, inside one instruction.
1. **Coherence:** every thread sees the same value. **Consistency:** the operations take effect in a correct order, and the result is the same every run.
1. **Partitioning removes the shared data:** a piece per thread, results combined once at the end. No lock, no waiting; it works when the data splits.
1. **Synchronization keeps the shared data:** a critical section, entered by one thread at a time, guarded by a lock. A lock protects data, not code.
1. **Atomic operation:** one indivisible instruction. **Spinlock:** waiters keep trying, on their CPU. **Mutex:** waiters are blocked by the kernel.
1. **Locks cost:** a critical section is serial, and the turn-taking is paid on top. Granularity, how much a lock covers, trades overhead against parallelism.
1. **Locks go wrong:** deadlock, cured by one lock order; and a check and an action in separate critical sections, cured by putting them in one.

## Demos

Each directory below holds the sources, the commands to run and the question to ask about the result.

| Demo | Shows |
| --- | --- |
| [`00-pitch/sum`](demos/00-pitch/sum) | One thread: 15 ms. Eight threads: wrong, 51 ms. Partitioned: 2 ms. Atomic, mutex, spinlock: 255, 1,215, 3,695 ms. |
| [`03-root-causes/one-core-many-cores`](demos/03-root-causes/one-core-many-cores) | A counter losing about 80% on every core, typically 14% on one; nothing with one locked instruction. |
| [`04-partitioning-synchronization/list`](demos/04-partitioning-synchronization/list) | Ten threads, one list: a segmentation fault, then a mutex. |
| [`04-partitioning-synchronization/kernel-contention`](demos/04-partitioning-synchronization/kernel-contention) | Eight threads mapping memory: 1,635 ms. Eight processes: 109 ms. |
| [`05-synchronization-problems/granularity`](demos/05-synchronization-problems/granularity) | One lock per thread: 3 ms. One lock per addition: 308 ms. |
| [`05-synchronization-problems/deadlock`](demos/05-synchronization-problems/deadlock) | Two locks, opposite orders: every thread in `S`, 0% CPU. |
| [`05-synchronization-problems/toctou`](demos/05-synchronization-problems/toctou) | Every access locked, and a million items sold a million and two times. |

## Slides

The deck delivered in the room is [`slides/concurrency-live.html`](slides/concurrency-live.html), rendered from [`slides/concurrency-live.qmd`](slides/concurrency-live.qmd).
It is deliberately thin: the diagrams, the demo results, and nothing that is better said than read.
The [full deck](../08-concurrency-full/slides) carries the same structure with the detail filled in.
