# SPDX-License-Identifier: BSD-3-Clause

import socket
import selectors


IP = "127.0.0.1"
PORT = 5000
BUFSIZ = 1024
connected_clients = []  # Keep track of connected clients


def share_msg(sender: socket.socket, message: str):
    """Share a message with all connected clients, except the sender."""
    msg = f"[Client {sender.fileno()}]: {message}".encode("utf-8")
    print(msg.decode())

    for client in connected_clients:
        if client != sender:
            client.send(msg)


def accept_connection(sock: socket.socket, selector: selectors.BaseSelector):
    """Accept a new client connection."""
    conn, _ = sock.accept()
    conn.setblocking(False)

    print(f"<< New client connected on socket {conn.fileno()} >>")
    selector.register(conn, selectors.EVENT_READ, handle_client)

    connected_clients.append(conn)


def handle_client(conn: socket.socket, selector: selectors.BaseSelector):
    """Handle client data reception and sharing."""
    try:
        data = conn.recv(BUFSIZ)
        if not data:
            print(f"<< Client from socket {conn.fileno()} disconnected >>")
            selector.unregister(conn)
            conn.close()
            connected_clients.remove(conn)
            return
    except ConnectionResetError:
        print(f"<< Client from socket {conn.fileno()} disconnected >>")
        selector.unregister(conn)
        conn.close()

    share_msg(conn, data.decode("utf-8"))


def main():
    # Create and configure listening socket
    listen_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    listen_sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    listen_sock.bind((IP, PORT))
    listen_sock.listen()
    listen_sock.setblocking(False)

    selector = selectors.DefaultSelector()
    selector.register(listen_sock, selectors.EVENT_READ, accept_connection)
    print(f"Server listening on {IP}:{PORT}")

    try:
        while True:
            events = selector.select(timeout=None)
            for key, _ in events:
                callback = key.data
                callback(key.fileobj, selector)
    except KeyboardInterrupt:
        print("Server shutting down.")
    finally:
        selector.close()
        listen_sock.close()


if __name__ == "__main__":
    main()
