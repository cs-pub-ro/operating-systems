/* SPDX-License-Identifier: BSD-3-Clause */

/*
 * A bounded queue: producers put items in, consumers get them out, first
 * in first out.  A producer waits while the queue is full, and a consumer
 * waits while it is empty.
 *
 * The library is libqueue.so, built from queue.c.  `struct queue` is
 * defined there: the executable only ever holds a pointer to one.
 */

#ifndef QUEUE_H_
#define QUEUE_H_	1

#include <stddef.h>

struct queue;

/* A new, empty queue with room for `capacity` items; NULL if out of memory. */
struct queue *queue_create(size_t capacity);

void queue_destroy(struct queue *queue);

/* Add an item at the end.  Waits for as long as the queue is full. */
void queue_put(struct queue *queue, long item);

/* Take the item at the front.  Waits for as long as the queue is empty. */
long queue_get(struct queue *queue);

#endif
