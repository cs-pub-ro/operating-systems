// SPDX-License-Identifier: BSD-3-Clause

#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <sys/epoll.h>

#include "utils/utils.h"
#include "w_epoll.h"

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
 * Read 1GB file and send it to the server.
 */
static void send_1GB_file(int sockfd, const char *filename)
{
	char buf[BUFSIZ];
	FILE *file;
	int rc;

	file = fopen(filename, "r");
	if (file == NULL) {
		printf("File not found.\n");
		return;
	}

	size_t n, total = 0;

	while (true) {
		n = fread(buf, 1, BUFSIZ, file);
		if (n == 0)
			break;

		rc = send(sockfd, buf, n, 0);
		DIE(rc < 0, "send");

		total += n;
		if (total % (10 * 1024 * 1024) == 0)  // Print every 10MB
			printf("Sent %lu MB\n", total / (1024 * 1024));
	}

	printf("Sent 1GB file to server\n");

	rc = fclose(file);
	DIE(rc < 0, "fclose");
}

/**
 * Create a TCP socket and listen for incoming connections.
 */
int main(void)
{
	struct sockaddr_in addr = get_sockaddr(IP, PORT);
	int sockfd;
	int rc;

	sockfd = socket(AF_INET, SOCK_STREAM, 0);
	DIE(sockfd < 0, "socket");

	rc = connect(sockfd, (struct sockaddr *) &addr, sizeof(addr));
	DIE(rc < 0, "connect");

	send_1GB_file(sockfd, "test-file.txt");

	rc = close(sockfd);
	DIE(rc < 0, "close");

	return 0;
}
