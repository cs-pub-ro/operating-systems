/*
 * symbol_hash_table.c -- reference implementation (no known bugs).
 *
 * Separate chaining hash table: table->buckets[i] is the head of a singly
 * linked list of symbol_entry_t nodes whose name hashes to bucket i.
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "symbol_hash_table.h"

unsigned long symtab_hash(const char *str)
{
	/* djb2 */
	unsigned long hash = 5381;
	int c;

	while ((c = (unsigned char)*str++) != '\0')
		hash = ((hash << 5) + hash) + (unsigned long)c;

	return hash;
}

const char *symtab_region_name(sym_region_t region)
{
	switch (region) {
	case SYM_REGION_TEXT:
		return ".text";
	case SYM_REGION_DATA:
		return ".data";
	case SYM_REGION_RODATA:
		return ".rodata";
	case SYM_REGION_BSS:
		return ".bss";
	default:
		return "unknown";
	}
}

symbol_hash_table_t *symtab_create(size_t capacity)
{
	symbol_hash_table_t *table;

	if (capacity == 0)
		return NULL;

	table = malloc(sizeof(*table));
	if (table == NULL)
		return NULL;

	/* calloc zero-initialises every bucket head to NULL. */
	table->buckets = calloc(capacity, sizeof(*table->buckets));
	if (table->buckets == NULL) {
		free(table);
		return NULL;
	}

	table->capacity = capacity;
	table->count = 0;

	return table;
}

void symtab_destroy(symbol_hash_table_t *table)
{
	size_t i;

	if (table == NULL)
		return;

	for (i = 0; i < table->capacity; i++) {
		symbol_entry_t *entry = table->buckets[i];

		while (entry != NULL) {
			symbol_entry_t *next = entry->next;

			free(entry->name);
			free(entry);
			entry = next;
		}
	}

	free(table->buckets);
	free(table);
}

static symbol_entry_t *find_entry(const symbol_hash_table_t *table,
				   const char *name, size_t *index_out)
{
	size_t index = symtab_hash(name) % table->capacity;
	symbol_entry_t *entry = table->buckets[index];

	if (index_out != NULL)
		*index_out = index;

	while (entry != NULL) {
		if (strcmp(entry->name, name) == 0)
			return entry;
		entry = entry->next;
	}

	return NULL;
}

int symtab_insert(symbol_hash_table_t *table, const char *name,
		   void *address, sym_region_t region)
{
	size_t index;
	symbol_entry_t *entry = find_entry(table, name, &index);

	if (entry != NULL) {
		/* Key already present: just update its value in place. */
		entry->address = address;
		entry->region = region;
		return 0;
	}

	entry = malloc(sizeof(*entry));
	if (entry == NULL)
		return -1;

	entry->name = strdup(name);
	if (entry->name == NULL) {
		free(entry);
		return -1;
	}

	entry->address = address;
	entry->region = region;

	/* Prepend to the bucket's chain. */
	entry->next = table->buckets[index];
	table->buckets[index] = entry;

	table->count++;

	return 0;
}

symbol_entry_t *symtab_lookup(symbol_hash_table_t *table, const char *name)
{
	return find_entry(table, name, NULL);
}

int symtab_remove(symbol_hash_table_t *table, const char *name)
{
	size_t index = symtab_hash(name) % table->capacity;
	symbol_entry_t *entry = table->buckets[index];
	symbol_entry_t *prev = NULL;

	while (entry != NULL) {
		if (strcmp(entry->name, name) == 0) {
			if (prev == NULL)
				table->buckets[index] = entry->next;
			else
				prev->next = entry->next;

			free(entry->name);
			free(entry);
			table->count--;

			return 0;
		}

		prev = entry;
		entry = entry->next;
	}

	return -1;
}

void symtab_print(const symbol_hash_table_t *table)
{
	size_t i;

	printf("symbol table: %zu entries in %zu buckets\n",
	       table->count, table->capacity);

	for (i = 0; i < table->capacity; i++) {
		symbol_entry_t *entry = table->buckets[i];

		if (entry == NULL)
			continue;

		printf("bucket %zu:\n", i);
		while (entry != NULL) {
			printf("  %-20s %p  %s\n", entry->name,
			       entry->address,
			       symtab_region_name(entry->region));
			entry = entry->next;
		}
	}
}
