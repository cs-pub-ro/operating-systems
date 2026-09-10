/*
 * Reference solution for the bonus (shrinking in-memory database).
 *
 * Build:  make
 * Run:    ./db < input.txt
 *
 * Commands read from stdin, one per line:
 *     add <id> <name>     add a record
 *     del <id>            remove a record by id
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define CHUNK		4		/* the "N" in the grow/shrink rule */
#define NAME_LEN	32

struct record {
	int id;
	char name[NAME_LEN];
};

struct database {
	struct record *records;
	size_t count;
	size_t capacity;
};

void db_init(struct database *db)
{
	db->records = NULL;
	db->count = 0;
	db->capacity = 0;
}

/* Add one record, growing by CHUNK when the array is full. */
int db_add(struct database *db, int id, const char *name)
{
	if (db->count == db->capacity) {
		size_t new_capacity = db->capacity + CHUNK;
		struct record *tmp;

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
 * Remove the record with the given id, keeping the remaining records
 * contiguous, and shrink the array by CHUNK once a whole chunk is free.
 * Returns 0 if a record was removed, -1 if the id was not found.
 */
int db_remove(struct database *db, int id)
{
	size_t i;

	/* Find the record. */
	for (i = 0; i < db->count; i++)
		if (db->records[i].id == id)
			break;

	if (i == db->count)
		return -1;		/* not found */

	/* Rearrange: shift everything after it one slot to the left. */
	for (size_t j = i; j + 1 < db->count; j++)
		db->records[j] = db->records[j + 1];
	db->count--;

	/* Shrink once a full chunk at the end is unused. */
	if (db->capacity >= CHUNK && db->count <= db->capacity - CHUNK) {
		size_t new_capacity = db->capacity - CHUNK;

		if (new_capacity == 0) {
			/* realloc(ptr, 0) is implementation-defined: free it. */
			free(db->records);
			db->records = NULL;
			db->capacity = 0;
		} else {
			struct record *tmp;

			tmp = realloc(db->records,
				      new_capacity * sizeof(*tmp));
			/*
			 * A shrinking realloc rarely fails, but if it does the
			 * old (larger) buffer is still valid, so just keep it.
			 */
			if (tmp != NULL) {
				db->records = tmp;
				db->capacity = new_capacity;
			}
		}
	}

	return 0;
}

void db_print(const struct database *db)
{
	printf("Database holds %zu record(s) (capacity %zu):\n",
	       db->count, db->capacity);

	for (size_t i = 0; i < db->count; i++)
		printf("  [%d] %s\n", db->records[i].id, db->records[i].name);
}

void db_free(struct database *db)
{
	free(db->records);
	db->records = NULL;
	db->count = 0;
	db->capacity = 0;
}

int main(void)
{
	struct database db;
	char cmd[16];
	int id;
	char name[NAME_LEN];

	db_init(&db);

	while (scanf("%15s", cmd) == 1) {
		if (strcmp(cmd, "add") == 0) {
			if (scanf("%d %31s", &id, name) != 2)
				break;
			if (db_add(&db, id, name) != 0) {
				fprintf(stderr, "out of memory\n");
				db_free(&db);
				return 1;
			}
		} else if (strcmp(cmd, "del") == 0) {
			if (scanf("%d", &id) != 1)
				break;
			db_remove(&db, id);
		} else {
			fprintf(stderr, "unknown command: %s\n", cmd);
		}
	}

	db_print(&db);
	db_free(&db);

	return 0;
}
