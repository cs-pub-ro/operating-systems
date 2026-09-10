/*
 * A small in-memory database that grows on demand.
 *
 * It reads "<id> <name>" pairs from standard input, stores them in a heap
 * array, prints them, prints them again sorted by id, and finally reports
 * which record was added first.
 *
 * At least it is supposed to do that. Right now it does not.
 *
 * Build:  make
 * Run:    ./db < input.txt
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* How many records we add every time the array runs out of room. */
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
 *   records  -- heap array of `capacity` records
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

/* An empty database owns no memory. */
void db_init(struct database *db)
{
	db->records = NULL;
	db->count = 0;
	db->capacity = 0;
}

/*
 * Make room for CHUNK more records: allocate a bigger array, move the records
 * we already have into it and release the old one.
 *
 * Returns 0 on success, -1 if the allocation failed.
 */
static int db_grow(struct database *db)
{
	size_t new_capacity = db->capacity + CHUNK;
	struct record *bigger;

	bigger = malloc(new_capacity * sizeof(*bigger));
	if (bigger == NULL)
		return -1;

	if (db->records != NULL) {
		memcpy(bigger, db->records, db->count * sizeof(*bigger));
		free(db->records);
	}

	db->records = bigger;
	db->capacity = new_capacity;

	return 0;
}

/*
 * Add one record, growing the array when it is full.
 * Returns 0 on success, -1 if the allocation failed.
 */
int db_add(struct database *db, int id, const char *name)
{
	if (db->count == db->capacity - 1) {
		if (db_grow(db) != 0)
			return -1;
	}

	db->records[db->count].id = id;
	strncpy(db->records[db->count].name, name, NAME_LEN - 1);
	db->records[db->count].name[NAME_LEN - 1] = '\0';
	db->count++;

	return 0;
}

/* Print every record, in insertion order. */
void db_print(const struct database *db)
{
	printf("Database holds %zu record(s) (capacity %zu):\n",
	       db->count, db->capacity);

	for (size_t i = 0; i < db->count; i++)
		printf("  [%d] %s\n", db->records[i].id, db->records[i].name);
}

/* Order two records by id; used by qsort() below. */
static int cmp_records(const void *a, const void *b)
{
	const struct record *ra = a;
	const struct record *rb = b;

	return ra->id - rb->id;
}

/*
 * Print the records ordered by id.
 *
 * The database keeps insertion order, so we sort a private copy instead of
 * rearranging the real array behind the caller's back.
 */
void db_print_sorted(const struct database *db)
{
	struct record *sorted;

	if (db->count == 0)
		return;

	sorted = malloc(db->count * sizeof(*sorted));
	if (sorted == NULL) {
		fprintf(stderr, "out of memory, skipping sorted print\n");
		return;
	}

	memcpy(sorted, db->records, db->count * sizeof(*sorted));
	qsort(sorted, db->count, sizeof(*sorted), cmp_records);

	printf("Sorted by id:\n");
	for (size_t i = 0; i < db->count; i++)
		printf("  [%d] %s\n", sorted[i].id, sorted[i].name);
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
	struct record *first = NULL;
	int id;
	char name[NAME_LEN];

	db_init(&db);

	while (scanf("%d %31s", &id, name) == 2) {
		if (db_add(&db, id, name) != 0) {
			fprintf(stderr, "out of memory\n");
			db_free(&db);
			return 1;
		}

		/* Remember the very first record so we can report it later. */
		if (db.count == 1)
			first = &db.records[0];
	}

	db_print(&db);
	db_print_sorted(&db);

	if (first != NULL)
		printf("First record added: [%d] %s\n", first->id, first->name);

	db_free(&db);

	return 0;
}
