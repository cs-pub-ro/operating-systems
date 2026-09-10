# Exercise: XOR-Encrypt a File With a Fixed Key

**Tools:** GCC, Make

## Goal

Write a program that XOR-encrypts a file into another file, using a fixed 32-byte key and two fixed 32-byte buffers.
Afterwards you will be able to explain why this program needs no `malloc` at all — and what would have to change for it to need one.

## Background

XOR encryption walks a file byte by byte and replaces each byte `b` with `b ^ k`, where `k` comes from a repeating key.
Because XOR is its own inverse (`(b ^ k) ^ k == b`), the *same* program decrypts: run the ciphertext back through it with the same key and the original returns.

Every size in this task is known before the program runs — the key is 32 bytes, and the file is processed one 32-byte block at a time.
That is the whole point: a size fixed at compile time can live in a plain array, with no `malloc`, no `free`, and nothing that can leak.

Open `xor_encrypt.c`.
The key, the file opening/closing, and the read/write loop are already written; you fill in two TODOs.

## Your Task

1. **TODO 1** — declare the two work buffers, `in_buf` and `out_buf`.
   Each is exactly `BLOCK_SIZE` bytes of `unsigned char`.
   The size is a compile-time constant, so these are fixed-size arrays — do **not** use `malloc`.
1. **TODO 2** — encrypt the `n` bytes that were just read.
   For each byte `i` from `0` to `n - 1`, set `out_buf[i]` to `in_buf[i] ^ key[i]`.
   Encrypt exactly `n` bytes, not `BLOCK_SIZE`: the last block is usually shorter.

## Build & Run

```console
make
./xor_encrypt input.txt input.enc
```

The output is binary; read it with `xxd input.enc | head`, not a pager.
Decrypt by encrypting again, then compare:

```console
./xor_encrypt input.enc roundtrip.txt
diff input.txt roundtrip.txt
```

## Check Your Work

A correct program round-trips: encrypting `input.txt` and then encrypting the result must reproduce the original file exactly.

Try a few inputs of different lengths, including one whose size is **not** a multiple of 32, and an empty file.
The last block is where this kind of code usually breaks — reason about what your loop does when `n` is less than `BLOCK_SIZE`, and check the round-trip still holds.
Then look at the ciphertext with `xxd`: it should look like noise, with no trace of the original text.

Bring the following to the teaching assistant: why this program needs no `malloc`, and what single change to the *key* would force you to allocate memory at run time.
