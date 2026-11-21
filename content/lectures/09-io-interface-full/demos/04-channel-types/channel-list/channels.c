// SPDX-License-Identifier: BSD-3-Clause

/*
 * One process, one channel of every kind: a file, a device, a pipe, a FIFO,
 * a Unix socket and two network sockets.  Then the file descriptor table of
 * the process is printed: what the kernel says each entry is, and where it
 * leads.
 */

#include <fcntl.h>
#include <limits.h>
#include <netinet/in.h>
#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/stat.h>
#include <sys/un.h>
#include <unistd.h>

#include "utils.h"

#define FILE_PATH	"channels.c"
#define FIFO_PATH	"fifo_channel"
#define SOCKET_PATH	"socket_channel"
#define PORT		4242

static const char *type_name(mode_t mode)
{
	if (S_ISREG(mode))
		return "file";
	if (S_ISDIR(mode))
		return "directory";
	if (S_ISCHR(mode))
		return "char device";
	if (S_ISBLK(mode))
		return "block device";
	if (S_ISFIFO(mode))
		return "pipe / FIFO";
	if (S_ISSOCK(mode))
		return "socket";

	return "something else";
}

/*
 * Print one entry of the table: the number, the type, how another process
 * would get to the same thing, and where the kernel says it leads.
 */
static void show(int fd, const char *how)
{
	char link[64], target[PATH_MAX];
	struct stat info;
	ssize_t n;
	int rc;

	rc = fstat(fd, &info);
	DIE(rc < 0, "fstat");

	snprintf(link, sizeof(link), "/proc/self/fd/%d", fd);
	n = readlink(link, target, sizeof(target) - 1);
	DIE(n < 0, "readlink");
	target[n] = '\0';

	printf("%2d  %-12s  %-23s  %s\n", fd, type_name(info.st_mode), how,
	       target);
}

static int tcp_listener(void)
{
	struct sockaddr_in addr;
	int fd;
	int rc;

	fd = socket(AF_INET, SOCK_STREAM, 0);
	DIE(fd < 0, "socket");

	memset(&addr, 0, sizeof(addr));
	addr.sin_family = AF_INET;
	addr.sin_port = htons(PORT);
	addr.sin_addr.s_addr = htonl(INADDR_LOOPBACK);
	rc = bind(fd, (struct sockaddr *)&addr, sizeof(addr));
	DIE(rc < 0, "bind");

	rc = listen(fd, 1);
	DIE(rc < 0, "listen");

	return fd;
}

static int udp_socket(void)
{
	struct sockaddr_in addr;
	int fd;
	int rc;

	fd = socket(AF_INET, SOCK_DGRAM, 0);
	DIE(fd < 0, "socket");

	memset(&addr, 0, sizeof(addr));
	addr.sin_family = AF_INET;
	addr.sin_port = htons(PORT);
	addr.sin_addr.s_addr = htonl(INADDR_LOOPBACK);
	rc = bind(fd, (struct sockaddr *)&addr, sizeof(addr));
	DIE(rc < 0, "bind");

	return fd;
}

static int unix_socket(void)
{
	struct sockaddr_un addr;
	int fd;
	int rc;

	fd = socket(AF_UNIX, SOCK_STREAM, 0);
	DIE(fd < 0, "socket");

	memset(&addr, 0, sizeof(addr));
	addr.sun_family = AF_UNIX;
	snprintf(addr.sun_path, sizeof(addr.sun_path), "%s", SOCKET_PATH);
	unlink(SOCKET_PATH);
	rc = bind(fd, (struct sockaddr *)&addr, sizeof(addr));
	DIE(rc < 0, "bind");

	return fd;
}

int main(void)
{
	int file_fd, dev_fd, fifo_fd, unix_fd, tcp_fd, udp_fd;
	int pipe_fds[2];
	int rc;

	/* File-like: the other end is a file or a device. */
	file_fd = open(FILE_PATH, O_RDONLY);
	DIE(file_fd < 0, "open");
	dev_fd = open("/dev/null", O_WRONLY);
	DIE(dev_fd < 0, "open");

	/* Socket-like: the other end is a process. */
	rc = pipe(pipe_fds);
	DIE(rc < 0, "pipe");

	unlink(FIFO_PATH);
	rc = mkfifo(FIFO_PATH, 0644);
	DIE(rc < 0, "mkfifo");
	/* Read and write, so that open() does not wait for a peer. */
	fifo_fd = open(FIFO_PATH, O_RDWR);
	DIE(fifo_fd < 0, "open");

	unix_fd = unix_socket();
	tcp_fd = tcp_listener();
	udp_fd = udp_socket();

	printf("fd  type          found by others through  leads to\n");
	show(0, "nothing: inherited");
	show(1, "nothing: inherited");
	show(2, "nothing: inherited");
	show(file_fd, "a path");
	show(dev_fd, "a path");
	show(pipe_fds[0], "nothing: inherited");
	show(pipe_fds[1], "nothing: inherited");
	show(fifo_fd, "a path");
	show(unix_fd, "a path");
	show(tcp_fd, "TCP port 4242");
	show(udp_fd, "UDP port 4242");

	if (isatty(STDIN_FILENO)) {
		printf("\nprocess %d; press ENTER to end ...", getpid());
		fflush(stdout);
		getchar();
	}

	/* The names in the file system outlive the channels; remove them. */
	unlink(FIFO_PATH);
	unlink(SOCKET_PATH);

	return 0;
}
