/* SPDX-License-Identifier: BSD-3-Clause */

#include <unistd.h>
#include <fcntl.h>
#include <sys/stat.h>

#include "utils.h"

static const char file_path[] = "file_channel";

#ifndef BUFSIZ
#define BUFSIZ		256
#endif

int main(void)
{
	int rc;
	int fd;
	char buffer[BUFSIZ];

	/* Open file. */
	fd = open(file_path, O_RDONLY);
	DIE(fd < 0, "open");

	/* Write to file. */
	rc = read(fd, buffer, BUFSIZ);
	DIE(rc < 0, "read");

	printf("Message is: %s\n", buffer);

	close(fd);

	return 0;
}
