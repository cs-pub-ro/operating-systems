# Demo: Moving Work into the Kernel with `sendfile()`

Two servers send the same ten-megabyte file to a client.
One reads it into a user-space buffer and sends it back out; the other hands the whole job to the kernel with a single `sendfile()`.
The `sendfile()` server is two to three times faster.

## Goal

Show the second way to beat the cost of system calls from part 02: instead of crossing the boundary many times, cross it once and let the kernel do the whole operation.
Where buffering keeps the work in user space and batches the crossings, this pushes the work into the kernel and removes them.

## Background

`server_write.c` serves the file the obvious way: a loop that `read()`s a chunk into a stack buffer and `send()`s it to the socket.
Every chunk makes two system calls, and every byte is copied twice -- from the kernel's page cache into the user buffer, then from the user buffer back into the kernel's socket buffer.

`server_sendfile.c` replaces the whole loop with:

```c
sendfile(client_socket, fd, &offset, file_stat.st_size);
```

`sendfile()` tells the kernel "copy this file to this socket", and the kernel moves the data from the page cache to the socket without it ever entering user space.
One system call instead of thousands, and no bounce through a user buffer.

## Build and run

Build the three programs and create a test file:

```console
make
./create_file.sh        # writes a 10 MB example.dat
```

Start one server, then run the client a few times from another terminal:

```console
./server_sendfile       # or: ./server_write
```

```console
./client
```

## Results and explanations

```console
$ ./server_sendfile
Server listening on port 8080
Client connected
time passed 1818 microseconds
Sent 10485760 bytes
[...]

$ ./server_write
Server listening on port 8080
Client connected
time passed 5887 microseconds
[...]
```

Two to three times faster for the same ten megabytes delivered.
Two reasons, both about crossings and copies.

* **Far fewer system calls.**
  The write loop makes a `read` and a `send` per 1 KB chunk -- twenty thousand crossings for a 10 MB file.
  `sendfile` makes one.
  This is the part-02 cost again, at scale.
* **Fewer copies.**
  The write loop copies every byte into user space and straight back out.
  `sendfile` keeps the data in the kernel the whole way, so the CPU touches it less and the memory bandwidth is halved.

This is the mirror image of the buffering demo.
There, the win came from doing the crossings in bulk from user space; here, it comes from not bringing the data into user space at all.
Both are answers to the same question -- how do I pay the system-call tax less often? -- and which one applies depends on whether user space needs to see the bytes.
If the server had to compress or encrypt the file, `sendfile` would not apply, and buffering would be the tool.

## Going further

* Run `strace -c ./server_write` and `strace -c ./server_sendfile` against one client each and compare the `read`/`send` counts with the single `sendfile`.
* Grow `example.dat` to 100 MB and watch the ratio hold or widen; the copy cost grows with size, the single call does not.
* Read about `splice()` and `io_uring`, which generalise "let the kernel move data without user space" further; they are where high-performance servers go next.

## References

* `man 2 sendfile`, `man 2 splice`
* `man 2 read`, `man 2 send`
* [Zero-copy I/O overview](https://developer.ibm.com/articles/j-zerocopy/)
