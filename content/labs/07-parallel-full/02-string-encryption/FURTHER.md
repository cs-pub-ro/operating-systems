# Going Further: Parallel String Encryption

With answers.

## Things to try

1. **Split the remainder fairly.**

   ```C
   chunk = size / nthreads;
   extra = size % nthreads;
   pos = 0;
   for (i = 0; i < nthreads; i++) {
   	parts[i].pos = pos;
   	parts[i].start = text + pos;
   	parts[i].len = chunk + ((size_t) i < extra ? 1 : 0);
   	parts[i].key = key;
   	pos += parts[i].len;
   }
   ```

   The first `size % nthreads` parts get one character more.
   The start of a part is now the sum of the lengths before it rather than `i * chunk`, which is the form to remember: a running position cannot leave a gap.
   For 256 MiB the difference in balance is nothing; for 10 items and 4 threads it is 2, 2, 2, 4 against 3, 3, 2, 2.
1. **Time the whole program.**

   1.36 s with one thread and 0.87 s with eight, where the encryption alone goes from 0.63 s to 0.14 s.
   The 0.73 s of filling, checking and decrypting are sequential.
   No number of threads brings `real` below 0.73 s.
1. **Parallelize the decryption too.**

   `real` drops by about the half second that the sequential decryption took, and what is left of the sequential part is the filling and the two comparisons.
   The check is weaker, though.
   If the encryption gets the key phase wrong and the decryption uses the same split and the same function, it gets it wrong in the same way and the round trip succeeds on ciphertext that no other program could decrypt.
   A check has to be independent of what it checks; the sequential decryption is.
1. **Ask for more parts than there are characters.**

   With 10 characters and 64 threads, `chunk` is 0: 63 threads get an empty part and do nothing, and the last gets all 10.
   The result is right and the program is sequential, with 63 threads created for nothing.
   A real program would cap the thread count at the number of items.
1. **Build with `-O2`.**

   0.62 s with one thread, the same as without optimization, which is unusual.
   The loop is dominated by `% klen`, an integer division by a value the compiler does not know, and a division takes tens of cycles however the code around it is compiled.
   Replace it with an index that wraps:

   ```C
   k = pos % klen;
   for (i = 0; i < len; i++) {
   	buf[i] ^= key[k];
   	if (++k == klen)
   		k = 0;
   }
   ```

   0.34 s unoptimized and 0.14 s with `-O2`, with one thread; 0.03 s with eight and `-O2`.
   Removing one division from the loop was worth more than four cores, and the two gains multiply.

## Questions to answer

* **Two threads write to the same array at the same time, and there is no race.
  What is the rule?**
  A race is two threads on the same memory location with at least one writing.
  The array is one object in C and many locations in memory; the threads write different ones.
* **Why is the key byte chosen by the position in the whole string?**
  So that the ciphertext does not depend on how the work was split.
  Otherwise whoever decrypts would have to know the thread count that was used to encrypt, and use the same.
* **The key is read by every thread.
  Does that need a lock?**
  No: nobody writes it while the threads run.
* **A key whose length divides the part size hides the mistake.
  What does that say about tests?**
  That round numbers are the worst test inputs, because they make remainders vanish.
  Sizes, counts and lengths that share no factors, such as 3 and 7 threads and a 6-character key, are the ones that find the boundary mistakes.

## Discussion points

* **Disjoint parts need no lock.**
  The partition is the synchronization: each thread owns its characters from the moment it starts until it is joined.
* **A parallel version has to give the sequential answer.**
  The same bytes, not an answer that is as good.
  A sequential reference to compare with is the cheapest test there is, which is why the program keeps one.
* **Offsets are where parallel programs go wrong.**
  The first byte, the last byte, the leftover bytes, and anything that depends on position: the key here, the matches across a cut in the search.
* **Make the loop fast before making it parallel.**
  Threads multiply whatever the loop costs, on every core.

## References

* `man 3 pthread_create`, `man 3 pthread_join`
* `man 1 time`
