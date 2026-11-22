# Exercise 06: Building H2O

**Tools:** GCC, Make

**Directory**: `06-building-h2o/`

## Goal

Reference solution of the H2O challenge, with a mutex and a condition variable: atoms are counted as they arrive, a molecule is formed by handing out three tickets, and the next one is formed only when the tickets of this one have been used and its atoms released.

## Background

The executable has four hydrogen threads and two oxygen threads.
They do not each bring a fixed number of atoms: the threads of a kind share a counter of atoms still to bring, 20,000 hydrogen and 10,000 oxygen, and each keeps calling `hydrogen()` or `oxygen()` while the counter is above zero.
The reason is in the last section.

`release_hydrogen()` and `release_oxygen()` write an `H` or an `O` into an array, at a position handed out by an atomic counter, so two of them running at once are safe.
At the end the array is cut into groups of three and each group is checked.

Files:

* `h2o.c`, `h2o.h` — the library, and its interface.
* `chall.c`, `flag.h`, `flag` — the executable, the encrypted flag with its key, and the flag in clear.
* `test.sh` — fifty runs, each of which has to print the flag.

## Build & Run

```console
make
./chall
```

```text
first releases: OHH HHO OHH HHO OHH HHO OHH HHO OHH HHO HOH HHO OHH HHO HOH HOH OHH OHH HHO OHH ...
atoms released: 30000 (expected 30000)
molecules:      10000 (expected 10000)
flag: SO{...}
```

## Results and Explanations

### The library as given

```C
static void form(void)
{
	if (waiting_h >= 2 && waiting_o >= 1) {
		waiting_h -= 2;
		waiting_o -= 1;
		tickets_h += 2;
		tickets_o += 1;
		pthread_cond_broadcast(&changed);
	}
}

void hydrogen(void)
{
	pthread_mutex_lock(&lock);
	waiting_h++;
	form();
	while (tickets_h == 0)
		pthread_cond_wait(&changed, &lock);
	tickets_h--;
	pthread_mutex_unlock(&lock);

	release_hydrogen();
}
```

```text
first releases: OOH HHH HHO OOH HHH HHO HOH OHH HOH OHH OHO HHH OHH OHH HHH HOO OHH HHO OOH HHH ...
atoms released: 30000 (expected 30000)
molecules:      4958 (expected 10000)
group 1 is "OOH": not a molecule of water
No flag: the atoms did not leave as molecules.
```

The counting is right: every ticket stands for an atom of a molecule that was formed, so 20,000 hydrogen and 10,000 oxygen leave, and none without a ticket.
What is missing is any separation between one molecule and the next.

* `form()` hands out tickets whenever there are atoms for a molecule.
  With four hydrogen threads and two oxygen threads waiting, it is called once as each arrives and forms two molecules: six tickets are out, and the six threads leave in any order.
  `OOH HHH` in the output is two correct molecules, released as one group of six.
* A thread takes its ticket with the lock held and releases after the unlock.
  Between the two it can be descheduled, and everything said about its molecule under the lock is said before its atom is out.

### The solution

```C
static void form(void)
{
	if (tickets_h > 0 || tickets_o > 0)
		return;

	if (waiting_h >= 2 && waiting_o >= 1) {
		waiting_h -= 2;
		waiting_o -= 1;
		tickets_h = 2;
		tickets_o = 1;
		pthread_cond_broadcast(&changed);
	}
}

void hydrogen(void)
{
	pthread_mutex_lock(&lock);
	waiting_h++;
	form();
	while (tickets_h == 0)
		pthread_cond_wait(&changed, &lock);
	tickets_h--;
	release_hydrogen();
	form();
	pthread_mutex_unlock(&lock);
}
```

`oxygen()` is the same with the other two counters.
Three changes, and each answers one question.

* **Who may leave?**
  The tickets: a thread leaves only with a ticket of its kind, and tickets are handed out two and one at a time.
  The skeleton had this.
* **When may the next molecule be formed?**
  When no ticket of this one is left: the test at the top of `form()`.
  So at most three tickets are ever out, two hydrogen and one oxygen.
* **What does "no ticket left" mean?**
  That depends on where the release is.
  With the release inside the critical section that takes the ticket, a ticket that is gone is an atom that is out, and "no ticket left" means "all three released".
  This is why the release moved under the lock: it makes the guard in `form()` say what it has to say.

The third change is the second `form()`, after the release.
A molecule can be formed when an atom arrives or when the last ticket is used.
If only arrivals called `form()`, the last ticket could be used when all six threads are already waiting, and nobody would be left to arrive: the program would stop with atoms for a molecule and no thread to form it.
It does, on about one run in three.

The release is done with the lock held, which exercise 05 said not to do with work.
The difference is that here the order of the releases is what is asked for.
A release is one store into an array, so nothing is lost; if it were slow, the version in `FURTHER.md`, with one more counter, releases outside the lock.

### Taking the changes away, one at a time

| Version | Molecules of 10,000 | Flag, 30 runs |
| --- | --- | --- |
| The skeleton | 4,000 to 5,400 | 0 |
| Release under the lock, no guard in `form()` | 5,200 to 6,700 | 0 |
| Guard in `form()`, release after the unlock | 7,100 to 7,600 | 0 |
| Both (the reference) | 10,000 | 30 |
| The reference without the second `form()` | 10,000, or a time-out | 20 |
| The reference with `pthread_cond_signal()` | time-out | 0 |
| The reference with `if` around the wait | wrong groups, no time-out | 0 |

The second row still has six tickets out at once, and it does not matter that each release is atomic: three hydrogen in a row is three correct releases.

The third row is the subtle one.
At most three tickets are out, and the right three threads take them.
But a ticket taken is not an atom released: the third thread takes the last ticket, unlocks, and before it releases, the next molecule is formed and one of its threads releases first.
The atoms are the right ones; they are recorded in the wrong groups, about a quarter of them.

With `pthread_cond_signal()`, one thread is woken up where three have tickets waiting for them, and it may be of the kind whose ticket is already gone.
With `if`, a hydrogen thread woken up by a broadcast it has no ticket for leaves all the same.
Both are the mistakes of `demo-02-ordered-print`, in a place where they are harder to see.

### Why the threads share a counter of atoms

If each hydrogen thread brought a fixed 5,000 atoms and each oxygen thread 5,000, the totals would match, and the program would still stop on some runs, with a correct library.
A molecule needs two hydrogen threads inside `hydrogen()` at the same time.
If three of the four finish their share early, the last one is left with atoms to bring and nobody to bring them with: it waits for a second hydrogen for ever.
A thread is in one call at a time.

With a shared counter, a thread stops only when there is nothing left to bring, so as long as two hydrogen atoms are owed there are two threads to bring them.
The first version of this executable had the fixed shares, and the reference solution timed out on it.

## References

* `man 3 pthread_cond_wait`, `man 3 pthread_cond_broadcast`
* Allen B. Downey, *The Little Book of Semaphores*, section 5.6, *Building H2O* — <https://greenteapress.com/wp/semaphores/>
