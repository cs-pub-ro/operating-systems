# Asynchronous I/O

Asynchronous I/O (async I/O) provides an efficient way to handle input/output operations that are typically slower than CPU operations by allowing programs to continue executing while waiting for I/O operations to complete.
Here’s a breakdown of I/O operation types and how asynchronous I/O compares to synchronous operations:

1. **Synchronous Blocking Operation**:
   - This is the simplest and most common form of I/O (e.g., `read()` and `write()`).
   - It’s **synchronous**, meaning the program waits for a response to proceed.
   - It’s **blocking**, so if the requested data isn’t available (e.g., no data in the buffer for `read()`), the program waits for the operation to finish.

1. **Synchronous Non-blocking Operation**:
   - This gives more control, especially in situations where waiting isn’t ideal.
   - Opening a file using `open()` alongside `O_NONBLOCK` flag ensures the operation returns immediately instead of blocking.
   - If data isn’t available right away, the operation notifies the program, which can try again later, avoiding unnecessary waiting.

1. **Asynchronous Operation**:
   - Here, the function call returns immediately, allowing the program to continue **without waiting for the result**.
   - A notification or callback is sent when the operation completes, or the program can check its status periodically.

Keep in mind the async I/O is not the same thing as I/O multiplexing.
While both techniques improve I/O efficiency, they’re conceptually different:

- **Asynchronous I/O** schedules operations concurrently, allowing the program to proceed without blocking.
- [**I/O Multiplexing**](../reading/io-multiplexing.md) (e.g., `select()`, `poll()`, `epoll()`) monitors multiple channels simultaneously and informs the program when a channel has data ready.
  Blocking could still occur if the program cannot proceed without data from a channel.

Think of them as **complementary**: multiplexing helps monitor multiple channels, while async I/O allows the program to do other things while waiting.

There are several ways asynchronous I/O can be implemented in practice:

1. **Multiprocess Backend**: Each request runs in a **separate process**, isolating tasks and preventing blocking between them.

   ```c
   // Handle requests with processes
   void handle_client_proc(int client_sockfd) {
      pid_t pid = fork();
      if (pid < 0) // handle error

      if (pid == 0) {  // Child process: handle client connection
         close(server_sockfd);  // Close the server socket in the child

         {...}  // compute and send answer

         close(client_sockfd);  // Close client socket when done
         exit(0);              // Exit child process
      }

      close(client_sockfd);     // close client socket in parent
   }
   ```

1. **Multithreaded Backend**: Each request runs in a **separate thread**, allowing concurrent operations within the same process.

   ```c
   // Handle requests with threads
   void* handler(void* arg) {
      int client_sockfd = *(int*)arg;

      {...}                   // compute and send answer
      close(client_sockfd);   // Close client socket when done

      return NULL;
   }

   void handle_client_thread(int sockfd) {
      int *sockfd_p = malloc(sizeof(int));  // use the heap to pass the address
      *sockfd_p = sockfd;

      int rc = pthread_create(&thread_id, NULL, handler, client_sock_ptr);
      if (rc < 0)                 // handle error
      pthread_detach(thread_id);  // Let the thread clean up after itself
   }
   ```

1. **Event-based Backend**: An action is scheduled with a **callback**, which is invoked upon completion, using event loops to manage tasks.
  A callback is simply a function pointer, allowing the system to execute the function later or when a specific event is triggered.

Test your understanding by solving the [Async Server task](../drills/tasks/async-server/README.md).
