/* SPDX-License-Identifier: BSD-3-Clause */

#ifndef __SO_PACKET_H__
#define __SO_PACKET_H__

/* For pleasing the checkpatch. */
#ifndef __packed
#define __packed __attribute((__packed__))
#endif /* __packed */

#define PKT_SZ 256

typedef enum {
	DROP = 0,
	PASS = 1,
} so_action_t;

#define RES_TO_STR(decision) ((decision == PASS) ? "PASS" : "DROP")

typedef struct __packed so_hdr_t {
	unsigned int source;
	unsigned int dest;
	unsigned long timestamp;
} so_hdr_t;

typedef struct __packed so_packet_t {
	so_hdr_t hdr;
	char payload[PKT_SZ - sizeof(so_hdr_t)];
} so_packet_t;

unsigned long packet_hash(const so_packet_t *pkt);
so_action_t process_packet(const so_packet_t *pkt);

#endif /* __SO_PACKET_H__ */
