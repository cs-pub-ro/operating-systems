// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <pthread.h>

// The assembly functions for incrementing and decrementing
extern void increment_var(void);
extern void decrement_var(void);
extern int var;
extern int NUM_ITER;

void *thread_increment(void *arg)
{
	increment_var();
	return NULL;
}

void *thread_decrement(void *arg)
{
	decrement_var();
	return NULL;
}

int NUM_ITER = 10000000;

int main(void)
{
	pthread_t thread1, thread2;

	pthread_create(&thread1, NULL, thread_increment, NULL);
	pthread_create(&thread2, NULL, thread_decrement, NULL);

	pthread_join(thread1, NULL);
	pthread_join(thread2, NULL);

	printf("var = %d\n", var);

	return 0;
}
