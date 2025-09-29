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
	struct sockaddr_in cli_addr;  // Used to store client address
	socklen_t cli_len = sizeof(cli_addr);
	int listenfd, connectfd;
	int rc;

	/* TODO 2: Create a network socket with SOCK_STREAM type in listenfd. */
	listenfd = socket(AF_INET, SOCK_STREAM, 0);
	DIE(listenfd < 0, "socket");

	/* TODO 2: Bind the socket to the addr. */
	rc = bind(listenfd, (struct sockaddr *) &addr, sizeof(addr));
	DIE(rc < 0, "bind");

	/* TODO 2: Mark socket as passive socket using listen(). */
	rc = listen(listenfd, 1);
	DIE(rc < 0, "listen");

	/* TODO 2: Use accept() to accept a new connection in connectfd. */
	connectfd = accept(listenfd, (struct sockaddr *) &cli_addr, &cli_len);
	DIE(connectfd < 0, "accept");

	printf("[Client %s:%d] connected\n", inet_ntoa(cli_addr.sin_addr), ntohs(cli_addr.sin_port));

	while (1) {
		memset(buf, 0, BUFSIZ);
		/* TODO 2: Receive data from the connected socket */
		rc = recv(connectfd, buf, BUFSIZ, 0);
		DIE(rc < 0, "recv");

		/* TODO 2: Stop the loop if recv() receives EOF */
		if (rc == 0)
			break;

		char *cli_ip = inet_ntoa(cli_addr.sin_addr);
		int cli_port = ntohs(cli_addr.sin_port);

		printf("[Client %s:%d]: %s\n", cli_ip, cli_port, buf);

		get_user_input(buf, BUFSIZ);
		if (strcmp(buf, "exit") == 0)
			break;

		/* TODO 2: Send the message to the client */
		rc = send(connectfd, buf, strlen(buf), 0);
		DIE(rc < 0, "send");
	}

	/* TODO 4: Close connectfd and listenfd. */
	rc = close(connectfd);
	DIE(rc < 0, "close");
	rc = close(listenfd);
	DIE(rc < 0, "close");

	return 0;
}
