/*
 * Use multiple threads to modify a list.
 */

#include <stdlib.h>
#include <stdio.h>
#include <pthread.h>
#include <time.h>

#include "utils.h"
#include "list.h"

#define NUM_THREADS	10
#define NUM_ROUNDS	2000
#define MAX_ITEM	65536

enum list_action {
	ADD_ITEM,
	ADD_ITEM_TAIL,
	INSERT_ITEM,
	REMOVE_ITEM,
	SEARCH_ITEM,
	NO_ACTION
};

/* list head (sentinel) */
static struct int_list *head;

/*
 * One lock protects the whole list: the head, every node and the size.
 */
static pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

/*
 * Each thread does NUM_ROUNDS random actions.
 * The random numbers come from a seed each thread owns: nothing to share.
 */

static void *thread_fn(void *arg)
{
	unsigned int seed = (unsigned int)(size_t)arg;
	enum list_action action;
	size_t size, pos;
	size_t i;
	int item;

	for (i = 0; i < NUM_ROUNDS; i++) {
		/* Create random action. */
		action = rand_r(&seed) % NO_ACTION;
		item = rand_r(&seed) % MAX_ITEM;

		/*
		 * The critical section starts where the size is read: the
		 * position is chosen from the size, so the size must not change
		 * between the choice and the action that uses it.
		 */
		pthread_mutex_lock(&mutex);
		size = list_get_size(head);
		pos = size ? rand_r(&seed) % size : 0;

		switch (action) {
		case ADD_ITEM:
			list_add_item(head, item);
			break;
		case ADD_ITEM_TAIL:
			list_add_item_tail(head, item);
			break;
		case INSERT_ITEM:
			list_insert_item(head, pos, item);
			break;
		case REMOVE_ITEM:
			list_remove_item(head, pos);
			break;
		case SEARCH_ITEM:
			(void)list_search_item(head, item);
			break;
		default:
			break;
		}
		pthread_mutex_unlock(&mutex);
	}

	return NULL;
}

int main(void)
{
	pthread_t th[NUM_THREADS];
	unsigned int seed = time(NULL);
	size_t i;
	int rc;

	head = malloc(sizeof(*head));
	DIE(head == NULL, "malloc");
	list_init_head(head);

	/* Initialize list to 1024 items. */
	for (i = 0; i < 1024; i++)
		list_add_item(head, rand_r(&seed) % MAX_ITEM);

	for (i = 0; i < NUM_THREADS; i++) {
		rc = pthread_create(th + i, NULL, thread_fn,
				    (void *)(size_t)(seed + i));
		DIE(rc != 0, "pthread_create");
	}

	for (i = 0; i < NUM_THREADS; i++) {
		rc = pthread_join(th[i], NULL);
		DIE(rc != 0, "pthread_join");
	}

	printf("size kept by the list: %zu, nodes found by walking it: %zu\n",
	       list_get_size(head), list_count_items(head));

	return 0;
}
