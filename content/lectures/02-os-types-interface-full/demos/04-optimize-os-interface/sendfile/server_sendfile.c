#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <time.h>
#include <sys/sendfile.h>

#define diff_us(ta, tb)		\
	(((ta).tv_sec - (tb).tv_sec) * 1000 * 1000 + \
	 ((ta).tv_nsec - (tb).tv_nsec) / 1000)

#define PORT 8080

static void serve_file(int client_socket, const char *filename)
{
	struct timespec time_before, time_after;
	int fd;
	int rc;
	
	fd = open(filename, O_RDONLY);
	if (fd == -1) {
		perror("Error opening file");
		return;
	}

	struct stat file_stat;
	rc = fstat(fd, &file_stat);
	if (rc < 0) {
		perror("Error getting file status");
		close(fd);
		return;
	}

	off_t offset = 0;
	clock_gettime(CLOCK_REALTIME, &time_before);
	ssize_t bytes_sent = sendfile(client_socket, fd, &offset, file_stat.st_size);
	clock_gettime(CLOCK_REALTIME, &time_after);
	printf("time passed %ld microseconds\n", diff_us(time_after, time_before));
	if (bytes_sent == -1) {
		perror("Error sending file");
	} else {
		printf("Sent %zd bytes\n", bytes_sent);
	}

	close(fd);
}

int main(void)
{
	int server_fd, client_socket;
	struct sockaddr_in address;
	int addrlen = sizeof(address);
	const char *filename = "example.dat";
	int rc;

	server_fd = socket(AF_INET, SOCK_STREAM, 0);
	if (server_fd < 0) {
		perror("Socket creation failed");
		exit(EXIT_FAILURE);
	}

	/* Set socket option to reuse address and port. */
	int opt = 1;
	rc = setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
	if (rc < 0) {
	    perror("setsockopt");
	    exit(EXIT_FAILURE);
	}

	address.sin_family = AF_INET;
	address.sin_addr.s_addr = INADDR_ANY;
	address.sin_port = htons(PORT);

	rc = bind(server_fd, (struct sockaddr *)&address, sizeof(address));
	if (rc < 0) {
		perror("Bind failed");
		exit(EXIT_FAILURE);
	}

	rc = listen(server_fd, 3);
	if (rc < 0) {
		perror("Listen failed");
		exit(EXIT_FAILURE);
	}

	printf("Server listening on port %d\n", PORT);

	while (1) {
		client_socket = accept(server_fd, (struct sockaddr *)&address, (socklen_t *)&addrlen);
		if (client_socket < 0) {
			perror("Accept failed");
			continue;
		}

		printf("Client connected\n");
		serve_file(client_socket, filename);
		close(client_socket);
	}

	return 0;
}
