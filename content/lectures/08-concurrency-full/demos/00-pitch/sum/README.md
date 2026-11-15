# Demo: One Sum, Six Programs

The same sum, computed by one thread, by eight threads that share a variable, by eight threads that do not, and by eight threads that share it under an atomic operation, a spinlock and a mutex.

## Goal

See that sharing a variable between threads gives a wrong answer, that every way of protecting the variable gives the right answer and costs time, and that the fastest correct version is the one that shares nothing.

## Background

Every program adds the numbers 1 to 1,000, 40,000 times over: 40 million additions, and an answer of 20,020,000,000.
`sum.h` holds what they have in common: the size of the job, a clock, and the line printed at the end.

| Program | Threads | Where the additions go | Protection |
| --- | ---: | --- | --- |
| `sum_serial` | 1 | one global variable | none needed |
| `sum_threads` | 8 | one global variable, shared | none |
| `sum_partition` | 8 | a local variable per thread, added up at the end | none needed |
| `sum_atomic` | 8 | one global variable, shared | each addition is one atomic operation |
| `sum_spinlock` | 8 | one global variable, shared | a spinlock around each addition |
| `sum_mutex` | 8 | one global variable, shared | a mutex around each addition |

The six sources differ in a handful of lines; `diff sum_threads.c sum_mutex.c` shows which.

A **spinlock** is a lock whose waiters keep trying, on their CPU, until they get it.
A **mutex** is a lock whose waiters are put to sleep by the kernel, and woken when the lock is released.
An **atomic operation** is a single step the hardware guarantees nobody can get in the middle of.

## Build and run

```console
make
./sum_serial
./sum_threads
make run
```

`make run` runs all six, one after the other.
Run `sum_threads` several times.

## Results and explanations

On a 12-core, 24-CPU desktop:

```text
$ make run
serial         sum:  20020000000  expected:  20020000000  OK     time:    15 ms
threads        sum:   2960207722  expected:  20020000000  WRONG  time:    51 ms
partition      sum:  20020000000  expected:  20020000000  OK     time:     2 ms
atomic         sum:  20020000000  expected:  20020000000  OK     time:   255 ms
spinlock       sum:  20020000000  expected:  20020000000  OK     time:  3695 ms
mutex          sum:  20020000000  expected:  20020000000  OK     time:  1215 ms
```

**`sum_threads` is wrong, and differently wrong every time.**
Three runs gave 2,960,207,722, then 3,332,115,672, then 2,706,355,573: about a seventh of the right answer.
`sum += i` is not one step.
The compiler turns it into three:

```text
$ objdump -d -M intel sum_threads
[...]
    133f:   mov    rdx,QWORD PTR [rip+0x2cea]        # 4030 <sum>
    1346:   mov    rax,QWORD PTR [rbp-0x8]
    134a:   add    rax,rdx
    134d:   mov    QWORD PTR [rip+0x2cdc],rax        # 4030 <sum>
```

Load `sum` into a register, add `i` to the register, store the register back into `sum`.
Two threads that load the same value both store that value plus their own `i`, and one of the two additions is gone.
With eight threads on eight cores this happens most of the time.

**`sum_threads` is also three times slower than one thread.**
Eight cores did less than one, and got the wrong answer doing it.
The variable lives in one cache line, and every core that writes it takes the line away from the other seven; the cores spend their time passing that line around.

**`sum_partition` is right, and the fastest of the six.**
Each thread adds into a local variable that no other thread can reach, and writes its partial sum once, at the end; the main thread adds the eight partial sums.
Nothing is shared while the work is done, so nothing can be lost and nothing has to wait: 2 ms, eight times faster than one thread, which is what eight cores should give.

**The three protected versions are right, and slow.**

| Program | Time | Against one thread | CPU time | Voluntary context switches |
| --- | ---: | ---: | ---: | ---: |
| `sum_atomic` | 255 ms | 17 times slower | 1.76 s user | 2 |
| `sum_mutex` | 1,215 ms | 80 times slower | 1.90 s user, 7.18 s system | 557,111 |
| `sum_spinlock` | 3,695 ms | 250 times slower | 25.67 s user | 3 |

The atomic version replaces the three steps with one instruction that locks the cache line for its duration:

```text
$ objdump -d -M intel sum_atomic
[...]
    1343:   lock add QWORD PTR [rip+0x2ce5],rax        # 4030 <sum>
```

It is correct, and each addition now waits for the line to arrive from whichever core had it last.

The spinlock version burns 25 seconds of CPU to do 15 ms of work: at any moment one thread adds and seven spin.
The mutex version puts the waiters to sleep instead, which costs a system call and a context switch each time: 557,111 voluntary switches, and four times more time in the kernel than in the program.

The protected versions do not run the additions in parallel at all.
They run them one at a time, as the serial version does, and pay for the turn-taking on top.

## Going further

* Change `NUM_THREADS` in `sum.h` to 2, then to the number of cores of your machine, and rebuild.
  Which versions get slower as threads are added, and which get faster?
* Run `taskset -c 0 ./sum_spinlock` and `taskset -c 0 ./sum_mutex`: all eight threads on one core.
  Both become much faster than on eight cores. Why?
* In `sum_partition.c`, add to `*(unsigned long *)arg` inside the loop instead of to `mine`, and drop the assignment after the loop.
  The threads still share no variable, and the program gets thirty times slower: the eight partial sums are neighbours in memory and sit in the same cache lines.
  This is called false sharing.
* Build `sum_threads` with `-fsanitize=thread` and run it.
  ThreadSanitizer names the line, the variable and the two threads.
* Build `sum_threads` with `-O2` and run it a few times.
  The compiler works out a thread's whole contribution in advance and adds it with one instruction, so the answer comes out right almost every time.
  Is the program correct now?

## References

* `man 3 pthread_spin_lock`, `man 3 pthread_mutex_lock`
* [`stdatomic.h`](https://en.cppreference.com/w/c/atomic), the C11 atomic operations
* Remzi and Andrea Arpaci-Dusseau, *Operating Systems: Three Easy Pieces*, chapter 26, [Concurrency: An Introduction](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf)
* [ThreadSanitizer](https://github.com/google/sanitizers/wiki/ThreadSanitizerCppManual)
