# Client-Server Model

In our previous IPC examples, we used the terms **sender** and **receiver**.
In practice, these are commonly referred to as the **client** (sender) and **server** (receiver).
While the socket API provides the necessary tools for communication, it doesn’t define an actual communication protocol.
This is where an **application protocol** comes in (distinct from transport protocols like `UDP` and `TCP`).
An application protocol defines the rules and structure for how the communication should take place.
For example, in the [Network Sockets Communication task](../drills/tasks/network-socket/README.md), the **server** stops upon receiving the `exit` string from the **client**.

It’s important to keep in mind how the networking protocol impacts the design of each component:

- With **UDP** (`SOCK_DGRAM`), there is no active connection.
  The server simply waits for incoming messages and handles them as they arrive.
  Unlike TCP, UDP **does not guarantee message delivery** and messages may be lost during transmission.
  It is up to the **application** to manage these concerns.
  For example, a client might resend a request if it does not receive a response within 3 seconds.
- With **TCP** (`SOCK_STREAM`), a **connection is created and maintained** between the client and server.
  TCP guarantees that messages arrive in the correct order and will automatically resend data if network issues occur.

For a dive into how TCP and UDP are used in real-world scenarios checkout the [Networking 101 guide](../guides/networking-101/README.md).

## Client-Server UDP

Setting up a UDP client-server communication is straightforward and lightweight.
A typical workflow for a UDP **server** involves:

- `socket(AF_INET, SOCK_DGRAM, 0)` - creating a UDP network socket.
- `bind(sockfd, &addr, sizeof(addr))` - binding the socket to an address with an `IP` and `port` for network sockets.
- `recvfrom(sockfd, buffer, BUFSIZ, 0, &caddr, &caddrlen);` - waiting for a message from the client.
  **Note:** The last two parameters are used to retrieve the client's address information.

The server requires `bind()` to assign a specific IP and port for listening, so clients know exactly where to connect.
For network clients, `bind()` is optional;
if the IP and port are not specified, they are automatically assigned.

The typical workflow for a UDP **client** comprises of the following steps:

- `socket(AF_INET, SOCK_DGRAM, 0)` - creating a UDP network socket
- `sendto(fd, buffer, BUFSIZ, 0, (struct sockaddr *)&svaddr, svaddrlen);` - sending a message to the server.

## Client-Server TCP

Setting up a TCP client-server communication involves a few more steps than UDP but remains relatively straightforward.
A typical workflow for a TCP **server** is as follows:

- `socket(AF_INET, SOCK_STREAM, 0)` - creating a TCP network socket.
- `bind(sockfd, &addr, sizeof(addr))` - binding the socket to an address with an `IP` and `port` for network sockets.
- `listen(sockfd, backlog)` - marking the socket as passive, ready to accept incoming connections.
  The `backlog` defines the maximum number of pending connections.
  This is usually set to the maximum number of clients you are expecting.
- `accept(sockfd, &client_addr, &client_len)` - accepting a new connection from a client and returning a new socket descriptor for communication.
  Keep in mind that the server will block until a connection arrives.
- Once the connection is accepted, you can communicate with the client using `send(sockfd, buffer, BUFSIZ, 0)` and `recv(sockfd, buffer, BUFSIZ, 0)`.

**Note:** The server requires `bind()` to specify a particular IP and port for listening.
This way, clients can connect to the correct address.
After binding, the server uses `listen()` to prepare for incoming connections and `accept()` to handle them.

On the **client** side, the typical workflow is:

- `socket(AF_INET, SOCK_STREAM, 0)` - creating a TCP network socket (also works for Unix sockets).
- `connect(sockfd, (struct sockaddr *)&svaddr, svaddrlen)` - connecting to the server using the server's `IP` and `port`.
  Unlike UDP, `connect()` is required to establish a connection to the server.
- Once connected, you can communicate with the server using `send(sockfd, buffer, BUFSIZ, 0)` and `recv(sockfd, buffer, BUFSIZ, 0)`.

Test your understanding by building a [sequential client-server communication](../drills/tasks/client-server/README.md).
