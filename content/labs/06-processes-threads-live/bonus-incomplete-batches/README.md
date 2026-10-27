# Bonus: The Last Batch Is Smaller

**Tools:** GCC, Make

## Goal

Make the encryptor from `03-file-encryptor` accept any number of files: 57 files in batches of 10 are five full batches and one of 7, and six threads.
Afterwards you will be able to split *n* items into batches of *k* when *k* does not divide *n*, which is the usual case.

## Background

`03-file-encryptor` refused a file count that was not a multiple of the batch size.
The honest version rounds the number of threads up, and gives the last thread what is left.
Two things change, and nothing else: how many threads there are, and how many files the last batch has.

The shipped `encryptor.c` is the skeleton of `03-file-encryptor` with two TODOs added.
Start from your finished `encryptor.c` from that exercise, and copy the two new TODO comments into it, or paste your four finished pieces into the shipped file; either way, the first four TODOs are the ones you already did.

## Your Task

1. **TODO 5** — the number of threads: `nfiles / batch_size`, rounded *up*, in integer arithmetic.
   Think about what happens with 57 and 10, with 60 and 10, and with 3 and 10.
1. **TODO 6** — the size of each batch: `batch_size` for all but the last, and for the last, whatever is left.
   Write it so that it is right for every batch, not as a special case for the last index.

## Build & Run

```console
make
./gen_files.sh
./encryptor secret 10 data/*.bin
```

`gen_files.sh` here makes 57 files by default; `./gen_files.sh 64` makes 64, for the case the core exercise handled.

## Check Your Work

* Six threads, and the last one reports 7 files, `file-51.bin .. file-57.bin`.
* The same two checks as the core exercise: after one pass every file differs from its copy in `data.orig/`, after two passes `diff -r data data.orig` is silent.
  The file to watch is `file-57.bin`.
* Batch sizes 1, 7, 19, 56, 57 and 100 on the 57 files.
  Predict the number of threads and the size of the last batch for each before running.
* With `./gen_files.sh 64` and a batch size of 8, the program must behave exactly as the core exercise did: eight full batches, no extra thread.
