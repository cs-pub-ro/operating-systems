# Demo: Five Ways from One Process to Another

One message, "Hello", passed from a sender to a receiver through five kinds of socket-like channel.

## Goal

See what the five have in common, a descriptor at each end with `write()` or `send()` on one and `read()` or `recv()` on the other, and where they differ: in how the two ends find each other.

## Background

| Channel | Programs | The receiver is found through |
| --- | --- | --- |
| pipe | `pipe` (one program, which forks) | nothing: the child inherits the descriptors |
| FIFO | `receive_fifo`, `send_fifo` | the path `fifo_channel` |
| Unix socket | `receive_unix_socket`, `send_unix_socket` | the path `socket_channel` |
| TCP socket | `receive_net_stream_socket`, `send_net_stream_socket` | port 4242 |
| UDP socket | `receive_net_dgram_socket`, `send_net_dgram_socket` | port 4242 |

Every program prints the calls it makes, with the descriptors.
The programs are deliberately bare: one message, one direction.
Lecture 10 is about pipes and local communication, and lecture 11 about sockets and the network; this demo only lines the channels up.

## Build and run

```console
make
./pipe
```

For each of the four pairs, start the receiver in one terminal and the sender in another.

```console
./receive_fifo                  # first terminal
./send_fifo                     # second terminal
```

```console
./receive_unix_socket
./send_unix_socket
```

```console
./receive_net_stream_socket
./send_net_stream_socket
```

```console
./receive_net_dgram_socket
./send_net_dgram_socket
```

While a receiver waits, look at its channels from the second terminal: `ls -l /proc/$(pidof receive_unix_socket)/fd`.

## Results and explanations

**The pipe.**

```text
$ ./pipe
[614899] pipe() = read end 3, write end 4
[614899] write(4) = 13
[614900] read(3) = 13: Hello, pipe!
```

One process creates the pipe and gets both ends.
After `fork()`, the child has a copy of the descriptor table, so its entry 3 leads to the same pipe.
No name was involved at any point, which is why a pipe only connects processes of one family.

**The FIFO** is the [FIFO demo](../../02-io-interface/fifo) of part 02: the receiver makes a path, the sender opens it.

**The Unix socket.**

```text
$ ./receive_unix_socket
socket(AF_UNIX, SOCK_STREAM) = 3
bind(3, "socket_channel") done
accept(3) ...
accept(3) = 4
recv(4) = 20: Hello, Unix socket!
```

```text
$ ./send_unix_socket
socket(AF_UNIX, SOCK_STREAM) = 3
connect(3, "socket_channel") done
send(3) = 20
```

A socket is created first, with no name, and given one with `bind()`: here a path, which shows in `ls -l` with an `s` in front.
The receiver has two descriptors by the end.
Descriptor 3 is the socket that waits for senders, and never carries a message.
`accept()` returned descriptor 4, a new channel for this one sender; a second sender would get another.

**The TCP socket.**

```text
$ ./receive_net_stream_socket
socket(AF_INET, SOCK_STREAM) = 3
bind(3, port 4242) done
accept(3) ...
accept(3) = 4
recv(4) = 19: Hello, TCP socket!
```

The same calls as for the Unix socket, in the same order.
The one difference is the name: a port number instead of a path.
A path means something on one machine; an address and a port mean something across a network, so the sender could be anywhere.

While the receiver waits:

```text
$ ss -ltnp | grep 4242
LISTEN 0  1  0.0.0.0:4242  0.0.0.0:*  users:(("receive_net_str",pid=614954,fd=3))
```

**The UDP socket.**

```text
$ ./receive_net_dgram_socket
socket(AF_INET, SOCK_DGRAM) = 3
bind(3, port 4242) done
recvfrom(3) ...
recvfrom(3) = 19: Hello, UDP socket!
```

There is a port and no connection: no `listen()`, no `accept()`, no second descriptor.
The sender puts the destination on every message, with `sendto()`.
Run the sender with no receiver and it reports success all the same: nobody was there, and nothing checks.

All five, side by side:

| | Found through | Reaches | Connection | Calls to move data |
| --- | --- | --- | --- | --- |
| pipe | inheritance | a related process, same machine | none needed | `read()`, `write()` |
| FIFO | a path | any process, same machine | made by `open()` at both ends | `read()`, `write()` |
| Unix socket | a path | any process, same machine | `connect()`, `accept()` | `send()`, `recv()`, or `read()`, `write()` |
| TCP socket | address and port | any process, any machine | `connect()`, `accept()` | `send()`, `recv()`, or `read()`, `write()` |
| UDP socket | address and port | any process, any machine | none | `sendto()`, `recvfrom()` |

## Going further

* Replace `recv()` with `read()` in `receive_unix_socket.c`, and `send()` with `write()` in the sender.
  Does anything change?
* Start `./send_net_stream_socket` with no receiver, then `./send_net_dgram_socket` with no receiver.
  Which one fails, and what does that say about the two kinds of socket?
* Start `./receive_net_stream_socket` and send the message with `echo hello | nc localhost 4242`, or `echo hello > /dev/tcp/localhost/4242` in `bash`.
* Start two receivers of the same kind at once, for each of the four pairs.
  Which pairs allow it, and what happens to the message?

## References

* `man 2 pipe`, `man 7 pipe`, `man 7 fifo`
* `man 7 unix`, `man 7 ip`, `man 7 tcp`, `man 7 udp`
* `man 2 socket`, `man 2 bind`, `man 2 listen`, `man 2 accept`, `man 2 connect`
* Kerrisk, *The Linux Programming Interface*, chapters 44 (pipes and FIFOs), 56 (sockets: introduction) and 57 (Unix domain sockets)
