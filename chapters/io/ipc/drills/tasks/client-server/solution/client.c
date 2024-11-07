// SPDX-License-Identifier: BSD-3-Clause

#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#include "utils/utils.h"

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
	int sockfd;
	int rc;

	/* TODO 2: Create a network socket with SOCK_STREAM type. */
	sockfd = socket(AF_INET, SOCK_STREAM, 0);
	DIE(sockfd < 0, "socket");

	/* TODO 2: Use connect() to connect to the server. */
	rc = connect(sockfd, (struct sockaddr *) &addr, sizeof(addr));
	DIE(rc < 0, "connect");

	while (1) {
		get_user_input(buf, BUFSIZ);
		if (strcmp(buf, "exit") == 0)
			break;

		/* TODO 2: Send data to the connected socket */
		rc = send(sockfd, buf, strlen(buf), 0);
		DIE(rc < 0, "send");

		/* TODO 2: Wait for server to respond */
		memset(buf, 0, BUFSIZ);
		rc = recv(sockfd, buf, BUFSIZ, 0);
		DIE(rc < 0, "recv");

		/* TODO 2: Stop the loop if recv() receives EOF */
		if (rc == 0)
			break;

		printf("[Server %s:%d]: %s\n", IP, PORT, buf);
	}

	/* TODO 2: Close sockfd. */
	rc = close(sockfd);
	DIE(rc < 0, "close");

	return 0;
}
