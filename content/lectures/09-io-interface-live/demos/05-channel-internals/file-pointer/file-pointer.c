// SPDX-License-Identifier: BSD-3-Clause

/*
 * Two file descriptors for one file, obtained in three ways, and what they
 * share.  The file holds the 16 characters "0123456789abcdef"; every read
 * takes four of them, from wherever the file pointer of the channel is.
 *
 *   1. open() twice:  two channels, each with its own file pointer
 *   2. dup():         two descriptors, one channel, one file pointer
 *   3. fork():        the child's descriptor leads to the parent's channel
 */

#include <fcntl.h>
#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

#include "utils.h"

#define FILE_NAME	"digits.txt"

static void read_four(const char *who, int fd)
{
	char buffer[5];
	ssize_t n;

	n = read(fd, buffer, 4);
	DIE(n < 0, "read");
	buffer[n] = '\0';

	printf("  %-6s read(%d) = \"%s\"   file pointer of %d is now %ld\n",
	       who, fd, buffer, fd, (long)lseek(fd, 0, SEEK_CUR));
}

int main(void)
{
	int fd1, fd2;
	ssize_t n;
	pid_t pid;

	fd1 = open(FILE_NAME, O_WRONLY | O_CREAT | O_TRUNC, 0644);
	DIE(fd1 < 0, "open");
	n = write(fd1, "0123456789abcdef", 16);
	DIE(n != 16, "write");
	close(fd1);

	printf("1. fd1 = open(), fd2 = open(): two channels\n");
	fd1 = open(FILE_NAME, O_RDONLY);
	DIE(fd1 < 0, "open");
	fd2 = open(FILE_NAME, O_RDONLY);
	DIE(fd2 < 0, "open");
	read_four("", fd1);
	read_four("", fd2);
	close(fd1);
	close(fd2);

	printf("2. fd1 = open(), fd2 = dup(fd1): one channel\n");
	fd1 = open(FILE_NAME, O_RDONLY);
	DIE(fd1 < 0, "open");
	fd2 = dup(fd1);
	DIE(fd2 < 0, "dup");
	read_four("", fd1);
	read_four("", fd2);
	/* One reference to the channel goes away; the channel stays. */
	close(fd1);
	printf("  close(%d)\n", fd1);
	read_four("", fd2);
	close(fd2);

	printf("3. fd1 = open(), then fork(): one channel, two processes\n");
	fd1 = open(FILE_NAME, O_RDONLY);
	DIE(fd1 < 0, "open");
	fflush(stdout);
	pid = fork();
	DIE(pid < 0, "fork");
	if (pid == 0) {
		read_four("child", fd1);
		return 0;
	}
	wait(NULL);
	read_four("parent", fd1);
	close(fd1);

	unlink(FILE_NAME);

	return 0;
}
