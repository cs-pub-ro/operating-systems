# Demo: How Much I/O a Process Does

The counters the kernel keeps for every process, in `/proc/<PID>/io`: how many bytes went in and out, and how many system calls carried them.

## Goal

See that every process does I/O, that the kernel counts it, and that the busiest processes of a machine spend their lives moving bytes.

## Background

Lecture 07 read `/proc/<PID>/status` for the context switches of a process.
Next to it is [`/proc/<PID>/io`](https://man7.org/linux/man-pages/man5/proc_pid_io.5.html), with seven numbers.

| Field | Counts |
| --- | --- |
| `rchar` | bytes the process asked to read, through `read()` and its relatives, from anything: files, pipes, sockets, the terminal |
| `wchar` | bytes the process asked to write, the same way |
| `syscr` | read system calls |
| `syscw` | write system calls |
| `read_bytes` | bytes that really had to be fetched from a disk for this process |
| `write_bytes` | bytes this process caused to be sent to a disk |
| `cancelled_write_bytes` | bytes that were going to be written and were not, because the file was truncated or removed first |

`$$` is the PID of the shell you type in.

## Run

There is nothing to build.

```console
cat /proc/$$/io
cat /proc/$(ps -e -o pid= --sort rss | tail -1 | tr -d ' ')/io
```

The second command picks the process that uses the most memory, which on a desktop is usually a browser.
Use `sudo` if that process is not yours.

## Results and explanations

A shell that has been open for a few days:

```text
$ cat /proc/$$/io
rchar: 4260386
wchar: 103041
syscr: 5252
syscw: 912
read_bytes: 7839744
write_bytes: 8192
cancelled_write_bytes: 4096
```

The shell asked for 4.2 MB in 5,252 read calls, and wrote 103 KB in 912 calls.
A shell does little: it reads what you type and the files it needs to start programs, and it writes the prompt.

A browser on the same machine, running for the same few days:

```text
$ cat /proc/30237/io
rchar: 211950963437
wchar: 114331016605
syscr: 84654797
syscw: 74501807
read_bytes: 4407038976
write_bytes: 122696859648
cancelled_write_bytes: 47754326016
```

That is 211 GB read and 114 GB written, in 84 million read calls and 74 million write calls.
Over nine days it comes to about a hundred read calls and a hundred write calls every second, day and night.

Compare `rchar` with `read_bytes`: 211 GB asked for, 4.4 GB fetched from the disk.
The other 98% never touched the disk.
Part of it came from sockets and pipes, which have no disk behind them, and part came from files the kernel already had in memory, in the buffer cache of lecture 03.

A process that only computes exists in textbooks.
The ones on your machine read, compute a little, and write, and the reading and writing is what this lecture is about.

## Going further

* Run `cat /proc/self/io`.
  Whose counters are these, and why is `rchar` not zero?
* Write a file of 100 MB with `dd if=/dev/zero of=big bs=1M count=100`, then read it with `cat big > /dev/null` twice, looking at `read_bytes` of the shell's children with `/usr/bin/time -v`.
  Why does the second read fetch nothing from the disk?
* Find the process with the most write calls on your machine: `grep syscw /proc/[0-9]*/io 2>/dev/null | sort -t: -k3 -n | tail`.

## References

* `man 5 proc_pid_io`
* [The `/proc` file system](https://docs.kernel.org/filesystems/proc.html), section 3.3, in the kernel documentation
