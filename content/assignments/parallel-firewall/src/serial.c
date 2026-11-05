// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>

#include "consumer.h"
#include "packet.h"
#include "utils.h"

int main(int argc, char **argv)
{
	char buffer[PKT_SZ], out_buf[PKT_SZ];
	ssize_t sz;
	int in_fd, out_fd, len;

	if (argc < 3) {
		fprintf(stderr, "Usage %s <input-file> <output-file>\n", argv[0]);
		exit(EXIT_FAILURE);
	}

	in_fd = open(argv[1], O_RDONLY);
	DIE(in_fd < 0, "open");

	out_fd = open(argv[2], O_RDWR|O_CREAT|O_TRUNC, 0666);
	DIE(out_fd < 0, "open");

	while ((sz = read(in_fd, buffer, PKT_SZ)) != 0) {
		DIE(sz != PKT_SZ, "packet truncated");

		struct so_packet_t *pkt = (struct so_packet_t *)buffer;

		int action = process_packet(pkt);
		unsigned long hash = packet_hash(pkt);
		unsigned long timestamp = pkt->hdr.timestamp;

		len = snprintf(out_buf, 256, "%s %016lx %lu\n",
			RES_TO_STR(action), hash, timestamp);
		write(out_fd, out_buf, len);
	}

	close(in_fd);
	close(out_fd);

	return 0;
}

