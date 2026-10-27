# Demo: Searching a File With Several Threads

**Tools:** GCC, Make, strace

## Goal

Start several threads inside one process, give each one its own part of a shared piece of memory, and wait for all of them.
Afterwards you will be able to use `pthread_create()` and `pthread_join()`, pass each thread its own work through a struct, and split a memory region between threads so that they never touch the same bytes.

## Background

A thread is a second flow of control inside a process: its own stack and its own place in the scheduler, but the same memory, the same open files, the same everything else.
Where `fork()` gives the new process a copy of the memory, `pthread_create()` gives the new thread the memory itself.
That is what makes threads cheap to start and easy to hand data to, and what makes them dangerous: two threads writing the same variable at the same time is a race, and the tools for that are session 08's.

This session avoids races by construction: **every thread works on memory that no other thread touches**.
The file is mapped once, read-only, and cut into `nthreads` parts; thread *i* reads bytes `[i * chunk, (i + 1) * chunk)` and nothing else, and reports through its own `struct region`.

```C
struct region {
	int id;			/* thread number, for the messages         */
	const char *start;	/* first byte of this thread's part        */
	size_t len;		/* how many bytes it covers                */
	const char *needle;	/* the word to look for                    */
};
```

```C
int pthread_create(pthread_t *thread, const pthread_attr_t *attr,
		   void *(*start_routine)(void *), void *arg);
int pthread_join(pthread_t thread, void **retval);
```

`pthread_create()` starts `start_routine(arg)` in a new thread and stores the thread's handle in `*thread`.
The routine takes one `void *` and returns one, which is how a thread gets its work and hands back its result: `arg` points at the thread's region.
`pthread_join()` blocks until the thread returns, the way `waitpid()` blocks until a child exits.

Files:

* `search.c` — the search, with the three TODOs filled in.
* `gen_text.c` — writes a file of random words to search in; `kernel` is one of them.

## Build & Run

```console
make
./gen_text big.txt 64
./search big.txt kernel 1
./search big.txt kernel 4
```

```text
wrote 67108864 bytes to big.txt
thread 0: 569022 matches in 67108864 bytes
thread 1: 142728 matches in 16777216 bytes
thread 3: 141864 matches in 16777216 bytes
thread 2: 142232 matches in 16777216 bytes
thread 0: 142195 matches in 16777216 bytes
```

`grep -o kernel big.txt | wc -l` says 569,022.
The four threads above add up to 569,019.
Three matches went missing, one per boundary between parts; the second exercise is about them.

## Results and Explanations

### Step 1 — cut the file into regions

```C
chunk = size / nthreads;
for (i = 0; i < nthreads; i++) {
	regions[i].id = i;
	regions[i].start = data + (size_t) i * chunk;
	regions[i].len = (i == nthreads - 1) ? size - (size_t) i * chunk : chunk;
	regions[i].needle = needle;
}
```

Integer division leaves a remainder when `size` is not a multiple of `nthreads`, and the last region takes it: its length is "everything from my start to the end" rather than `chunk`.
Written as `chunk` for every region, up to `nthreads - 1` bytes at the end of the file are never searched, and nothing reports it.

The regions are an array in `main()`, one element per thread, filled in before any thread starts.
Each thread gets a pointer to its own element and reads only that.

### Step 2 — start the threads

```C
for (i = 0; i < nthreads; i++) {
	rc = pthread_create(&threads[i], NULL, search_region, &regions[i]);
	if (rc != 0) {
		fprintf(stderr, "pthread_create: %s\n", strerror(rc));
		return 1;
	}
}
```

The argument is `&regions[i]`, the address of this thread's element, not `&regions` or the loop variable.
Passing `&i` is the classic mistake: every thread would read `i` through the same pointer, after the loop has moved on.

Unlike most system calls, the pthread functions return the error number rather than setting `errno`, so the check is `rc != 0` and the message comes from `strerror(rc)`.

### Step 3 — wait for them

```C
for (i = 0; i < nthreads; i++)
	pthread_join(threads[i], NULL);
```

`main()` returning ends the process, threads included, whether or not they are done.
Joining is what keeps the process alive until the last thread has reported.
The order of the joins does not matter: a thread that finished early waits, as a zombie thread, until it is joined.

### The order of the output

```text
thread 1: 142728 matches in 16777216 bytes
thread 3: 141864 matches in 16777216 bytes
thread 2: 142232 matches in 16777216 bytes
thread 0: 142195 matches in 16777216 bytes
```

Thread 0 was started first and reported last.
Once started, the threads are scheduled independently, on different cores if there are any, and nothing in the program says who finishes first.
The output is the only shared thing here, and `printf()` keeps whole lines together, so the lines are intact and their order is not.
Any program that needs the results in order has to collect them in order, which is what the second exercise does.

### What the kernel saw

```console
strace -f -e trace=mmap,clone3 ./search big.txt kernel 2
```

```text
mmap(NULL, 67108864, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7728d1800000
clone3({flags=CLONE_VM|CLONE_FS|CLONE_FILES|CLONE_SIGHAND|CLONE_THREAD|..., stack=0x7728d0fff000, stack_size=0x7fff80, ...}) = 74918
clone3({flags=CLONE_VM|CLONE_FS|CLONE_FILES|CLONE_SIGHAND|CLONE_THREAD|..., stack=0x7728d07fe000, stack_size=0x7fff80, ...}) = 74919
```

A thread is created by the same system call as a process, `clone`, with different flags: `CLONE_VM` shares the memory, `CLONE_FILES` the open files, `CLONE_THREAD` puts the new task in the same process.
`fork()` in the first demo was `clone()` with none of them.
Each thread gets its own stack, 8 MiB mapped by the C library before the call; the file mapping, 64 MiB, was made once and is shared.

## References

* `man 3 pthread_create`, `man 3 pthread_join`, `man 7 pthreads`
* `man 2 clone` — the flags that make a thread a thread
* `man 2 mmap` — mapping a file, as in session 03
