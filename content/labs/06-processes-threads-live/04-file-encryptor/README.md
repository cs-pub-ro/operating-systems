# Exercise: Encrypting Files in Batches

**Tools:** GCC, Make

## Goal

Encrypt a directory of files with several threads, each thread taking a batch of files.
Afterwards you will be able to divide an array of work items between threads, hand each thread its share through a struct, and wait for all of them.

## Background

The cipher is XOR with a key: every byte of the file is XORed with a byte of the key, the key repeated as often as needed.
XOR undoes itself, so running the program twice with the same key gives the original file back, which is also how you will check your work.

Each file is mapped into memory with `MAP_SHARED`, so that writing to the mapping writes to the file, XORed in place, and unmapped.
The three functions that do this, `map_file()`, `xor_buffer()` and `unmap_file()`, are written; you call them.

The files come from the command line, which means the shell lists them for you:

```console
./encryptor secret 8 data/*.bin
```

`argv[3]` onwards are the file names, 64 of them, and `8` is the batch size: 64 files in batches of 8 means 8 threads, thread *i* taking files 8*i* to 8*i* + 7.
Each thread gets a `struct batch` saying where its files start, how many there are, and the key.
No two batches share a file, so no two threads ever write the same memory.

For now the number of files has to be a multiple of the batch size, and the program refuses otherwise; the first bonus exercise lifts that.

## Your Task

Open `encryptor.c` and complete the four TODOs.

1. **`encrypt_batch()`** — for every file in the batch: map, XOR, unmap.
   A file that cannot be mapped has been reported already; go on with the next.
1. **The batches** — fill in one `struct batch` per thread, each pointing at its own slice of the file name array.
1. **Start** one thread per batch.
1. **Wait** for all of them.

## Build & Run

```console
make
./gen_files.sh
./encryptor secret 8 data/*.bin
```

`gen_files.sh` creates 64 files of random bytes under `data/`, and an untouched copy of each under `data.orig/`.
Run it again whenever you want fresh files.

## Check Your Work

* Each thread prints the first and last file of its batch.
  Check that every file is in exactly one batch and that the batches do not overlap, with batch sizes 8, 16, 1 and 64.
* After **one** pass, every file must differ from its copy in `data.orig/`.
  `cmp` says whether two files differ; a loop over `data/*` finds a file that is still equal to its copy, and such a file was in nobody's batch.
* After a **second** pass with the same key, `diff -r data data.orig` must print nothing.
  Think about why this check alone is not enough, and why the first one is needed.
* Encrypt with one key and "decrypt" with another.
  Then work out what sequence of runs brings the files back.
* Run with `strace -f -e trace=clone3,openat` and 4 batches: count the threads, and check that every file is opened exactly once.
