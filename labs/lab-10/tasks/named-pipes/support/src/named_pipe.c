// SPDX-License-Identifier: BSD-3-Clause

#include <unistd.h>
#include <fcntl.h>
#include <sys/stat.h>

#include "utils/utils.h"

static const char fifo_path[] = "my-fifo";

#ifndef BUFSIZ
#define BUFSIZ		256
#endif

void create_fifo_if_needed(void)
{
	/* TODO: Use access() to check if the FIFO exists and has the right permissions.
	 * If it exists but has the wrong permissions, delete it using unlink().
	 * If it doesn't exist create it using mkfifo().
	 */

static void receiver_loop(void)
{
	char output[BUFSIZ];
	int fd, rc;

	/* TODO: Create FIFO if it does not exist, then open it for reading. */

	while (1) {
		/* TODO: Read until EOF. */

		printf("[Receiver]: %s\n", output);
		fflush(stdout);
	}

	/* TODO: Close FIFO. */
}

static void sender_loop(void)
{
	char input[BUFSIZ];
	int fd, rc;

	/* TODO: Create FIFO if it does not exist, then open it for writing. */

	while (1) {
		memset(input, 0, BUFSIZ);
		fgets(input, BUFSIZ, stdin);
		// Remove trailing newline
		if (input[strlen(input) - 1] == '\n')
			input[strlen(input) - 1] = '\0';

		if ((strcmp(input, "exit") == 0 || strlen(input) == 0))
			break;

		/* TODO: Write to FIFO. */
	}

	/* TODO: Close FIFO. */
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
