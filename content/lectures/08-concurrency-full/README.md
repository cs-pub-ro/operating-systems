# Session 08: Concurrency - Full Contents

# 0. Pitch (demo)

- **demo**: have one thread compute the sum of numbers 1 to N in multiple rounds
- **demo**: have multiple threads compute the same thing
- **demo**: have each thread use their own variable for computing part of the sum; compute final sum
- **demo**: have threads use atomic operations to add to sum
- **demo**: have threads use a spinlock to protect sum when adding numbers

## 1. Reminder: Thread States, Scheduling, Context Switches

- **diagram**: thread states + context switch
- 4 triggers of context switch
  - blocking action (voluntary): RUNNING -> SLEEPING
  - yield (voluntary): RUNNING -> READY
  - time slice expiry (involuntary): RUNNING -> READY
  - ready thread with higher priority (involuntary): RUNNING -> READY
- when do voluntary context switches happen?
  - at request, via system call (`read()`, `write()`, `sleep()`, `waitpid()`, `sched_yield()`)
- when do involuntary context switch happen?
  - periodic timer interrupt
  - timer interrupt causes update of scheduling parameters (time slice update, priority)
  - if time slice expires or if ready thread if higher priority, do context switch

# 2. Concurrency

- many threads want to access the same resource (memory, disk) in an overlapping period
- they take turns on a single core or they run in parallel on multiple cores

**diagram**: concurrency on a single core, concurrency on multiple cores

- parallelism is actual simultaneous execution; it can make concurrent work faster, but concurrency does not require parallelism
- data can be shared between different threads
  - data coherence: the same value is seen by all threads
  - data consistency: the correct ordering of operations is observed by all threads (multiple runs render the same result)

**diagram**: data coherence, data consistency

- concurrency can lead to coherence and consistency issues
  - Race conditions: The result depends on how operations interleave.
    - Mitigate: Protect shared state with locks, use atomic operations, or avoid sharing mutable state.
  - Inconsistent or stale observations: One task may not see another task’s updates when expected.
    - Mitigate: Use synchronization primitives with documented visibility and ordering guarantees; follow the language’s memory model.
  - Deadlocks: Tasks wait indefinitely for resources held by one another.
    - Mitigate: Acquire locks in a consistent order, keep critical sections short, avoid unnecessary nested locks, and use timeouts where appropriate.
  - Contention and reduced performance: Tasks spend time waiting for locks or competing for memory, CPU, or other resources.
    - Mitigate: Minimize shared mutable data, reduce lock scope, partition work or data, and measure before optimizing.
  - Starvation and unfairness: Some tasks may wait much longer than others.
    - Mitigate: Use fair scheduling or locking when needed, and design work queues so tasks cannot be indefinitely bypassed.
  - Complexity and difficult debugging: Bugs may be timing-dependent and hard to reproduce.
    - Mitigate: Prefer simpler designs such as immutable data or message passing; use concurrency testing, stress tests, race detectors, and clear ownership rules.

# 3. Root causes

- shared data

and one of:

A. scheduler preemption: even on a single core, a thread may be preempted
  - the basis is the timer interrupt that causes the scheduler to activate and potentially cause a context switch
  - the application has no power to dictate when the switch happens
  - memory operations are interleaved by running a thread or another thread
B. multiple cores: threads run in parallel and access the memory in a simultaneous concurrent manner
  - the scheduler is not relevant here
  - memory operations are interleaved on the memory bus

**diagram**: scheduler preemption and multiple cores (truly parallel execution)

- **demo**: a sum calculation and multiple threads
  a) the CPU is `taskset`-ed to use a single core
  b) the CPU uses all available cores (one thread per core)

# 4. Partitioning and synchronization

- partitioning: remove / minimize shared data
- synchronization: ensure correct / consistent access to data

- partitioning is ideal but doesn't always work
  - works on arrays, but on lists (or graphs)

**demo**: working with lists

- some shared data is inevitable, ideally you would minimize it
- the kernel has a lot of shared data; user space doesn't care because kernel does synchronization; still contention could happen
- you can have contention on synchronized user space data (under your control) or on synchronized kernel space data (which you don't control, you just invoke)

**diagram**: partitioning and synchronization

# 5. Problems with synchronization

- overhead and contention
  - serialization of critical sections
  - **demo**: granularity level
- incorrect synchronization
  - deadlocks
  - race conditions
  - **demo**: a simple TOCTOU example

**diagram**: parallelism / concurrency -> concurrency problems -> synchronization -> synchronization problems

# 6. Conclusion

- Using multiple cores / parallelism can face concurrency issues because of limited / shared resources: memory, I/O, networking.
- Even on a single core, issues can still be caused by preemption.
- Concurrency may cause data coherence and data consistency issues.
- Root causes are the use of shared data and multiple cores and preemption.
- We use data partitioning to minimize shared data. We use synchronization to maintain consistency of shared data.
- Synchronization can pose challenges: adding overhead and becoming a point of contention or deadlocks and race conditions in case of improper synchronization.
- Ideally, you would structure your problem, implementation and data structures to maximize data partitioning and minimize the use of synchronization.
