# Exercise: Transfers That Never End

**Tools:** GCC, Make, ps, GDB

## Goal

Reference solution of the deadlock challenge: a transfer takes the locks of its two accounts in an order that is the same for every thread, lower address first, whichever way the money goes.

## Background

```C
struct account {
	long balance;
	pthread_mutex_t lock;	/* protects the balance */
};
```

Four accounts in a ring, eight threads, a hundred thousand transfers each.
Threads with an even number send money from an account to the next one of the ring, threads with an odd number from the next one back.
The executable works out the final balances with no threads, by going through the same list of transfers, and compares.

Files:

* `bank.c`, `bank.h` — the library, and its interface.
* `chall.c`, `flag.h`, `flag` — the executable, the encrypted flag with its key, and the flag in clear.
* `test.sh` — twenty runs, each of which has to print the flag.

## Build & Run

```console
make
./chall
```

```text
8 threads, 100000 transfers each, between 4 accounts
account 0: 799992 (expected 799992)
account 1: 1257144 (expected 1257144)
account 2: 685712 (expected 685712)
account 3: 1257152 (expected 1257152)
total:     4000000 (expected 4000000)
flag: SO{...}
```

## Results and Explanations

### The library as given

```C
void bank_transfer(struct account *from, struct account *to, long amount)
{
	pthread_mutex_lock(&from->lock);
	pthread_mutex_lock(&to->lock);

	from->balance -= amount;
	to->balance += amount;

	pthread_mutex_unlock(&to->lock);
	pthread_mutex_unlock(&from->lock);
}
```

```text
8 threads, 100000 transfers each, between 4 accounts
Timed out: the threads are stuck, each waiting for something another one holds.
```

On every run, and within the first few transfers.

### Looking at it from outside

```console
./chall 0 &
ps -L -o pid,lwp,stat,pcpu,wchan:22,comm -p $(pidof chall)
```

```text
    PID     LWP STAT %CPU WCHAN                  COMMAND
 565003  565003 Sl    0.0 futex_wait_queue       chall
 565003  565005 Sl    0.0 futex_wait_queue       chall
 565003  565006 Sl    0.0 futex_wait_queue       chall
 ...
```

Nine threads, the main one and the eight it started, all in state `S`, sleeping, all using no processor time, all waiting in the kernel on a futex, which is what a mutex that is not free turns into.
A program that computes for ever looks different: state `R`, and a `%CPU` near 100.
This one is not slow.
It is not doing anything.

### Looking at it from inside

`gdb -p` on a running process is refused on most distributions unless you are root, so the program is started from GDB instead.

```console
gdb ./chall
(gdb) run 0
^C
(gdb) thread apply all bt 6
```

```text
Thread 3 (LWP 571355):
#3  ___pthread_mutex_lock (mutex=0x5555555592e8)
#4  bank_transfer (from=0x555555559320, to=0x5555555592e0, amount=2) at bank.c:62

Thread 2 (LWP 571354):
#3  ___pthread_mutex_lock (mutex=0x555555559328)
#4  bank_transfer (from=0x5555555592e0, to=0x555555559320, amount=1) at bank.c:62
```

Both threads are at line 62, the second `pthread_mutex_lock()`.
A thread that is at the second lock has the first.

* Thread 2 transfers from `...2e0` to `...320`: it holds the lock of `...2e0` and waits for the lock of `...320`.
* Thread 3 transfers from `...320` to `...2e0`: it holds the lock of `...320` and waits for the lock of `...2e0`.

Each waits for what the other holds.
glibc keeps in the mutex the id of the thread that owns it, which confirms it:

```console
(gdb) thread 2
(gdb) frame 4
(gdb) print to->lock.__data.__owner
$2 = 571355
(gdb) thread 3
(gdb) frame 4
(gdb) print to->lock.__data.__owner
$3 = 571354
```

Thread 2 waits for a mutex owned by LWP 571355, which is thread 3, and thread 3 waits for one owned by LWP 571354, which is thread 2.
The other six threads are queued behind one or the other.

### How it happens

| Step | Thread 2: transfer A to B | Thread 3: transfer B to A |
| --- | --- | --- |
| 1 | locks A | |
| 2 | | locks B |
| 3 | wants B: waits | |
| 4 | | wants A: waits |

Neither step 3 nor step 4 can finish before the other thread unlocks, and the unlock of each is after its own wait.

A deadlock needs four things at once: locks that only one thread can hold, threads that hold one lock while they wait for another, no way to take a lock away from a thread, and a circle of threads each waiting for the next.
Remove any one and it cannot happen.
The circle is the one that is easiest to remove.

### The fix — one order for everybody

```C
void bank_transfer(struct account *from, struct account *to, long amount)
{
	struct account *first = from < to ? from : to;
	struct account *second = from < to ? to : from;

	pthread_mutex_lock(&first->lock);
	pthread_mutex_lock(&second->lock);

	from->balance -= amount;
	to->balance += amount;

	pthread_mutex_unlock(&second->lock);
	pthread_mutex_unlock(&first->lock);
}
```

The order in which the locks are taken no longer depends on the direction of the transfer.
A transfer from A to B and one from B to A both lock the lower of the two addresses first.
One of the two threads gets it, and the other waits at its **first** lock, holding nothing.
A thread that holds nothing cannot be part of a circle.

In general: if every thread takes locks in increasing order, a thread that waits for a lock holds only lower ones, so a chain of "waits for" goes ever upwards and can never come back to where it started.

The address is a convenient thing to order by because every account has one, it is unique, and it never changes.
An account number would do as well.
What matters is that all the threads agree.

### The other ways out

* **One mutex for the whole bank.**
  With one lock there is no second lock to wait for.
  It gets the flag, and here it is no slower, 0.06 to 0.07 s against 0.06 to 0.08 s: a transfer is two additions, and the threads spend their time passing locks around either way.
  It would start to matter if a transfer took long, because then transfers between unrelated accounts would queue behind each other.
* **Try, and back off.**
  Lock the first, `pthread_mutex_trylock()` the second, and if that fails release the first and start over.
  This removes "hold and wait" instead of the circle.
  It gets the flag too, at the price of loops that spin: `user` time went from about 0.08 s to about 0.2 s.
  Two threads can also keep backing off in step with each other for a while, working and getting nowhere, which is called a livelock.

## References

* `man 3 pthread_mutex_lock`, `man 3 pthread_mutex_trylock`
* `man 1 ps` — the `-L` option, and the `wchan` column
* Lecture 08, part 05, *Problems with synchronization* — the `deadlock` demo
* *Operating Systems: Three Easy Pieces*, chapter 32, *Common Concurrency Problems* — <https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf>
