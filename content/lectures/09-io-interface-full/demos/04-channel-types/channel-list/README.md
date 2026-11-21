# Demo: One Process, Every Kind of Channel

A program that opens a channel of every kind and prints its own file descriptor table.

## Goal

See that channels of very different kinds sit side by side in one table, under consecutive numbers, and tell them apart by what the kernel says about each.

## Background

`channels.c` opens, in this order:

* a regular file, its own source;
* a device, `/dev/null`;
* a pipe, which has two ends and so takes two entries;
* a FIFO, `fifo_channel`, created with `mkfifo()`;
* a Unix socket, bound to the path `socket_channel`;
* a TCP socket, listening on port 4242;
* a UDP socket, bound to port 4242.

For each entry it prints the type, taken from `fstat()`, and where the entry leads, taken from the link `/proc/self/fd/<N>`.
The column in the middle says how another process would get to the same thing.

If the standard input is a terminal, the program then waits for ENTER, so that it can be looked at from another terminal.

## Build and run

```console
make
./channels
```

While it waits, in another terminal:

```console
lsof -p $(pidof channels) -a -d 0-1023
ss -ltun | grep 4242
ls -l fifo_channel socket_channel
```

## Results and explanations

```text
$ ./channels
fd  type          found by others through  leads to
 0  char device   nothing: inherited       /dev/pts/10
 1  char device   nothing: inherited       /dev/pts/10
 2  char device   nothing: inherited       /dev/pts/10
 3  file          a path                   /home/student/[...]/channel-list/channels.c
 4  char device   a path                   /dev/null
 5  pipe / FIFO   nothing: inherited       pipe:[3693957]
 6  pipe / FIFO   nothing: inherited       pipe:[3693957]
 7  pipe / FIFO   a path                   /home/student/[...]/channel-list/fifo_channel
 8  socket        a path                   socket:[3693958]
 9  socket        TCP port 4242            socket:[3693959]
10  socket        UDP port 4242            socket:[3693960]

process 614984; press ENTER to end ...
```

Eleven entries, and four types as `fstat()` sees them: a file, a character device, a pipe or FIFO, a socket.

**Entries 3 and 4** lead to a path, and the path is all there is to say: anybody who knows it, and is allowed to, can open the same file or device.

**Entries 5 and 6** are the two ends of one pipe; the number in brackets is the same.
The pipe has no path and no port.
The kernel shows a name it made up, `pipe:[3693957]`, which cannot be opened.
The only way for another process to use this pipe is to be given the descriptors, and the usual way to be given them is to be a child of this process.

**Entry 7** is a pipe like the one above for the kernel, and the difference is the path: a FIFO is a pipe that another process can find.

**Entries 8, 9 and 10** all show as `socket:[...]`, and `/proc` does not say more.
`lsof` and `ss` do:

```text
$ lsof -p $(pidof channels) -a -d 8-10
COMMAND     PID    USER   FD   TYPE             DEVICE SIZE/OFF    NODE NAME
channels 614984 student    8u  unix 0x0000000000000000      0t0 3693958 socket_channel type=STREAM (UNCONNECTED)
channels 614984 student    9u  IPv4            3693959      0t0     TCP localhost:4242 (LISTEN)
channels 614984 student   10u  IPv4            3693960      0t0     UDP localhost:4242
```

The Unix socket is found through a path, as the FIFO is.
The two network sockets are found through a port number, and the same number, 4242, serves both, because TCP ports and UDP ports are counted separately.

So there are three ways for the second end of a channel to find the first: a name in the file system, a port, and inheritance.

Entries 0, 1 and 2 are in the third group, seen from the other side: this process did not open them, it was started with them.

## Going further

* Run `./channels < /dev/null > out.txt` and read `out.txt`.
  Which entries changed, and who changed them?
* While the program waits, run `ls -l fifo_channel socket_channel`.
  What is the first character of each line, and what is the size?
* Start a second `./channels` while the first waits.
  Which call fails, and why does the FIFO not cause the same problem?
* Add a call to `socketpair(AF_UNIX, SOCK_STREAM, 0, fds)` and show both descriptors.
  In which of the three groups does a socket pair belong?

## References

* `man 2 fstat`, `man 7 inode` for the file types
* `man 7 pipe`, `man 7 fifo`, `man 7 unix`, `man 7 ip`, `man 7 tcp`, `man 7 udp`
* `man 8 ss`, `man 8 lsof`
