# I/O Multiplexing

I/O multiplexing is the ability to serve multiple I/O channels (or anything that can be referenced via a file descriptor / handle) simultaneously.
If a given application, such a server, has multiple sockets on which it serves connection, it may be the case that operating on one socket blocks the server.
One solution is using asynchronous operations, with different backends.
The other solution is using I/O multiplexing.

The classical functions for I/O multiplexing are [`select`](https://man7.org/linux/man-pages/man2/select.2.html) and [`poll`](https://man7.org/linux/man-pages/man2/poll.2.html).
Due to several limitations, modern operating systems provide advanced (non-portable) variants to these:

* Windows provides [I/O completion ports (`IOCP`)](https://learn.microsoft.com/en-us/windows/win32/fileio/i-o-completion-ports).
* BSD provides [`kqueue`](https://www.freebsd.org/cgi/man.cgi?kqueue).
* Linux provides [`epoll()`](https://man7.org/linux/man-pages/man7/epoll.7.html).

> **Note** that I/O multiplexing is orthogonal to [asynchronous I/O](../reading/async-io.md).
  You could tie them together if the completion of the asynchronous operation sends a notification that can be handled via a file descriptor / handle.
  This is the case with Windows asynchronous I/O (called [overlapped I/O](https://learn.microsoft.com/en-us/windows/win32/fileio/synchronous-and-asynchronous-i-o)).

## The `epoll` API

The `epoll` API allows user-space programs to efficiently monitor multiple file descriptors and be notified when one of them has data to read.
It provides a powerful, event-driven interface concentrated in three primary functions:

* `int epoll_create1(int flags)`: Creates an `epoll` instance.
  The `flags` argument specifies additional options for the instance.
  The default value is `0`.
* `int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout)`: Waits for events on the monitored file descriptors.
  * `epfd`: The file descriptor returned by `epoll_create1()`.
  * `events`: An array of `struct epoll_event` that will store the events that have occurred.
  It only contains events that are ready (i.e., received data).
  * `maxevents`: The maximum number of events that can be stored in the `events` array.
  * `timeout`: The maximum time (in milliseconds) that `epoll_wait()` will block.
  A value of `-1` means it will block indefinitely.
* `int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event)`: Modifies the set of file descriptors monitored by `epoll`.
  * `epfd`: The file descriptor returned by `epoll_create1()`.
  * The `op` argument specifies the operation to perform, which can be:
    * `EPOLL_CTL_ADD`: Adds a file descriptor to the monitoring list.
    * `EPOLL_CTL_MOD`: Modifies an existing file descriptor’s event list.
    * `EPOLL_CTL_DEL`: Removes a file descriptor from the monitoring list.
  * The `fd` argument is the file descriptor to be added, modified, or removed.
  * The `event` argument is a pointer to a `struct epoll_event` that defines the events associated with the file descriptor.

The [`struct epoll_event`](https://man7.org/linux/man-pages/man3/epoll_event.3type.html) is the core structure used to interact with `epoll`.
It is used to return events to user space after `epoll_wait()` is called and to pass parameters to `epoll_ctl()` when modifying the set of monitored file descriptors.
While the internal workings of `epoll` are complex, understanding how to use these functions and structures will cover most use cases.

Here is an example demonstrating how to use the `epoll` interface:

```c
efd = epoll_create1(0)
if (efd < 0) {...} // handle error

// Add fd to monitored set
struct epoll_event ev;
ev.events = EPOLLIN;  // monitor fd for reading
ev.data.fd = fd;
rc = epoll_ctl(efd, EPOLL_CTL_ADD, fd, &ev);
if (rc < 0) {...} // handle error

struct epoll_event events[10];
n = epoll_wait(efd, events, 10, -1);  // Wait indefinitely
if (n < 0) {...} // handle error

// Iterate through the events to get active file descriptors
for (int i = 0; i < n; i++)
    printf("%d received data\n", events[i].data.fd);
```

Test your `epoll` understanding by implementing [I/O multiplexing in a client-server app](../drills/tasks/multiplexed-client-server/README.md).
