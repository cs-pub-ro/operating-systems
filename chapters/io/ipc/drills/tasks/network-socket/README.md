# Network Socket Communication

Navigate to `chapters/io/ipc/drills/tasks/network-socket` and run `make` to generate the `support` directory.
In this exercise, you'll implement client-server communication between two processes using a **network socket**.
Both the sender and receiver are created from the same binary: run without arguments for a receiver, or with `-s` for a sender.

1. Complete the TODOs in the `sender_loop()` from `tcp_socket.c`.
   You need to verify whether the socket exists i.e. check if the receiver has created it.
   Next, **create** your own socket and **connect** to the receiver's socket using its address (**Hint:** use `get_sockaddr(<IP>, <PORT>)` to obtain it).
   Once the connection is established, you can send messages using `send()`.

1. Complete the TODOs in the `receiver_loop()` from `tcp_socket.c`.
   Similarly, you will need to **create** a socket and **bind** it to the receiver's address (**Hint:** use `get_sockaddr(<IP>, <PORT>)` for this).
   Instead of connecting, you will **listen** for and **accept** incoming connections.
   When `accept()` receives a connection request, it will return a new socket file descriptor that you can use to receive messages via `recv()`.

1. Now we’ll implement the same functionality using datagrams (`SOCK_DGRAM`).
   Open `udp_socket.c` and complete the TODOs for `sender_loop()` and `receiver_loop()` functions.
   The workflow is similar, but `listen()`, `accept()`, and `connect()` are not required for datagram sockets.

1. Inside the `tests/` directory, you will need to run `checker.sh`.
   The output for a successful implementation should look like this:

```bash
./checker.sh
Test for TCP state: PASSED
[Sender]: OS{Hello OS enjoyers!!}
[Sender]:
Test for TCP receiving the message: PASSED

Test for UDP state: PASSED
[Sender]: OS{Are you enjoying this lab?!}
[Sender]:
Test for UDP receiving the message: PASSED
```

If you're having difficulties solving this exercise, go through [this reading material](../../../reading/network-sockets.md).
