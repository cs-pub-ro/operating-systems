# Compute (part 3)

## 0. Pitch

- **demo**: sum of elements with no synchronization
- **demo**: working with lists with no synchronization

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

## 2. Sharing Memory

- **demo**: modifying a variable in different threads and different forked processes (with copy-on-write)
- threads share the virtual address space
- each process has their own address space
- **demo**: threads can modify their own stack
- TLS / TSD: per-thread data
- **demo**: TLS

## 3. Multiple Access and Atomicity

- read-only: no problem
- write: problems:
  - multi-core: true simultaneous access
  - on a single core: context switch may interrupt an action by a thread
- **diagram**: atomicity: what does a `list_add()` operation do? what does an `a++` instruction do?
- **demo**: sum in serial mode and in parallel mode
- CPU(s), memory, memory bus

## 4. Ensuring Atomicity

- serializing code
- **diagram**: lock access to memory bus for a given CPU: hardware
- **diagram**: lock access to data for a given thread: software

## 5. Implementing Synchronization

- `LOCK` prefix for x86_64
- `cpmxchg`
- **demo**: `sync_fetch_and_add()`

## 6. Using Synchronization

- critical section: are using shared data
- protect data, not code
- spinlocks vs mutexes
- **demo**: use spinlocks, use mutexes for synchronization
- **demo**: granularity level
- data partitioning / per-thread data: remove shared data
- reentrancy: data is allocated per thread
- **demo**: reentrancy
- thread-safety vs reentrancy

## Conclusion and Takeaways

- Threads share all the data in the process address space.
  Processes have separate address spaces, so threads in different processes don't share data.
- Data may be accessed simultaneously by multiple threads (on different CPUs).
  Or, a thread can be preempted while accessing data and another thread may be scheduled to run using the same data.
- Even basic instructions are not atomic, causing inconsistent results.
- We use synchronization / atomicity primitives (hardware, software) to ensure correct serial access to shared data.
- Basic serial access primitives for synchronization are spinlocks (using busy-waiting) and mutexes (using blocking calls).
- You either provide per-thread data (e.g. reentrant functions) or you lock a critical section (mutual access primitives: spinlocks, mutexes).
