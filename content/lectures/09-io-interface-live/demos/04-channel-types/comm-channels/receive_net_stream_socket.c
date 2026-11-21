// SPDX-License-Identifier: BSD-3-Clause

/*
 * Receive a message through a network stream socket (TCP).  The socket is
 * found through an address and a port, and the sender may be on another
 * machine.
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
	int listen_fd, fd;
	char buffer[256];
	int on = 1;
	ssize_t n;
	int rc;

	listen_fd = socket(AF_INET, SOCK_STREAM, 0);
	DIE(listen_fd < 0, "socket");
	printf("socket(AF_INET, SOCK_STREAM) = %d\n", listen_fd);

	/* Let the port be used again right after a previous run. */
	rc = setsockopt(listen_fd, SOL_SOCKET, SO_REUSEADDR, &on, sizeof(on));
	DIE(rc < 0, "setsockopt");

	/* Give the socket its name: a port, on every address of the machine. */
	memset(&addr, 0, sizeof(addr));
	addr.sin_family = AF_INET;
	addr.sin_port = htons(PORT);
	addr.sin_addr.s_addr = htonl(INADDR_ANY);
	rc = bind(listen_fd, (struct sockaddr *)&addr, sizeof(addr));
	DIE(rc < 0, "bind");
	printf("bind(%d, port %d) done\n", listen_fd, PORT);

	rc = listen(listen_fd, 1);
	DIE(rc < 0, "listen");

	/* Wait for a sender; the connection is a channel of its own. */
	printf("accept(%d) ...\n", listen_fd);
	fd = accept(listen_fd, NULL, NULL);
	DIE(fd < 0, "accept");
	printf("accept(%d) = %d\n", listen_fd, fd);

	n = recv(fd, buffer, sizeof(buffer) - 1, 0);
	DIE(n < 0, "recv");
	buffer[n] = '\0';
	printf("recv(%d) = %zd: %s", fd, n, buffer);

	close(fd);
	close(listen_fd);

	return 0;
}
