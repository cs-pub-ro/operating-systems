// SPDX-License-Identifier: BSD-3-Clause

/*
 * The growable in-memory database of sessions 03 and 07, as a library that
 * several threads may use at the same time.
 *
 * In session 07 one mutex made it safe, and made every lookup wait for
 * every other lookup.  Here the lock is a read-write lock: any number of
 * threads may hold it for reading at the same time, and a thread that
 * holds it for writing holds it alone.  The functions that only look take
 * it for reading; the ones that change anything take it for writing.
 *
 * That was the plan.  Three of the functions below do not follow it.
 */

#include <stdlib.h>
#include <string.h>
#include <pthread.h>

#include "db.h"

#define CHUNK	64

struct database {
	struct record *records;	/* heap array of `capacity` records        */
	size_t count;		/* records currently in use                */
	size_t capacity;	/* records the array can hold              */
	pthread_rwlock_t lock;	/* protects the three fields, and the records */
};

struct database *db_create(void)
{
	struct database *db;

	db = malloc(sizeof(*db));
	if (db == NULL)
		return NULL;

	db->records = NULL;
	db->count = 0;
	db->capacity = 0;
	pthread_rwlock_init(&db->lock, NULL);

	return db;
}

void db_destroy(struct database *db)
{
	pthread_rwlock_destroy(&db->lock);
	free(db->records);
	free(db);
}

/*
 * The position of the record with the given id, or -1.  Called with the
 * lock held, for reading or for writing.  The position is good only for as
 * long as that lock is held.
 */
static long find_index(struct database *db, int id)
{
	size_t i;

	for (i = 0; i < db->count; i++)
		if (db->records[i].id == id)
			return i;

	return -1;
}

/*
 * TODO 1: check, for every function from here down, that the lock is taken
 * in the mode that what the function does calls for.
 */
int db_add(struct database *db, int id, const char *name)
{
	struct record record;
	int rc = 0;

	/* Built outside the lock: it touches nothing shared. */
	record.id = id;
	strncpy(record.name, name, NAME_LEN - 1);
	record.name[NAME_LEN - 1] = '\0';

	pthread_rwlock_rdlock(&db->lock);

	if (db->count == db->capacity) {
		size_t new_capacity = db->capacity + CHUNK;
		struct record *tmp;

		tmp = realloc(db->records, new_capacity * sizeof(*tmp));
		if (tmp == NULL) {
			rc = -1;
			goto out;
		}

		db->records = tmp;
		db->capacity = new_capacity;
	}

	db->records[db->count] = record;
	db->count++;

out:
	pthread_rwlock_unlock(&db->lock);

	return rc;
}

/*
 * Looking up changes nothing: the lock is taken for reading.
 *
 * TODO 2: follow every way out of this function.
 */
int db_find(struct database *db, int id, struct record *out)
{
	long i;

	pthread_rwlock_rdlock(&db->lock);

	i = find_index(db, id);
	if (i < 0)
		return -1;

	*out = db->records[i];

	pthread_rwlock_unlock(&db->lock);

	return 0;
}

/*
 * TODO 3: the record is found under one lock and changed under another.
 * What is `i` worth in between?
 */
int db_update(struct database *db, int id, const char *name)
{
	long i;

	pthread_rwlock_rdlock(&db->lock);
	i = find_index(db, id);
	pthread_rwlock_unlock(&db->lock);

	if (i < 0)
		return -1;

	pthread_rwlock_wrlock(&db->lock);
	strncpy(db->records[i].name, name, NAME_LEN - 1);
	db->records[i].name[NAME_LEN - 1] = '\0';
	pthread_rwlock_unlock(&db->lock);

	return 0;
}

/*
 * The last record takes the place of the removed one.  There is one way
 * out of the function, so the lock is released whether or not the record
 * was found.
 */
int db_remove(struct database *db, int id)
{
	int rc = -1;
	long i;

	pthread_rwlock_wrlock(&db->lock);
	i = find_index(db, id);
	if (i >= 0) {
		db->records[i] = db->records[db->count - 1];
		db->count--;
		rc = 0;
	}
	pthread_rwlock_unlock(&db->lock);

	return rc;
}

size_t db_count(struct database *db)
{
	size_t count;

	pthread_rwlock_rdlock(&db->lock);
	count = db->count;
	pthread_rwlock_unlock(&db->lock);

	return count;
}
