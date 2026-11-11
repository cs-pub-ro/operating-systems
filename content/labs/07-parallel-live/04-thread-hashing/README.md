# Exercise: Hashing Files With Several Threads

**Tools:** GCC, Make, md5sum, time

## Goal

Hash the same list of files as in the previous exercise, with one thread per file and a function in place of the `md5sum` program.
Afterwards you will be able to give each thread a job and a place for its result, and say what threads make easy that processes do not, and the other way round.

## Background

`md5.c` implements MD5, and `md5_file()` is `md5sum` as a function: it hashes a whole file and stores the digest as 32 hex digits.

```C
int md5_file(const char *path, char hex[MD5_HEX_LEN]);
```

It returns 0, or -1 if the file cannot be read.
Everything it works with is in its own local variables and in the buffer the caller gives it, so two threads can be inside it at the same time, on two files, without knowing about each other.
You do not need to read `md5.c`.

`hash_files.c` reads the list, as before, and hashes the files one after another in a loop in `main()`: it is sequential, and correct.

A child process could say nothing to its parent beyond an exit status, which is why each `md5sum` printed its own line.
A thread shares its memory with the main thread, so it can **leave its result where the main thread will find it**, and the main thread can do all the printing.
As in session 06, a result written by one thread and read by the main thread only after the join needs no lock.

## Your Task

Run the sequential program first, and note the time.
Then open `hash_files.c` and complete the four TODOs.

1. **The struct** — one per file: what the thread is given, and what it leaves behind, including whether it failed.
1. **The thread function** — hash one file.
   It prints nothing.
1. **Start** one thread per file, all of them before any is waited for.
1. **Join** the threads and print the results, in the order of the list.
   Count the files that could not be hashed.

## Build & Run

```console
make
./gen_files.sh
./hash_files files.txt
```

`gen_files.sh` is the one of the previous exercise; copying `data/` and `files.txt` over works as well.

## Check Your Work

* The output must be what `md5sum` prints when run by hand on the same files, line for line.
  This time `sort` must not be needed; say why.
* A name in the list that is not a file must show in the summary and in the exit status, and the other files must still be hashed.
* Compare the time with the sequential version you started from, and work out the speed-up.
  Compare it with `nproc`, and with the number of files.
* Compare the time with `03-process-hashing` on the same files.
  The faster one is not faster because of processes or threads: find the real reason by timing one file with each.
* Print the line from inside the thread function instead, for a moment, and run a few times.
  Say what changed, and what did not go wrong that might have.
