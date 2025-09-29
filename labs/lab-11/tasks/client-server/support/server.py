# SPDX-License-Identifier: BSD-3-Clause

import socket
import sys

# Constants
IP = "127.0.0.1"
PORT = 5000
BUFSIZ = 256


def main():
    # Create a TCP socket
    try:
        listen_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    except socket.error as e:
        sys.exit(f"Socket creation failed: {e}")

    # Bind the socket to the address
    try:
        listen_socket.bind((IP, PORT))
    except socket.error as e:
        sys.exit(f"Bind failed: {e}")

    # Mark socket as passive
    try:
        listen_socket.listen(1)
    except socket.error as e:
        sys.exit(f"Listen failed: {e}")

    print(f"Server listening on {IP}:{PORT}")

    # Accept a new connection
    try:
        connect_socket, client_addr = listen_socket.accept()
        print(f"Connected by {client_addr}")
    except socket.error as e:
        sys.exit(f"Accept failed: {e}")

    while True:
        # Receive data from the connected socket
        try:
            data = connect_socket.recv(BUFSIZ)
            if not data:
                break  # EOF reached
            print(f"[Client {client_addr}]: {data.decode()}")
        except socket.error as e:
            sys.exit(f"Receive failed: {e}")

        # Get user input and send response
        message = input().strip()
        if message == "exit":
            break

        try:
            connect_socket.send(message.encode())
        except socket.error as e:
            sys.exit(f"Send failed: {e}")

    # Close sockets
    try:
        connect_socket.close()
        listen_socket.close()
    except socket.error as e:
        sys.exit(f"Close failed: {e}")


if __name__ == "__main__":
    main()
