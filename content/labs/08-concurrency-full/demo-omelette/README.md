# Demo: Three Eggs Make an Omelette

**Tools:** GCC, Make

## Goal

Reference solution of the first challenge: a library in which hens add eggs to a basket and a cook waits for three of them, with the test, the wait and the taking of the eggs under one lock.

## Background

The executable, `chall`, has three hen threads and one cook thread.
Each hen calls `egg_create()` a thousand times, and the cook calls `omelette_make()` a thousand times: three thousand eggs, a thousand omelettes, nothing left over.
A hen needs a moment for each egg, and the cook needs none, so the cook is nearly always the one who has to wait.

The basket belongs to the executable, and the library reaches it through two functions that the executable defines:

```C
void basket_put_egg(void);	/* put one egg in the basket               */
void basket_take_eggs(void);	/* take EGGS_PER_OMELETTE eggs out of it   */
```

The basket is deliberately not thread-safe.
It is also instrumented: it complains when a thread enters while another is inside, and when the cook takes eggs from a basket that holds fewer than three.
The library is where the synchronization has to be, and the basket is how the executable finds out whether it is there.

The cook's problem is the one of the previous demo with a number in it: wait until "there are at least three eggs" is true, then act while it is still true.

Files:

* `kitchen.c`, `kitchen.h` — the library, and its interface.
* `chall.c`, `flag.h`, `flag` — the executable, the encrypted flag with its key, and the flag in clear.
* `test.sh` — twenty runs, each of which has to print the flag.

## Build & Run

```console
make
./chall
```

```text
eggs put in the basket: 3000 (expected 3000)
omelettes made:         1000 (expected 1000)
eggs left:              0 (expected 0)
rules broken:           0
flag: SO{...}
```

## Results and Explanations

### The library as given

```C
void egg_create(void)
{
	basket_put_egg();
	eggs++;
	pthread_cond_signal(&enough_eggs);
}

void omelette_make(void)
{
	pthread_mutex_lock(&lock);
	if (eggs < EGGS_PER_OMELETTE)
		pthread_cond_wait(&enough_eggs, &lock);
	pthread_mutex_unlock(&lock);

	basket_take_eggs();
	eggs -= EGGS_PER_OMELETTE;
}
```

```text
the cook started an omelette with 1 egg(s) in the basket
the hen came to the basket while another thread was using it
the cook started an omelette with -1 egg(s) in the basket
the cook started an omelette with -2 egg(s) in the basket
the cook started an omelette with -4 egg(s) in the basket
eggs put in the basket: 2999 (expected 3000)
omelettes made:         1000 (expected 1000)
eggs left:              -1 (expected 0)
rules broken:           1043
No flag: the basket was not used by the rules.
```

More than a thousand broken rules: every one of the thousand omelettes was started with fewer than three eggs in the basket, most of them with a negative number, and hens walked into each other some fifty to two hundred times.
On some runs an egg or ten are put in the basket and never counted, because two hens incremented the same variable at the same time.
There are three separate mistakes, and each of the three fixes below is needed.

### TODO 1 — the hens share the basket

`basket_put_egg()` and `eggs++` are used by three hens and by the cook.
Nothing protects them: this is the race condition of session 07, and the mutex that is already in the file is the fix.

```C
void egg_create(void)
{
	pthread_mutex_lock(&lock);
	basket_put_egg();
	eggs++;
	pthread_cond_signal(&enough_eggs);
	pthread_mutex_unlock(&lock);
}
```

The signal is sent with the lock held.
That closes a gap on the cook's side: the cook tests `eggs` and goes to sleep with the lock held throughout, so a hen cannot add the third egg and signal in between the test and the sleep, where the signal would find nobody waiting and be lost.

With only this fix, the eggs are all counted, and every omelette is still started too early: more than a thousand broken rules per run, as before.

### TODO 2 — woken up is not the same as enough

The cook waits with an `if`.
The hens signal after every egg, so the cook is woken up by the first one, with one egg in the basket, and goes on to take three.
The basket is now at minus two, and from there on the cook stays ahead of the hens.

```text
the cook started an omelette with 1 egg(s) in the basket
the cook started an omelette with -1 egg(s) in the basket
```

A wake-up says that the count changed, not what it changed to.

```C
while (eggs < EGGS_PER_OMELETTE)
	pthread_cond_wait(&enough_eggs, &lock);
```

Signalling only on every third egg looks like another way out, and is not one: it puts the cook's condition into the hens' code, and it breaks the day a second cook is added.
The waiter tests its own condition; the others only say that something changed.

### TODO 3 — act while the condition still holds

The cook releases the lock and then takes the eggs.
Between the two, the condition the cook waited for is no longer protected, and neither is the basket: a hen can be inside it when the cook arrives.

```text
the cook came to the basket while another thread was using it
```

There is a second problem in the same two lines: `eggs -= EGGS_PER_OMELETTE` is now a write to the shared count outside the lock, racing with the hens' `eggs++`.
An update gets lost, the count drifts away from what is in the basket, and the wait that was just fixed tests a number that is wrong.

With TODO 1 and TODO 2 done and this one not, no two runs are alike: 2 broken rules on one, 850 on another, and one run in a few does not end at all, with the cook asleep waiting for eggs that the count says are not there.

The fix is to move two lines up, inside the critical section.

```C
void omelette_make(void)
{
	pthread_mutex_lock(&lock);
	while (eggs < EGGS_PER_OMELETTE)
		pthread_cond_wait(&enough_eggs, &lock);
	basket_take_eggs();
	eggs -= EGGS_PER_OMELETTE;
	pthread_mutex_unlock(&lock);
}
```

### The pattern

This is the shape of every wait in the session.

1. Lock.
1. `while` the condition is false, wait.
1. Act on the condition.
1. Unlock.

Steps 2 and 3 are under one lock, with no gap.
On the other side: lock, change the data, signal or broadcast, unlock.

### How the executable finds the library

```console
readelf -d chall | grep -E 'NEEDED|RUNPATH'
```

```text
 0x0000000000000001 (NEEDED)             Shared library: [libkitchen.so]
 0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
 0x000000000000001d (RUNPATH)            Library runpath: [$ORIGIN]
```

The executable was linked with `-Wl,-rpath,'$ORIGIN'`, so the loader looks for `libkitchen.so` in the directory the executable is in.
Before `make`, there is no such file, and the program does not start:

```text
./chall: error while loading shared libraries: libkitchen.so: cannot open shared object file: No such file or directory
```

The calls go both ways: the executable calls `egg_create()` in the library, and the library calls `basket_put_egg()` in the executable.
For the second direction the executable is linked with `-rdynamic`, which puts its functions in the table the loader resolves symbols from; the challenges whose library never calls back are linked without it.

## References

* `man 3 pthread_cond_wait`, `man 3 pthread_cond_signal`
* `man 8 ld.so` — `$ORIGIN` and the run path
* Session 01, `bonus-static-vs-dynamic` — shared libraries
