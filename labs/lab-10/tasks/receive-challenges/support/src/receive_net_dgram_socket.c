// SPDX-License-Identifier: BSD-3-Clause

#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <arpa/inet.h>
#include <sys/stat.h>
#include <sys/socket.h>
#include <netinet/in.h>

#include "utils/utils.h"

#ifndef BUFSIZ
#define BUFSIZ		256
#endif

static const char IP[] = "127.0.0.1";
static unsigned short port = 4242;

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

int main(void)
{
	int fd, rc;
	struct sockaddr_in addr = get_sockaddr(IP, port);
	char buffer[BUFSIZ];

	/* TODO: Create a socket for datagram communication. */

	/* TODO: Bind socket to address. */

	/* TODO: Read flag from socket. */

	printf("Flag is: %s\n", buffer);

	/* TODO: Close socket. */

	return 0;
}
