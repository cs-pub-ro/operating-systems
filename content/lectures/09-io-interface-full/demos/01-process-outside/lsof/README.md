# Demo: List Open Files

The I/O channels of a process, listed with [`lsof`](https://man7.org/linux/man-pages/man8/lsof.8.html): what a process is connected to, outside itself.

## Goal

See that a process has a list of channels to the outside, that each has a number, and that what is at the other end may be a terminal, a file, or another process.

## Background

`lsof` means *list open files*, and "file" is used loosely: it lists every I/O channel of a process.
It gets them from `/proc/<PID>/fd`, a directory in which the kernel shows one entry for each channel.

`-p <PID>` selects a process, `-d 0-1023` keeps only the numbered channels, and `-a` means that both conditions have to hold.

| Column | Meaning |
| --- | --- |
| `FD` | the number of the channel, followed by how it was opened: `r` for reading, `w` for writing, `u` for both |
| `TYPE` | what is at the other end: `REG` a regular file, `CHR` a character device, `FIFO` a pipe, `unix` and `IPv4` sockets |
| `NAME` | where it leads |

## Run

There is nothing to build.

```console
lsof -p $$ -a -d 0-1023
ls -l /proc/$$/fd
lsof -p $(ps -e -o pid= --sort rss | tail -1 | tr -d ' ') -a -d 0-1023
```

`lsof` is in the package of the same name; the second command needs nothing installed.

## Results and explanations

The shell:

```text
$ lsof -p $$ -a -d 0-1023
COMMAND  PID    USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
bash    8851 student    0u   CHR 136,10      0t0   13 /dev/pts/10
bash    8851 student    1u   CHR 136,10      0t0   13 /dev/pts/10
bash    8851 student    2u   CHR 136,10      0t0   13 /dev/pts/10
bash    8851 student  255u   CHR 136,10      0t0   13 /dev/pts/10
```

Channels 0, 1 and 2 are the standard input, the standard output and the standard error.
All three lead to `/dev/pts/10`, the terminal the shell runs in: a character device.
Channel 255 is a spare one that `bash` keeps for itself, to the same terminal.

The same, without `lsof`:

```text
$ ls -l /proc/$$/fd
lrwx------ 1 student student 64 Nov 21 18:58 0 -> /dev/pts/10
lrwx------ 1 student student 64 Nov 21 18:58 1 -> /dev/pts/10
lrwx------ 1 student student 64 Nov 21 18:58 2 -> /dev/pts/10
lrwx------ 1 student student 64 Nov 21 18:58 255 -> /dev/pts/10
```

A browser:

```text
$ lsof -p 30237 -a -d 0-1023
COMMAND   PID    USER   FD      TYPE             DEVICE SIZE/OFF     NODE NAME
chrome  30237 student    0r     FIFO               0,15      0t0   101662 pipe
chrome  30237 student    1u     unix 0x0000000000000000      0t0    40286 type=STREAM (CONNECTED)
chrome  30237 student    2u     unix 0x0000000000000000      0t0    25087 type=STREAM (CONNECTED)
chrome  30237 student    3r      REG               7,67 10824576      117 /snap/chromium/3590/usr/lib/chromium-browser/icudtl.dat
chrome  30237 student    5r      REG                0,1    65568     8240 /memfd:shared-memory-region (deleted)
chrome  30237 student    6u     unix 0x0000000000000000      0t0   107620 @55970 type=SEQPACKET (CONNECTED)
chrome  30237 student    9r     FIFO               0,15      0t0   107631 pipe
chrome  30237 student   10w     FIFO               0,15      0t0   107631 pipe
chrome  30237 student   13u  a_inode               0,16        0       70 [eventfd:57]
chrome  30237 student   16u     unix 0x0000000000000000      0t0   102635 /tmp/org.chromium.Chromium.8OnkrK/SingletonSocket type=STREAM (LISTEN)
chrome  30237 student   17r      REG               7,67   578344      113 /snap/chromium/3590/usr/lib/chromium-browser/chrome_100_percent.pak
chrome  30237 student   20r      REG               7,67 21523320      344 /snap/chromium/3590/usr/lib/chromium-browser/resources.pak
[...]
```

The browser has 1,022 channels open.
Counted by type:

| `TYPE` | Channels | The other end is |
| --- | ---: | --- |
| `REG` | 741 | a file on a disk |
| `sock`, `unix`, `IPv4`, `netlink` | 249 | another process, on this machine or elsewhere, or the kernel |
| `a_inode` | 24 | a kernel object used for waiting and notification |
| `FIFO` | 8 | another process, through a pipe |

Two things are worth seeing.

Its standard input is not a terminal.
Nobody types into a browser's standard input; it was started by the desktop, which gave it a pipe and two sockets where the shell has a terminal.
Channels 0, 1 and 2 are a convention about numbers, and what they lead to is decided by whoever started the process.

And the channels come in two kinds.
Three quarters lead to files: the data is there, waiting to be read.
A quarter lead to other processes: to the processes that draw each tab, to the display server, to web servers across the network.
The lecture calls the first kind file-like and the second socket-like.

## Going further

* Count the channels of every process you own: `for p in /proc/[0-9]*; do echo "$(ls $p/fd 2>/dev/null | wc -l) $(cat $p/comm 2>/dev/null)"; done | sort -n | tail`.
  Which programs have the most, and why those?
* Run `sleep 1000 < /dev/null > out.txt &` and list the channels of that `sleep`.
  Who decided what its channels 0 and 1 lead to?
* In the `lsof` output of the shell, `SIZE/OFF` shows `0t0` for the terminal.
  List a process that has a regular file open for writing, and see what the column shows.
* Read `/proc/$$/fdinfo/0`.
  What do `pos` and `flags` mean? Parts 05 and 06 of the lecture answer.

## References

* `man 8 lsof`
* `man 5 proc_pid_fd`, `man 5 proc_pid_fdinfo`
* `man 3 stdin`, on the three standard streams
