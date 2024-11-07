# SPDX-License-Identifier: BSD-3-Clause

import socket
import selectors
import sys

IP = "127.0.0.1"
PORT = 5000
BUFSIZ = 256


def main():
    selector = selectors.DefaultSelector()

    # Create a socket and connect to the server
    sockfd = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sockfd.connect((IP, PORT))
    sockfd.setblocking(False)

    # Register socket and stdin (standard input) for monitoring with selectors
    selector.register(sockfd, selectors.EVENT_READ, handle_server_response)
    handle_user_input = lambda stdin, sel: _handle_user_input(stdin, sel, sockfd)
    selector.register(sys.stdin, selectors.EVENT_READ, handle_user_input)

    print("Connected to the server. Type 'exit' to quit.")

    try:
        while True:
            events = selector.select(timeout=None)
            for key, _ in events:
                callback = key.data
                callback(key.fileobj, selector)
    except KeyboardInterrupt:
        print("Client exiting.")
    finally:
        # Clean up the connections
        selector.unregister(sockfd)
        sockfd.close()
        selector.close()


def handle_server_response(sock: socket.socket, selector: selectors.DefaultSelector):
    """Handle receiving data from the server."""
    data = sock.recv(BUFSIZ)
    if not data:
        print("[SERVER] Connection closed.")
        selector.unregister(sock)
        sock.close()
        sys.exit(0)  # Exit if server closes the connection
    else:
        print(data.decode("utf-8"))


def _handle_user_input(stdin, selector: selectors.DefaultSelector, sock: socket.socket):
    """Handle user input from stdin and send to server."""
    message = input().strip()
    if message.lower() == "exit":
        print("Exiting...")
        selector.unregister(stdin)
        selector.unregister(sock)
        sock.close()
        sys.exit(0)
    else:
        sock.sendall(message.encode("utf-8"))


if __name__ == "__main__":
    main()
