# Session 07: Scheduling

The plan of the seventh lecture, the demos run during it, and the points worth writing down.

This is the page used while the lecture is delivered.
The full version -- the same argument in prose, with the diagrams, the reference output and the reading -- is [`07-scheduling-full/`](../07-scheduling-full).

Lecture 06 ended with a count: thousands of threads on a machine with a couple of dozen CPUs, so most of them are not running at any moment.
This lecture is about those threads: where a thread is when it is not on a CPU, how it gets on and off one, and the function in the kernel that decides.
It is the second lecture on compute: lecture 06 was what runs, this one is when.

## What the lecture answers

1. **Where does a process's time go, and who hands out the CPU?**
   4,614 threads on 24 CPUs with 6 running; a browser alive for three days with two hours of CPU; 2.8 billion context switches since boot.
1. **How is a process created and ended, and what does `fork()` really cost?**
   `posix_spawn()`, `fork()` and `exec()`, `wait()`, zombies and orphans; a page table copied, and one fault per page written.
1. **What is the scheduler, when does it run, and what does it need?**
   A function the kernel calls whenever something changes: every thread and its history in, one thread per CPU and a time slice out.
1. **Where is a thread when it is not running?**
   Ready, in the ready queue, waiting for a CPU; or blocked, in a wait queue, waiting for an event.
1. **How does one thread leave the CPU and another enter, and why?**
   A context switch saves and loads IP, SP and registers; a thread leaves because it blocks, yields, is preempted by a higher priority, or its slice ends.
1. **How long does a thread wait, what is the load, and what does a switch cost?**
   Microseconds while threads fit the CPUs, tens of milliseconds when they do not; running plus ready, averaged; cold caches more than registers.
1. **What does the scheduler decide from, and what does it decide?**
   Measured behaviour and the nice value in; a priority and a time slice out; interactivity against throughput.

## Plan

| Part | Question | Demo | Figure |
| --- | --- | --- | --- |
| 00. Pitch | Where does the time go? | [`00-pitch/`](demos/00-pitch) | [the storyline](media/00-pitch/storyline.svg), [process times](media/00-pitch/process-times.svg) |
| 01. Processes, recapped | How is a process created and ended? | [`01-process-ops/`](demos/01-process-ops) | -- |
| 02. Copy-on-write | What does `fork()` cost? | [`02-copy-on-write/`](demos/02-copy-on-write) | [copy-on-write](media/02-copy-on-write/copy-on-write.svg) |
| 03. Scheduling, an overview | What is the scheduler, and what does it need? | -- | [the scheduler is a function](media/03-scheduling-overview/cpu-scheduling.svg) |
| 04. Thread states | Where is a thread when it is not running? | [`04-thread-states/`](demos/04-thread-states) | [three states](media/04-thread-states/thread-states.svg) |
| 05. The context switch | How does a thread leave the CPU, and why? | [`05-context-switch/`](demos/05-context-switch) | [the context switch](media/05-context-switch/context-switch.svg) |
| 06. Queues, waiting and load | How long does it wait, and what does a switch cost? | [`06-state-transitions/`](demos/06-state-transitions) | [where a thread waits](media/06-state-transitions/queues-and-load.svg) |
| 07. Nuts and bolts | What does the scheduler decide from? | [`07-scheduling-nuts-and-bolts/`](demos/07-scheduling-nuts-and-bolts) | [inputs and outputs](media/07-nuts-and-bolts/scheduling-tunables.svg) |
| 08. Conclusion | What should survive the week? | -- | -- |

## Storyline / Narrative

The lecture follows one thread from start to finish, and the figure below walks through it, station by station: [the storyline](media/00-pitch/storyline.svg).

1. **The hook:** 4,614 threads, 24 CPUs, 6 running; a browser alive for three days with two hours of CPU; 2.8 billion switches since boot.
   Where is a thread when it is not running, and who decides which ones run?
1. **Where threads come from:** a process is made by another, with `fork()` and `exec()` or `posix_spawn()`, and waited for.
   A zombie has ended and not been waited for; an orphan has lost its parent and is adopted by PID 1.
1. **What a fork costs:** the page table is copied and every page shared read-only; the first write to a page faults once and copies that page.
   22 faults to make a child with 4 MB of memory, 1 to read half of it, 512 to write the other half.
1. **One function decides:** more threads than CPUs, so the CPUs are shared in time.
   `schedule()` takes every thread and its history and picks one per CPU; it is called whenever something changes.
1. **Three states:** running, on a CPU; ready, waiting for a CPU; blocked, waiting for an event.
   `ps` says `R` for the first two and `S` for the third, and a thread flips from `R` to `S` the moment it asks for input.
1. **The switch:** IP, SP and registers saved into one TCB and loaded from another.
   Not a domain switch, which keeps the thread; but the kernel does it, so it begins with one.
1. **Why a thread leaves:** it blocks, it yields, a higher-priority thread wakes, or its slice ends.
   Two voluntary, two involuntary; a `find` from a cold disk makes 26,865 voluntary switches, the same `find` from the cache makes one.
