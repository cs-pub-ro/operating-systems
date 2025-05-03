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

	/* TODO 2: Bind the socket to the addr. */
	rc = bind(listenfd, (struct sockaddr *) &addr, sizeof(addr));
	DIE(rc < 0, "bind");

	/* TODO 2: Mark socket as passive socket using listen(). */
	rc = listen(listenfd, 1);
	DIE(rc < 0, "listen");

	/* TODO 2: Create an epoll instance */
	epollfd = epoll_create1(0);
	DIE(epollfd < 0, "epoll_create1");

	/* TODO 2: Add listenfd to epoll */
	rc = w_epoll_add_fd_in(epollfd, listenfd);
	DIE(rc < 0, "epoll_ctl");

	while (1) {
		struct epoll_event events[10];

		/* TODO 2: Wait for events on the epoll instance */
		n = epoll_wait(epollfd, events, 10, -1);
		DIE(n < 0, "epoll_wait");

		for (int i = 0; i < n; i++) {
			if (events[i].data.fd == listenfd) {  // New connection
				/* TODO 2: Accept a new connection */
				connectfd = accept(listenfd, NULL, NULL);
				DIE(connectfd < 0, "accept");

				printf("<< New client connected on socket %d >>\n", connectfd);

				/* TODO 2: Add the new connection to epoll */
				rc = w_epoll_add_fd_in(epollfd, connectfd);
				DIE(rc < 0, "epoll_ctl");
			} else {  // Received data from a connected client
				memset(buf, 0, BUFSIZ);

				/* TODO 2: Receive data from the connected socket */
				rc = recv(events[i].data.fd, buf, BUFSIZ, 0);
				DIE(rc < 0, "recv");

				if (rc == 0) {
					printf("<< Client from socket %d disconnected >>\n", events[i].data.fd);

					/* TODO 2: Remove the disconnected client from epoll */
					rc = w_epoll_del_fd(epollfd, events[i].data.fd);
					DIE(rc < 0, "epoll_ctl");

					/* TODO 2: Close the disconnected client socket */
					rc = close(events[i].data.fd);
					DIE(rc < 0, "close");

					continue;
				}

				share_msg(events[i].data.fd, buf);
			}
		}
	}

	/* TODO 4: Close the sockets and the epoll instance */
	rc = close(listenfd);
	DIE(rc < 0, "close");
	rc = close(epollfd);
	DIE(rc < 0, "close");

	return 0;
}
