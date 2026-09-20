# Demo: What a Security Guarantee Costs

The same password hashed a million times by djb2 and by SHA-256.

## Run

```console
cd ../../../01-software-stack-full/demos/04-versus
make
make run
```

```text
simple hash (djb2)    0.032593 s for 1000000 iterations
secure hash (SHA-256) 0.697281 s for 1000000 iterations
SHA-256 costs 21.4x as much per hash.
```

## Ask

* Twenty-one times slower. Is that overhead, or is it the product?
* Where would djb2 be the right answer, and where would it be malpractice?
* For *storing* a password, both are wrong. Which one is wrong for being too fast?
