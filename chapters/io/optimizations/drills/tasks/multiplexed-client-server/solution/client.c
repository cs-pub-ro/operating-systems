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
 * Get user input from stdin and remove trailing newline.
 */
static void get_user_input(char *buf, size_t size)
{
	memset(buf, 0, size);
	fgets(buf, size, stdin);
	// Remove trailing newline
	if (buf[strlen(buf) - 1] == '\n')
		buf[strlen(buf) - 1] = '\0';
}

/**
 * Create a TCP socket and listen for incoming connections.
 */
int main(void)
{
	char buf[BUFSIZ];
	struct sockaddr_in addr = get_sockaddr(IP, PORT);
	int sockfd, epollfd;
	int n, rc;

	sockfd = socket(AF_INET, SOCK_STREAM, 0);
	DIE(sockfd < 0, "socket");

	rc = connect(sockfd, (struct sockaddr *) &addr, sizeof(addr));
	DIE(rc < 0, "connect");

	/* TODO 2: Create an epoll instance */
	epollfd = epoll_create1(0);
	DIE(epollfd < 0, "epoll_create1");

	/* TODO 2: Add sockfd to epoll */
	rc = w_epoll_add_fd_in(epollfd, sockfd);
	DIE(rc < 0, "epoll_ctl");

	/* TODO 2: Add STDIN_FILENO to epoll to be able to read user input */
	rc = w_epoll_add_fd_in(epollfd, STDIN_FILENO);
	DIE(rc < 0, "epoll_ctl");

	while (1) {
		struct epoll_event events[10];

		/* TODO 2: Wait for events on the epoll instance */
		n = epoll_wait(epollfd, events, 10, -1);
		DIE(n < 0, "epoll_wait");

		for (int i = 0; i < n; i++) {
			if (events[i].data.fd == STDIN_FILENO) {  // Received data from stdin
				get_user_input(buf, BUFSIZ);
				if (strcmp(buf, "exit") == 0)
					break;

				rc = send(sockfd, buf, strlen(buf), 0);
				DIE(rc < 0, "send");

				if (rc == 0)
					break;
			} else {  // Received data from server
				memset(buf, 0, BUFSIZ);
				rc = recv(sockfd, buf, BUFSIZ, 0);
				DIE(rc < 0, "recv");

				if (rc == 0) {
					printf("[SERVER] Connection closed.\n");
					break;
				}

				printf("%s\n", buf);
			}
		}
	}

	/* TODO 4: Close the socket and the epoll instance */
	rc = close(sockfd);
	DIE(rc < 0, "close");
	rc = close(epollfd);
	DIE(rc < 0, "close");

	return 0;
}
