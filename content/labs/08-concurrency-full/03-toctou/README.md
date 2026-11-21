# Exercise: A Name With Two Owners

**Tools:** GCC, Make

## Goal

Reference solution of the TOCTOU challenge: registering a name is one critical section, in which the check that the name is free and the store that takes it happen without the lock being released in between.

## Background

Eight threads ask for the same five hundred names, lined up at a barrier before each one.
For every name, the executable counts how many threads `registry_register()` said yes to, and checks that the name is in the registry afterwards.
At the end: five hundred names, each with one owner, and five hundred entries in the registry.

Files:

* `registry.c`, `registry.h` — the library, and its interface.
* `chall.c`, `flag.h`, `flag` — the executable, the encrypted flag with its key, and the flag in clear.
* `test.sh` — twenty runs, each of which has to print the flag.

## Build & Run

```console
make
./chall
```

```text
names asked for:            500, each by 8 threads
names given to one thread:  500 (expected 500)
successful registrations:   500 (expected 500)
names in the registry:      500 (expected 500)
flag: SO{...}
```

## Results and Explanations

### The library as given

```C
int registry_register(struct registry *reg, const char *name)
{
	if (registry_contains(reg, name))
		return 0;

	return registry_add(reg, name);
}
```

```text
user-13 was given to 2 threads
user-14 was given to 3 threads
user-16 was given to 2 threads
user-17 was given to 2 threads
user-23 was given to 3 threads
names asked for:            500, each by 8 threads
names given to one thread:  260 (expected 500)
successful registrations:   980 (expected 500)
names in the registry:      980 (expected 500)
No flag: a name has more than one owner, or none.
```

About half the names have more than one owner, and the registry holds nearly twice as many entries as there are names.

### The interleaving

| Step | Thread A | Thread B |
| --- | --- | --- |
| 1 | `registry_contains("user-13")`: lock, look, unlock; returns 0 | |
| 2 | | `registry_contains("user-13")`: lock, look, unlock; returns 0 |
| 3 | `registry_add("user-13")`: lock, store, unlock; returns 1 | |
| 4 | | `registry_add("user-13")`: lock, store, unlock; returns 1 |

Every step is done under the lock, and no two threads are in the array together.
There is no data race here, in the sense of two unsynchronized accesses to the same memory, and a tool that looks for those finds nothing: under Helgrind the broken library ends with `ERROR SUMMARY: 0 errors`.
It also ends with the flag, because Valgrind runs one thread at a time and the threads no longer meet between the check and the act.
The tool that found the bug of the tree has nothing to say about this one.

What is wrong is between the steps.
After step 1, thread A knows that the name is free.
That was true when the lock was held, and the lock was released at the end of step 1.
From then on, anybody may register the name, and in step 2 and 4 somebody does; thread A goes on to step 3 acting on something it learned and can no longer rely on.

The time of the check is step 1, the time of the use is step 3, and the name of the bug is the gap between them.

### The fix — one critical section

```C
static int find_name(struct registry *reg, const char *name)
{
	size_t i;

	for (i = 0; i < reg->count; i++)
		if (strcmp(reg->names[i], name) == 0)
			return 1;

	return 0;
}

int registry_register(struct registry *reg, const char *name)
{
	int registered = 0;

	pthread_mutex_lock(&reg->lock);
	if (reg->count < MAX_NAMES && !find_name(reg, name)) {
		strncpy(reg->names[reg->count], name, NAME_LEN - 1);
		reg->names[reg->count][NAME_LEN - 1] = '\0';
		reg->count++;
		registered = 1;
	}
	pthread_mutex_unlock(&reg->lock);

	return registered;
}
```

The lock is taken once, and held from the check to the end of the act.
"The name is free" is true for exactly as long as it is used.

To do that, the code had to be reorganized.
The search moved into `find_name()`, a helper that does not lock and is called with the lock held, and `registry_contains()` became a wrapper around it that locks.
The same split as in the tree: the interface locks, the helpers assume.

### The fix that hangs

The quick way is to keep the function as it was and put a lock around it:

```C
pthread_mutex_lock(&reg->lock);
if (!registry_contains(reg, name))	/* locks reg->lock again */
	rc = registry_add(reg, name);
pthread_mutex_unlock(&reg->lock);
```

```text
Timed out: a thread is waiting for something that never comes.
```

`registry_contains()` takes the mutex that the same thread took one line above.
A default mutex does not count: the thread waits for itself, the other seven wait for it, and the program stops on the first name.

### The other fix, and why not

A second mutex, taken only in `registry_register()` around the two calls, also gives the flag: no two threads can be between the check and the act at once.
It is fragile.
It protects against other callers of `registry_register()` and against nobody else: the day the library grows a `registry_rename()` or a `registry_remove()` that takes only the first lock, the gap is open again.
One invariant, one lock.

## References

* `man 3 pthread_mutex_lock`
* Lecture 08, part 05, *Problems with synchronization* — the `toctou` demo, where the same bug sells tickets that do not exist
* MITRE, *CWE-367: Time-of-check Time-of-use (TOCTOU) Race Condition* — <https://cwe.mitre.org/data/definitions/367.html>
