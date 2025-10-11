# Named Pipes Communication

Navigate to `named-pipes/` directory of the extracted archive (or `chapters/io/ipc/drills/tasks/named-pipes` if you are working directly in the repository).
Run `make` and then enter `support/` folder and go through the practice items below.
In this exercise, you'll implement client-server communication between two processes using a named pipe, also called **FIFO**.
Both the sender and receiver are created from the same binary: run without arguments for a receiver, or with `-s` for a sender.

1. Use [`access()`](https://man7.org/linux/man-pages/man2/access.2.html) to check if the FIFO already exists and has the right permissions.
   If it exists but has the wrong permissions, delete it using [`unlink()`](https://man7.org/linux/man-pages/man2/unlink.2.html).
   If it doesn't exist create it using [`mkfifo()`](https://man7.org/linux/man-pages/man3/mkfifo.3.html).

1. Complete the TODOs in `receiver_loop()` and `sender_loop()` to enable communication.
   Ensure the FIFO is open before reading from or writing to it.
   Close the FIFO when you are done.

   **Bonus**: Run two receivers and a single sender in different terminals.
   You may notice some "strange" behavior due to how named pipes manage data with multiple readers.
   For more on this, see [this Stack Overflow thread](https://stackoverflow.com/a/69325284).

1. Inside the `tests/` directory, you will need to run `checker.sh`.
   The output for a successful implementation should look like this:

```bash
./checker.sh
Test for FIFO creation: PASSED
Test for send and receive: PASSED
```
