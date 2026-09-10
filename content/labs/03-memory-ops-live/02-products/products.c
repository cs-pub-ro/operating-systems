/*
 * Read a list of products from a file and print them sorted by price.
 *
 * The number of products is fixed at compile time (MAX_PRODUCTS), so the array
 * holding them is an ordinary static-size array, and the lines are read into
 * fixed-size buffers.  What is not known ahead of time is how long each product
 * name is -- that is decided by the input -- so each name must be copied into a
 * heap block sized to exactly that name with malloc().  Fill in the two TODOs.
 *
 * Input format: one product per two lines -- a name line, then a price line.
 *
 * Build:  make
 * Run:    ./products [products.txt]
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_PRODUCTS	32
#define LINE_SIZE	256

/* A product owns the heap copy of its name. */
struct product {
	unsigned int price;
	char *name;
};

/* Order two products by price, ascending, for qsort(). */
static int by_price(const void *a, const void *b)
{
	const struct product *pa = a;
	const struct product *pb = b;

	/* Compare, rather than subtract: unsigned subtraction can wrap. */
	if (pa->price < pb->price)
		return -1;
	if (pa->price > pb->price)
		return 1;
	return 0;
}

int main(int argc, char **argv)
{
	const char *path = (argc > 1) ? argv[1] : "products.txt";
	struct product products[MAX_PRODUCTS];
	char name_buf[LINE_SIZE];
	char price_buf[LINE_SIZE];
	size_t count = 0;
	size_t i;
	FILE *f;

	f = fopen(path, "r");
	if (f == NULL) {
		perror("fopen");
		return 1;
	}

	/*
	 * Read up to MAX_PRODUCTS products, two lines each.  The array is
	 * fixed-size, so the count guard keeps us inside it.
	 */
	while (count < MAX_PRODUCTS &&
	       fgets(name_buf, sizeof(name_buf), f) != NULL &&
	       fgets(price_buf, sizeof(price_buf), f) != NULL) {
		/* fgets keeps the newline; drop it. */
		name_buf[strcspn(name_buf, "\n")] = '\0';

		/*
		 * TODO 1: the name's length is known only now, at run time.
		 * Allocate exactly strlen(name_buf) + 1 bytes with malloc()
		 * (the + 1 is for the '\0' terminator), copy name_buf into
		 * that block, and store the pointer in products[count].name.
		 * If malloc() returns NULL, print an error and stop.
		 * This is the whole point of the exercise: a size known only
		 * at run time needs dynamic allocation.
		 */

		products[count].price = (unsigned int)strtoul(price_buf, NULL, 10);
		count++;
	}

	fclose(f);

	qsort(products, count, sizeof(products[0]), by_price);

	printf("Sorted %zu products by price:\n", count);
	for (i = 0; i < count; i++)
		printf("  %6u  %s\n", products[i].price, products[i].name);

	/*
	 * TODO 2: every name was allocated with malloc(), so free every one
	 * before the program exits.  Miss one and it leaks -- run the program
	 * under `valgrind --leak-check=full` to prove there is nothing left.
	 */

	return 0;
}
