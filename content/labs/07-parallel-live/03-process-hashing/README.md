# Exercise: Hashing Files With Several Processes

**Tools:** GCC, Make, md5sum, time, strace

## Goal

Hash a list of files at the same time, by running one `md5sum` process per file.
Afterwards you will be able to start several child processes that run in parallel, wait for all of them, and say what makes them run in parallel rather than one after another.

## Background

`md5sum` prints the MD5 digest of a file: 32 hex digits that change completely if one byte of the file does.
Hashing is pure computation on the bytes of the file, so hashing sixteen files is sixteen independent pieces of work.

`hash_files.c` reads a list of file names, one per line, into the array `files`; that part is written.
What is missing is running `md5sum` on each of them.

In session 06 the shell started a child and waited for it before reading the next command, so only one child existed at a time.
Here the parent must **start all the children first, and wait only after the last one is started**.
Between the two loops, all the children are running.

```C
pid_t fork(void);
int execlp(const char *file, const char *arg, ... /* (char *) NULL */);
pid_t waitpid(pid_t pid, int *status, int options);
```

`execlp()` looks the program up in `PATH` and takes its arguments one by one, ending with `(char *) NULL`; the first argument is the program's own name.
Each child writes its line to the terminal by itself, because it inherited the parent's standard output.

## Your Task

Open `hash_files.c` and complete the two TODOs.

1. **Start the children** — one loop over the files: `fork()`, and in the child `execlp()` to run `md5sum` on the file.
   Remember each child's PID in `pids`.
   A child whose `execlp()` fails must not go on to run the parent's loop.
1. **Wait for the children** — a second loop, after the first one has ended.
   A child that did not exit with status 0 counts as failed.

## Build & Run

```console
make
./gen_files.sh
./hash_files files.txt
```

`gen_files.sh` creates 16 files of 16 MiB of random bytes under `data/`, and `files.txt`, the list of their names.

## Check Your Work

* The lines must be the ones `md5sum` prints when run by hand on the same files.
  Compare the two outputs; you will need `sort`, and should be able to say why.
* Run it several times and look at the order of the lines.
* Add a name to `files.txt` that is not a file.
  The summary and the exit status of `hash_files` must say so, and the other files must still be hashed.
* Move the `waitpid()` into the first loop, on purpose, right after the `fork()`, and compare the time with the two-loop version.
  The same sixteen processes are created in both; say what is different.
* Run both versions under `strace -e trace=clone,wait4`, with the hashes sent to `/dev/null`, and read the order of the calls.
  `fork()` shows up as `clone`; count the children, and compare with `nproc`.
