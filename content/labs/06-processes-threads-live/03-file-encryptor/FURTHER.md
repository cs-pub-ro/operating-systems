# Going Further: Encrypting Files in Batches

Optional.

## Things to try

1. **Put two threads on the same file**, on purpose: make two batches overlap by one file.
   Run a few times and compare the file with its copy after two passes.
   What can happen when two threads XOR the same bytes at the same time, and why does it not always happen?
1. **Make a file empty** (`: > data/file-01.bin`) and run.
   What does `map_file()` say, and what should a program do with an empty file?
1. **Drop the `MAP_SHARED`** in `map_file()` for `MAP_PRIVATE` and run.
   The thread writes, nobody complains, and the files are unchanged.
   Where did the writes go?
1. **Time batch sizes 64, 8 and 1** on the shipped files, with `time`.
   Then make the files ten times larger in `gen_files.sh` and time again.
1. **Replace the threads with processes**: `fork()` once per batch, each child encrypts its batch and exits, the parent waits for all.
   Nothing changes in the result.
   What is different about how the file names and the key reach each worker, and what would be different if the workers had to report something back?

## Questions to answer

* Thread *i* gets `files + i * batch_size`, a pointer into `argv`.
  Why is it safe for every thread to read `argv` at once?
* Why does each thread map its files one at a time, rather than all of its batch up front?
* A file is opened, mapped, and the descriptor is closed before the XOR starts.
  Why is the mapping still usable?
* The output says `thread 3: 8 files, data/file-25.bin .. data/file-32.bin`.
  Is that line printed before or after the files are encrypted, and does it matter?

## Discussion points

* **Work items, not bytes.**
  The search split a memory region; this splits an array of tasks.
  The shape is the same: a contiguous slice per thread, a struct describing it, disjoint by construction.
* **The partition is the correctness argument.**
  No two threads touch the same file, so no two threads touch the same memory, so there is nothing to lock.
  Break the partition and the program is wrong in a way that no test reliably shows.
* **A batch size is a knob.**
  One file per thread makes 64 threads for 64 files, which is more than the machine has cores; one batch makes one thread.
  Somewhere between is the right number, and it depends on the machine, which is why it is a parameter.

## References

* `man 2 mmap` — `MAP_SHARED` versus `MAP_PRIVATE`
* `man 3 pthread_create`, `man 3 pthread_join`
* `man 1 cmp`, `man 1 diff`
