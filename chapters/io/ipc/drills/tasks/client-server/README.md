# Ordered Client-Server Communication

Navigate to `chapters/io/ipc/drills/tasks/client-server/` and run `make` to generate the `support` directory.
This exercise will guide you in creating a basic messaging protocol between a server and a client.
Although in real-world applications a server typically handles multiple connections at once, here we focus on a single connection.
Handling multiple connections is further explored in [I/O multiplexing](../../../../io-multiplexing/reading/io-multiplexing.md).

Our application protocol is defined as follows:

- The **server** listens for connections on **localhost** and a specified **port**.
- The **client** connects to `localhost:port`.
- The **client** sends a message, which the **server** then prints, responds to, and the **client** prints the reply.
  This sequence repeats in a loop.
- The communication ends when either the **client** or the **server** sends the message `exit`.

Since we are blocking on `recv()`, the message order is fixed - the client **must** initiate communication.
In real-world applications, this constraint can be avoided with [I/O multiplexing](../../../../io-multiplexing/reading/io-multiplexing.md).

1. Open `support/client.c` and complete the TODOs to enable message exchange with the server.
   Test your client by running `python server.py` in one terminal and then `./client` in another.
   If correctly implemented, you should be able to exchange messages as outlined above.

   **Bonus Question:** Why is it OK for the client to be implemented in C while the server is implemented in Python?

1. Open `support/server.c` and complete the TODOs to enable message exchange with the client.
   Test your server by running `./server` in one terminal and then `python client.py` in another.
   If implemented correctly, you should be able to exchange messages as outlined above.

If you're having difficulties solving this exercise, go through [the sockets API](../../../reading/unix-sockets.md) and [the client-server model](../../../reading/client-server-model.md).
