# Instructor Notes: XOR-Encrypt a File With a Fixed Key

## Purpose

The first individual exercise of the session, and deliberately the easy one.
It exists to state the session's thesis from the other side: **when every size is known at compile time, static allocation is enough, and `malloc` would only invent obligations the problem does not have.**

Everything after it — `03-in-memory-db` and the bonus — is what happens when the size is *not* known ahead of time.
Set that contrast up here explicitly and the later exercises land better.

## Expected solution

Two TODOs:

* **TODO 1** — declare `unsigned char in_buf[BLOCK_SIZE];` and `unsigned char out_buf[BLOCK_SIZE];`.
* **TODO 2** — `for (i = 0; i < n; i++) out_buf[i] = in_buf[i] ^ key[i];`.

The key, the file handling, and the read/write loop are all given.

## The one real trap

Using `BLOCK_SIZE` instead of `n` in the encryption loop (or in `fwrite`).
It passes every test whose input length is a multiple of 32 and corrupts the tail of everything else, because the last short block gets padded with stale buffer bytes.
`input.txt` is deliberately not a multiple of 32 bytes, so this mistake fails the round-trip immediately — but a student who tests only with a 32-, 64- or 96-byte file will not see it.
Ask them what happens on the last block.

## Other things students get wrong

* **Reaching for `malloc` out of habit**, sizing the buffers with `malloc(BLOCK_SIZE)`.
  It works, and it is exactly the wrong instinct for this problem. Ask what the allocation buys them when the size is a constant, and what it now obliges them to do (free it, on every error path — count them).
* **XORing the whole buffer regardless of `n`** — the trap above.
* **Opening the files in text mode** (dropping the `b` from `"rb"`/`"wb"`).
  Harmless on Linux, wrong on Windows; worth a one-line mention, not a detour.
* **Trying to `cat` the ciphertext** and being surprised it is garbage. Point them at `xxd`.

## Demonstrations worth the time

* **Break it live.** Encrypt 64 zero bytes and hexdump the result — the key stream is printed in the clear. Thirty seconds, and it makes "this is a toy, not a cipher" concrete.
* **The round-trip.** Encrypt, encrypt again, `diff` against the original. That XOR is its own inverse is the neatest thing in the exercise.
* **Valgrind on a program with no `malloc`.** Show that the few allocations reported are stdio's, not theirs, and that "0 errors, all freed" here is trivial precisely because they own no heap memory. Contrast with `03-in-memory-db`, where the same clean report actually means something.

## Verified reference values

Measured on Ubuntu 24.04 / gcc 14.2 / x86-64.

| Fact | Value |
| --- | --- |
| `make test` on the shipped `input.txt` | round-trip reproduces the original, byte for byte |
| Ciphertext vs plaintext | differ from the first byte |
| Empty input file | empty output, exit 0, no crash |
| Under Valgrind | a few stdio allocations, all freed; 0 errors |

The exercise's own code contains zero calls to `malloc`/`free`.

## Practical notes

* `make test` writes `input.enc` and `roundtrip.txt` and `make clean` removes them; both are in `.gitignore`.
* Nothing here is timing-sensitive, and nothing needs the file to be large.
