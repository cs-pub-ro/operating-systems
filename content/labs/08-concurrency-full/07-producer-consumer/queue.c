// SPDX-License-Identifier: BSD-3-Clause

/*
 * A bounded queue: producers put items in, consumers get them out, first
 * in first out.  A producer waits while the queue is full, and a consumer
 * waits while it is empty.
 *
 * The items are kept in a circular buffer.  A mutex protects it, and there
 * are two condition variables, one for each thing a thread can be waiting
 * for: producers wait for "not full", consumers for "not empty".
 */

#include <stdlib.h>
#include <pthread.h>

#include "queue.h"

struct queue {
	long *items;		/* the buffer: `capacity` slots            */
	size_t capacity;
	size_t count;		/* items in the buffer                     */
	size_t head;		/* slot of the item that leaves next       */
	size_t tail;		/* slot the next item goes into            */
	pthread_mutex_t lock;	/* protects all of the above               */
	pthread_cond_t not_full;	/* where producers wait             */
	pthread_cond_t not_empty;	/* where consumers wait             */
};

struct queue *queue_create(size_t capacity)
{
	struct queue *queue;

	queue = malloc(sizeof(*queue));
	if (queue == NULL)
		return NULL;

	queue->items = malloc(capacity * sizeof(*queue->items));
	if (queue->items == NULL) {
		free(queue);
		return NULL;
	}

	queue->capacity = capacity;
	queue->count = 0;
	queue->head = 0;
	queue->tail = 0;
	pthread_mutex_init(&queue->lock, NULL);
	pthread_cond_init(&queue->not_full, NULL);
	pthread_cond_init(&queue->not_empty, NULL);

	return queue;
}

void queue_destroy(struct queue *queue)
{
	pthread_cond_destroy(&queue->not_empty);
	pthread_cond_destroy(&queue->not_full);
	pthread_mutex_destroy(&queue->lock);
	free(queue->items);
	free(queue);
}

/*
 * The wait is in a loop.  Between the moment a producer is woken up and the
 * moment it has the lock again, another producer may have taken the free
 * slot; the condition is tested again, with the lock held, every time.
 *
 * The signal goes to `not_empty`: only consumers sleep there, so the thread
 * that is woken up is one that the new item is of use to.
 */
void queue_put(struct queue *queue, long item)
{
	pthread_mutex_lock(&queue->lock);

	while (queue->count == queue->capacity)
		pthread_cond_wait(&queue->not_full, &queue->lock);

	queue->items[queue->tail] = item;
	queue->tail = (queue->tail + 1) % queue->capacity;
	queue->count++;

	pthread_cond_signal(&queue->not_empty);
	pthread_mutex_unlock(&queue->lock);
}

/* The mirror image: wait for an item, take it, tell a producer about the slot. */
long queue_get(struct queue *queue)
{
	long item;

	pthread_mutex_lock(&queue->lock);

	while (queue->count == 0)
		pthread_cond_wait(&queue->not_empty, &queue->lock);

	item = queue->items[queue->head];
	queue->head = (queue->head + 1) % queue->capacity;
	queue->count--;

	pthread_cond_signal(&queue->not_full);
	pthread_mutex_unlock(&queue->lock);

	return item;
}
