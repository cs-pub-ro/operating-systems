# Going Further: XOR-Encrypt a File With a Fixed Key

## Things to try

1. **Break the cipher.**
   Encrypt a file that is 64 or more identical bytes (`head -c 64 /dev/zero > z; ./xor_encrypt z z.enc; xxd z.enc`).
   The ciphertext of a zero byte is `0 ^ key[i]`, so the key stream is printed straight out.
   What does that tell you about how much a repeating key hides?
1. **Recover the key from one known block.**
   If you know the first 32 plaintext bytes and have the ciphertext, `key[i] = plain[i] ^ cipher[i]`.
   Write a few lines that recover the key and decrypt the rest.
1. **Make the key length variable.**
   Change the key to a different length and index it with `key[i % keylen]` so it repeats across the block.
   Does anything about the allocation change? (It does not — the length is still a compile-time constant.)
1. **Move the key into a file.**
   Read the key from a key file at start-up instead of hardcoding it.
   Now the key's size is only known at run time: you need a buffer sized from the file, which is the first thing in this session that actually needs `malloc`. That is the bridge to `03-in-memory-db`.
1. **Encrypt in place with one buffer.**
   XOR `in_buf[i]` into itself and write `in_buf` back.
   Why is one buffer enough here, and when would you genuinely need two?
1. **Grow the block size** to 4096 and time a large file both ways.
   The block size is a performance knob, not a correctness one — as long as the key still covers a block.

## Questions to answer

* Why does this program need no `malloc` and no `free`, when the file-copy demo's `malloc` variant needed both?
* Where in the process image does the key live, and where do the buffers live? Why those places?
* What goes wrong if the encryption loop uses `BLOCK_SIZE` instead of `n` on the final block? For which inputs would you never notice?
* The program never checks that `in` and `out` are different files. What happens if they are the same? Should it care?
* Valgrind reports a few allocations even though your code calls no allocator. Whose are they?

## Discussion points

* **Static allocation is the right tool when the size is fixed.**
  A compile-time size means no owner, no lifetime, no leak — the buffers appear and vanish with the stack frame.
  Reaching for `malloc` here would add obligations the problem does not have.
* **The last block is where fixed-size buffer code goes wrong.**
  Processing exactly the bytes you read, never the whole buffer, is the habit to build.
* **XOR is symmetric, which is convenient and weak at the same time.**
  The same property that lets one program both encrypt and decrypt is why a repeating key leaks so much.
* **Sizing from data is what forces dynamic allocation.**
  Nothing here is sized from the input, which is exactly why nothing here is dynamic — and exactly what changes in the next exercise.

## References

* `man 3 fread`, `man 3 fwrite`, `man 3 fopen`
* [XOR cipher](https://en.wikipedia.org/wiki/XOR_cipher) — including why it is not secure
* `man 1 xxd` — reading binary output
