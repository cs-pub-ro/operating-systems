# Bonus: The Last Batch Is Smaller

**Tools:** GCC, Make

## Goal

Reference solution for the encryptor that accepts any number of files.
57 files in batches of 10 are five full batches, one batch of 7, and six threads.

## Background

Two numbers change with respect to `03-file-encryptor`: the number of threads, which is now a ceiling rather than an exact quotient, and the size of the last batch, which is whatever the others left.
Everything else, the thread routine, the create and join loops, the partition into contiguous slices of `argv`, is unchanged.

Files:

* `encryptor.c` — the solution, `03-file-encryptor`'s with the two TODOs filled in.
* `gen_files.sh` — the same generator, defaulting to 57 files.

## Build & Run

```console
make
./gen_files.sh
./encryptor secret 10 data/*.bin
```

```text
57 files in data/, with a copy of each in data.orig/
thread 0: 10 files, data/file-01.bin .. data/file-10.bin
thread 1: 10 files, data/file-11.bin .. data/file-20.bin
thread 2: 10 files, data/file-21.bin .. data/file-30.bin
thread 3: 10 files, data/file-31.bin .. data/file-40.bin
thread 4: 10 files, data/file-41.bin .. data/file-50.bin
thread 5: 7 files, data/file-51.bin .. data/file-57.bin
57 files encrypted, 6 thread(s)
```

## Results and Explanations

### TODO 5 — the number of threads

```C
nthreads = (nfiles + batch_size - 1) / batch_size;
```

Integer division rounds down; adding `batch_size - 1` first makes it round up.
57 + 9 = 66, 66 / 10 = 6.
60 + 9 = 69, 69 / 10 = 6, so an exact multiple is not rounded up one too many.
3 + 9 = 12, 12 / 10 = 1, one thread for a batch of 3.

The check that refused other inputs is gone; the one against `MAX_THREADS` stays, and is now the only reason the program says no.

### TODO 6 — the size of the last batch

```C
for (i = 0; i < nthreads; i++) {
	size_t first = (size_t) i * batch_size;

	batches[i].id = i;
	batches[i].files = files + first;
	batches[i].nfiles = (nfiles - first < batch_size) ? nfiles - first : batch_size;
	batches[i].key = key;
}
```

"What is left" is `nfiles - first`, and a batch holds that or `batch_size`, whichever is smaller.
Written this way the formula is the same for every batch: for the full ones `nfiles - first` is at least `batch_size` and the minimum picks `batch_size`; for the last one it is 7.
No `if (i == nthreads - 1)`, and so no way for the last index to be computed wrong separately.

`nfiles - first` cannot underflow, because `first` is at most `(nthreads - 1) * batch_size`, which is below `nfiles` by the way `nthreads` was rounded.

### The checks

The one-pass check is what matters here: a bug in TODO 5 leaves the last 7 files in no batch, and they are unchanged after one pass and unchanged after two.
`diff -r` after two passes is satisfied by a program that encrypted nothing at all.

## References

* `man 3 pthread_create`, `man 3 pthread_join`
