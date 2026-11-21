// SPDX-License-Identifier: BSD-3-Clause

/*
 * Send a message through a network datagram socket (UDP), to the port the
 * receiver is bound to, on this machine.  Nothing checks that somebody is
 * there to receive it.
 */

#include <netinet/in.h>
#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

#include "utils.h"

#define PORT	4242

static const char message[] = "Hello, UDP socket!\n";

int main(void)
{
	struct sockaddr_in addr;
	ssize_t n;
	int fd;

	fd = socket(AF_INET, SOCK_DGRAM, 0);
	DIE(fd < 0, "socket");
	printf("socket(AF_INET, SOCK_DGRAM) = %d\n", fd);

	/* No connect(): every message carries the address it goes to. */
	memset(&addr, 0, sizeof(addr));
	addr.sin_family = AF_INET;
	addr.sin_port = htons(PORT);
	addr.sin_addr.s_addr = htonl(INADDR_LOOPBACK);
	n = sendto(fd, message, sizeof(message) - 1, 0,
		   (struct sockaddr *)&addr, sizeof(addr));
	DIE(n < 0, "sendto");
	printf("sendto(%d, 127.0.0.1, port %d) = %zd\n", fd, PORT, n);

	close(fd);

	return 0;
}
