// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>
#include <sys/types.h>

#include "./utils/utils.h"

#define __unused __attribute_maybe_unused__

static void wait_for_input(const char *msg)
{
	char buffer[128];

	printf("%s ...", msg);
	fgets(buffer, 128, stdin);
}


static void *sleep_wrapper(void __unused * data)
{
	sleep(5);
	return NULL;
}

/* TODO 8: Define sleep_wrapper2() which should print the threadID */
static void *sleep_wrapper2(void *data)
{
	int id = *(int *)data;

	sleep(2);
	printf("Thread [%d] done\n", id);
	return NULL;
}

/* REPLACE 1 */
/* static void *sleep_wrapper2(void __unused *data); */

/* TODO 13: Define sleep_wrapper3() which should print the threadID and sleep for a variable time */
struct _thread_data {
	int id;
	int sleep_time;
};

static void *sleep_wrapper3(void *data)
{
	struct _thread_data *thread_data = (struct _thread_data *)data;

	sleep(thread_data->sleep_time);
	printf("Thread [%d] done after %d seconds\n", thread_data->id, thread_data->sleep_time);
	return NULL;
}

/* REPLACE 1 */
/* static void *sleep_wrapper3(void __unused *data); */

#define NUM_THREADS 5

int main(void)
{
	size_t i;
	pthread_t tid[NUM_THREADS];
	int rc;

	/* REMOVE 8 */
	struct _thread_data thread_data[NUM_THREADS] = {
		{0, 2},
		{1, 3},
		{2, 1},
		{3, 4},
		{4, 2}
	};

	/* TODO 1: Define an array of thread ids*/
	int thread_id[NUM_THREADS] = {0, 1, 2, 3, 4};

	for (i = 0; i < NUM_THREADS; i++) {
		wait_for_input("Press key to create new thread");
		/* TODO 1: Create a new thread using sleep_wrapper3() */
		rc = pthread_create(&tid[i], NULL, sleep_wrapper3, &thread_data[i]);

		/* TODO 1: Create a new thread using sleep_wrapper2() */
		rc = pthread_create(&tid[i], NULL, sleep_wrapper2, &thread_id[i]);

		/* REPLACE 1 */
		/* rc = pthread_create(&tid[i], NULL, sleep_wrapper, NULL); */

		DIE(rc < 0, "pthread_create");
		printf("Thread [%zu] created\n", i);
	}

	wait_for_input("Press key to wait for threads");
	for (i = 0; i < NUM_THREADS; i++) {
		pthread_join(tid[i], NULL);
		printf("Thread [%zu] joined\n", i);
	}

	return 0;
}
