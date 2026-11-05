// SPDX-License-Identifier: BSD-3-Clause

#include <string.h>
#include <unistd.h>
#include <fcntl.h>

#include "ring_buffer.h"
#include "packet.h"
#include "utils.h"
#include "producer.h"

void publish_data(so_ring_buffer_t *rb, const char *filename)
{
	char buffer[PKT_SZ];
	ssize_t sz;
	int fd;

	fd = open(filename, O_RDONLY);
	DIE(fd < 0, "open");

	while ((sz = read(fd, buffer, PKT_SZ)) != 0) {
		DIE(sz != PKT_SZ, "packet truncated");

		/* enequeue packet into ring buffer */
		ring_buffer_enqueue(rb, buffer, sz);
	}

	ring_buffer_stop(rb);
}
