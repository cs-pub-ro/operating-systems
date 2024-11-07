# Pipes

## Anonymous Pipes

In this session, we'll explore a new mean of Inter-Process Communication (IPC), namely **the pipes**.
Pipes are by no means something new, and you most probably played with them already in bash:

```bash
cat 'log_*.csv' | tr -s ' ' | cut -d ',' -f 2 | sort -u | head -n 10
```

Using pipes (denoted as `|` in the above example) enables linking the `stdout` and `stdin` of multiple processes.
The `stdout` of `cat` is the `stdin` of `tr`, whose `stdout` is the `stdin` of `cut` and so on.
This "chain" of commands looks like this:

![Piped Commands](../media/piped-commands.svg)

So here we have a **unidirectional** stream of data that starts from `cat`, is modified by each new command, and then is passed to the next one.
We can tell from the image above that the communication channel between any 2 adjacent commands allows one process to write to it while the other reads from it.
For example, there is no need for `cat` to read any of `tr`'s output, only vice versa.

In UNIX, the need for such a channel is fulfilled by the [`pipe()` syscall](https://man7.org/linux/man-pages/man2/pipe.2.html).
Imagine there's a literal pipe between any 2 adjacent commands in the image above, where data is what flows through this pipe **in only a single way**.

Such pipes are known as **anonymous pipes** because they don’t have identifiers.
They are created by a parent process, which shares them with its children.
Data written to an anonymous pipe is stored in a kernel-managed circular buffer, where it’s available for related-processes to read.

The following example showcases a typical workflow with anonymous pipes in Unix:

```c
#define EXIT_ON_COND(cond) do { if (cond) exit(EXIT_FAILURE); } while (0)

// pipe_fd[0] -> for reading
// pipe_fd[1] -> for writing
int pipe_fd[2];

EXIT_ON_COND(pipe(pipe_fd) < 0);    // Create the pipe

int pid = fork();                   // Fork to create a child process
EXIT_ON_COND(pid < 0);              // Check for fork() failure

if (pid == 0) {  // Child process
    EXIT_ON_COND(close(pipe_fd[0]) != 0);           // Close the read end
    EXIT_ON_COND(write(pipe_fd[1], "hi", 2) < 0);   // Write "hi" to the pipe
    EXIT_ON_COND(close(pipe_fd[1]) != 0);           // Close the write end
} else {          // Parent process
    char buf[BUFSIZ];

    EXIT_ON_COND(close(pipe_fd[1]) != 0);           // Close the write end
    ssize_t n = read(pipe_fd[0], buf, sizeof(buf)); // Read data from the pipe into buf
    EXIT_ON_COND(n < 0);                            // Check for read() failure

    buf[n] = '\0';                                  // Null-terminate the string
    printf("Received: %s\n", buf);                  // Output the received message
}
```

In summary, the process creates the pipe and then calls `fork()` to create a child process.
By default, the file descriptors created by `pipe()` are shared with the child because the *(file descriptor table)* is copied upon creation.
To better understand how this works, please refer to [this guide on the File Descriptor Table (FDT)](../../file-descriptors/guides/fd-table/README.md).

You can test your understanding of anonymous pipes by completing the [Anonymous Pipes Communication task](../drills/tasks/anon-pipes/README.md).

[Check your understanding by identifying the limitations of anonymous pipes](../drills/questions/anonymous-pipes-limitation.md)

## Named Pipes (FIFOs)

As we discussed, anonymous pipes are named so because they lack identifiers.
**Named pipes** address this limitation by creating a *special* file on disk that serves as an identifier for the pipe.

You might think that interacting with a file would result in a performance loss compared to anonymous pipes, but this is not the case.
The FIFO file acts merely as **a handler** within the filesystem, which is used to write data to a buffer inside the kernel.
This buffer is responsible for holding the data that is passed between processes, not the filesystem itself.

Keep in mind that reading from and writing to a FIFO is not the same as interacting with a regular file - `read()` will block if the pipe is empty and will return `EOF` when the peer closes the pipe.

You can practice working with named pipes by completing the [Named Pipes Communication task](../drills/tasks/named-pipes/README.md).

## Redirections

Although not directly related, redirections (e.g., `ls > file.txt`) operate similarly to pipes.
A process creates a new file descriptor, updates its `stdout`, and then creates the child process.
You can explore the similarities with pipes further in [this guide on redirections](../guides/redirections/README.md).
