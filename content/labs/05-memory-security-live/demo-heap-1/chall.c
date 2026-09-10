/*
 * chall.c -- demo-heap-1: same setup as demo-heap-0, but this time the
 * win condition requires the corrupted value to match a specific string
 * exactly, instead of merely differing from the original one.
 *
 * diary_entry and access_level are two adjacent heap allocations.
 * write_diary() copies player input into diary_entry via
 * scanf("%s", ...), which enforces no length limit -- writing past
 * DIARY_ENTRY_SIZE bytes overflows into whatever the allocator placed
 * next on the heap (access_level).
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FLAGSIZE_MAX	64

/* Requested allocation sizes; the allocator may round these up. */
#define DIARY_ENTRY_SIZE	5
#define ACCESS_LEVEL_SIZE	5

static char *access_level;
static char *diary_entry;

/*
 * access_level starts out equal to "user". Nothing in this program ever
 * assigns it the value "root" -- the only way to satisfy this check is
 * to overwrite access_level's bytes from the outside.
 */
static void check_win(void)
{
	if (!strcmp(access_level, "root")) {
		char buf[FLAGSIZE_MAX];
		FILE *fd;

		printf("\nYOU WIN\n");

		fd = fopen("flag.txt", "r");
		fgets(buf, FLAGSIZE_MAX, fd);
		printf("%s\n", buf);
		fflush(stdout);

		exit(0);
	}

	printf("Still just a regular user!\n");
	printf("\nNo flag for you :(\n");
	fflush(stdout);
}

static void print_menu(void)
{
	printf("\n1. Print Heap:\t\t(print the current state of the heap)"
	       "\n2. Write to diary:\t(write to your own personal diary "
	       "entry on the heap)"
	       "\n3. Print access_level:\t(I'll even let you look at my "
	       "variable on the heap, I'm confident it can't be modified)"
	       "\n4. Print Flag:\t\t(Try to print the flag, good luck)"
	       "\n5. Exit\n\nEnter your choice: ");
	fflush(stdout);
}

static void init(void)
{
	printf("\nWelcome to the vault, take two!\n");
	printf("I put my data on the heap so it should be safe from any "
	       "tampering.\n");
	printf("Since my data isn't on the stack I'll even let you write "
	       "whatever you want in your diary, I already took care of "
	       "using malloc for you.\n\n");
	fflush(stdout);

	diary_entry = malloc(DIARY_ENTRY_SIZE);
	strncpy(diary_entry, "meh.", DIARY_ENTRY_SIZE);

	access_level = malloc(ACCESS_LEVEL_SIZE);
	strncpy(access_level, "user", ACCESS_LEVEL_SIZE);
}

/*
 * scanf("%s", ...) stops only at whitespace, never at DIARY_ENTRY_SIZE --
 * this is the entire vulnerability.
 */
static void write_diary(void)
{
	printf("Diary entry: ");
	fflush(stdout);
	scanf("%s", diary_entry);
}

static void print_heap(void)
{
	printf("Heap State:\n");
	printf("+-------------+----------------+\n");
	printf("[*] Address   ->   Heap Data   \n");
	printf("+-------------+----------------+\n");
	printf("[*]   %p  ->   %s\n", diary_entry, diary_entry);
	printf("+-------------+----------------+\n");
	printf("[*]   %p  ->   %s\n", access_level, access_level);
	printf("+-------------+----------------+\n");
	fflush(stdout);
}

int main(void)
{
	int choice;

	init();
	print_heap();

	while (1) {
		print_menu();

		if (scanf("%d", &choice) != 1)
			exit(0);

		switch (choice) {
		case 1:
			print_heap();
			break;
		case 2:
			write_diary();
			break;
		case 3:
			printf("\n\nTake a look at my variable: access_level = %s\n\n",
			       access_level);
			fflush(stdout);
			break;
		case 4:
			check_win();
			break;
		case 5:
			return 0;
		default:
			printf("Invalid choice\n");
			fflush(stdout);
		}
	}
}
