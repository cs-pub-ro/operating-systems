# Exercise: Encrypting Files in Batches

**Tools:** GCC, Make

## Goal

Reference implementation of the batch encryptor.
A directory of files is XOR-encrypted in place by several threads, each thread taking a batch of files of equal size; the partition of files between threads is the whole exercise.

## Background

The two demos partitioned bytes: one thread per region of a mapping.
This exercise partitions an array of tasks: the file names, as the shell passed them in `argv`, and a thread takes a contiguous slice of that array.

```C
struct batch {
	int id;			/* thread number, for the messages         */
	char **files;		/* first file of the batch                 */
	size_t nfiles;		/* how many files it holds                 */
	const char *key;	/* the key to XOR each file with           */
};
```

`files` points into `argv`, which every thread can read because `main()` is still in it and nobody writes it.
With 64 files and a batch size of 8 there are 8 threads, and batch *i* is `files[8i]` to `files[8i + 7]`.

Each file is mapped with `PROT_READ | PROT_WRITE` and `MAP_SHARED`: the mapping *is* the file, a write to the memory is a write to the file, and `munmap()` is the end of the transaction.
`map_file()`, `xor_buffer()` and `unmap_file()` are given; the only thing about them that matters here is that each call works on one file, and no file is in two batches.

Files:

* `encryptor.c` — the solution.
* `gen_files.sh` — creates `data/`, 64 files of random bytes between 64 KiB and about 576 KiB, and `data.orig/`, a copy to compare against.

## Build & Run

```console
make
./gen_files.sh
./encryptor secret 8 data/*.bin
```

```text
64 files in data/, with a copy of each in data.orig/
thread 0: 8 files, data/file-01.bin .. data/file-08.bin
thread 4: 8 files, data/file-33.bin .. data/file-40.bin
thread 1: 8 files, data/file-09.bin .. data/file-16.bin
thread 2: 8 files, data/file-17.bin .. data/file-24.bin
thread 3: 8 files, data/file-25.bin .. data/file-32.bin
thread 5: 8 files, data/file-41.bin .. data/file-48.bin
thread 7: 8 files, data/file-57.bin .. data/file-64.bin
thread 6: 8 files, data/file-49.bin .. data/file-56.bin
64 files encrypted, 8 thread(s)
```

```console
diff -rq data data.orig | wc -l
./encryptor secret 8 data/*.bin > /dev/null
diff -r data data.orig && echo restored
```

```text
64
restored
```

Sixty-four files differ after one pass, none after two.

## Results and Explanations

### TODO 1 — the thread routine

```C
for (i = 0; i < b->nfiles; i++) {
	if (map_file(b->files[i], &data, &size) < 0)
		continue;
	xor_buffer(data, size, b->key);
	unmap_file(data, size);
}
```

One file at a time: map, XOR, unmap.
`data` and `size` are locals of the thread function, on the thread's own stack, so eight threads have eight of each.
A file that fails to map was reported by `map_file()`; the loop goes on, and the exit status does not say that anything went wrong, which a real tool would fix.

### TODO 2 — the batches

```C
for (i = 0; i < nthreads; i++) {
	batches[i].id = i;
	batches[i].files = files + (size_t) i * batch_size;
	batches[i].nfiles = batch_size;
	batches[i].key = key;
}
```

Pointer arithmetic on `argv`: batch *i* starts `i * batch_size` names in.
With `nfiles` a multiple of `batch_size`, every batch is full and the last one ends exactly at the last file; the first bonus exercise is what happens when it is not.

The check that refuses other inputs is up front, before any thread exists:

```C
if (nfiles % batch_size != 0) {
	fprintf(stderr, "%zu files do not split into batches of %zu\n", nfiles, batch_size);
	return 1;
}
```

### TODO 3 and 4 — start and wait

The same two loops as the demo, with `encrypt_batch` and `&batches[i]`.
Nothing is read from the batches after the joins, because the threads have nothing to report: the result is in the files.

### Why there is no race

Every thread writes memory, and a lot of it, which is new in this session.
It is still safe, for one reason: the sets of files are disjoint, so the mappings are disjoint, so no byte is written by two threads.
The partition is the proof, and it is worth stating that way, because the moment two batches overlap by one file the program is wrong in a way that only sometimes shows (`FURTHER.md`).

### What the kernel saw

```console
strace -f -e trace=clone3,openat,mmap,munmap ./encryptor secret 32 data/*.bin 2>&1 | grep 'data/\|clone3\|MAP_SHARED\|munmap'
```

```text
clone3({flags=CLONE_VM|CLONE_FS|CLONE_FILES|CLONE_SIGHAND|CLONE_THREAD|..., stack_size=0x7fff80, ...}) = 75121
[pid 75120] clone3({...}) = 75122
[pid 75121] openat(AT_FDCWD, "data/file-01.bin", O_RDWR) = 3
[pid 75122] openat(AT_FDCWD, "data/file-33.bin", O_RDWR) = 4
[pid 75121] mmap(NULL, 394944, PROT_READ|PROT_WRITE, MAP_SHARED, 3, 0) = ...
[pid 75122] mmap(NULL, 416960, PROT_READ|PROT_WRITE, MAP_SHARED, 4, 0) = ...
[pid 75121] munmap(0x70cf688f7000, 394944) = 0
[pid 75122] munmap(0x70cf68891000, 416960) = 0
[pid 75121] openat(AT_FDCWD, "data/file-02.bin", O_RDWR) = 3
```

Two threads, each walking its own half of the list, interleaved by the scheduler.
The descriptors are 3 and 4 because the file table is shared by the threads (`CLONE_FILES`), and each one closes its descriptor right after mapping.
The writes never appear: they are stores to memory, and the kernel writes the pages back to the file on its own schedule, or at the latest when the mapping goes away.

## References

* `man 2 mmap`, `man 2 munmap`, `man 2 msync` — `MAP_SHARED`, and when the file sees the writes
* `man 3 pthread_create`, `man 3 pthread_join`
* `man 1 cmp`, `man 1 diff`
