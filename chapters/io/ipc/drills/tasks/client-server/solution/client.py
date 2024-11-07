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
        client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    except socket.error as e:
        sys.exit(f"Socket creation failed: {e}")

    # Connect to the server
    try:
        client_socket.connect((IP, PORT))
        print(f"Connected to server at {IP}:{PORT}")
    except socket.error as e:
        sys.exit(f"Connection failed: {e}")

    while True:
        # Get user input
        message = input().strip()
        if message == "exit":
            break

        # Send data to the server
        try:
            client_socket.send(message.encode())
        except socket.error as e:
            sys.exit(f"Send failed: {e}")

        # Receive response from server
        try:
            data = client_socket.recv(BUFSIZ)
            if not data:  # Check for EOF
                break
            print(f"[Server {IP}:{PORT}]: {data.decode()}")
        except socket.error as e:
            sys.exit(f"Receive failed: {e}")

    # Close the socket
    try:
        client_socket.close()
    except socket.error as e:
        sys.exit(f"Close failed: {e}")


if __name__ == "__main__":
    main()
