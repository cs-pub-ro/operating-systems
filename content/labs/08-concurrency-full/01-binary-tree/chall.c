// SPDX-License-Identifier: BSD-3-Clause

/*
 * Eight threads work on one binary search tree, through libtree.so.  Every
 * thread has keys of its own: it inserts all of them, looking some of them
 * up on the way, then removes half.  No thread ever touches another
 * thread's keys, so what each call must return, and what the tree must hold
 * at the end, do not depend on the order the threads run in.  If all of it
 * checks out, the flag is printed.
 *
 *     ./chall [timeout]
 *
 * The timeout is in seconds, 10 if not given, and 0 means no timeout.
 */

#include <signal.h>
#include <stdarg.h>
#include <stdatomic.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <pthread.h>

#include "tree.h"
#include "flag.h"

#define NUM_THREADS	8
#define NUM_KEYS	4000	/* keys per thread */
#define TIMEOUT		10
#define MAX_COMPLAINTS	5

static struct tree *tree;
static int keys[NUM_THREADS][NUM_KEYS];
static atomic_long errors;

/* What the final walk over the tree found. */
struct walk {
	size_t count;		/* keys visited                          */
	long long sum;		/* their sum                             */
	int last;		/* the key visited before this one       */
	size_t unordered;	/* keys not greater than the one before  */
};

/* Count something that went wrong, and print the first few. */
static void complain(const char *fmt, ...)
{
	va_list args;

	if (atomic_fetch_add(&errors, 1) >= MAX_COMPLAINTS)
		return;

	va_start(args, fmt);
	vfprintf(stderr, fmt, args);
	va_end(args);
}

/* The threads did not finish in time: say so, and give up. */
static void on_alarm(int sig)
{
	static const char msg[] =
		"Timed out: a thread is waiting for something that never comes, or is lost in the tree.\n";
	ssize_t rc;

	(void)sig;
	rc = write(STDERR_FILENO, msg, sizeof(msg) - 1);
	(void)rc;
	_exit(2);
}

/*
 * The keys of thread `id`: NUM_KEYS numbers that leave the remainder `id`
 * when divided by NUM_THREADS, in a shuffled order that is the same on
 * every run.  Sorted keys would make the tree a list.
 */
static void make_keys(int id)
{
	unsigned int state = 2463534242u + id;
	int i, j, tmp;

	for (i = 0; i < NUM_KEYS; i++)
		keys[id][i] = i * NUM_THREADS + id;

	for (i = NUM_KEYS - 1; i > 0; i--) {
		state ^= state << 13;
		state ^= state >> 17;
		state ^= state << 5;
		j = state % (i + 1);
		tmp = keys[id][i];
		keys[id][i] = keys[id][j];
		keys[id][j] = tmp;
	}
}

static void *use_tree(void *arg)
{
	int id = (int)(size_t)arg;
	int i, key;

	/* Insert every key; look up every fourth one right after. */
	for (i = 0; i < NUM_KEYS; i++) {
		key = keys[id][i];
		if (tree_insert(tree, key) != 1)
			complain("thread %d: key %d could not be inserted\n", id, key);
		if (i % 4 == 0 && tree_contains(tree, key) != 1)
			complain("thread %d: key %d was inserted, and is not found\n",
				 id, key);
	}

	/* Remove every second key; check that it is gone, and its neighbour not. */
	for (i = 1; i < NUM_KEYS; i += 2) {
		key = keys[id][i];
		if (tree_remove(tree, key) != 1)
			complain("thread %d: key %d could not be removed\n", id, key);
		if (i % 4 == 1 && tree_contains(tree, key) != 0)
			complain("thread %d: key %d was removed, and is still found\n",
				 id, key);
		if (tree_contains(tree, keys[id][i - 1]) != 1)
			complain("thread %d: key %d was not removed, and is not found\n",
				 id, keys[id][i - 1]);
	}

	return NULL;
}

static void visit(int key, void *arg)
{
	struct walk *walk = arg;

	if (walk->count > 0 && key <= walk->last)
		walk->unordered++;
	walk->last = key;
	walk->count++;
	walk->sum += key;
}

int main(int argc, char *argv[])
{
	pthread_t threads[NUM_THREADS];
	struct walk walk = { 0 };
	long long expected_sum = 0;
	size_t expected_count = 0;
	uint64_t proof[3];
	size_t i, size;
	int j, rc;

	signal(SIGALRM, on_alarm);
	alarm(argc > 1 ? atoi(argv[1]) : TIMEOUT);

	/* What must be left: the keys at the even positions of every thread. */
	for (i = 0; i < NUM_THREADS; i++) {
		make_keys(i);
		for (j = 0; j < NUM_KEYS; j += 2) {
			expected_sum += keys[i][j];
			expected_count++;
		}
	}

	tree = tree_create();
	if (tree == NULL) {
		fprintf(stderr, "tree_create() failed\n");
		return 1;
	}

	for (i = 0; i < NUM_THREADS; i++) {
		rc = pthread_create(&threads[i], NULL, use_tree, (void *)i);
		if (rc != 0) {
			fprintf(stderr, "pthread_create: %s\n", strerror(rc));
			return 1;
		}
	}

	for (i = 0; i < NUM_THREADS; i++)
		pthread_join(threads[i], NULL);

	tree_walk(tree, visit, &walk);
	size = tree_size(tree);

	printf("keys found by walking the tree: %zu (expected %zu)\n", walk.count,
	       expected_count);
	printf("size kept by the tree:          %zu (expected %zu)\n", size,
	       expected_count);
	printf("sum of the keys:                %lld (expected %lld)\n", walk.sum,
	       expected_sum);
	printf("keys out of order:              %zu\n", walk.unordered);
	printf("calls with a wrong result:      %ld\n", atomic_load(&errors));

	tree_destroy(tree);

	if (atomic_load(&errors) != 0 || walk.unordered != 0) {
		printf("No flag: the tree did not behave like a tree.\n");
		return 1;
	}

	proof[0] = walk.count;
	proof[1] = size;
	proof[2] = walk.sum;

	return flag_print(proof, 3);
}
