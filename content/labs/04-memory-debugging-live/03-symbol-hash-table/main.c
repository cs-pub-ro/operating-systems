/*
 * main.c -- exercise the symbol hash table the way a small linker/debugger
 * front-end might: register a batch of symbols, look some up, remove one,
 * print everything, and clean up.
 *
 * Build:  make
 * Run:    ./symtab
 */
#include <stdio.h>

#include "symbol_hash_table.h"

/* A handful of made-up symbols, spread across every memory region. */
struct symbol_info {
	const char *name;
	void *address;
	sym_region_t region;
};

int main(void)
{
	/* Deliberately small so that with 12 symbols we get bucket collisions. */
	symbol_hash_table_t *table = symtab_create(8);

	struct symbol_info symbols[] = {
		{ "main",		(void *)0x401000, SYM_REGION_TEXT   },
		{ "compute_sum",	(void *)0x401120, SYM_REGION_TEXT   },
		{ "print_report",	(void *)0x4012a0, SYM_REGION_TEXT   },
		{ "g_request_count",	(void *)0x604010, SYM_REGION_DATA   },
		{ "g_version",		(void *)0x604018, SYM_REGION_DATA   },
		{ "g_log_buffer",	(void *)0x606040, SYM_REGION_BSS    },
		{ "g_connection_pool",	(void *)0x606880, SYM_REGION_BSS    },
		{ "banner_text",	(void *)0x402008, SYM_REGION_RODATA },
		{ "usage_message",	(void *)0x402048, SYM_REGION_RODATA },
		{ "error_format",	(void *)0x402090, SYM_REGION_RODATA },
		{ "shutdown_hook",	(void *)0x401380, SYM_REGION_TEXT   },
		{ "g_retry_limit",	(void *)0x604020, SYM_REGION_DATA   },
	};
	size_t n = sizeof(symbols) / sizeof(symbols[0]);
	size_t i;
	symbol_entry_t *found;

	if (table == NULL) {
		fprintf(stderr, "symtab_create failed\n");
		return 1;
	}

	printf("== inserting %zu symbols into a table with 8 buckets ==\n", n);
	for (i = 0; i < n; i++) {
		if (symtab_insert(table, symbols[i].name, symbols[i].address,
				   symbols[i].region) != 0) {
			fprintf(stderr, "insert of %s failed\n",
				symbols[i].name);
		}
	}

	printf("\n== full dump ==\n");
	symtab_print(table);

	printf("\n== lookups ==\n");
	found = symtab_lookup(table, "compute_sum");
	if (found != NULL)
		printf("compute_sum -> %p (%s)\n", found->address,
		       symtab_region_name(found->region));
	else
		printf("compute_sum -> not found\n");

	found = symtab_lookup(table, "does_not_exist");
	if (found != NULL)
		printf("does_not_exist -> %p\n", found->address);
	else
		printf("does_not_exist -> not found\n");

	/* Update an existing symbol (e.g. the linker relocated it). */
	printf("\n== updating g_version's address ==\n");
	symtab_insert(table, "g_version", (void *)0x604100, SYM_REGION_DATA);
	found = symtab_lookup(table, "g_version");
	if (found != NULL)
		printf("g_version -> %p (%s)\n", found->address,
		       symtab_region_name(found->region));

	/* Remove a symbol that was one of the last inserted into its bucket. */
	printf("\n== removing g_retry_limit ==\n");
	if (symtab_remove(table, "g_retry_limit") == 0)
		printf("removed g_retry_limit\n");
	else
		printf("g_retry_limit was not found\n");

	printf("\n== dump after remove ==\n");
	symtab_print(table);

	symtab_destroy(table);

	printf("\ndone.\n");

	return 0;
}
