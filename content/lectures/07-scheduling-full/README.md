# Compute (part 2)

# 0. Pitch

- **demo**: a random process: wall time, system time, user time

```console
 perl -MPOSIX -l -0777 -ne '@f = /\(.*\)|\S+/gs;
    printf "utime: %.2f\nstime: %.2f\ncutime: %.2f\ncstime: %.2f\n",
      map {$_/POSIX::sysconf( &POSIX::_SC_CLK_TCK )}@f[13..16]' "/proc/55789/stat"
utime: 12.16
stime: 1.95
cutime: 0.00
cstime: 0.00

razvan@bifrost:~$ ps -o cputime,etime 55789
    TIME     ELAPSED
00:00:14  2-17:03:00
```

- **demo**: a process runs and prints system time and user time

# 1. Recap: Process Creation and Termination

- **demo**: `posix_spawn()`
- **demo**: orphan and zombie processes
- **demo**: `fork()` + `exec()`

# 2. Copy-on-Write

- using multiprocessing for parallel work
- **diagram**: fork and creation of a new address space, copy-on-write
- **demo**: copy-on-write + access + page faults

# 3. Overview of Scheduling

- fewer CPUs than threads
- **diagram**: scheduler distributes threads to CPUs, time multiplexing
- scheduler is a function
- scheduler requirements: list of all threads, list of running threads, accounting of thread running time, list of threads ready to run

# 4. Thread States

- **diagram**: the 3 most important states: running, ready, waiting
  - queues: ready queue, blocked queue
- **demo**: `ps` + state
- **demo**: thread is running, thread is sleeping ("rabid" CPU + wait for input)

# 5. Context Switch

- a thread is a context of execution: IP and SP
- execution context switch: switch a thread with another thread
    - not related to domain switch: user-mode to kernel-mode
- **diagram**: one thread leaves, another thread enters
  - condition to enter: be in the ready queue
  - conditions to leave: thread time slice expires, thread blocks, a high priority thread appears, thread yields the CPU
- **table**: voluntary / non-voluntary; go to blocked / go to ready
- **demo**: list context switches with `ps`; destination state (blocked, ready)
- **demo**: process using the buffer cache and not using the buffer cache, number of context switches

# 6. State Transitions

- **diagram**: state transitions and causes of each
- **demo**: measure time in ready queue
- **demo** load average: number of running / runnable threads per CPU
- context switch overhead

# 7. Scheduling Attributes / Nuts and Bolts

- system input: thread types: CPU / IO-intensive
- admin input: nice
- **demo**: nice
- **diagram**: scheduler input: thread behaviour, niceness; scheduler output: priority, time slice
- metrics: fairness / interactivity vs throughput

# Conclusion and Takeaways

- The OS is responsible for scheduling more threads to the existing CPUs.
- The scheduler is a function that selects a thread to run on the CPU.
- The scheduler is invoked voluntarily or non-voluntarily.
- A thread has 3 main states: running, ready, blocked.
- Thread behavior and admin input affects the thread priority while in the ready state and the time slice while in the running case.
