// SPDX-License-Identifier: BSD-3-Clause

/*
 * A bounded queue: producers put items in, consumers get them out, first
 * in first out.  A producer waits while the queue is full, and a consumer
 * waits while it is empty.
 *
 * The items are kept in a circular buffer.  A mutex protects it, and a
 * condition variable is where threads wait.  With one producer and one
 * consumer this works.  With several of each it does not.
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
	pthread_cond_t changed;	/* an item was put in, or taken out        */
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
	pthread_cond_init(&queue->changed, NULL);

	return queue;
}

void queue_destroy(struct queue *queue)
{
	pthread_cond_destroy(&queue->changed);
	pthread_mutex_destroy(&queue->lock);
	free(queue->items);
	free(queue);
}

/*
 * TODO 1: a producer that was woken up goes on to store its item.  What
 * does it know about the queue at that moment?  The same question for the
 * consumer in queue_get().
 * TODO 2: producers and consumers sleep on the same condition variable,
 * and one thread is woken up at a time.  Which thread?  Make sure that a
 * thread that can go on is never left asleep.
 */
void queue_put(struct queue *queue, long item)
{
	pthread_mutex_lock(&queue->lock);

	if (queue->count == queue->capacity)
		pthread_cond_wait(&queue->changed, &queue->lock);

	queue->items[queue->tail] = item;
	queue->tail = (queue->tail + 1) % queue->capacity;
	queue->count++;

	pthread_cond_signal(&queue->changed);
	pthread_mutex_unlock(&queue->lock);
}

long queue_get(struct queue *queue)
{
	long item;

	pthread_mutex_lock(&queue->lock);

	if (queue->count == 0)
		pthread_cond_wait(&queue->changed, &queue->lock);

	item = queue->items[queue->head];
	queue->head = (queue->head + 1) % queue->capacity;
	queue->count--;

	pthread_cond_signal(&queue->changed);
	pthread_mutex_unlock(&queue->lock);

	return item;
}
