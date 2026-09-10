/*
 * Fixed version of the demo in-memory database.
 *
 * Three bugs were removed; each one is marked with a "FIX n" comment below.
 *
 *   FIX 1 (db_add)          -- the grow condition underflowed on an empty
 *                              database, so the array was never allocated
 *   FIX 2 (main)            -- a cached record pointer survived the array
 *                              being moved by db_grow()
 *   FIX 3 (db_print_sorted) -- the temporary sorted copy was never freed
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
	/*
	 * FIX 1: the array is full when count == capacity.
	 *
	 * The buggy version tested `db->count == db->capacity - 1`. Both
	 * fields are size_t, so on an empty database `capacity - 1` did not
	 * become -1: it wrapped around to SIZE_MAX. The test was false, the
	 * array was never allocated, and the store below dereferenced NULL.
	 */
	if (db->count == db->capacity) {
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

	/* FIX 3: the scratch copy belongs to this function, free it here. */
	free(sorted);
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
	int first_id = 0;
	char first_name[NAME_LEN] = "";
	int have_first = 0;
	int id;
	char name[NAME_LEN];

	db_init(&db);

	while (scanf("%d %31s", &id, name) == 2) {
		if (db_add(&db, id, name) != 0) {
			fprintf(stderr, "out of memory\n");
			db_free(&db);
			return 1;
		}

		/*
		 * FIX 2: do not keep a pointer into the records array.
		 *
		 * db_add() grows the array through db_grow(), which
		 * allocates a bigger block, copies the records across and
		 * frees the old one -- exactly what realloc() does, by hand.
		 * The array moves, so every pointer into the old block is
		 * dangling from that moment on. Copy out what we need (or
		 * remember the index 0 and re-read db.records[0] after the
		 * loop) instead of caching an address.
		 */
		if (db.count == 1) {
			first_id = db.records[0].id;
			strncpy(first_name, db.records[0].name, NAME_LEN - 1);
			first_name[NAME_LEN - 1] = '\0';
			have_first = 1;
		}
	}

	db_print(&db);
	db_print_sorted(&db);

	if (have_first)
		printf("First record added: [%d] %s\n", first_id, first_name);

	db_free(&db);

	return 0;
}
