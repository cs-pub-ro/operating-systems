# Exercise: Building H2O

**Tools:** GCC, Make

## Goal

Reference solution of the H2O challenge: two semaphores give out the three places of a molecule, a barrier of three makes the threads that have a place leave together, and a place is given back only after the release.

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
first releases: OHH HOH HHO OHH HHO OHH HOH OHH HHO OHH HOH HOH HHO OHH HOH OHH HHO OHH HOH HHO ...
atoms released: 30000 (expected 30000)
molecules:      10000 (expected 10000)
flag: SO{...}
```

## Results and Explanations

### The library as given

```C
void hydrogen(void)
{
	sem_wait(&hydrogen_slots);
	release_hydrogen();
	sem_post(&hydrogen_slots);
}
```

```text
first releases: HHH HHH HHH HHH HHH HHH HHH HHH HHH HHH HHH HHH HHH HHH HHH HHH HHH HHH HHH HHH ...
atoms released: 30000 (expected 30000)
molecules:      3959 (expected 10000)
group 1 is "HHH": not a molecule of water
No flag: the atoms did not leave as molecules.
```

A hydrogen thread takes one of the two hydrogen places, releases, and gives the place back, all without waiting for anybody.
The semaphore guarantees that no more than two hydrogen atoms are being released at the same instant.
It says nothing about how many are released in a row: the same two places are taken and given back thousands of times before the first oxygen thread runs.
The 3,000 to 4,000 groups that do come out right are luck.

### The solution

```C
static sem_t hydrogen_slots;		/* 2 */
static sem_t oxygen_slots;		/* 1 */
static pthread_barrier_t molecule;	/* 3 threads */

void h2o_init(void)
{
	sem_init(&hydrogen_slots, 0, 2);
	sem_init(&oxygen_slots, 0, 1);
	pthread_barrier_init(&molecule, NULL, 3);
}

void hydrogen(void)
{
	sem_wait(&hydrogen_slots);
	pthread_barrier_wait(&molecule);
	release_hydrogen();
	sem_post(&hydrogen_slots);
}

void oxygen(void)
{
	sem_wait(&oxygen_slots);
	pthread_barrier_wait(&molecule);
	release_oxygen();
	sem_post(&oxygen_slots);
}
```

Two lines were added to the skeleton's functions, and one to the initialization.
Each of the three mechanisms answers one question.

* **Who can be at the meeting point?**
  The semaphores: at most two hydrogen threads and at most one oxygen thread are past their `sem_wait()` at any time.
* **When may they go?**
  The barrier: when there are three of them.
  Three threads at the barrier, of which at most two are hydrogen and at most one oxygen, are exactly two hydrogen and one oxygen.
  That is the whole argument for the composition of a molecule, and it needs both tools: the barrier counts to three and does not know what it is counting.
* **When can the next molecule start?**
  When the places are given back, and each thread gives its place back **after** it has released.
  The next barrier needs three threads; they need three places; the three places are free only when all three threads of this molecule have released.
  So the releases of one molecule are all recorded before any release of the next.

### Taking the mechanisms away, one at a time

| Version | Result |
| --- | --- |
| Semaphores only (the skeleton) | 3,000 to 4,000 molecules of 10,000 |
| Barrier only | `HHH` groups, then a time-out |
| Both, with `sem_post()` before the release | the flag in 1 run out of 30 |
| Both, with `sem_post()` after the release (the reference) | the flag in 50 runs out of 50 |

With the barrier alone, any three threads form a group, and with four hydrogen threads against two oxygen that is usually three hydrogen.
The hydrogen runs out, the oxygen threads wait at a barrier that will never see a third thread, and the program stops.

The third row is the subtle one.
The three threads meet correctly, and then each gives its place back before it releases.
A thread of the next molecule can take the place, and the next molecule can complete its barrier and release while a thread of this one has not got round to releasing yet.
The atoms are the right ones; they are recorded in the wrong groups.
The window is a few instructions wide, and on this machine it was hit in 29 runs out of 30, somewhere among the 10,000 molecules.

### With a mutex and a condition variable

The same problem can be solved with the tools of the earlier tasks.
It needs explicit bookkeeping: how many atoms of each kind are waiting, how many of each have been told they may leave, and how many of the current molecule have not left yet.

```C
static int waiting_h, waiting_o;	/* arrived, no permission to leave yet */
static int tickets_h, tickets_o;	/* permissions to leave                */
static int leaving;			/* of this molecule, not yet released  */

static void form(void)
{
	if (leaving == 0 && waiting_h >= 2 && waiting_o >= 1) {
		waiting_h -= 2;
		waiting_o -= 1;
		tickets_h = 2;
		tickets_o = 1;
		leaving = 3;
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
	leaving--;
	form();
	pthread_mutex_unlock(&lock);
}
```

It gets the flag in 20 runs out of 20 and takes the same 0.02 s.
It is three times as long, and every line of it is a place to make one of the mistakes of the earlier exercises.
The semaphore and the barrier are those counters and that waiting, written once, by somebody else, and tested.

### Why the threads share a counter of atoms

If each hydrogen thread brought a fixed 5,000 atoms and each oxygen thread 5,000, the totals would match, and the program would still stop on some runs, with a correct library.
A molecule needs two hydrogen threads inside `hydrogen()` at the same time.
If three of the four finish their share early, the last one is left with atoms to bring and nobody to bring them with: it waits at the barrier for ever.
A thread is in one call at a time.

With a shared counter, a thread stops only when there is nothing left to bring, so as long as two hydrogen atoms are owed there are two threads to bring them.
The first version of this executable had the fixed shares, and the reference solution timed out on it.

## References

* `man 7 sem_overview`, `man 3 sem_init`, `man 3 sem_wait`, `man 3 sem_post`
* `man 3 pthread_barrier_init`, `man 3 pthread_barrier_wait`
* Allen B. Downey, *The Little Book of Semaphores*, section 5.6, *Building H2O* — <https://greenteapress.com/wp/semaphores/>
