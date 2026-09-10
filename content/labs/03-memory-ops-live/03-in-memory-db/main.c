#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*
 * How many records we add to the database every time it runs out of room.
 * The array grows by whole chunks, never one record at a time, and it is
 * never shrunk.
 */
#define CHUNK		4

#define NAME_LEN	32

/* One row in our database. */
struct record {
	int id;
	char name[NAME_LEN];
};

/*
 * The database itself.
 *
 *   records  -- pointer to a heap array of `capacity` records
 *   count    -- how many records are actually in use
 *   capacity -- how many records the array can hold before it must grow
 *
 * Invariant: count <= capacity.
 */
struct database {
	struct record *records;
	size_t count;
	size_t capacity;
};

/*
 * TODO 1: start with an empty database.
 *
 * There is no memory allocated yet, so:
 *   - records must be NULL
 *   - count must be 0
 *   - capacity must be 0
 *
 * The first db_add() will notice capacity == count == 0 and allocate the
 * first chunk.
 */
void db_init(struct database *db)
{
	/* TODO: initialise the three fields. */
}

/*
 * TODO 2: add one record to the database, growing it if necessary.
 *
 * Steps:
 *   1. If the array is full (count == capacity), make more room:
 *        - compute the new capacity: capacity + CHUNK
 *        - realloc() db->records to hold `new capacity` records
 *          (remember: realloc(NULL, size) behaves like malloc(size),
 *           so this also handles the very first allocation)
 *        - check that realloc() did not return NULL
 *        - store the new pointer and the new capacity back into db
 *   2. Copy the record into the slot at index db->count:
 *        - db->records[db->count].id = id;
 *        - copy `name` into db->records[db->count].name
 *          (use strncpy and make sure the string stays NUL-terminated)
 *   3. Increment db->count.
 *
 * Return 0 on success, -1 if the allocation failed.
 */
int db_add(struct database *db, int id, const char *name)
{
	/* TODO: grow the array if it is full, then store the record. */

	return 0;
}

/* Print every record, one per line. Already written for you. */
void db_print(const struct database *db)
{
	printf("Database holds %zu record(s) (capacity %zu):\n",
	       db->count, db->capacity);

	for (size_t i = 0; i < db->count; i++)
		printf("  [%d] %s\n", db->records[i].id, db->records[i].name);
}

/*
 * TODO 3: release the memory owned by the database.
 *
 * free() the records array, then reset the database to the empty state
 * (records = NULL, count = 0, capacity = 0) so it can be reused safely.
 */
void db_free(struct database *db)
{
	/* TODO: free db->records and reset the fields. */
}

/*
 * Read records from stdin until end-of-file. Each line is:
 *
 *     <id> <name>
 *
 * for example:
 *
 *     1 alice
 *     2 bob
 *
 * Finish input with Ctrl-D (or by piping a file in).
 */
int main(void)
{
	struct database db;
	int id;
	char name[NAME_LEN];

	db_init(&db);

	while (scanf("%d %31s", &id, name) == 2) {
		if (db_add(&db, id, name) != 0) {
			fprintf(stderr, "out of memory\n");
			db_free(&db);
			return 1;
		}
	}

	db_print(&db);
	db_free(&db);

	return 0;
}
