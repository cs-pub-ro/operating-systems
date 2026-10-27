# Going Further: The Last Batch Is Smaller

Optional.

## Things to try

1. **Spread the remainder instead.**
   With 57 files and 6 threads, give the first 3 threads 10 files and the other 3 nine, so that no thread is much shorter than the others.
   Write the formula for the first file and the size of batch *i*.
1. **Take the thread count instead of the batch size** on the command line, the way the search did, and compute the batch size from it.
   Which of the two interfaces is more natural for a user, and which for the program?
1. **Zero files**: run with a key and a batch size and no file names at all.
   What should happen, and what does?

## Questions to answer

* `(nfiles + batch_size - 1) / batch_size` rounds up.
  Why does it work, and what does it give for `nfiles == 0`?
* The last batch holds `nfiles - i * batch_size` files, but only if that is less than `batch_size`.
  What goes wrong if the `min` is left out?
* With 57 files and batches of 10, one thread does 7 files' worth of work and five do 10.
  Does that matter, and when would it?

## Discussion points

* **The remainder is where off-by-one bugs live.**
  Every partition of *n* items into *k* parts has a last part that is different, and the code for it is the code that gets tested least.
* **Round up, then clamp.**
  The number of parts is a ceiling; the size of the last part is a minimum.
  Both are one line, and both are wrong at least once in every programmer's life.

## References

* `man 3 pthread_create`, `man 3 pthread_join`
