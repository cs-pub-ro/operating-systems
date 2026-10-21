/*
 * symbol_hash_table.h -- a hash table mapping symbol names to addresses.
 *
 * This is a toy model of what a linker or a debugger keeps around: for every
 * symbol name (a function or a global variable) it records the address the
 * symbol lives at, and which memory region of the program owns that address
 * (.text, .data, .rodata or .bss).
 *
 * Collisions are resolved with separate chaining: each bucket is the head of
 * a singly linked list of entries.
 */
#ifndef SYMBOL_HASH_TABLE_H
#define SYMBOL_HASH_TABLE_H

#include <stddef.h>

/* Which segment of the process image a symbol's address belongs to. */
typedef enum {
	SYM_REGION_UNKNOWN = 0,
	SYM_REGION_TEXT,	/* executable code                       */
	SYM_REGION_DATA,	/* initialised global/static variables   */
	SYM_REGION_RODATA,	/* read-only data (string literals, etc) */
	SYM_REGION_BSS,		/* zero-initialised global/static vars   */
} sym_region_t;

/* One symbol table entry: a node in a bucket's linked list. */
typedef struct symbol_entry {
	char *name;			/* heap copy of the symbol name (the key) */
	void *address;			/* where the symbol lives                 */
	sym_region_t region;		/* which segment "address" belongs to     */
	struct symbol_entry *next;	/* next entry in this bucket's chain      */
} symbol_entry_t;

/* The table itself: a fixed-size array of bucket heads. */
typedef struct {
	symbol_entry_t **buckets;	/* array of "capacity" chain heads */
	size_t capacity;		/* number of buckets               */
	size_t count;			/* number of entries currently stored */
} symbol_hash_table_t;

/* djb2 string hash. Exposed mainly so the demo/tests can reason about it. */
unsigned long symtab_hash(const char *str);

/* Human-readable name for a region, e.g. for printing. */
const char *symtab_region_name(sym_region_t region);

/*
 * Create a table with the given number of buckets. Returns NULL on
 * allocation failure. capacity must be > 0.
 */
symbol_hash_table_t *symtab_create(size_t capacity);

/* Free every entry and the table itself. table may be NULL. */
void symtab_destroy(symbol_hash_table_t *table);

/*
 * Insert a new symbol, or update the address/region of an existing one with
 * the same name. Returns 0 on success, -1 on allocation failure.
 */
int symtab_insert(symbol_hash_table_t *table, const char *name,
		   void *address, sym_region_t region);

/*
 * Look up a symbol by name. Returns a pointer to the entry owned by the
 * table (do not free it), or NULL if there is no such symbol.
 */
symbol_entry_t *symtab_lookup(symbol_hash_table_t *table, const char *name);

/*
 * Remove a symbol by name. Returns 0 if it was found and removed, -1 if
 * there was no such symbol.
 */
int symtab_remove(symbol_hash_table_t *table, const char *name);

/* Print every symbol currently stored, bucket by bucket. */
void symtab_print(const symbol_hash_table_t *table);

#endif /* SYMBOL_HASH_TABLE_H */
