# Going Further: XOR-Encrypt a File With a Fixed Key

Optional.

## Things to try

1. **Break your own cipher.**
   Encrypt 64 identical bytes (`head -c 64 /dev/zero > z; ./xor_encrypt z z.enc; xxd z.enc`) and look at the result.
   What does a run of identical plaintext reveal about the key?
1. **Recover the key from a known block.**
   Given the first 32 plaintext bytes and the ciphertext, compute `key[i] = plain[i] ^ cipher[i]`.
1. **Put the key in a file** and read it at start-up instead of hardcoding it.
   Its size is now only known at run time — this is the first thing in the session that genuinely needs `malloc`.
1. **Encrypt in place** with a single buffer, and decide when two buffers would actually be necessary.
1. **Change `BLOCK_SIZE`** to 4096 and time a large file. Is this a correctness change or a performance one?

## Questions to answer

* Why does this program need no `malloc`, when the file-copy demo's heap variant needed `malloc` and `free`?
* Where does the key live in memory, and where do the buffers live?
* What breaks if the loop uses `BLOCK_SIZE` instead of `n` on the last block, and for which inputs would you never notice?
* What happens if the input and output are the same file?

## Discussion points

* **Static allocation fits a fixed size.**
  No owner, no lifetime, no leak — the buffers come and go with the stack frame.
* **The last block is the bug magnet.**
  Process exactly the bytes you read, never the whole buffer.
* **Symmetric is convenient and weak.**
  The property that lets one program both encrypt and decrypt is the same one that leaks the key.
* **Sizing from data is what forces dynamic allocation** — which is exactly what the next exercise does.
