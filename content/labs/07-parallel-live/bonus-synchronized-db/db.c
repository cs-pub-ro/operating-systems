// SPDX-License-Identifier: BSD-3-Clause

/*
 * The growable in-memory database of session 03, driven by files of
 * commands.  For now one thread runs the files one after another; they are
 * to be run at the same time, one thread per file, against the one database
 * they all share:
 *
 *     add <id> <name>      store a record
 *     find <id>            look a record up
 *
 *     ./db <commands-file>...
 *     ./db commands-1.txt commands-2.txt commands-3.txt commands-4.txt
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <pthread.h>

#define CHUNK		4
#define NAME_LEN	32
#define LINE_LEN	128
#define MAX_THREADS	64

struct record {
	int id;
	char name[NAME_LEN];
};

struct database {
	struct record *records;	/* heap array of `capacity` records        */
	size_t count;		/* records currently in use                */
	size_t capacity;	/* records the array can hold              */
	/* TODO 2: the database needs a mutex of its own. */
};

/* What one thread works on: a file of commands, and its own tally. */
struct worker {
	const char *path;	/* the file of commands                    */
	struct database *db;	/* the database, shared by all the threads */
	size_t adds;		/* records this thread added               */
	size_t finds;		/* lookups this thread made                */
	size_t found;		/* lookups that found their record         */
	size_t errors;		/* lines that were not a command           */
};

/* Seconds since some fixed point in the past; only differences mean anything. */
static double now(void)
{
	struct timespec ts;

	clock_gettime(CLOCK_MONOTONIC, &ts);

	return ts.tv_sec + ts.tv_nsec / 1e9;
}

/* An empty database owns no memory. */
static void db_init(struct database *db)
{
	db->records = NULL;
	db->count = 0;
	db->capacity = 0;
}

/*
 * Add one record, growing the array by CHUNK when it is full.
 * Returns 0 on success, -1 if the allocation failed.
 *
 * TODO 3: find the critical section and protect it.  Keep out of it
 * whatever touches nothing shared, and release the lock on every path out
 * of the function.
 */
static int db_add(struct database *db, int id, const char *name)
{
	if (db->count == db->capacity) {
		size_t new_capacity = db->capacity + CHUNK;
		struct record *tmp;

		/* realloc(NULL, size) behaves like malloc(size). */
		tmp = realloc(db->records, new_capacity * sizeof(*tmp));
		if (tmp == NULL)
			return -1;

		db->records = tmp;
		db->capacity = new_capacity;
	}

	db->records[db->count].id = id;
	strncpy(db->records[db->count].name, name, NAME_LEN - 1);
	db->records[db->count].name[NAME_LEN - 1] = '\0';
	db->count++;

	return 0;
}

/*
 * Look up the record with the given id.  If there is one, copy it into
 * `*out` and return 0; otherwise return -1.
 *
 * TODO 4: does a function that only reads need the lock?  Think about what
 * db_add() in another thread can do to the array while this loop runs.
 */
static int db_find(struct database *db, int id, struct record *out)
{
	int rc = -1;
	size_t i;

	for (i = 0; i < db->count; i++) {
		if (db->records[i].id == id) {
			*out = db->records[i];
			rc = 0;
			break;
		}
	}

	return rc;
}

/* Print how many records there are, and the sum of their ids, as a check. */
static void db_summary(struct database *db)
{
	long long sum = 0;
	size_t i;

	for (i = 0; i < db->count; i++)
		sum += db->records[i].id;
	printf("records: %zu (capacity %zu)\n", db->count, db->capacity);
	printf("id sum:  %lld\n", sum);
}

/* Release the array and reset to the empty state. */
static void db_free(struct database *db)
{
	free(db->records);
	db->records = NULL;
	db->count = 0;
	db->capacity = 0;
}

/*
 * Read the commands in one file, one per line, and run each against the
 * database.  Written so that a thread can run it: it takes one pointer and
 * returns one, and keeps its tally in its own `struct worker`.  Already
 * written, and there is nothing to change in it.
 */
static void *run_commands(void *arg)
{
	struct worker *w = arg;
	char line[LINE_LEN], name[NAME_LEN];
	struct record record;
	FILE *file;
	int id;

	file = fopen(w->path, "r");
	if (file == NULL) {
		perror(w->path);
		w->errors++;
		return NULL;
	}

	while (fgets(line, sizeof(line), file) != NULL) {
		if (sscanf(line, "add %d %31s", &id, name) == 2) {
			if (db_add(w->db, id, name) == 0)
				w->adds++;
			else
				w->errors++;
		} else if (sscanf(line, "find %d", &id) == 1) {
			w->finds++;
			if (db_find(w->db, id, &record) == 0)
				w->found++;
		} else {
			w->errors++;
		}
	}
	fclose(file);

	return NULL;
}

int main(int argc, char *argv[])
{
	struct worker workers[MAX_THREADS];
	size_t adds, finds, found, errors;
	double t_start, t_end;
	struct database db;
	int nfiles, i;

	if (argc < 2 || argc - 1 > MAX_THREADS) {
		fprintf(stderr, "Usage: %s <commands-file>... (at most %d)\n",
			argv[0], MAX_THREADS);
		return 1;
	}
	nfiles = argc - 1;

	db_init(&db);

	t_start = now();

	/* One worker per file, each with its own tally, all on one database. */
	for (i = 0; i < nfiles; i++) {
		memset(&workers[i], 0, sizeof(workers[i]));
		workers[i].path = argv[i + 1];
		workers[i].db = &db;
	}

	/*
	 * The files: sequential for now, one after another.
	 *
	 * TODO 1: start one thread per file, each running run_commands() on
	 * its own worker, and join them all before the tallies are read.
	 */
	for (i = 0; i < nfiles; i++)
		run_commands(&workers[i]);

	adds = 0;
	finds = 0;
	found = 0;
	errors = 0;
	for (i = 0; i < nfiles; i++) {
		adds += workers[i].adds;
		finds += workers[i].finds;
		found += workers[i].found;
		errors += workers[i].errors;
	}

	t_end = now();

	db_summary(&db);
	printf("adds:    %zu\n", adds);
	printf("finds:   %zu, found %zu\n", finds, found);
	printf("errors:  %zu\n", errors);
	printf("%d file(s), %.3f s\n", nfiles, t_end - t_start);

	db_free(&db);

	return 0;
}
