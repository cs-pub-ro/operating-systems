# UNIX Socket Communication

Navigate to `unix-socket/` directory of the extracted archive (or `chapters/io/ipc/drills/tasks/unix-socket` if you are working directly in the repository).
Run `make` and then enter `support/` folder and go through the practice items below.
In this exercise, you'll implement client-server communication between two processes using **UNIX sockets**.
Both the sender and receiver are created from the same binary: run without arguments for a receiver, or with `-s` for a sender.

1. Complete the TODOs in the `sender_loop()`.
   You need to verify whether the socket exists i.e. check if the receiver has created it.
   Next, **create** your own socket and **connect** to the receiver's socket using its address (**Hint:** use `get_sockaddr(<path>` to obtain it).
   Once the connection is established, you can send messages using [`send()`](https://man7.org/linux/man-pages/man2/send.2.html).

1. Complete the TODOs in the `receiver_loop()`.
   Similarly, you will need to **create** a socket and **bind** it to the receiver's address (**Hint:** use `get_sockaddr(<path>` for this).
   Instead of connecting, you will **listen** for and **accept** incoming connections.
   When [`accept()`](https://man7.org/linux/man-pages/man2/accept.2.html) receives a connection request, it will return a new socket file descriptor that you can use to receive messages via [`recv()`](https://man7.org/linux/man-pages/man2/recv.2.html).
   All sockets should be closed after their designated task has been completed.

1. Inside the `tests/` directory, you will need to run `checker.sh`.
   The output for a successful implementation should look like this:

```bash
./checker.sh
Test for socket creation: PASSED
Test for send and receive: PASSED
```

If you're having difficulties solving this exercise, go through [this reading material](../../../reading/unix-sockets.md).
