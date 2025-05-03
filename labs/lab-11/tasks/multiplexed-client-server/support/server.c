// SPDX-License-Identifier: BSD-3-Clause

#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <sys/epoll.h>

#include "utils/utils.h"
#include "w_epoll.h"

#ifndef BUFSIZ
#define BUFSIZ		256
#endif

static const char IP[] = "127.0.0.1";
static const int PORT = 5000;

/**
 * Create a sockaddr_in structure with the given IP and port.
 */
struct sockaddr_in get_sockaddr(const char *ip, const int port)
{
	struct sockaddr_in addr;

	memset(&addr, 0, sizeof(addr));
	addr.sin_family = AF_INET;
	addr.sin_port = htons(port);
	addr.sin_addr.s_addr = inet_addr(ip);

	return addr;
}

/**
 * Check if the file descriptor is a socket.
 */
static inline int is_socket(int fd)
{
	struct stat statbuf;

	if (fstat(fd, &statbuf) == -1)  // Not a valid file descriptor
		return 0;

	return S_ISSOCK(statbuf.st_mode);
}

/**
 * Quick and dirty function to share a message to all connected clients.
 * For proper implementation, consider using a list of connected clients.
 */
static inline void share_msg(int senderfd, char *msg)
{
	static const int MAX_FD = 30; // Fails for more than 25 clients
	char buf[BUFSIZ];
	int rc;

	sprintf(buf, "[Client %d]: %s", senderfd, msg);
	printf("%s\n", buf);

	for (int i = 5; i <= MAX_FD; i++) {
		if (is_socket(i) && i != senderfd) {
			rc = send(i, buf, strlen(buf), 0);
			DIE(rc < 0, "send");
		}
	}
}

/**
 * Create a TCP socket and listen for incoming connections.
 */
int main(void)
{
	char buf[BUFSIZ];
	struct sockaddr_in addr = get_sockaddr(IP, PORT);
	int listenfd, connectfd, epollfd;
	int n, rc;

	/* Create a network socket with SOCK_STREAM type in listenfd. */
	listenfd = socket(AF_INET, SOCK_STREAM, 0);
	DIE(listenfd < 0, "socket");

	/* Set the socket to be reusable. */
	rc = setsockopt(listenfd, SOL_SOCKET, SO_REUSEADDR, &(int){1}, sizeof(int));
	DIE(rc < 0, "setsockopt");

	/* TODO: Bind the socket to the addr. */

	/* TODO: Mark socket as passive socket using listen(). */

	/* TODO: Create an epoll instance */

	/* TODO: Add listenfd to epoll */

	while (1) {
		struct epoll_event events[10];

		/* TODO: Wait for events on the epoll instance */

		for (int i = 0; i < n; i++) {
			if (events[i].data.fd == listenfd) {  // New connection
				/* TODO: Accept a new connection */

				printf("<< New client connected on socket %d >>\n", connectfd);

				/* TODO: Add the new connection to epoll */
			} else {  // Received data from a connected client
				memset(buf, 0, BUFSIZ);

				/* TODO: Receive data from the connected socket */

				if (rc == 0) {
					printf("<< Client from socket %d disconnected >>\n", events[i].data.fd);

					/* TODO: Remove the disconnected client from epoll */

					/* TODO: Close the disconnected client socket */

					continue;
				}

				share_msg(events[i].data.fd, buf);
			}
		}
	}

	/* TODO: Close the sockets and the epoll instance */

	return 0;
}
