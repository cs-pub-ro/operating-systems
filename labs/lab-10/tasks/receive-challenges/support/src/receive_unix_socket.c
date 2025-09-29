// SPDX-License-Identifier: BSD-3-Clause

#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <sys/un.h>
#include <sys/socket.h>

#include "utils/utils.h"

#ifndef BUFSIZ
#define BUFSIZ		256
#endif

static const char socket_path[] = "golden_gate";

/**
 * Create a sockaddr_un structure with family AF_UNIX and the given path.
 */
struct sockaddr_un get_sockaddr(const char *path)
{
	struct sockaddr_un addr;

	memset(&addr, 0, sizeof(addr));
	addr.sun_family = AF_UNIX;
	snprintf(addr.sun_path, strlen(path) + 1, "%s", path);

	return addr;
}

int main(void)
{
	int rc;
	int listenfd, connectfd;
	struct sockaddr_un addr = get_sockaddr(socket_path);
	char buffer[BUFSIZ];

	/* TODO: Remove socket_path. */

	/* TODO: Create a Unix domain socket for stream communication. */

	/* TODO: Bind socket to path. */

	/* TODO: Listen for incoming connections. */

	/* TODO: Accept a connection. */

	/* TODO: Read flag from socket. */

	printf("Flag is: %s\n", buffer);

	/* TODO: Close the sockets. */

	return 0;
}
