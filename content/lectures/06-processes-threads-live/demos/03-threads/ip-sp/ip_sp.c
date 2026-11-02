#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>

#include "utils.h"

#define NUM_THREADS	3
#define NUM_SECONDS	30

#define ADDRESS_HERE()	({ void *p; __asm__ volatile ("leaq 0(%%rip), %0" : "=r"(p)); p; })

/* Thread just sleeps. */
static void *thread_sleep1(void *arg)
{
	int placeholder;

	printf("[thread %ld] IP: %p, SP: %p\n", pthread_self(), ADDRESS_HERE(), &placeholder);

	sleep(NUM_SECONDS);

	return NULL;
}

/* Thread just sleeps. */
static void *thread_sleep2(void *arg)
{
	int placeholder;

	printf("[thread %ld] IP: %p, SP: %p\n", pthread_self(), ADDRESS_HERE(), &placeholder);

	sleep(NUM_SECONDS);

	return NULL;
}

int main(void)
{
	pthread_t thread_ids1[NUM_THREADS];
	pthread_t thread_ids2[NUM_THREADS];
	int rc;

	/* Create NUM_THREADS threads for thread_sleep1() function. */
	for (unsigned int i = 0; i < NUM_THREADS; i++) {
		rc = pthread_create(&thread_ids1[i], NULL, thread_sleep1, NULL);
		DIE(rc < 0, "pthread_create");
	}

	/* Create NUM_THREADS threads for thread_sleep2() function. */
	for (unsigned int i = 0; i < NUM_THREADS; i++) {
		rc = pthread_create(&thread_ids2[i], NULL, thread_sleep2, NULL);
		DIE(rc < 0, "pthread_create");
	}

	puts("Waiting for threads.");
	/* Wait for threads. */
	for (unsigned int i = 0; i < NUM_THREADS; i++) {
		rc = pthread_join(thread_ids1[i], NULL);
		DIE(rc < 0, "pthread_join");
	}
	for (unsigned int i = 0; i < NUM_THREADS; i++) {
		rc = pthread_join(thread_ids2[i], NULL);
		DIE(rc < 0, "pthread_join");
	}
	puts("Threads have ended.");

	return 0;
}
