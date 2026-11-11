# Exercise: Hashing Files With Several Processes

**Tools:** GCC, Make, md5sum, time, strace

## Goal

Reference implementation of the multi-process hasher.
A list of file names is read, one `md5sum` child process is started per file, and only when all of them are running does the parent start waiting.

## Background

The shell of session 06 ran one command at a time: `fork()`, `exec()` in the child, `waitpid()` in the parent, and only then the next command.
The same three calls give parallelism when the wait is moved out of the loop: a child starts running the moment `fork()` returns, and the parent, instead of waiting for it, goes on to start the next.

The children are independent programs.
Each has its own memory, a copy of the parent's as it was at the `fork()`, replaced by `md5sum` at the `exec()`.
They share nothing that any of them writes, except the terminal, so there is nothing to lock.

Files:

* `hash_files.c` — the solution; reading the list is unchanged from the skeleton.
* `gen_files.sh` — writes 16 files of 16 MiB of random bytes under `data/`, and their names to `files.txt`.
* `test.sh` — compares the output with `md5sum`'s, and checks that a missing file is reported.

## Build & Run

```console
make
./gen_files.sh
./hash_files files.txt
```

```text
16 files of 16 MiB in data/, listed in files.txt
bb8f9d2b47555edfcbc9b61e24bbad91  data/file-03.bin
af24ad3a5ec26657f71e75689c701058  data/file-07.bin
3566bb0e2cd94009a899c5ecd7c52320  data/file-05.bin
c340b03e22fec2b99838bf79bce5bfd0  data/file-01.bin
...
38dbd6ac9758c770c1394bd2e69b28aa  data/file-16.bin
16 files, 0 failed, 0.047 s
```

The files are random, so the digests are different on every machine and after every `gen_files.sh`.

## Results and Explanations

### TODO 1 — start every child

```C
for (i = 0; i < nfiles; i++) {
	pids[i] = fork();
	if (pids[i] < 0) {
		perror("fork");
		break;
	}
	if (pids[i] == 0) {
		execlp("md5sum", "md5sum", files[i], (char *) NULL);
		/* Only reached if the exec failed. */
		perror("md5sum");
		_exit(127);
	}
}
nfiles = i;
```

`fork()` returns twice, and the two branches are the two processes.
The child becomes `md5sum <file>` and, if all goes well, never returns from `execlp()`.
The parent stores the PID and goes round the loop.

The two lines after `execlp()` matter more here than in the shell.
A child whose exec failed is a copy of the parent, in the middle of the parent's loop, with `i` at the value it had: without the `_exit()` it would go round the loop itself and fork children of its own, and each of those could do the same.

If a `fork()` fails, the loop stops and `nfiles` is cut down to the children that exist, so that the second loop waits for those and no others.

### TODO 2 — wait for every child

```C
failed = 0;
for (i = 0; i < nfiles; i++) {
	if (waitpid(pids[i], &status, 0) < 0) {
		perror("waitpid");
		failed++;
		continue;
	}
	if (!WIFEXITED(status) || WEXITSTATUS(status) != 0)
		failed++;
}
```

The children are waited for in the order they were started, which is not the order they finish in.
That costs nothing: a child that ends early stays as a zombie, holding only its exit status, until its `waitpid()` comes, and the loop ends when the slowest child has ended, whichever it is.

A child counts as failed if it was killed by a signal or exited with a status other than 0.
`md5sum` exits with 1 for a file it cannot read:

```text
md5sum: data/no-such-file.bin: No such file or directory
17 files, 1 failed, 0.043 s
```

### Where the wait is

With the `waitpid()` inside the first loop, right after the `fork()`, the output is the same and the program is the shell of session 06: one child at a time.

| Version | Time | `strace -e trace=clone,wait4` |
| --- | --- | --- |
| Wait inside the fork loop | 0.350 s | `clone`, `wait4`, `clone`, `wait4`, ... |
| Fork loop, then wait loop | 0.047 s | 16 × `clone`, then 16 × `wait4` |

Sixteen processes are created in both, and each does the same work.
In the first they exist one after another; in the second, all at once, on 12 processors.
The parallelism is not in any call: it is in the fact that the parent did not wait.

The speed-up is 7.4, a little better than the threads of the earlier exercises reached on the same machine, and for the same reason it stops there: 16 processes on 6 cores.

### The order of the output

The lines come out in a different order on every run, and that order is the order in which the children finished.
Each child writes its own line to the standard output it inherited; the parent never sees the digests and cannot put them in order.
To compare with `md5sum` run by hand, sort both:

```console
./hash_files files.txt 2> /dev/null | sort > parallel.txt
md5sum $(cat files.txt) | sort > reference.txt
diff parallel.txt reference.txt
```

No line is ever cut in two by another, with no lock anywhere.
`md5sum` writes each line with a single `write()` system call, and the kernel does not interleave the bytes of two `write()` calls on the same terminal.

### What the kernel saw

```console
strace -f -c -e trace=clone,execve,wait4 ./hash_files files.txt > /dev/null
```

Sixteen `clone` calls, one per `fork()`.
Many more `execve` calls than files, most of them failed: `execlp()` tries `md5sum` in every directory of `PATH` until one works.

## References

* `man 2 fork`, `man 3 exec`, `man 2 waitpid`, `man 2 _exit`
* `man 1 md5sum`
* `man 1 strace` — `-f`, `-c`, `-e trace=`
