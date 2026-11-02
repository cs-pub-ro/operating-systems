#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>

#include "utils.h"

#define NUM_THREADS	3
#define NUM_SECONDS	30

static void wait_for_input(const char *msg)
{
	char buf[32];

	printf(" * %s\n", msg);
	printf(" -- Press ENTER to continue ...\n"); fflush(stdout);
	fgets(buf, 32, stdin);
}

/* Thread just sleeps. */
static void *thread_sleep(void *arg)
{
	sleep(NUM_SECONDS);
	return NULL;
}

int main(void)
{
	pthread_t thread_ids[NUM_THREADS];
	int rc;

	/* Create NUM_THREADS threads. */
	for (unsigned int i = 0; i < NUM_THREADS; i++) {
		wait_for_input("creating a new thread");
		rc = pthread_create(&thread_ids[i], NULL, thread_sleep, NULL);
		DIE(rc < 0, "pthread_create");
	}

	puts("Waiting for threads.");
	/* Wait for threads. */
	for (unsigned int i = 0; i < NUM_THREADS; i++) {
		rc = pthread_join(thread_ids[i], NULL);
		DIE(rc < 0, "pthread_join");
	}
	puts("Threads have ended.");

	wait_for_input("before program end");

	return 0;
}
