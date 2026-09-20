# Demo: What a Security Guarantee Costs

The same twelve-character password, hashed a million times by two different functions.
One of them is about twenty times slower, and that is the entire reason to use it.

## Goal

Put a number on one of the trade-offs of the lecture.
Security is not free and it is not expensive; it costs a specific, measurable amount, and the question is always whether that amount buys something you need.

## Background

The two functions in `security-vs-performance.c`:

* `simple_hash()` is **djb2**: a shift and two adds per byte -- `hash = hash * 33 + c` -- producing a 64-bit number.
  It is a fine hash for a hash table, where all you want is that different keys usually land in different buckets.
  It offers no security property whatsoever: given a digest, working backwards to an input that produces it is a few minutes of arithmetic.
* `secure_hash()` is **SHA-256**, through OpenSSL's `EVP_Digest()`.
  It runs 64 rounds of mixing over each 512-bit block.
  In exchange it is, as far as anyone knows, impossible to invert and impossible to find two inputs for -- which is what makes it usable for stored credentials, for signatures, and for content addressing.

The extra time is not overhead.
It *is* the security property: the rounds are what make the function hard to run backwards.

## Build and run

```console
make
make run
```

Needs the OpenSSL development files: `libssl-dev` on Debian and Ubuntu, `openssl-devel` on Fedora.

## Results and explanations

```text
Generated password: PZu1gxHhUZfL

simple hash (djb2)    0.032593 s for 1000000 iterations -> 13982574374259280933
secure hash (SHA-256) 0.697281 s for 1000000 iterations -> 797e2bd9aafc6319b2081b31eaa6f4fb6041bae845a98a03f70d18b5a8b2c8aa

SHA-256 costs 21.4x as much per hash.
```

Roughly 33 ns against 700 ns per hash.

Whether that ratio matters depends entirely on what the hash is for.

* **Hash table lookups**, millions per second, on data that is not secret: djb2 is the right answer, and SHA-256 would be a twenty-fold slowdown bought for nothing.
* **Checking a password at login**: 700 ns is invisible next to the network round-trip that delivered the password, and djb2 would be malpractice.
* **Storing a password**: *neither* is right.
  SHA-256 is too fast.
  An attacker with a stolen database can try billions of candidate passwords per second on a GPU, and the only defence is to make each attempt expensive on purpose, which is what bcrypt, scrypt and Argon2 do -- they are deliberately slowed down by a tunable cost factor.
  The right answer here is a hash that costs about 100 ms.

That last point is the one worth arguing about in a lecture.
The trade-off is not "fast versus secure".
It is "which cost do I want to pay, and who else is paying it?".
For a stored credential, the slowness *is* the product, and being fast is the bug.

## Going further

* Raise `ITERATIONS` and confirm the ratio is stable; it is a per-call cost, not a start-up cost.
* Hash a longer input -- a 4 KB buffer rather than twelve characters -- and watch the ratio shrink.
  SHA-256's fixed per-call overhead amortises; djb2's does not, because it has none.
* Compare against `openssl speed sha256 md5 sha1` on the same machine.
* Time the same password through `crypt()` with a bcrypt or yescrypt salt (`man 3 crypt`) and see six orders of magnitude of deliberate slowness.
* The other trade-offs of this part of the lecture make good five-minute experiments of the same shape: the same file copied with a 1-byte and a 64 KB buffer (resource efficiency against performance), and the same Fibonacci computation in C and in Python (portability against performance).

## References

* `man 3 crypt`, `man 3 EVP_Digest`
* [OWASP password storage cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
* [djb2 and other string hash functions](http://www.cse.yorku.ca/~oz/hash.html)
</content>
