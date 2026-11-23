#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*
 * How many records we add to the database every time it runs out of room.
 * The array grows by whole chunks, never one record at a time, and it is
 * never shrunk.
 */
#define CHUNK		4
#define N 10
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
 * An empty database owns no memory.  Set the three fields to say so, in a
 * way that lets the first db_add() find out that it has to allocate.
 */
void db_init(struct database *db)
{
	/* TODO: initialise the three fields. */
	db->capacity = db->count = db->records = 0;
}

/*
 * TODO 2: add one record to the database, growing the array by CHUNK
 * records when there is no room left.
 *
 * db->count is where the new record goes and, once it is there, how many
 * records there are.  Keep count <= capacity true at every step.
 *
 * Before writing the grow step, read what realloc() does when it fails,
 * and what that means for the pointer you passed it.
 *
 * Return 0 on success, -1 if memory ran out.
 */
int db_add(struct database *db, int id, const char *name)
{
	/* TODO: grow the array if it is full, then store the record. */
	while (db->capacity < (db->count + 1) * sizeof(struct record)) {
		db->capacity += CHUNK;
	} 
	void *p = realloc(db->records, db->capacity);
	if (p == NULL) return -1;
	db->records = p;
	db->records[db->count].id = id;
	strncpy(db->records[db->count].name, name, NAME_LEN);
	
	db->count++;

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
 * TODO 3: release everything the database owns, and leave it in a state
 * in which another db_add() or db_free() would be safe.
 */
void db_free(struct database *db)
{
	free(db->records);
}

int db_delete(struct database *db, int id) {

	struct record *p;
	for (int i = 0;1; i++) {
		if (i >= db->count) {
			return -1;
		}
		if (db->records[i].id == id) {
			p = db->records + i;
			break;
		}
	}

	strncpy(p->name, db->records[db->count - 1].name, NAME_LEN);
	p->id = db->records[db->count - 1].id;
	db->count--;

	if (db->capacity >= N && db->count <= db->capacity - N) {
		db->capacity -= N;
		db->records = realloc(db->records, db->capacity);
	}


	return 0;
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

	char c[4];

	while (scanf("%3s %d %31s",c , &id, name) > 1) {
		if (c[0] == 'a') {
			if (db_add(&db, id, name) != 0) {
				fprintf(stderr, "out of memory\n");
				db_free(&db);
				return 1;
			}
		} else {
			db_delete(&db, id);
		}
	}

	db_print(&db);
	db_free(&db);

	return 0;

fail:
	db_free(&db);

	return -1;
}
