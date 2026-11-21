// SPDX-License-Identifier: BSD-3-Clause

/*
 * Send a message through a network stream socket (TCP), to the port the
 * receiver listens on, on this machine.
 */

#include <netinet/in.h>
#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

#include "utils.h"

#define PORT	4242

static const char message[] = "Hello, TCP socket!\n";

int main(void)
{
	struct sockaddr_in addr;
	ssize_t n;
	int fd;
	int rc;

	fd = socket(AF_INET, SOCK_STREAM, 0);
	DIE(fd < 0, "socket");
	printf("socket(AF_INET, SOCK_STREAM) = %d\n", fd);

	memset(&addr, 0, sizeof(addr));
	addr.sin_family = AF_INET;
	addr.sin_port = htons(PORT);
	addr.sin_addr.s_addr = htonl(INADDR_LOOPBACK);
	rc = connect(fd, (struct sockaddr *)&addr, sizeof(addr));
	DIE(rc < 0, "connect");
	printf("connect(%d, 127.0.0.1, port %d) done\n", fd, PORT);

	n = send(fd, message, sizeof(message) - 1, 0);
	DIE(n < 0, "send");
	printf("send(%d) = %zd\n", fd, n);

	close(fd);

	return 0;
}