1. **Waiting in line:** time in the ready queue is pure waiting, and it grows with the crowd: a microsecond with 8 threads, 50 ms with 512.
   The load average is the line plus the threads running, averaged over minutes.
1. **What a switch costs:** the registers are cheap; the cold caches and the cold TLB behind them are not.
   Thousands of switches a second is normal; the scheduler's job is to keep them worth it.
1. **The knobs:** the kernel measures each thread's behaviour, I/O-bound or CPU-bound; the admin adds a nice value from -20 to +19.
   From these it sets a dynamic priority, who goes first, and a time slice, for how long; three groups of hogs at -20, 0 and +19 finish in 3, 7 and 9 seconds.
1. **Fair or fast:** a small slice buys responsiveness and costs switches; a large slice buys throughput and costs waiting.
   Every scheduler picks a point between interactivity and throughput.
1. **What should survive the week:** the scheduler is a function the kernel calls, voluntarily or not, to pick one thread per CPU; a thread is running, ready or blocked; a context switch moves it between the first two; behaviour and nice set its priority and its time slice.
   Next time: the threads that share a CPU also share memory, and a switch can land between any two instructions.

## Points to capture

Ten things to have in your notes when you leave.

1. **Elapsed time = user time + system time + time off the CPU**, and for almost every process the last term is nearly all of it.
1. **`fork()` copies the page table, not the pages.** Every page is shared read-only; the first write to a page faults once and copies that one page.
1. **The scheduler is a function**, `schedule()`, that the kernel calls when something changes. Input: every thread and its history. Output: one thread per CPU, and a time slice.
1. **A thread is running, ready or blocked.** At most one running per CPU; ready threads wait in the ready queue; blocked threads wait in a wait queue, one per event.
1. **`ps` state letters:** `R` is running or ready, `S` and `D` are blocked, `Z` will never run again. Nearly every thread is `S`.
1. **A context switch** saves the running thread's IP, SP and registers into its TCB and loads another's. It is not a domain switch, though it begins with one.
1. **Four reasons to leave the CPU:** block, yield (voluntary); a higher-priority thread became ready, the time slice expired (involuntary). The kernel counts both per thread.
1. **A blocked thread becomes ready when its event happens, and running when the scheduler picks it.** Never blocked to running directly.
1. **Time in the ready queue grows with the number of threads that want to run;** the load average is running plus ready threads, averaged over 1, 5 and 15 minutes.
1. **Inputs: behaviour (I/O-bound or CPU-bound, measured) and nice (-20 to +19, told). Outputs: priority (who first) and time slice (how long).** Small slices for interactivity, large ones for throughput.

## Demos

Each directory below holds the sources, the commands to run and the question to ask about the result.

| Demo | Shows |
| --- | --- |
| [`00-pitch/threads-vs-cpus`](demos/00-pitch/threads-vs-cpus) | 4,614 threads, 24 CPUs, 6 in `R`. |
| [`00-pitch/process-times`](demos/00-pitch/process-times) | A browser alive for three days, two hours on a CPU: 2.9%. |
| [`00-pitch/start-process-times`](demos/00-pitch/start-process-times) | `find` cold at 13% of a CPU, warm at 99%. |
| [`01-process-ops/fork-exec`](demos/01-process-ops/fork-exec) | `posix_spawn` by hand: `fork()` then `exec()`. |
| [`01-process-ops/zombie`](demos/01-process-ops/zombie) | An ended child not yet waited for: `Z`, `<defunct>`. |
| [`02-copy-on-write/fork-faults`](demos/02-copy-on-write/fork-faults) | 22 faults to fork, 1 to read, 512 to write 512 pages. |
| [`04-thread-states/show-states`](demos/04-thread-states/show-states) | Every thread's state letter, and the histogram. |
| [`04-thread-states/change-state`](demos/04-thread-states/change-state) | One thread flipping `R` to `S`; which time moves. |
| [`05-context-switch/show-context-switches`](demos/05-context-switch/show-context-switches) | One voluntary switch per wait, a hundred involuntary per burst. |
| [`05-context-switch/buffer-cache`](demos/05-context-switch/buffer-cache) | 26,865 voluntary switches from the disk, 1 from the cache. |
| [`06-state-transitions/waiting-time`](demos/06-state-transitions/waiting-time) | A yield: 1 µs with 8 threads, 50 ms with 512. |
| [`06-state-transitions/load-average`](demos/06-state-transitions/load-average) | 48 busy threads on 24 CPUs; the one-minute load climbing towards 48. |
| [`07-scheduling-nuts-and-bolts/nice`](demos/07-scheduling-nuts-and-bolts/nice) | Groups at nice -20, 0, +19 finishing in 3, 7, 9 seconds. |

## Slides

The deck delivered in the room is [`slides/scheduling-live.html`](slides/scheduling-live.html), rendered from [`slides/scheduling-live.qmd`](slides/scheduling-live.qmd).
It is deliberately thin: the diagrams, the demo results, and nothing that is better said than read.
The [full deck](../07-scheduling-full/slides) carries the same structure with the detail filled in.
