/*
 * Reference solution for 03-in-memory-db.
 *
 * Build:  make
 * Run:    ./db < input.txt
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define CHUNK		4
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

/* An empty database owns no memory. */
void db_init(struct database *db)
{
	db->records = NULL;
	db->count = 0;
	db->capacity = 0;
}

/*
 * Add one record, growing the array by CHUNK when it is full.
 * Returns 0 on success, -1 if the allocation failed.
 */
int db_add(struct database *db, int id, const char *name)
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

/* Print every record, one per line. */
void db_print(const struct database *db)
{
	printf("Database holds %zu record(s) (capacity %zu):\n",
	       db->count, db->capacity);

	for (size_t i = 0; i < db->count; i++)
		printf("  [%d] %s\n", db->records[i].id, db->records[i].name);
}

/* Release the array and reset to the empty state. */
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
