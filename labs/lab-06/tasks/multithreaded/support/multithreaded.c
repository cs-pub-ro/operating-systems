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

/* TODO: Define sleep_wrapper2() which should print the threadID */

static void *sleep_wrapper2(void __unused *data);

/* TODO: Define sleep_wrapper3() which should print the threadID and sleep for a variable time */

static void *sleep_wrapper3(void __unused *data);

#define NUM_THREADS 5

int main(void)
{
	size_t i;
	pthread_t tid[NUM_THREADS];
	int rc;

	/* TODO: Define an array of thread ids*/

	for (i = 0; i < NUM_THREADS; i++) {
		wait_for_input("Press key to create new thread");
		/* TODO: Create a new thread using sleep_wrapper3() */

		/* TODO: Create a new thread using sleep_wrapper2() */

		rc = pthread_create(&tid[i], NULL, sleep_wrapper, NULL);

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
