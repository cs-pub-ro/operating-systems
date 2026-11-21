// SPDX-License-Identifier: BSD-3-Clause

/*
 * Receive a message through a network datagram socket (UDP).  There is a
 * port, as for TCP, and no connection: a message arrives, or it does not.
 */

#include <netinet/in.h>
#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

#include "utils.h"

#define PORT	4242

int main(void)
{
	struct sockaddr_in addr;
	char buffer[256];
	ssize_t n;
	int fd;
	int rc;

	fd = socket(AF_INET, SOCK_DGRAM, 0);
	DIE(fd < 0, "socket");
	printf("socket(AF_INET, SOCK_DGRAM) = %d\n", fd);

	/* Give the socket its name: a port, on every address of the machine. */
	memset(&addr, 0, sizeof(addr));
	addr.sin_family = AF_INET;
	addr.sin_port = htons(PORT);
	addr.sin_addr.s_addr = htonl(INADDR_ANY);
	rc = bind(fd, (struct sockaddr *)&addr, sizeof(addr));
	DIE(rc < 0, "bind");
	printf("bind(%d, port %d) done\n", fd, PORT);

	/* No listen(), no accept(): wait for a message from anybody. */
	printf("recvfrom(%d) ...\n", fd);
	n = recvfrom(fd, buffer, sizeof(buffer) - 1, 0, NULL, NULL);
	DIE(n < 0, "recvfrom");
	buffer[n] = '\0';
	printf("recvfrom(%d) = %zd: %s", fd, n, buffer);

	close(fd);

	return 0;
}
