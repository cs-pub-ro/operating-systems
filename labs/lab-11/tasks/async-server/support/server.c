// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <sys/epoll.h>
#include <sys/wait.h>
#include <signal.h>

#include "utils/utils.h"
#include "w_epoll.h"

#define SMALL_BUF 10  // Small buffer size to simulate slow network

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
 * Get a 1GB file over the network.
 * No need to store the data, just receive it to simulate a real-world scenario.
 */
static void receive_1GB_file(int sockfd)
{
	char buf[SMALL_BUF];
	int rc;

	while (true) { // Receive data until the client closes the connection
		rc = recv(sockfd, buf, SMALL_BUF, 0);
		DIE(rc < 0, "recv");

		if (rc == 0)
			break;
	}

	printf("Received 1GB file from [Client %d]\n", sockfd);
}

/**
 * Create a new process to handle the client.
 */
void handle_client(int epollfd, int sockfd)
{
	int pid, rc;

	/* TODO: Create a new process to handle the client */

	/* TODO: Print the child process id and handle the client */

	// Remove this after implementing the child process
	receive_1GB_file(sockfd);

	/* TODO: Remove the client from epoll */

	/* TODO: Close the client socket */
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

	/* Bind the socket to the addr. */
	rc = bind(listenfd, (struct sockaddr *) &addr, sizeof(addr));
	DIE(rc < 0, "bind");

	/* Mark socket as passive socket using listen(). */
	rc = listen(listenfd, 1);
	DIE(rc < 0, "listen");

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
			} else {  // A client sent data
				memset(buf, 0, BUFSIZ);

				printf("Client %d wants to send a file\n", events[i].data.fd);
				handle_client(epollfd, events[i].data.fd);
			}
		}
	}

	/* TODO: Close the sockets and the epoll instance */

	return 0;
}
