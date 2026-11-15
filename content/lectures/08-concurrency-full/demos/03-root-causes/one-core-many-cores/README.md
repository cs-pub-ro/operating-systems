# Demo: One Core, Many Cores

Eight threads add 1 to a shared counter, 50 million times each, on every core of the machine and then on a single one.

## Goal

Tell apart the two things that turn shared data into a race: a thread preempted between two instructions, and two cores executing at the same time.

## Background

`count.c` builds into three programs that differ only in how the addition is done.

| Program | The addition | Instructions |
| --- | --- | --- |
| `count` | `counter = counter + 1` | load, add, store |
| `count_one_insn` | `add QWORD PTR [counter], 1` | one, which reads and writes memory |
| `count_locked_insn` | `lock add QWORD PTR [counter], 1` | one, with the bus locked for its duration |

The last two are written in x86 assembly and are built only on x86_64.
On ARM there is no instruction that adds to memory; an addition is always a load, an add and a store.

`taskset -c 0 <program>` runs a program with all its threads confined to CPU 0.
On one core the threads cannot run at the same time: they take turns, and the turn ends when the scheduler says so.

Each program prints the counter, how many additions were lost, and the number of involuntary context switches it went through.

## Build and run

```console
make
./count
taskset -c 0 ./count
./count_one_insn
taskset -c 0 ./count_one_insn
./count_locked_insn
taskset -c 0 ./count_locked_insn
```

## Results and explanations

Additions lost, out of 400 million, on a 24-CPU machine:

| Program | Every core | One core (`taskset -c 0`) |
| --- | ---: | ---: |
| `count` (load, add, store) | about 80% | typically 14%, anything from 0 to a third |
| `count_one_insn` | about 76% | 0 |
| `count_locked_insn` | 0 | 0 |

**`count` on one core loses updates, and nothing runs in parallel.**

```text
$ taskset -c 0 ./count
counter: 343945504  expected: 400000000  lost: 56054496 (14.0%)
involuntary context switches: 101
```

The three instructions are:

```text
$ objdump -d -M intel count
[...]
    122d:   mov    rax,QWORD PTR [rip+0x2dfc]        # 4030 <counter>
    1234:   add    rax,0x1
    1238:   mov    QWORD PTR [rip+0x2df1],rax        # 4030 <counter>
```

A thread whose time slice ends after the first `mov` keeps the old value in `rax`.
The other threads run for milliseconds and add millions.
When the first thread gets the CPU back, it adds 1 to the value it loaded and stores it, and everything the others added in between is overwritten.
About a hundred involuntary switches lost 56 million additions: a switch that lands in the wrong place is rare, and each one is expensive.

Run it several times.
Twelve runs in a row lost 0%, 7.1%, 11.6%, 12.5%, 13.4%, 14.0%, 14.0%, 14.1%, 20.3%, 21.3%, 23.7% and 28.0%.
The loss depends on where a few switches happen to fall, and now and then none of them falls between a load and a store: the run that lost nothing had the same bug as the others.

**`count_one_insn` on one core loses nothing.**

```text
$ taskset -c 0 ./count_one_insn
counter: 400000000  expected: 400000000  lost: 0 (0.0%)
involuntary context switches: 100
```

An interrupt is taken between instructions, never inside one.
With the whole addition in one instruction, there is no place for the scheduler to cut it in two, and on one core the scheduler was the only threat.

**`count_one_insn` on every core loses three quarters.**

```text
$ ./count_one_insn
counter: 95873900  expected: 400000000  lost: 304126100 (76.0%)
involuntary context switches: 60
```

One instruction is still a read of memory followed by a write of memory, and another core can do its own read between the two.
The scheduler has nothing to do with this: the two cores interleave on the memory bus.

**`count_locked_insn` loses nothing anywhere.**
The `lock` prefix keeps the cache line for the whole instruction, so no other core can get between the read and the write.
That is an atomic operation, and it is what `atomic_fetch_add()` compiles to.

**One core is faster.**

| Program | Every core | One core |
| --- | ---: | ---: |
| `count` | 0.60 s elapsed, 4.33 s CPU | 0.30 s elapsed, 0.29 s CPU |
| `count_locked_insn` | 2.80 s elapsed, 20.18 s CPU | 1.60 s elapsed, 1.60 s CPU |

Eight cores that all write one variable spend their time moving its cache line between them.
One core has the line to itself.

## Going further

* Run `taskset -c 0,1 ./count_one_insn`: two cores are enough to lose updates.
* Build `count` with `-O1`.
  How many instructions does the addition take now, and what does `taskset -c 0 ./count` lose?
* On an ARM machine, disassemble `count` and look for the three steps; then use `atomic_fetch_add()` and look for what replaced them.
* Change `NUM_THREADS` to 2.
  Does the share of lost updates on every core go down?

## References

* `man 1 taskset`, `man 2 sched_setaffinity`
* `man 2 getrusage`, for `ru_nivcsw`
* Intel 64 and IA-32 Architectures Software Developer's Manual, volume 3A, section 9.1, *Locked Atomic Operations*
* Remzi and Andrea Arpaci-Dusseau, *Operating Systems: Three Easy Pieces*, chapter 26, [Concurrency: An Introduction](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf)
