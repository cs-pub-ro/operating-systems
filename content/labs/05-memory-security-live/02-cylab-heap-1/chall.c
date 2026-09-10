/*
 * chall.c -- heap1: same setup as heap0, but this time the win condition
 * requires the corrupted value to match a specific string exactly,
 * instead of merely differing from the original one.
 *
 * input_data and safe_var are two adjacent heap allocations. write_buffer()
 * copies player input into input_data via scanf("%s", ...), which enforces
 * no length limit -- writing past INPUT_DATA_SIZE bytes overflows into
 * whatever the allocator placed next on the heap (safe_var).
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FLAGSIZE_MAX	64

/* Requested allocation sizes; the allocator may round these up. */
#define INPUT_DATA_SIZE	5
#define SAFE_VAR_SIZE	5

static char *safe_var;
static char *input_data;

/*
 * safe_var starts out equal to "bico". Nothing in this program ever
 * assigns it the value "pico" -- the only way to satisfy this check is to
 * overwrite safe_var's bytes from the outside.
 */
static void check_win(void)
{
	if (!strcmp(safe_var, "pico")) {
		char buf[FLAGSIZE_MAX];
		FILE *fd;

		printf("\nYOU WIN\n");

		fd = fopen("flag.txt", "r");
		fgets(buf, FLAGSIZE_MAX, fd);
		printf("%s\n", buf);
		fflush(stdout);

		exit(0);
	}

	printf("Looks like everything is still secure!\n");
	printf("\nNo flage for you :(\n");
	fflush(stdout);
}

static void print_menu(void)
{
	printf("\n1. Print Heap:\t\t(print the current state of the heap)"
	       "\n2. Write to buffer:\t(write to your own personal block of "
	       "data on the heap)"
	       "\n3. Print safe_var:\t(I'll even let you look at my variable "
	       "on the heap, I'm confident it can't be modified)"
	       "\n4. Print Flag:\t\t(Try to print the flag, good luck)"
	       "\n5. Exit\n\nEnter your choice: ");
	fflush(stdout);
}

static void init(void)
{
	printf("\nWelcome to heap1!\n");
	printf("I put my data on the heap so it should be safe from any "
	       "tampering.\n");
	printf("Since my data isn't on the stack I'll even let you write "
	       "whatever info you want to the heap, I already took care of "
	       "using malloc for you.\n\n");
	fflush(stdout);

	input_data = malloc(INPUT_DATA_SIZE);
	strncpy(input_data, "pico", INPUT_DATA_SIZE);

	safe_var = malloc(SAFE_VAR_SIZE);
	strncpy(safe_var, "bico", SAFE_VAR_SIZE);
}

/*
 * scanf("%s", ...) stops only at whitespace, never at INPUT_DATA_SIZE --
 * this is the entire vulnerability.
 */
static void write_buffer(void)
{
	printf("Data for buffer: ");
	fflush(stdout);
	scanf("%s", input_data);
}

static void print_heap(void)
{
	printf("Heap State:\n");
	printf("+-------------+----------------+\n");
	printf("[*] Address   ->   Heap Data   \n");
	printf("+-------------+----------------+\n");
	printf("[*]   %p  ->   %s\n", input_data, input_data);
	printf("+-------------+----------------+\n");
	printf("[*]   %p  ->   %s\n", safe_var, safe_var);
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
			write_buffer();
			break;
		case 3:
			printf("\n\nTake a look at my variable: safe_var = %s\n\n",
			       safe_var);
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
