# Exercise 05: A Lock in the Wrong Place

**Tools:** GCC, Make, time

**Directory**: `05-string-encryption/`

## Goal

Reference solution of the encryption challenge: the mutex protects the cursor that the threads share, for the three statements that read and move it, and the encryption runs outside the lock.

## Background

```C
struct job {
	char *text;		/* the whole string                         */
	size_t size;		/* its length                               */
	const char *key;	/* the key to XOR with                      */
	size_t next;		/* where the next block to hand out starts  */
	pthread_mutex_t lock;	/* protects `next`                          */
};
```

The cipher is the one of session 07: character `i` is XORed with byte `i % strlen(key)` of the key, and doing it twice gives the text back.
`xor_buffer()` is unchanged.

What changed is who decides which thread does what.
In session 07 `main()` decided, once, by dividing the size by the number of threads.
Here the threads decide as they go: there are 16,385 blocks of 4096 characters, and each thread keeps taking the next one that is free.
This is the simplest form of a **work queue**, and the idea behind the last two bonus tasks.

The executable fills 64 MiB and a little more with a known text, calls `encrypt_text()` with eight threads, hashes the result, decrypts it with one pass of its own, and compares with the original.

Files:

* `xorcipher.c`, `xorcipher.h` — the library, and its interface.
* `chall.c`, `flag.h`, `flag` — the executable, the encrypted flag with its key, and the flag in clear.
* `test.sh` — twenty runs, each of which has to print the flag.

## Build & Run

```console
make
./chall
```

```text
encrypted 67109864 characters, 8 threads, 0.012 s
round trip: ok
flag: SO{...}
```

## Results and Explanations

### The library as given

```C
for (;;) {
	pos = job->next;
	if (pos >= job->size)
		break;

	len = job->size - pos < BLOCK ? job->size - pos : BLOCK;

	pthread_mutex_lock(&job->lock);
	xor_buffer(job->text + pos, len, pos, job->key);
	job->next = pos + BLOCK;
	pthread_mutex_unlock(&job->lock);
}
```

```text
encrypted 67109864 characters, 8 threads, 0.786 s
round trip: FAILED
  59937768 characters came out of the threads wrong; the first is at position 8192
  a character is wrong if no thread encrypted it, or if two did:
  XORing twice with the same byte gives the clear text back
No flag: the text was not encrypted as one pass would encrypt it.
```

Between nine and sixty million characters wrong, out of sixty-seven million, and sixty times slower than the reference.
Both numbers come from the same two lines being in the wrong place.

### Two lists

| Shared, and written | Private to a thread |
| --- | --- |
| `job->next` | `pos`, `len` |
| | the block of text at `pos`, once the thread has taken it |

`job->text`, `job->size` and `job->key` are shared and only read, which needs no protection.

The lock in the skeleton covers `xor_buffer()`, which works on the second column, and the write of `next`.
The **read** of `next`, the first statement of the loop, is outside.

### What goes wrong

All eight threads start, and all eight read `next` as 0 before any of them has written it.
They then queue at the mutex, each with `pos == 0` in its pocket.
The first encrypts block 0 and sets `next` to 4096.
The second gets the lock, and encrypts block 0 again: its `pos` was read long ago.
XOR is its own inverse, so the block is back in clear.
The third encrypts it a third time, and so on; block 0 ends up encrypted if an odd number of threads did it.

From then on every thread works with a value of `next` that was read before it waited for the lock, which is to say an old one.
This is the TOCTOU of `03-toctou` once more: a value read outside a critical section and used inside the next.

And it is slow because the encryption is inside the lock.
One thread encrypts at a time, the other seven wait, and most of what they wait for is work that undoes work.

### The fix

```C
for (;;) {
	pthread_mutex_lock(&job->lock);
	pos = job->next;
	if (pos < job->size)
		job->next = pos + BLOCK;
	pthread_mutex_unlock(&job->lock);

	if (pos >= job->size)
		break;

	len = job->size - pos < BLOCK ? job->size - pos : BLOCK;
	xor_buffer(job->text + pos, len, pos, job->key);
}
```

Taking a block is a read, a test and a write of `next`, and the three are one critical section.
Two threads can no longer read the same value: the second one reads only after the first has moved the cursor.

Once a thread has its `pos`, the block is its own.
No other thread will be given the same one, and blocks do not overlap, so `xor_buffer()` writes memory that nobody else touches.
It needs no lock, and with no lock eight threads encrypt at the same time.

### The measurements

| Version | Result | Encryption time |
| --- | --- | --- |
| As given: `next` read outside the lock, encryption inside | wrong | 0.65 to 0.83 s |
| Lock around taking the block and the encryption | right | 0.097 s |
| Reference: lock around taking the block only | right | 0.012 s |

The middle row is the instructive one.
It is correct, and it is a sequential program with eight threads in it: the whole loop body is the critical section, so one thread works at a time.
The reference is eight times faster, on a machine with more than eight cores, and the only difference is the place of one `pthread_mutex_unlock()`.

All three versions lock and unlock once per block, 16,385 times in all.
The cost of a lock is not in the calls.
It is in how long it is held, because that is how long everybody else waits.

## References

* `man 3 pthread_mutex_lock`
* Session 07, `02-string-encryption` — the cipher this one starts from
* Lecture 08, part 04, *Partitioning and synchronization*, and part 05 on granularity
