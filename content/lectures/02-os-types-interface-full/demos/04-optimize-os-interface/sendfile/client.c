#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 8080
#define BUFFER_SIZE 1024

int main(void)
{
	int sock = 0;
	struct sockaddr_in serv_addr;
	char buffer[BUFFER_SIZE] = {0};
	const char *filename = "received_file.dat";
	int rc;

	sock = socket(AF_INET, SOCK_STREAM, 0);
	if (sock < 0) {
		printf("\n Socket creation error \n");
		return -1;
	}

	serv_addr.sin_family = AF_INET;
	serv_addr.sin_port = htons(PORT);

	rc = inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr);
	if (rc < 0) {
		printf("\nInvalid address/ Address not supported \n");
		return -1;
	}

	rc = connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr));
	if (rc < 0) {
		printf("\nConnection Failed \n");
		return -1;
	}

	FILE *fp = fopen(filename, "wb");
	if (fp == NULL) {
		perror("Error opening file");
		return -1;
	}

	size_t bytes_received;
	while ((bytes_received = recv(sock, buffer, BUFFER_SIZE, 0)) > 0) {
		fwrite(buffer, 1, bytes_received, fp);
	}

	fclose(fp);
	close(sock);

	printf("File received and saved as %s\n", filename);

	return 0;
}
