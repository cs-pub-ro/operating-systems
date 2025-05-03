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

	/* TODO: Create a network socket with SOCK_STREAM type. */

	/* TODO: Use connect() to connect to the server. */

	while (1) {
		get_user_input(buf, BUFSIZ);
		if (strcmp(buf, "exit") == 0)
			break;

		/* TODO: Send data to the connected socket */

		/* TODO: Wait for server to respond */
		DIE(rc < 0, "recv");

		/* TODO: Stop the loop if recv() receives EOF */

		printf("[Server %s:%d]: %s\n", IP, PORT, buf);
	}

	/* TODO: Close sockfd. */

	return 0;
}
