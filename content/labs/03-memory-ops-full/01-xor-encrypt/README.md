# Exercise: XOR-Encrypt a File With a Fixed Key

**Tools:** GCC, Make, Valgrind

## Goal

Reference implementation of the XOR file-encryption exercise.
It makes the session's opening point in the simplest possible setting: when every size is known ahead of time, static allocation is all you need, and `malloc` would only add an owner to track and a `free` to forget.

## Background

The program XOR-encrypts a file into another file, one 32-byte block at a time.
Three things live in memory, and all three have a size fixed at compile time:

```c
#define BLOCK_SIZE	32

static const unsigned char key[BLOCK_SIZE] = { 0x9e, 0x3a, /* ... */ };

unsigned char in_buf[BLOCK_SIZE];
unsigned char out_buf[BLOCK_SIZE];
```

* The **key** is 32 bytes, chosen when the program is written.
  `static const` puts it in read-only data: allocated once, for the life of the process, never freed.
* The **two buffers** are 32 bytes each.
  Because the size is a compile-time constant, they are ordinary arrays in `main`'s stack frame — created when `main` runs and gone when it returns, with no call to `malloc` and no matching `free`.

XOR is its own inverse: `(b ^ k) ^ k == b`.
So encryption and decryption are the *same* operation, which is what makes the round-trip test below possible.

Files:

* `xor_encrypt.c` — the completed implementation.
* `input.txt` — sample plaintext to encrypt.

## Build & Run

```console
make
./xor_encrypt input.txt input.enc
```

`input.enc` is the ciphertext; it is binary, so look at it with a hex dump rather than a pager:

```console
xxd input.enc | head
```

Decrypt by running the ciphertext back through the same program:

```console
./xor_encrypt input.enc roundtrip.txt
diff input.txt roundtrip.txt && echo "identical"
```

`make test` does exactly this round-trip and checks the result:

```console
make test
```

## Results and Explanations

### The encryption loop

```c
while ((n = fread(in_buf, 1, BLOCK_SIZE, in)) > 0) {
	size_t i;

	for (i = 0; i < n; i++)
		out_buf[i] = in_buf[i] ^ key[i];

	if (fwrite(out_buf, 1, n, out) != n) {
		/* error handling */
	}
}
```

Each iteration reads up to a full block, XORs each byte against the matching key byte, and writes the result.
Within a block `i` runs from 0 to `n - 1`, and since a block is never larger than the key, `key[i]` is always in range.

### Why `n`, not `BLOCK_SIZE`

`fread` returns the number of bytes it actually read.
Only the final block is normally short, and the loop encrypts and writes exactly that many bytes.
Using `BLOCK_SIZE` instead of `n` on the last block would encrypt and write leftover bytes from a previous iteration — bytes that were never part of the file — and the output would no longer round-trip.
This is the one place the exercise can go subtly wrong while still "working" on inputs whose length happens to be a multiple of 32.

### Where the memory is, and what Valgrind sees

Nothing in this program is on the heap.
The key is in read-only data; the buffers are on the stack.
Run it under Valgrind anyway:

```console
valgrind ./xor_encrypt input.txt input.enc
```

```text
total heap usage: 4 allocs, 4 frees, ... bytes allocated
All heap blocks were freed -- no leaks are possible
ERROR SUMMARY: 0 errors from 0 contexts
```

The handful of allocations are **not yours** — they belong to the C library's buffered I/O, which allocates a buffer behind each `fopen`.
Your code allocates nothing, so there is nothing of yours that could leak: the "free on every path" discipline that the rest of the session is about simply does not arise here.
That is the point of the exercise — hold it next to `03-in-memory-db`, where the size is *not* known ahead of time and every one of those obligations comes back.

### A word on the "encryption"

A fixed repeating-key XOR is a teaching device, not a cipher.
It is trivially broken: two plaintext bytes 32 apart are XORed with the same key byte, a run of identical plaintext bytes reveals the key stream directly, and a single known 32-byte plaintext/ciphertext pair recovers the whole key.
See `FURTHER.md`.

## References

* `man 3 fread`, `man 3 fwrite` — note that both return an item count, not a status
* `man 3 fopen` — and the buffering it sets up, which is what Valgrind's allocations are
* The bitwise XOR operator `^`, and the identity `x ^ y ^ y == x`
