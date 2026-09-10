/*
 * chall.c -- heap3: "freed but still in use, now memory untracked, do you
 * smell the bug?"
 *
 * free_memory() frees the global object x, but never sets x back to NULL.
 * Every other function that touches x (print_heap(), check_win(), and the
 * option-3 menu handler) keeps dereferencing that now-dangling pointer as
 * if nothing happened -- a textbook use-after-free.
 *
 * Worse, alloc_object() lets the player allocate a brand-new, arbitrarily
 * sized chunk right after x has been freed. If that allocation is the same
 * size class as the freed object, the allocator's tcache hands back the
 * very same memory x still points to -- so writing into the "new"
 * allocation is really writing through x, including into x->flag.
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FLAGSIZE_MAX	64

/*
 * a/b/c are filler fields with no purpose other than pushing flag[] away
 * from the start of the struct, so overwriting it requires the player to
 * understand (or discover) the struct's layout.
 */
struct object {
	char a[10];
	char b[10];
	char c[10];
	char flag[5];
};

static struct object *x;

static void check_win(void)
{
	if (!strcmp(x->flag, "pico")) {
		char buf[FLAGSIZE_MAX];
		FILE *fd;

		printf("YOU WIN!!11!!\n");

		fd = fopen("flag.txt", "r");
		fgets(buf, FLAGSIZE_MAX, fd);
		printf("%s\n", buf);
		fflush(stdout);

		exit(0);
	}

	printf("No flage for u :(\n");
	fflush(stdout);
}

static void print_menu(void)
{
	printf("\n1. Print Heap\n2. Allocate object\n3. Print x->flag\n"
	       "4. Check for win\n5. Free x\n6. Exit\n\nEnter your choice: ");
	fflush(stdout);
}

static void init(void)
{
	printf("\nfreed but still in use\nnow memory untracked\ndo you smell "
	       "the bug?\n");
	fflush(stdout);

	x = malloc(sizeof(*x));
	strncpy(x->flag, "bico", 5);
}

/*
 * Allocates a chunk of player-chosen size and reads a player-chosen
 * string into it. The resulting pointer is never stored anywhere -- but
 * if the allocator reuses freed memory that x still refers to, that does
 * not matter: x sees the write anyway.
 */
static void alloc_object(void)
{
	int size = 0;
	char *alloc;

	printf("Size of object allocation: ");
	fflush(stdout);
	scanf("%d", &size);

	alloc = malloc(size);

	printf("Data for flag: ");
	fflush(stdout);
	scanf("%s", alloc);
}

/* Frees x, but does not clear it -- x remains a dangling pointer. */
static void free_memory(void)
{
	free(x);
}

static void print_heap(void)
{
	printf("[*]   Address   ->   Value   \n");
	printf("+-------------+-----------+\n");
	printf("[*]   %p  ->   %s\n", x->flag, x->flag);
	printf("+-------------+-----------+\n");
	fflush(stdout);
}

int main(void)
{
	int choice;

	init();

	while (1) {
		print_menu();

		if (scanf("%d", &choice) != 1)
			exit(0);

		switch (choice) {
		case 1:
			print_heap();
			break;
		case 2:
			alloc_object();
			break;
		case 3:
			printf("\n\nx = %s\n\n", x->flag);
			fflush(stdout);
			break;
		case 4:
			check_win();
			break;
		case 5:
			free_memory();
			break;
		case 6:
			return 0;
		default:
			printf("Invalid choice\n");
			fflush(stdout);
		}
	}
}
