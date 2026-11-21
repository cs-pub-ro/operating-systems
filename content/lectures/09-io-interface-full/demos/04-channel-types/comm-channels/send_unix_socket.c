// SPDX-License-Identifier: BSD-3-Clause

/*
 * Send a message through a Unix socket.  The receiver created the name in
 * the file system; the sender connects to it.
 */

#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/un.h>
#include <unistd.h>

#include "utils.h"

static const char socket_path[] = "socket_channel";
static const char message[] = "Hello, Unix socket!\n";

int main(void)
{
	struct sockaddr_un addr;
	ssize_t n;
	int fd;
	int rc;

	fd = socket(AF_UNIX, SOCK_STREAM, 0);
	DIE(fd < 0, "socket");
	printf("socket(AF_UNIX, SOCK_STREAM) = %d\n", fd);

	memset(&addr, 0, sizeof(addr));
	addr.sun_family = AF_UNIX;
	snprintf(addr.sun_path, sizeof(addr.sun_path), "%s", socket_path);
	rc = connect(fd, (struct sockaddr *)&addr, sizeof(addr));
	DIE(rc < 0, "connect");
	printf("connect(%d, \"%s\") done\n", fd, socket_path);

	n = send(fd, message, sizeof(message) - 1, 0);
	DIE(n < 0, "send");
	printf("send(%d) = %zd\n", fd, n);

	close(fd);

	return 0;
}
