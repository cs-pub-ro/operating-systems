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

	/* TODO 2: Create a new process to handle the client */
	pid = fork();
	DIE(pid < 0, "fork");

	/* TODO 5: Print the child process id and handle the client */
	printf("<< Process %d created to handle client %d >>\n", pid, sockfd);
	if (pid == 0) {  /* Child process */
		receive_1GB_file(sockfd);
		exit(EXIT_SUCCESS);
	}

	/* REPLACE 2*/
	/* // Remove this after implementing the child process */
	/* receive_1GB_file(sockfd); */

	/* TODO 2: Remove the client from epoll */
	rc = w_epoll_del_fd(epollfd, sockfd);
	DIE(rc < 0, "epoll_ctl");

	/* TODO 2: Close the client socket */
	rc = close(sockfd);
	DIE(rc < 0, "close");
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
			} else {  // A client sent data
				memset(buf, 0, BUFSIZ);

				printf("Client %d wants to send a file\n", events[i].data.fd);
				handle_client(epollfd, events[i].data.fd);
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
