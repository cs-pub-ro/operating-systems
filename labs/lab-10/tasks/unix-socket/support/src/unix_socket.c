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

static const char socket_path[] = "my-socket";

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

static void receiver_loop(void)
{
	struct sockaddr_un addr = get_sockaddr(socket_path);
	char output[BUFSIZ];
	int listenfd, connectfd;
	int rc;

	/* Recreate the socket for each communication. */
	remove(socket_path);

	/* TODO: Create a UNIX socket with SOCK_STREAM type. */

	/* TODO: Bind the socket to the addr. */

	/* TODO: Mark socket as passive socket using listen(). */

	/* TODO: Use accept() to get the socket for a new connection. */

	while (1) {
		memset(output, 0, BUFSIZ);
		/* TODO: Receive data from the connected socket */

		if (rc == 0)
			break;

		printf("[Receiver]: %s\n", output);
		fflush(stdout);
	}

	/* TODO: Close connectfd and listenfd. */
}

static void sender_loop(void)
{
	struct sockaddr_un addr = get_sockaddr(socket_path);
	char input[BUFSIZ];
	int sockfd;
	int rc;

	/* TODO: Check if socket exists. Hint: access(). */

	/* TODO: Create a UNIX socket with SOCK_STREAM type. */

	/* TODO: Connect to the socket. */

	while (1) {
		memset(input, 0, BUFSIZ);
		fgets(input, BUFSIZ, stdin);
		// Remove trailing newline
		if (input[strlen(input) - 1] == '\n')
			input[strlen(input) - 1] = '\0';

		printf("[Sender]: %s\n", input);
		if ((strcmp(input, "exit") == 0 || strlen(input) == 0))
			break;

		/* TODO: Send input to socket. */
	}

	/* TODO: Close socket. */
}

/**
 * Simulate a sender-receiver communication using a named pipe.
 * Run the program as a receiver by default, or as a sender if the -s or --sender.
 */
int main(int argc, char *argv[])
{
	if (argc == 1) {  // Run as receiver by default
		receiver_loop();
	} else if (strcmp(argv[1], "-s") == 0 || strcmp(argv[1], "--sender") == 0) {
		sender_loop();
	} else {
		fprintf(stderr, "Usage: %s [-s|--sender]\n", argv[0]);
		exit(EXIT_FAILURE);
	}

	return 0;
}
