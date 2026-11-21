// SPDX-License-Identifier: BSD-3-Clause

/*
 * Receive a message through a Unix socket: a socket that is found through
 * a name in the file system, and connects two processes on one machine.
 */

#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/un.h>
#include <unistd.h>

#include "utils.h"

static const char socket_path[] = "socket_channel";

int main(void)
{
	struct sockaddr_un addr;
	int listen_fd, fd;
	char buffer[256];
	ssize_t n;
	int rc;

	/* A leftover name from a previous run would make bind() fail. */
	unlink(socket_path);

	listen_fd = socket(AF_UNIX, SOCK_STREAM, 0);
	DIE(listen_fd < 0, "socket");
	printf("socket(AF_UNIX, SOCK_STREAM) = %d\n", listen_fd);

	/* Give the socket its name: a path. */
	memset(&addr, 0, sizeof(addr));
	addr.sun_family = AF_UNIX;
	snprintf(addr.sun_path, sizeof(addr.sun_path), "%s", socket_path);
	rc = bind(listen_fd, (struct sockaddr *)&addr, sizeof(addr));
	DIE(rc < 0, "bind");
	printf("bind(%d, \"%s\") done\n", listen_fd, socket_path);

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
	unlink(socket_path);

	return 0;
}
