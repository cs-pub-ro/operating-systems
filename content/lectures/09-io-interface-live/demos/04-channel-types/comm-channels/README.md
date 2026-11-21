# Demo: Five Ways from One Process to Another

One message through each kind of socket-like channel.
For the pairs, start the receiver in one terminal and the sender in another.

## Run

```console
make
./pipe
```

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

## Ask

* How does the sender find the receiver, in each of the five?
* Which of the five could work between two machines?
* The socket receivers end up with two descriptors, 3 and 4. What is each for?
* Run each sender with no receiver. Which ones notice?
