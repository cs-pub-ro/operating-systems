# Demo: Time of Check to Time of Use

A shop with a million items and eight buyers, where every access to the stock is under a lock and the shop still sells more than it has.

## Goal

See that locking every access to shared data is not enough: a decision and the action taken on it have to be inside the same critical section.

## Background

`toctou.c` keeps the stock in one variable, protected by one mutex.
A buyer loops: if there is an item left, take one.
The source builds twice.

| Program | How `buy_one()` uses the lock |
| --- | --- |
| `toctou` | `in_stock()` locks, reads, unlocks; then `take_one()` locks, decrements, unlocks |
| `check-and-act` | locks, checks and decrements, unlocks |

In `toctou` no thread ever reads or writes `stock` without holding the lock.
There is no data race in it.

TOCTOU stands for *time of check to time of use*: the program checks a condition, then acts on the answer, and something changes in between.

## Build and run

```console
make
./toctou
./check-and-act
```

Run `toctou` several times.

## Results and explanations

```text
$ ./toctou
in stock at the start: 1000000  sold: 1000002  left: -2
$ ./toctou
in stock at the start: 1000000  sold: 1000001  left: -1
$ ./toctou
in stock at the start: 1000000  sold: 1000004  left: -4
$ ./check-and-act
in stock at the start: 1000000  sold: 1000000  left: 0
```

The shop sold items it did not have.
With one item left, a buyer asks `in_stock()` and is told yes.
Before that buyer calls `take_one()`, another buyer asks, is also told yes, and takes the item.
The first buyer then takes one too, on an answer that was true when it was given and is not true any more.

Each of the two functions is correct on its own, and each is properly locked.
What is wrong is the gap between them: the lock is released after the check and taken again for the update, and anything can happen in the gap.
At most seven buyers can be in the gap when the stock reaches zero, which is why the shop is never more than seven items short.

`check-and-act` closes the gap by making the check and the update one critical section: the answer cannot go stale, because nobody else can change the stock until the buyer who asked has acted.

Two things make this bug harder than the one in the pitch.
It is rare: a million sales, and it goes wrong in the last few.
And the tools do not see it: ThreadSanitizer reports data races, two unprotected accesses to the same memory, and there are none here.

```text
$ gcc -fsanitize=thread -g -I../../utils -o toctou_tsan toctou.c -lpthread
$ ./toctou_tsan
in stock at the start: 1000000  sold: 1000003  left: -3
```

Wrong answer, no report.

The same pattern outside a program's memory is a classic security hole: a privileged program calls `access()` to check that the user may write a file, then `open()` to write it, and the user swaps the file for a link to another one in between.

## Going further

* Run `taskset -c 0 ./toctou` several times.
  Is one core enough? Where would the thread have to be preempted?
* Rewrite `buy_one()` without a lock, using `atomic_fetch_sub()` and looking at the value it returns.
  Is a check still needed, and where does it go?
* Find the same bug in the unlocked-size variation suggested in the [list demo](../../04-partitioning-synchronization/list).
* Read the *NOTES* section of `man 2 access` and say which system call does the check and the open in one step.

## References

* `man 2 access`, *NOTES*, on the file system version of this bug
* [CWE-367: Time-of-check Time-of-use Race Condition](https://cwe.mitre.org/data/definitions/367.html)
* Remzi and Andrea Arpaci-Dusseau, *Operating Systems: Three Easy Pieces*, chapter 32, [Common Concurrency Problems](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf), on atomicity violations
