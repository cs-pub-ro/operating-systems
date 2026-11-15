# Demo: A Deadlock

Two accounts, each with a lock, and two threads that move money between them in opposite directions.

## Goal

Recognise a deadlock when one happens, find which thread waits for which lock, and remove it by ordering the locks.

## Background

`deadlock.c` has two accounts, `a` and `b`, each a balance and a mutex.
A transfer locks two accounts, moves the amount, and unlocks them.
One thread transfers from `a` to `b` a million times, the other from `b` to `a`.

| Program | Order in which a transfer takes the two locks |
| --- | --- |
| `deadlock` | the account it takes from, then the account it gives to |
| `ordered` | the account with the lower `id`, then the other |

In `deadlock` the two threads take the same two locks in opposite orders.

## Build and run

```console
make
./deadlock
```

It prints one line and stops.
In a second terminal:

```console
ps -L -o pid,tid,state,pcpu,wchan:20,comm -p $(pidof deadlock)
```

Stop it with `Ctrl+C`, then:

```console
./ordered
```

## Results and explanations

```text
$ ./deadlock
transfers started
```

Nothing more, for as long as you care to wait.

```text
$ ps -L -o pid,tid,state,pcpu,wchan:20,comm -p $(pidof deadlock)
    PID     TID S %CPU WCHAN                COMMAND
 188884  188884 S  0.0 futex_wait_queue     deadlock
 188884  188886 S  0.0 futex_wait_queue     deadlock
 188884  188887 S  0.0 futex_wait_queue     deadlock
```

Three threads, all blocked, none using any CPU.
The main thread waits in `pthread_join()`; the other two wait for a mutex.
A debugger says which:

```text
$ gdb ./deadlock
(gdb) run
transfers started
^C
(gdb) thread apply all bt 4

Thread 3 (Thread 0x7ffff73fe6c0 (LWP 189236) "deadlock"):
#0  futex_wait (futex_word=0x555555558030 <a+16>, expected=2, private=0)
#1  __GI___lll_lock_wait (futex=futex@entry=0x555555558030 <a+16>, private=0)
#2  lll_mutex_lock_optimized (mutex=0x555555558030 <a+16>)
#3  ___pthread_mutex_lock (mutex=0x555555558030 <a+16>)

Thread 2 (Thread 0x7ffff7bff6c0 (LWP 189235) "deadlock"):
#0  futex_wait (futex_word=0x555555558070 <b+16>, expected=2, private=0)
#1  __GI___lll_lock_wait (futex=futex@entry=0x555555558070 <b+16>, private=0)
#2  lll_mutex_lock_optimized (mutex=0x555555558070 <b+16>)
#3  ___pthread_mutex_lock (mutex=0x555555558070 <b+16>)
(gdb) print a.lock.__data.__owner
$1 = 189235
(gdb) print b.lock.__data.__owner
$2 = 189236
```

Thread 189235 waits for the lock of `b`, and the lock of `b` is owned by thread 189236.
Thread 189236 waits for the lock of `a`, and the lock of `a` is owned by thread 189235.
Each holds what the other wants, and neither will let go before it gets it.

How they got there: the first thread locked `a`; before it locked `b`, the second thread locked `b`; now the first needs `b` and the second needs `a`.
The window is the handful of instructions between the two `pthread_mutex_lock()` calls, and a million transfers on two cores find it in milliseconds.

A deadlock needs four things at once: locks that only one thread can hold, a thread that holds one lock while waiting for another, no way of taking a lock away from its holder, and a cycle of threads each waiting for the next.
Remove any one and it cannot happen, and the cycle is the easiest to remove:

```text
$ ./ordered
transfers started
transfers done: a = 1000, b = 1000, total = 2000
```

`ordered` takes the lock of the lower-numbered account first, whatever the direction of the transfer.
Both threads now want `a` first; whoever gets it also gets `b`, and the other waits for `a` while holding nothing.

## Going further

* Run `taskset -c 0 ./deadlock` several times.
  On one core it usually finishes.
  Is the bug gone, and where would a thread have to be preempted for it to show?
* Run `valgrind --tool=helgrind ./deadlock` and look for *lock order violated*: Helgrind reports the opposite orders even on a run that does not deadlock.
* Replace the second `pthread_mutex_lock()` with `pthread_mutex_trylock()`, and release the first lock and retry when it fails.
  Which of the four conditions does that remove, and what new problem can it bring?
* Use one lock for both accounts.
  What is gained, and what is lost when there are a thousand accounts?

## References

* `man 3 pthread_mutex_lock`, `man 3 pthread_mutex_trylock`
* Remzi and Andrea Arpaci-Dusseau, *Operating Systems: Three Easy Pieces*, chapter 32, [Common Concurrency Problems](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf)
* E. G. Coffman, M. J. Elphick and A. Shoshani, *System Deadlocks*, ACM Computing Surveys, 1971, for the four conditions
