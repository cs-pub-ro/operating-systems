/*
 * chall.c -- demo-heap-0: "my data isn't on the stack, so it must be
 * safe" (session-lock edition).
 *
 * Two adjacent heap buffers are allocated: diary_entry, which the player
 * may write to directly through the menu, and lock_state, which the
 * challenge author believes cannot be reached from write_buffer().
 *
 * That belief relies on nothing overflowing diary_entry's allocation. The
 * write path uses scanf("%s", ...) with no length limit, so anything the
 * player types past DIARY_ENTRY_SIZE bytes keeps going -- straight into
 * whatever the allocator placed next on the heap.
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FLAGSIZE_MAX	64

/* Requested allocation sizes; the allocator may round these up. */
#define DIARY_ENTRY_SIZE	5
#define LOCK_STATE_SIZE		5

static char *lock_state;
static char *diary_entry;

/*
 * The win condition is inverted on purpose: lock_state starts out equal
 * to "shut", and the player wins by making it anything else. Nothing in
 * this program ever assigns a new value to lock_state -- so the only way
 * to change it is to corrupt it from the outside.
 */
static void check_win(void)
{
	if (strcmp(lock_state, "shut") != 0) {
		char buf[FLAGSIZE_MAX];
		FILE *fd;

		printf("\nYOU WIN\n");

		fd = fopen("flag.txt", "r");
		fgets(buf, FLAGSIZE_MAX, fd);
		printf("%s\n", buf);
		fflush(stdout);

		exit(0);
	}

	printf("The vault is still locked!\n");
	printf("\nNo flag for you :(\n");
	fflush(stdout);
}

static void print_menu(void)
{
	printf("\n1. Print Heap:\t\t(print the current state of the heap)"
	       "\n2. Write to diary:\t(write to your own personal diary "
	       "entry on the heap)"
	       "\n3. Print lock_state:\t(I'll even let you look at my "
	       "variable on the heap, I'm confident it can't be modified)"
	       "\n4. Print Flag:\t\t(Try to print the flag, good luck)"
	       "\n5. Exit\n\nEnter your choice: ");
	fflush(stdout);
}

static void init(void)
{
	printf("\nWelcome to the vault!\n");
	printf("I put my data on the heap so it should be safe from any "
	       "tampering.\n");
	printf("Since my data isn't on the stack I'll even let you write "
	       "whatever you want in your diary, I already took care of "
	       "using malloc for you.\n\n");
	fflush(stdout);

	diary_entry = malloc(DIARY_ENTRY_SIZE);
	strncpy(diary_entry, "meh.", DIARY_ENTRY_SIZE);

	lock_state = malloc(LOCK_STATE_SIZE);
	strncpy(lock_state, "shut", LOCK_STATE_SIZE);
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
	printf("[*]   %p  ->   %s\n", lock_state, lock_state);
	printf("+-------------+----------------+\n");
	fflush(stdout);
}

int main(void)
{
	int choice;

	init();
	print_heap();

	while (1) {
		int rval;

		print_menu();

		rval = scanf("%d", &choice);
		if (rval == EOF || rval != 1)
			exit(0);

		switch (choice) {
		case 1:
			print_heap();
			break;
		case 2:
			write_diary();
			break;
		case 3:
			printf("\n\nTake a look at my variable: lock_state = %s\n\n",
			       lock_state);
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
