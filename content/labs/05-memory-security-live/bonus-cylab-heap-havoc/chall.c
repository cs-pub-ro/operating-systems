/*
 * chall.c -- heap-havoc: two names, two heap structs, one hidden winner.
 *
 * The program allocates two "struct internet" objects on the heap, each
 * with its own small name buffer, and copies one command-line argument
 * into each name with strcpy() -- no length check at all. Both name
 * buffers are undersized (8 bytes) relative to what an attacker can put
 * in argv[1]/argv[2], and the allocator places the two structs right next
 * to each other on the heap.
 *
 * Overflowing i1->name far enough reaches straight into i2's struct
 * fields -- including i2->callback, a function pointer that main() calls
 * unconditionally if it is non-NULL. Point it at winner() instead of
 * leaving it NULL, and the "harmless" program hands over the flag.
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct internet {
	int priority;
	char *name;
	void (*callback)(void);
};

static void winner(void)
{
	char flag[256];
	FILE *fp;

	fp = fopen("flag.txt", "r");
	if (fp == NULL) {
		perror("Error opening flag.txt");
		exit(1);
	}

	if (fgets(flag, sizeof(flag), fp) != NULL)
		printf("FLAG: %s\n", flag);
	else
		printf("Error reading flag\n");

	fclose(fp);
}

int main(int argc, char **argv)
{
	struct internet *i1, *i2;

	printf("Enter two names separated by space:\n");
	fflush(stdout);

	if (argc != 3) {
		printf("Usage: %s <name1> <name2>\n", argv[0]);
		fflush(stdout);
		return 1;
	}

	i1 = malloc(sizeof(*i1));
	i1->priority = 1;
	i1->name = malloc(8);
	i1->callback = NULL;

	i2 = malloc(sizeof(*i2));
	i2->priority = 2;
	i2->name = malloc(8);
	i2->callback = NULL;

	/* No bounds checking: argv[1]/argv[2] can be arbitrarily long. */
	strcpy(i1->name, argv[1]);
	strcpy(i2->name, argv[2]);

	if (i1->callback)
		i1->callback();
	if (i2->callback)
		i2->callback();

	printf("No winners this time, try again!\n");

	return 0;
}
