/*
 * Use multiple threads to modify a list.
 */

#include <stdlib.h>
#include <stdio.h>
#include <pthread.h>
#include <unistd.h>
#include <sys/wait.h>
#include <semaphore.h>
#include <time.h>

#include "utils.h"
#include "list.h"

#define NUM_THREADS	10
#define NUM_ROUNDS	1000
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
 * Each thread does NUM_ROUNDS random actions.
 */

static void *thread_fn(void *arg)
{
	size_t i;
	enum list_action action;
	int item;
	size_t size, pos;

	sleep(1);

	for (i = 0; i < NUM_ROUNDS; i++) {
		/* Create random action. */
		action = rand() % NO_ACTION;

		switch (action) {
		case ADD_ITEM:
			item = rand() % MAX_ITEM;
			list_add_item(head, item);
			break;
		case ADD_ITEM_TAIL:
			item = rand() % MAX_ITEM;
			list_add_item_tail(head, item);
			break;
		case INSERT_ITEM:
			item = rand() % MAX_ITEM;
			size = list_get_size(head);
			pos = rand() % size;
			list_insert_item(head, pos, item);
			break;
		case REMOVE_ITEM:
			size = list_get_size(head);
			pos = rand() % size;
			list_remove_item(head, pos);
			break;
		case SEARCH_ITEM:
			item = rand() % MAX_ITEM;
			(void) list_search_item(head, item);
			break;
		default:
			break;
		}
	}

	return NULL;
}

int main(void)
{
	pthread_t th[NUM_THREADS];
	size_t i;
	int item;
	int rc;

	head = malloc(sizeof(*head));
	DIE(head == NULL, "malloc");
	list_init_head(head);

	/* Initialize random seed. */
	srand(time(NULL));

	/* Initialize list to 1024 items. */
	for (i = 0; i < 1024; i++) {
		item = rand();
		list_add_item(head, item);
	}

	for (i = 0; i < NUM_THREADS; i++) {
		rc = pthread_create(th + i, NULL, thread_fn, NULL);
		DIE(rc != 0, "pthread_create");
	}

	for (i = 0; i < NUM_THREADS; i++) {
		rc = pthread_join(th[i], NULL);
		DIE(rc != 0, "pthread_join");
	}

	return 0;
}
