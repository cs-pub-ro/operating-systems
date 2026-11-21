/* SPDX-License-Identifier: BSD-3-Clause */

#include <unistd.h>
#include <fcntl.h>
#include <sys/stat.h>

#include "utils.h"

static const char file_path[] = "file_channel";

#ifndef BUFSIZ
#define BUFSIZ		256
#endif

static const char buffer[BUFSIZ] = {'A', };

int main(void)
{
	int rc;
	int fd;

	/* Open file. */
	fd = open(file_path, O_WRONLY | O_CREAT, 0644);
	DIE(fd < 0, "open");

	/* Write to file. */
	rc = write(fd, buffer, BUFSIZ);
	DIE(rc < 0, "write");

	close(fd);

	return 0;
}
