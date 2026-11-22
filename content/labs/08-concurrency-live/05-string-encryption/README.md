# Exercise 05: A Lock in the Wrong Place

**Tools:** GCC, Make, time

**Directory**: `05-string-encryption/`

## Goal

Repair a multithreaded cipher that has a mutex in it, used around the wrong statements.
Afterwards you will be able to look at a critical section and ask the two questions that decide whether it is right: is everything shared inside it, and is anything inside it that is not shared.

## Background

This is the XOR cipher of session 07, `02-string-encryption`, turned into a library with one function, `encrypt_text()`, that starts the threads itself.

In session 07 the string was cut into as many parts as there were threads, before the threads started, and each thread was handed its part.
Nothing was shared for writing, and nothing was locked.

`xorcipher.c` shares the work out differently.
The string is cut into blocks of 4096 characters, many more blocks than threads.
The threads all work from one `struct job`, in which `next` says where the next block that nobody has taken starts.
A thread takes a block by reading `next` and moving it forward, encrypts the block, and comes back for another, until `next` is past the end.
A thread that the scheduler keeps off the processor for a while simply takes fewer blocks, which a fixed split cannot do.

The price is that `next` is shared, and written by every thread.

Somebody knew that, and added a mutex.
`chall` encrypts 64 MiB with eight threads, decrypts the result in one pass, and compares with the original: most of the text comes back wrong.

## Your Task

1. Run `./chall` and read the report: how many characters are wrong, and how long the encryption took.
1. Read `encrypt_blocks()`.
   Make two lists: what the threads share for writing, and what each thread has for itself.
   Then look at which of the two is inside the lock.
1. Work out how a block can end up encrypted by two threads, and what the text looks like after that.
1. Move the lock, so that it covers everything on the first list and nothing on the second.

## Build & Run

```console
make
./chall
```

## Check Your Work

* `round trip: ok` and the flag, on every run; run it twenty times.
* Compare the time the encryption takes before and after your change, on the first line of the output.
  Your version does more locking and unlocking than the original did, per block, and is much faster.
  Explain why to the teaching assistant.
* There is a correct version that is as slow as the broken one: the lock around both the taking of the block and the encryption.
  Build it, time it, and say what the threads are doing in it.
* Say what would go wrong, and how often, if only the write of `next` were locked and the read were not.
