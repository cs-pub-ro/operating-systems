# Async Server

Navigate to `async-server` directory of the extracted archive (or `chapters/io/optimizations/drills/tasks/async-server` if you are working directly in the repository) and run `make` to generate the `support` files.
Enter `support` and run `make test-file.txt` to generate the test file.

This task builds on the previous example of a [multiplexed client-server](../../tasks/multiplexed-client-server/README.md).
The server accepts connections from clients and downloads a file of `100MB` from each.
After uploading the file, the clients close the connection.

1. Look at the code in `support` and open `server.c` and complete the TODOs in the main function to setup IO multiplexing using [`epoll`](https://man7.org/linux/man-pages/man7/epoll.7.html).
   Use `epoll_create()`, `epoll_wait()`, and the wrappers defined in `w_epoll.h` to handle descriptors without blocking.
   **Remember** to remove the client sockets from the `epoll` instance before closing them.

   To test, run `./server` in one terminal and `./client` in another terminal.s
   If successful, the clients should print the upload progress.

   To run the checker, run `make check` from the `support` file.
   You may have to wait a little bit for the checker to be finish its execution.
   In case of the checker failing, check out client and server output in the `client_output.log`, `server_output.log` in the `support` file.

1. There is a problem with our current implementation.
   Try to start two clients at the same time - the first one will start uploading, and the second one will block at `connect()`.
   This happens because, even though we are multiplexing file descriptors on the server-side, it is busy with another client.
   To account for this, complete the TODOs in `handle_client()` to serve each client on a different process.

   To test, start `python server.py` in one terminal and run your client implementation in two separate terminals.
   If successful, the clients should be able to upload at the same time.

If you're having difficulties solving this exercise, go through [Async I/O](../../../reading/async-io.md) and [I/O Multiplexing](../../../reading/io-multiplexing.md).
