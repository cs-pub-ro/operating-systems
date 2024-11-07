# Multiplexed Client Server

Navigate to `chapters/io/optimizations/drills/tasks/multiplexed-client-server` and run `make` to generate the `support` files.

This task builds on the previous implementation of a [client-server ordered communication](../../../../ipc/drills/tasks/client-server/README.md).
Previously, the client and server followed a strict, sequential communication pattern: each peer had to send a message and wait for a reply before proceeding.

We plan to build a group chat where clients can send messages at any time, and each message is broadcast to all other connected clients.
To accomplish this, we’ll implement I/O multiplexing mechanisms that notify us only when data is available on a file descriptor.
This non-blocking approach allows for smooth, unhindered communication between clients.

1. We’ll use the [`epoll`](https://man7.org/linux/man-pages/man7/epoll.7.html) interface to manage multiple file descriptors.
   Begin by opening `w_epoll.h` and completing the TODOs.
   We will define wrapper functions to **add** and **remove** file descriptors from the `epoll` instance, making the main code more readable.
   **Note:** Ensure that each wrapper returns the result of the `epoll_ctl()` for error handling.

1. Complete the TODOs in `support/client.c` to enable multiplexing of the available file descriptors.
   The file descriptors are `stdin` (for receiving user messages) and `sockfd` (for communication with the server).
   Use `epoll_create()`, `epoll_wait()`, and the wrappers defined in `w_epoll.h` to handle these descriptors without blocking.
   Remember to close the sockets before exiting.

   To test, start `python server.py` in one terminal and run your client implementation in two separate terminals.
   If successful, the clients should be able to communicate through the server.

1. Complete the TODOs in `support/server.c` to multiplex I/O with clients.
   You will need to create an `epoll` instance and dynamically **add** and **remove** clients as they connect and disconnect.
   Use `epoll_create()`, `epoll_wait()`, and the wrappers defined in `w_epoll.h` to achieve this functionality.
   **Remember** to remove the client sockets from the `epoll` instance before closing them.

   To test your implementation, run `./server` in one terminal and `./client` (or `python client.py`) in two separate terminals.
   If everything works correctly, the clients should be able to communicate with each other via the server.

If you're having difficulties solving this exercise, go through the `epoll` API from [I/O Multiplexing](../../../reading/io-multiplexing.md).
