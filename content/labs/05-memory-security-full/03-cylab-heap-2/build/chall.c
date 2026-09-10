/*
 * chall.c -- heap2: "I have a function, I sometimes like to call it,
 * maybe you should change it."
 *
 * check_win() reads the first 4 bytes at address x and calls them as a
 * function pointer -- but x is not the function pointer itself, it is a
 * heap buffer whose *contents* the player can overwrite via write_buffer().
 * Overflowing the adjacent input_data allocation into x's buffer lets the
 * player choose exactly which address gets called.
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FLAGSIZE_MAX	64

static char *x;
static char *input_data;

/* The function check_win() is tricked into calling, once x is corrupted. */
static void win(void)
{
	char buf[FLAGSIZE_MAX];
	FILE *fd;

	fd = fopen("flag.txt", "r");
	fgets(buf, FLAGSIZE_MAX, fd);
	printf("%s\n", buf);
	fflush(stdout);

	exit(0);
}

/*
 * Reads a 4-byte value out of the buffer x points to, and calls it as a
 * function with no arguments. If the player has overwritten those 4 bytes
 * with the address of win(), this calls win() instead of whatever the
 * author intended.
 */
static void check_win(void)
{
	((void (*)(void))*(int *)x)();
}

static void print_menu(void)
{
	printf("\n1. Print Heap\n2. Write to buffer\n3. Print x\n"
	       "4. Print Flag\n5. Exit\n\nEnter your choice: ");
	fflush(stdout);
}

static void init(void)
{
	printf("\nI have a function, I sometimes like to call it, maybe you "
	       "should change it\n");
	fflush(stdout);

	input_data = malloc(5);
	strncpy(input_data, "pico", 5);

	x = malloc(5);
	strncpy(x, "bico", 5);
}

/*
 * scanf("%s", ...) stops only at whitespace, never at the 5 bytes
 * requested for input_data -- this is the entire vulnerability.
 */
static void write_buffer(void)
{
	printf("Data for buffer: ");
	fflush(stdout);
	scanf("%s", input_data);
}

static void print_heap(void)
{
	printf("[*]   Address   ->   Value   \n");
	printf("+-------------+-----------+\n");
	printf("[*]   %p  ->   %s\n", input_data, input_data);
	printf("+-------------+-----------+\n");
	printf("[*]   %p  ->   %s\n", x, x);
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
			write_buffer();
			break;
		case 3:
			printf("\n\nx = %s\n\n", x);
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
