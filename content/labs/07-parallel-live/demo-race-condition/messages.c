// SPDX-License-Identifier: BSD-3-Clause

/*
 * Several threads write messages to one shared file, each a given number of
 * times.  A message is one line, "thread <t>: message <i>", and it is
 * written in three calls to write().  Nothing keeps the three calls of one
 * message together: run it and count the lines that came out whole.
 *
 *     ./messages <threads> <messages-per-thread>
 *     ./messages 4 1000
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <pthread.h>
#include <unistd.h>

#define MAX_THREADS	64
#define LOG_FILE	"messages.txt"

/* The shared file: every thread writes to this one descriptor. */
static int log_fd;

/*
 * TODO 1: declare a mutex to keep the three writes of a message together.
 */

/* How many messages each thread writes; set once, before the threads start. */
static long messages;

/* Write a string to the shared file, with one call to write(). */
static void put(const char *s)
{
	if (write(log_fd, s, strlen(s)) < 0) {
		perror("write");
		exit(1);
	}
}

/* What every thread runs. */
static void *write_messages(void *arg)
{
	long id = (long) arg;
	char who[32], num[32];
	long i;

	for (i = 0; i < messages; i++) {
		snprintf(who, sizeof(who), "thread %ld", id);
		snprintf(num, sizeof(num), "%ld\n", i);

		/*
		 * TODO 3: these three calls are the critical section: no other
		 * thread may write between the first and the last.  Lock the
		 * mutex before them and unlock it after.
		 */
		put(who);
		put(": message ");
		put(num);
	}

	return NULL;
}

/*
 * Count the lines of the file that are whole messages, exactly
 * "thread <t>: message <i>" and nothing else.  Already written.
 */
static long count_whole(const char *path, int nthreads)
{
	char *line = NULL;
	size_t cap = 0;
	long whole = 0, t, i;
	FILE *f;
	int end;

	f = fopen(path, "r");
	if (f == NULL) {
		perror(path);
		exit(1);
	}

	while (getline(&line, &cap, f) != -1) {
		end = 0;
		if (sscanf(line, "thread %ld: message %ld%n", &t, &i, &end) == 2 &&
		    strcmp(line + end, "\n") == 0 &&
		    t >= 0 && t < nthreads && i >= 0 && i < messages)
			whole++;
	}

	free(line);
	fclose(f);

	return whole;
}

int main(int argc, char *argv[])
{
	pthread_t threads[MAX_THREADS];
	int nthreads, rc;
	long i;

	if (argc != 3) {
		fprintf(stderr, "Usage: %s <threads> <messages-per-thread>\n", argv[0]);
		return 1;
	}

	nthreads = atoi(argv[1]);
	messages = atol(argv[2]);
	if (nthreads < 1 || nthreads > MAX_THREADS || messages < 1) {
		fprintf(stderr, "threads must be between 1 and %d, messages at least 1\n",
			MAX_THREADS);
		return 1;
	}

	log_fd = open(LOG_FILE, O_WRONLY | O_CREAT | O_TRUNC, 0644);
	if (log_fd < 0) {
		perror(LOG_FILE);
		return 1;
	}

	/*
	 * TODO 2: initialize the mutex, before any thread can use it, and
	 * destroy it once the threads are gone.
	 */

	for (i = 0; i < nthreads; i++) {
		rc = pthread_create(&threads[i], NULL, write_messages, (void *) i);
		if (rc != 0) {
			fprintf(stderr, "pthread_create: %s\n", strerror(rc));
			return 1;
		}
	}

	for (i = 0; i < nthreads; i++)
		pthread_join(threads[i], NULL);

	close(log_fd);

	printf("messages written: %ld\n", nthreads * messages);
	printf("whole lines:      %ld\n", count_whole(LOG_FILE, nthreads));

	return 0;
}
