# Exercise: Parallel String Encryption

**Tools:** GCC, Make, time

## Goal

Reference implementation of the parallel encryption.
A very long string in memory is XORed with a repeating key by several threads, each on its own part; the exercise is the arithmetic that makes the parts cover the string exactly, and makes each part come out as it would in one sequential pass.

## Background

The cipher XORs character *i* of the string with byte `i % klen` of the key.
The sequential program is one call over the whole string, and the program's own check is another: it decrypts with one sequential call and compares the result with the original text.
When the check fails, the program also says how many characters are wrong, where the first one is, and whether it was left in clear or XORed with the wrong byte of the key: the first is a mistake in the split, the second one in `xor_buffer()`.

The threads write to the string, which is new compared with the search.
They still need no mutex, because of what they write: thread *i* writes the characters of part *i* and no others, and the parts do not overlap.
A race needs two threads on the same memory, at least one of them writing; here no byte of the string is touched by two threads.

Files:

* `encrypt.c` — the solution.
* `test.sh` — the round trip for four keys, eight thread counts and three sizes, from 16 MiB down to one character.

## Build & Run

```console
make
./encrypt secret 1
./encrypt secret 4
```

```text
encrypted 256 MiB, 1 thread(s), 0.629 s
round trip: ok
encrypted 256 MiB, 4 thread(s), 0.164 s
round trip: ok
```

A third argument sets the size of the string: a number of characters, or a number followed by `K` or `M`; the default is `256M`.
A string of at most 64 characters is also shown character by character, with the key byte one pass over the string gives each character above the one the threads gave it:

```console
./encrypt secret 3 20
```

```text
encrypted 20 characters, 3 thread(s), 0.000 s
round trip: ok
one pass: secretsecretsecretse
threads:  secretsecretsecretse
```

## Results and Explanations

### TODO 1 — the struct

```C
struct part {
	char *start;		/* first character of this thread's part   */
	size_t len;		/* how many characters it covers           */
	size_t pos;		/* where the part starts in the string     */
	const char *key;	/* the key to XOR with                     */
};
```

A pointer and a length say which characters; `pos` says where they are in the whole string, which the cipher needs to know.
`pos` could be computed from `start` and the address of the string; keeping it is clearer.

### TODO 2 — the phase of the key

```C
static void xor_buffer(char *buf, size_t len, size_t pos, const char *key)
{
	size_t klen = strlen(key);
	size_t i;

	for (i = 0; i < len; i++)
		buf[i] ^= key[(pos + i) % klen];
}
```

The sequential function gave `buf[0]` the first byte of the key, which is right when `buf` is the start of the string.
A part that starts at position `pos` must give its first character byte `pos % klen`, the one it would have got in a single pass.
The sequential call, used for the check, passes `pos` as 0.

Leave this out and the result depends on the key.
With 256 MiB and 4 threads the parts are 67,108,864 characters long:

```text
$ ./encrypt secret 4          # key restarting in every part
round trip: FAILED
  134217728 of 268435456 characters are wrong; the first is at position 67108864, followed by 134217727 more in a row
  position 67108864 was XORed with 's', where one pass gives it 'e': look at how the key byte is chosen
$ ./encrypt abcd 4
round trip: ok
```

67,108,864 is a multiple of 4 and not of 6.
With a 4-character key every part happens to start where the key does, and the mistake is invisible; with a 6-character key parts 1 and 2 are encrypted with the key rotated, and only part 3 happens to start in step with it.
A power-of-two size, a power-of-two thread count and a key of 1, 2, 4 or 8 characters is exactly the test a person writes first, and it passes on a wrong program.
`test.sh` uses `secret`, and 3 and 7 threads, for that reason.

### TODO 3 — the thread function

```C
static void *encrypt_part(void *arg)
{
	struct part *p = arg;

	xor_buffer(p->start, p->len, p->pos, p->key);

	return NULL;
}
```

Nothing to return: the result is the string itself.

### TODO 4 — the split

```C
chunk = size / nthreads;
for (i = 0; i < nthreads; i++) {
	parts[i].pos = (size_t) i * chunk;
	parts[i].start = text + parts[i].pos;
	parts[i].len = (i == nthreads - 1) ? size - parts[i].pos : chunk;
	parts[i].key = key;
}
```

Part *i* starts `i * chunk` characters in and is `chunk` long, so part *i* ends exactly where part *i* + 1 starts: no gap, no overlap.
The last part runs to the end of the string and so takes the remainder of the division, up to `nthreads - 1` characters.

With 3 threads on 268,435,456 characters, `chunk` is 89,478,485 and one character is left over; with 7 threads, 2 are.
Without the special case those last characters stay in clear, and the round trip fails, because the sequential decryption then "decrypts" characters that were never encrypted.
On a short string the mistake is visible at a glance:

```text
$ ./encrypt secret 3 20       # remainder dropped
round trip: FAILED
one pass: secretsecretsecretse
threads:  secretsecretsecret..
                            ^
  2 of 20 characters are wrong; the first is at position 18, followed by 1 more in a row
  position 18 was left in clear: no part encrypted it, or two parts did; look at the split
```

Unlike the search, there is **no overlap** between parts here, and there must not be.
A character in two parts is XORed twice and comes out as plaintext.
That is a mistake in the arithmetic, not a race, and no mutex repairs it: with a lock around `xor_buffer()` the character is still encrypted twice, only now one thread at a time.

### TODO 5 — start and join

The two loops of session 06, with `encrypt_part` and `&parts[i]`.

### The measurements

| Threads | Time | Speed-up |
| --- | --- | --- |
| 1 | 0.629 s | 1.0 |
| 2 | 0.324 s | 1.9 |
| 4 | 0.164 s | 3.8 |
| 8 | 0.152 s | 4.1 |
| 12 | 0.114 s | 5.5 |
| 32 | 0.116 s | 5.4 |
| 64 | 0.117 s | 5.4 |

The same curve as the search, on the same 6 cores: threads that write disjoint memory scale like threads that only read.

The whole program tells the other story.
`time ./encrypt secret 1` gives 1.36 s of `real` time, and with 8 threads 0.87 s: a speed-up of 1.6.
Filling the string, checking it twice and decrypting it are sequential and take 0.73 s whatever the thread count, more than half of the one-thread time, so Amdahl's law caps the program at 1.36 / 0.73 = 1.9 times faster.

## References

* `man 3 pthread_create`, `man 3 pthread_join`
* `man 1 time`
