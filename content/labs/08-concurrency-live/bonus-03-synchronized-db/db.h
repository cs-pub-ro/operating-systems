/* SPDX-License-Identifier: BSD-3-Clause */

/*
 * The growable in-memory database of sessions 03 and 07, as a library that
 * several threads may use at the same time.
 *
 * The library is libdb.so, built from db.c.  `struct database` is defined
 * there: the executable only ever holds a pointer to one.
 */

#ifndef DB_H_
#define DB_H_		1

#include <stddef.h>

#define NAME_LEN	32

struct record {
	int id;
	char name[NAME_LEN];
};

struct database;

/* A new, empty database; NULL if there is no memory for it. */
struct database *db_create(void);

void db_destroy(struct database *db);

/* Add a record.  Returns 0 on success, -1 if there is no memory for it. */
int db_add(struct database *db, int id, const char *name);

/*
 * Look up the record with the given id.  If there is one, copy it into
 * `*out` and return 0; otherwise return -1.
 */
int db_find(struct database *db, int id, struct record *out);

/* Change the name of the record with the given id.  0, or -1 if not found. */
int db_update(struct database *db, int id, const char *name);

/* Remove the record with the given id.  0, or -1 if not found. */
int db_remove(struct database *db, int id);

/* The number of records. */
size_t db_count(struct database *db);

#endif
