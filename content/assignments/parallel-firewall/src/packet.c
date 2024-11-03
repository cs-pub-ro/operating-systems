// SPDX-License-Identifier: BSD-3-Clause

#include "packet.h"

#define HASH_ITER 50

unsigned long packet_hash(const struct so_packet_t *pkt)
{
	unsigned long hash = 5381;
	char *pkt_it;

	for (int iter = 0; iter < HASH_ITER; iter++) {
		pkt_it = (char *)pkt;
		for (int i = 0; i < PKT_SZ; i++) {
			hash = ((hash << 5) + hash) + *pkt_it;
			pkt_it++;
		}
	}

	return hash;
}

static struct range {
	unsigned int start;
	unsigned int end;
} allowed_sources_range[] = {
	{
		.start = 0xf1000000,
		.end   = 0xf1ffffff,
	}, {
		.start = 0x1f1f1f1f,
		.end   = 0x1f1f1f1f,
	}, {
		.start = 0x80000000,
		.end   = 0xffffffff,
	}
};

so_action_t process_packet(const struct so_packet_t *pkt)
{
	const int sz = sizeof(allowed_sources_range) / sizeof(allowed_sources_range[0]);

	for (int i = 0; i < sz; i++) {
		if (allowed_sources_range[i].start <= pkt->hdr.source &&
				pkt->hdr.source <= allowed_sources_range[i].end)
			return PASS;
	}

	return DROP;
}
