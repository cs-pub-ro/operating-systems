// SPDX-License-Identifier: BSD-3-Clause

/*
 * Eight threads use one database, through libdb.so.  Every thread works on
 * records of its own: it adds them, looks them up, renames some and
 * removes others, in an order fixed in advance.  No thread touches another
 * thread's records, so what every call must return, and what the database
 * must hold at the end, do not depend on the order the threads run in.  If
 * all of it checks out, the flag is printed.
 *
 *     ./chall [timeout]
 *
 * The timeout is in seconds, 20 if not given, and 0 means no timeout.
 */

#include <signal.h>
#include <stdarg.h>
#include <stdatomic.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <pthread.h>

#include "db.h"
#include "flag.h"

#define NUM_THREADS	8
#define NUM_RECORDS	1000	/* records every thread adds */
#define TIMEOUT		20
#define MAX_COMPLAINTS	5

static struct database *db;
static atomic_long errors;

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
		"Timed out: a thread is waiting for a lock that is never released.\n";
	ssize_t rc;

	(void)sig;
	rc = write(STDERR_FILENO, msg, sizeof(msg) - 1);
	(void)rc;
	_exit(2);
}

/* Record number `i` of thread `t`: its id, and its two possible names. */
static int record_id(int t, int i)
{
	return (t + 1) * 1000000 + i;
}

static void first_name(char *name, int t, int i)
{
	snprintf(name, NAME_LEN, "user-%d-%d", t, i);
}

static void second_name(char *name, int t, int i)
{
	snprintf(name, NAME_LEN, "renamed-%d-%d", t, i);
}

/* Look a record up, and check that it has the name it should have. */
static void check_record(int t, int i, const char *name)
{
	struct record record;

	if (db_find(db, record_id(t, i), &record) != 0)
		complain("record %d is in the database, and was not found\n",
			 record_id(t, i));
	else if (strcmp(record.name, name) != 0)
		complain("record %d is named \"%.31s\", and should be \"%s\"\n",
			 record_id(t, i), record.name, name);
}

/*
 * What a thread does with its records, in order of `i`:
 *
 *   - every record is added, and looked up;
 *   - when i is odd, record i - 1 is renamed, and looked up;
 *   - when i is 3, 7, 11, ..., record i - 2 is removed, then removed again,
 *     which has to fail, and looked up, which has to fail too.
 *
 * At the end the records with i = 1, 5, 9, ... are gone, the ones with an
 * even i have their second name, and the rest have their first.
 */
static void *use_db(void *arg)
{
	int t = (int)(size_t)arg;
	char name[NAME_LEN];
	struct record record;
	int i;

	for (i = 0; i < NUM_RECORDS; i++) {
		first_name(name, t, i);
		if (db_add(db, record_id(t, i), name) != 0)
			complain("record %d could not be added\n", record_id(t, i));
		check_record(t, i, name);

		if (i % 2 == 1) {
			second_name(name, t, i - 1);
			if (db_update(db, record_id(t, i - 1), name) != 0)
				complain("record %d could not be renamed\n",
					 record_id(t, i - 1));
			check_record(t, i - 1, name);
		}

		if (i % 4 == 3) {
			if (db_remove(db, record_id(t, i - 2)) != 0)
				complain("record %d could not be removed\n",
					 record_id(t, i - 2));
			if (db_remove(db, record_id(t, i - 2)) == 0)
				complain("record %d was removed twice\n",
					 record_id(t, i - 2));
			if (db_find(db, record_id(t, i - 2), &record) == 0)
				complain("record %d was removed, and is still found\n",
					 record_id(t, i - 2));
		}
	}

	return NULL;
}

int main(int argc, char *argv[])
{
	pthread_t threads[NUM_THREADS];
	size_t expected = 0, right = 0;
	struct record record;
	char name[NAME_LEN];
	uint64_t proof[3] = { 0, 0, 0 };
	int t, i, rc;

	signal(SIGALRM, on_alarm);
	alarm(argc > 1 ? atoi(argv[1]) : TIMEOUT);

	db = db_create();
	if (db == NULL) {
		fprintf(stderr, "db_create() failed\n");
		return 1;
	}

	for (t = 0; t < NUM_THREADS; t++) {
		rc = pthread_create(&threads[t], NULL, use_db, (void *)(size_t)t);
		if (rc != 0) {
			fprintf(stderr, "pthread_create: %s\n", strerror(rc));
			return 1;
		}
	}

	for (t = 0; t < NUM_THREADS; t++)
		pthread_join(threads[t], NULL);

	/* With the threads gone, look at every record that should be there. */
	for (t = 0; t < NUM_THREADS; t++) {
		for (i = 0; i < NUM_RECORDS; i++) {
			if (i % 4 == 1)
				continue;
			expected++;
			if (i % 2 == 0)
				second_name(name, t, i);
			else
				first_name(name, t, i);
			if (db_find(db, record_id(t, i), &record) == 0 &&
			    strcmp(record.name, name) == 0) {
				right++;
				proof[2] += flag_hash(FLAG_SEED, record.name,
						      strlen(record.name));
			} else {
				complain("at the end, record %d is missing or misnamed\n",
					 record_id(t, i));
			}
		}
	}

	proof[0] = db_count(db);
	proof[1] = right;

	printf("records in the database:      %zu (expected %zu)\n",
	       (size_t)proof[0], expected);
	printf("records with the right name:  %zu (expected %zu)\n", right, expected);
	printf("calls with a wrong result:    %ld\n", atomic_load(&errors));

	db_destroy(db);

	if (atomic_load(&errors) != 0 || proof[0] != expected) {
		printf("No flag: the database does not hold what was put in it.\n");
		return 1;
	}

	return flag_print(proof, 3);
}
