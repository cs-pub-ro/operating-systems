# Zero-Copy

Imagine a server that responds with files that it stores locally.
Its actions would be those highlighted in the image below:

1. Receive a new request and extract the filename
1. Read the filename from the disk into memory
1. Send the file from memory to the client

![Client-Server Steps](../media/client-server-file.svg)

[Quiz: How many copies does the OS make?](../drills/questions/server-copies.md)

As you might have guessed, 2 of these copies are useless.
Since the app doesn't modify the file, there's no need for it to store the file in its own buffer.
It would be more efficient to use **a single** kernel buffer as intermediate storage between the disk and the NIC (Network Interface Card), as shown in the image below.

![Server Copies - Zero-Copy](../media/server-copies-zero-copy.svg)

For an easier comparison with the "classic" `read()` + `send()` model, here's the first version again:

![Server Copies - Read-Send](../media/server-copies-normal.svg)

It should be obvious that the former approach is more efficient than the latter.

[Quiz: Almost zero copies](../drills/questions/fewer-than-2-copies.md)

These diagrams capture the essence of **zero-copy**: transferring data directly between kernel buffers, avoiding intermediate user-space buffers.
This approach is ideal for serving requests, whether forwarding data between clients or reading from disk.
It relies on the OS to retrieve and send data efficiently without extra copying steps.

## `sendfile()`

The syscall with which we can leverage **zero-copy** is called [`sendfile()`](https://man7.org/linux/man-pages/man2/sendfile.2.html).
Here are some practical examples on how to use it:

```c
// file to file
int in_fd = open("input_file.txt", O_RDONLY);  // src
int out_fd = open("output_socket", O_WRONLY);  // dst

ssize_t bytes_sent = sendfile(out_fd, in_fd, &offset, 4096); // Transfer 4096 bytes
if (bytes_sent < 0) {...} // handle error
```

```c
// file to network
int in_fd = open("input_file.txt", O_RDONLY);  // src
int sockfd = socket(AF_INET, SOCK_STREAM, 0);  // dst

int rc = connect(sock_fd, &server_addr, sizeof(server_addr));
if (rc < 0) {...} // handle error

ssize_t bytes_sent = sendfile(out_fd, in_fd, &offset, 4096); // Transfer 4096 bytes
if (bytes_sent < 0) {...} // handle error
```

You can read a slightly more detailed article about zero-copy [here](https://developer.ibm.com/articles/j-zerocopy/).
