# Unix Sockets

Unix sockets are a inter-process communication (IPC) method that addresses some limitations of [pipes](../reading/pipes.md).
Their key characteristics are:

- **Bidirectional communication**: Allowing both `send` and `receive` operations through the same file descriptor.
- **Data transmission modes**: Supporting both `stream` (continuous data flow) and `datagram` (message-based) models.
- **Connection-based**: Maintaining a connection between processes, so the sender's identity is always known.

## API - Hail Berkeley Sockets

Unix sockets are managed through the [Berkeley Sockets API](https://en.wikipedia.org/wiki/Berkeley_sockets), which is widely supported across various operating systems and programming languages.
This API is not limited to **Unix sockets**; it also enables communication with processes on remote systems using [**network sockets**](../../ipc/reading/network-sockets.md)

The socket interface works similarly to the file interface, offering system calls for creating, reading, and writing data.
It also includes additional calls for setting up addresses, handling connections, and connecting to remote hosts:

- **[`socket(domain, type, protocol)`](https://man7.org/linux/man-pages/man2/socket.2.html)**: Creates a new socket and returns a file descriptor for further operations.
  - The `domain` argument determines whether the socket is intended for **local connections** (Unix socket) or **remote connections** (network socket).
  - The `type` argument specifies the communication mode, either `SOCK_STREAM` for stream-oriented communication or `SOCK_DGRAM` for datagram-oriented communication.
  - The `protocol` argument indicates the protocol to use, which is often set to `0`, as there is typically only one protocol available for each socket type within a specific protocol family.
- **[`bind()`](https://man7.org/linux/man-pages/man2/bind.2.html)**: Associates an address and port with the socket.
  For Unix sockets, `bind()` also creates a file on disk as the socket identifier.
- **[`listen()`](https://man7.org/linux/man-pages/man2/listen.2.html)**: Sets the socket to passive mode, preparing it to accept incoming connections.
- **[`accept()`](https://man7.org/linux/man-pages/man2/accept.2.html)**: Accepts a pending connection and returns a new socket for it, blocking if no connections are pending.
- **[`connect()`](https://man7.org/linux/man-pages/man2/connect.2.html)**: Initiates a connection to a remote socket.
- **[`send()` / `sendto()`](https://man7.org/linux/man-pages/man2/send.2.html)**: Sends data over the socket, similar to [`write()`](https://man7.org/linux/man-pages/man2/write.2.html).
- **[`recv()` / `recvfrom()`](https://man7.org/linux/man-pages/man2/recv.2.html)**: Receives data from the socket, akin to [`read()`](https://man7.org/linux/man-pages/man2/read.2.html).

Before utilizing the API, it's essential to understand that for two processes to communicate, they need a way to identify the socket.
This identification method is similar to that used with named pipes, relying on a file identifier stored on disk.
If the file identifier does not already exist, it will be created by the `bind()` function.
Below is an example of how to implement this in code:

```c
char path[] = "my-socket";
struct sockaddr_un addr;  // Structure to hold the address for the UNIX socket.

memset(&addr, 0, sizeof(addr));                   // Clear the address structure.
addr.sun_family = AF_UNIX;                        // Set the address family.
snprintf(addr.sun_path, sizeof(addr.sun_path), "%s", path); // Set the path.

sockfd = socket(PF_UNIX, SOCK_STREAM, 0);        // Create the socket.
if (sockfd < 0) {...} // handle error

rc = bind(sockfd, (struct sockaddr *) &addr, sizeof(addr)); // Bind the socket.
if (rc < 0) {...} // handle error
```

You can practice working with UNIX sockets by completing the [UNIX Sockets Communication task](../drills/tasks/unix-socket/README.md).
