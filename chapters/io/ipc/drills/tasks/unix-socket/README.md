# UNIX Socket Communication

Navigate to `chapters/io/ipc/drills/tasks/unix-socket` and run `make` to generate the `support` directory.
In this exercise, you'll implement client-server communication between two processes using a **UNIX socket**.
Both the sender and receiver are created from the same binary: run without arguments for a receiver, or with `-s` for a sender.

1. Complete the TODOs in the `sender_loop()`.
   You need to verify whether the socket exists i.e. check if the receiver has created it.
   Next, **create** your own socket and **connect** to the receiver's socket using its address (**Hint:** use `get_sockaddr(<path>` to obtain it).
   Once the connection is established, you can send messages using `send()`.

1. Complete the TODOs in the `receiver_loop()`.
   Similarly, you will need to **create** a socket and **bind** it to the receiver's address (**Hint:** use `get_sockaddr(<path>` for this).
   Instead of connecting, you will **listen** for and **accept** incoming connections.
   When `accept()` receives a connection request, it will return a new socket file descriptor that you can use to receive messages via `recv()`.

If you're having difficulties solving this exercise, go through [this reading material](../../../reading/unix-sockets.md).
