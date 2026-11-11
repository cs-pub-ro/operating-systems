# Exercise: Parallel String Encryption

**Tools:** GCC, Make, time

## Goal

Turn a sequential encryption of a very long string into a parallel one, each thread encrypting its own part.
Afterwards you will be able to compute the offset and the length of each thread's part so that the parts cover the data exactly, and say why threads that write need no lock when their parts do not overlap.

## Background

The cipher is XOR with a repeating key: character *i* of the string is XORed with byte `i % klen` of the key.
XOR undoes itself, so encrypting twice with the same key gives the original string back.

`encrypt.c` fills a 256 MiB string, encrypts it with one call to `xor_buffer()` over all of it, and prints the time that took.
It takes a thread count and, for now, ignores it.

The program then checks itself: it decrypts the string with **one** call over all of it, the sequential way, and compares the result with the original.
`round trip: ok` therefore means that your threads, between them, produced exactly what the sequential encryption produces.
That part of `main()` is the reference; leave it sequential.

Unlike the search, the threads **write** to the string.
No mutex is needed, and none is to be used: think about what would have to be true of two threads' parts for one to be needed.

## Your Task

Run the sequential program first, and note the time.
Then open `encrypt.c` and complete the five TODOs.

1. **The struct** — what one thread needs to know about its part.
1. **`xor_buffer()`** — as written, it gives the first character of its buffer the first byte of the key.
   That is wrong for a part that starts in the middle of the string.
   Change it so that every character gets the key byte it would get in one pass over the whole string, and update the call that does the check.
1. **The thread function** — encrypt one part.
1. **The split** — an offset and a length per thread.
   No character may be left out and none encrypted twice, whatever the string's size and the thread count.
1. **Start** the threads and **join** them.

## Build & Run

```console
make
./encrypt secret 4
```

A third argument sets the size of the string in MiB; the default is 256.

## Check Your Work

* The round trip must succeed with 1, 2, 3, 4, 7, 8 and 64 threads.
  Which of these counts leave a remainder when the size is divided, and which of your lines deals with it?
* It must also succeed with keys of different lengths: `secret`, `k`, `abcd`.
* Undo your change to `xor_buffer()` for a moment, so that every part starts with the first byte of the key, and run with 4 threads and the key `secret`, then the key `abcd`.
  One of them fails and the other does not.
  Explain it, and say what it means for how you test a program like this one.
* Make two parts overlap by one character, on purpose.
  Say what the round trip reports, and whether a mutex around the call to `xor_buffer()` would fix it.
* Time 1, 2, 4, 8, 16 and 32 threads, and compare the speed-ups with the ones of the search.
