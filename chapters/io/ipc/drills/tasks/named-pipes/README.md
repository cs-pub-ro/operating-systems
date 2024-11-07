# Named Pipes Communication

Navigate to `chapters/io/ipc/drills/tasks/named-pipes` and run `make` to generate the `support` directory.
In this exercise, you'll implement client-server communication between two processes using a named pipe, also called **FIFO**.
Both the sender and receiver are created from the same binary: run without arguments for a receiver, or with `-s` for a sender.

1. Use the [`mkfifo()` syscall](https://man7.org/linux/man-pages/man3/mkfifo.3.html) to create a named pipe.
   If the FIFO already exists, use [`access()`](https://man7.org/linux/man-pages/man2/access.2.html) to check its permissions.
   If permissions are incorrect, or if it does not exist, recreate the FIFO.

1. Complete the TODOs in `receiver_loop()` and `sender_loop()` to enable communication.
   Ensure the FIFO is open before reading from or writing to it.
   Close the FIFO when you are done.

   **Bonus**: Run two receivers and a single sender in different terminals.
   You may notice some "strange" behavior due to how named pipes manage data with multiple readers.
   For more on this, see [this Stack Overflow thread](https://stackoverflow.com/a/69325284).
