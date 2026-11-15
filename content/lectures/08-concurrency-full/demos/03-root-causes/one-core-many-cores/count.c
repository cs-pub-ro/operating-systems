/*
 * NUM_THREADS threads each add 1 to a shared counter, NUM_ROUNDS times.
 * How the addition is done is chosen when the file is compiled:
 *
 *   (nothing)       counter = counter + 1: load, add, store
 *   -DONE_INSN      one instruction that adds to memory (x86 only)
 *   -DLOCKED_INSN   the same instruction, with the lock prefix (x86 only)
 *
 * Run each on every core, then on one: taskset -c 0 ./count
 */

#include <stdio.h>
#include <pthread.h>
#include <sys/resource.h>

#include "utils.h"

#define NUM_THREADS	8
#define NUM_ROUNDS	50000000UL

static unsigned long counter;

static inline void add_one(void)
{
#if defined(LOCKED_INSN)
	__asm__ volatile("lock addq $1, %0" : "+m"(counter));
#elif defined(ONE_INSN)
	__asm__ volatile("addq $1, %0" : "+m"(counter));
#else
	counter = counter + 1;
#endif
}

static void *count(void *arg)
{
	unsigned long i;

	for (i = 0; i < NUM_ROUNDS; i++)
		add_one();

	return NULL;
}

int main(void)
{
	unsigned long expected = NUM_THREADS * NUM_ROUNDS;
	pthread_t th[NUM_THREADS];
	struct rusage ru;
	size_t t;
	int rc;

	for (t = 0; t < NUM_THREADS; t++) {
		rc = pthread_create(&th[t], NULL, count, NULL);
		DIE(rc != 0, "pthread_create");
	}

	for (t = 0; t < NUM_THREADS; t++) {
		rc = pthread_join(th[t], NULL);
		DIE(rc != 0, "pthread_join");
	}

	getrusage(RUSAGE_SELF, &ru);

	printf("counter: %lu  expected: %lu  lost: %lu (%.1f%%)\n",
	       counter, expected, expected - counter,
	       100.0 * (expected - counter) / expected);
	printf("involuntary context switches: %ld\n", ru.ru_nivcsw);

	return 0;
}
