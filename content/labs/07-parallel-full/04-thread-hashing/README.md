# Exercise: Hashing Files With Several Threads

**Tools:** GCC, Make, md5sum, time

## Goal

Reference implementation of the multi-threaded hasher.
The same list of files as in the previous exercise is hashed by one thread per file, each calling a function that computes MD5; the threads leave their results in memory and the main thread prints them, in the order of the list.

## Background

`md5.c` is an implementation of MD5 from RFC 1321, and `md5_file()` is the `md5sum` program as a function:

```C
int md5_file(const char *path, char hex[MD5_HEX_LEN]);
```

A function can be called by several threads at the same time when it keeps its state to itself, and this one does.
The state of a computation is a `struct md5_ctx`, a local variable of `md5_file()`; the 64 KiB read buffer is a local too; the result goes into the caller's `hex`.
The only global data in `md5.c` are two tables of constants, which are never written.
Sixteen threads inside `md5_file()` have sixteen contexts and sixteen buffers, on sixteen stacks.

The sequential program is a loop in `main()` that hashes and prints one file after another.

Files:

* `hash_files.c` — the solution.
* `md5.c`, `md5.h` — MD5, unchanged from the skeleton.
* `gen_files.sh` — the same generator as in `03-process-hashing`.
* `test.sh` — compares the output with `md5sum`'s, line for line, including files of awkward sizes.

## Build & Run

```console
make
./gen_files.sh
./hash_files files.txt
```

```text
16 files of 16 MiB in data/, listed in files.txt
c340b03e22fec2b99838bf79bce5bfd0  data/file-01.bin
c806eb39f05281d4248208e010e10331  data/file-02.bin
bb8f9d2b47555edfcbc9b61e24bbad91  data/file-03.bin
...
38dbd6ac9758c770c1394bd2e69b28aa  data/file-16.bin
16 files, 0 failed, 0.201 s
```

## Results and Explanations

### TODO 1 — the struct

```C
struct job {
	const char *path;	/* the file to hash                        */
	char hex[MD5_HEX_LEN];	/* its digest, written by the thread       */
	int failed;		/* non-zero if the file could not be read  */
};
```

One per file, in an array that `main()` owns: what goes in, and room for what comes out.
The array is `static` only because 256 of them are a little large for the stack.

### TODO 2 — the thread function

```C
static void *hash_job(void *arg)
{
	struct job *job = arg;

	job->failed = md5_file(job->path, job->hex) < 0;

	return NULL;
}
```

The thread writes two fields of its own job and nothing else.
No other thread has a pointer to that job, and the main thread does not look at it until the join.

### TODO 3 and 4 — start, join, print

```C
for (i = 0; i < nfiles; i++) {
	jobs[i].path = files[i];
	rc = pthread_create(&threads[i], NULL, hash_job, &jobs[i]);
	if (rc != 0) {
		fprintf(stderr, "pthread_create: %s\n", strerror(rc));
		break;
	}
}
nfiles = i;

failed = 0;
for (i = 0; i < nfiles; i++) {
	pthread_join(threads[i], NULL);
	if (jobs[i].failed)
		failed++;
	else
		printf("%s  %s\n", jobs[i].hex, jobs[i].path);
}
```

The same two loops as with processes: `pthread_create()` where `fork()` and `exec()` were, `pthread_join()` where `waitpid()` was.
A join inside the first loop would make it sequential, exactly as a `waitpid()` there did.

The printing is in the second loop, in the main thread, after the join of the thread whose result it is.
That is what puts the lines in list order: the threads finish in any order, and the main thread goes through them in its own.
The output is `md5sum`'s, line for line, with no `sort`:

```console
./hash_files files.txt 2> /dev/null | diff - <(md5sum $(cat files.txt))
```

### No mutex

Sixteen threads, all writing, and no lock.

* The files are only read.
* Each `md5_file()` call works in its own locals.
* Each thread writes its own `struct job`.
* The main thread reads a job only after joining its thread.

Nothing is written by two threads, and nothing is read by one thread while another may be writing it.
Printing from the threads would not break this either, since `printf()` locks the stream for the length of one call, but the order would be lost.

### Processes and threads, side by side

| | `03-process-hashing` | `04-thread-hashing` |
| --- | --- | --- |
| A worker is started by | `fork()` and `exec()` | `pthread_create()` |
| It is waited for by | `waitpid()` | `pthread_join()` |
| It gets its work as | an argument on a command line | a pointer to a struct |
| It hands back | an exit status, 8 bits | anything, through shared memory |
| The output is printed by | each child, in finishing order | the main thread, in list order |
| A worker that crashes | takes down itself | takes down every thread |
| The code that does the work | any program | a function linked into this one |

### The measurements

| Version | Time |
| --- | --- |
| Sequential loop, `md5_file()` | 0.98 s |
| One thread per file | 0.20 s |
| `md5sum`, one process, all files | 0.32 s |
| One `md5sum` process per file | 0.047 s |

The threads make this program 4.9 times faster than its sequential self, on 6 cores, with 16 threads sharing them.

The processes of the previous exercise are four times faster still, and that has nothing to do with processes.
One 16 MiB file takes `md5_file()` 0.061 s and `md5sum` 0.021 s: the system's `md5sum` is compiled with optimization and its MD5 is written for speed, and `md5.c` is a plain one built with `-g`.
The comparison between the two exercises is a comparison of two MD5 implementations.
What can be compared is the speed-up of each over its own sequential version, 4.9 and 7.4, and those are the same story.

## References

* `man 3 pthread_create`, `man 3 pthread_join`
* RFC 1321, *The MD5 Message-Digest Algorithm*
* `man 1 md5sum`
