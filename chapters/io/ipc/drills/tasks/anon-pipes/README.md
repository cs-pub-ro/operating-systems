# Anonymous Pipes Communication

Navigate to `chapters/io/ipc/drills/tasks/anon-pipes` and run `make` to generate the `support/` folder.
In this exercise, you'll implement client-server communication between a parent and a child process using an anonymous pipe.
The parent will act as the sender, while the child acts as the receiver, with both processes sharing messages through the pipe.
Since pipes are unidirectional, each process should close the end of the pipe it does not use.

1. Use the [`pipe()` syscall](https://man7.org/linux/man-pages/man7/pipe.7.html) to create the pipe.
   Remember, the first file descriptor (`fds[0]`) is the read end, and the second (`fds[1]`) is the write end, similar to how `stdin` and `stdout` are represented by file descriptors `0` and `1`.

   **Hint:** Use `exit` to end the program.

   [Quiz: Discover why you cannot use either end of the pipe for reading or writing](../../questions/pipe-ends.md)

1. Solve the TODOs in `parent_loop` and `child_loop` so that the application stops on `exit`.
   Ensure each process closes the its pipe end before exiting to prevent indefinite blocking.

   > Why is closing the pipe ends important?

   The child process checks for the end of communication by reading from the pipe and checking for `EOF`, which occurs when the write end is closed.
   Without closing the write end, the child will block indefinitely in `read()`.
   As for the parent, it will block indefinitely in `wait()`.
