# Receive Challenges

Navigate to `receive-challenges/` directory of the extracted archive (or `chapters/io/ipc/drills/tasks/receive-challenges` if you are working directly in the repository).
Run `make` and then enter `support/` folder and go through the practice items below.
In this task, we will review all the IPC methods we have explored, including [anonymous pipes](../../../reading/pipes.md), [named pipes (FIFOs)](../../../reading/pipes.md), [UNIX sockets](../../../reading/unix-sockets.md), and [network sockets](../../../reading/network-sockets.md).
Each challenge involves building a communication channel using the specified IPC method.

1. Complete the TODOs in `support/receive_pipe.c`, then compile and run the executable.
   If the challenge is completed successfully, you should see the message `Flag is ...`.

1. Complete the TODOs in `support/receive_fifo.c`, then compile and run the executable.
   You will need to run the `send_fifo` executable while your process is running to reveal the flag.

1. Complete the TODOs in `support/receive_unix_socket.c`, then compile and run the executable.
   You will need to run the `send_unix_socket` executable while your process is running to reveal the flag.

1. Complete the TODOs in `support/receive_net_dgram_socket.c`, then compile and run the executable.
   You will need to run the `send_net_dgram_socket` executable while your process is running to reveal the flag.
