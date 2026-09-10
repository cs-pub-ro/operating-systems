/*
 * Read a list of products from a file and print them sorted by price.
 *
 * The number of products is fixed at compile time (MAX_PRODUCTS), so the array
 * that holds them is an ordinary static-size array, and the lines are read into
 * fixed-size buffers.  What is *not* known ahead of time is how long each
 * product name is -- that is only discovered when the line is read -- so each
 * name is copied into a heap block sized to exactly that name with malloc().
 *
 * This is the counterpart to 01-xor-encrypt: there every size was known and
 * nothing was dynamic; here one size is decided by the input, and that single
 * unknown is what forces dynamic allocation.  Every name malloc'd here is freed
 * before the program exits.
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

/* Free every name we have allocated so far. */
static void free_products(struct product *products, size_t count)
{
	size_t i;

	for (i = 0; i < count; i++)
		free(products[i].name);
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
		size_t len;

		/* fgets keeps the newline; drop it. */
		name_buf[strcspn(name_buf, "\n")] = '\0';

		/*
		 * The name length is known only now, so allocate exactly
		 * that many bytes plus one for the terminator, and copy.
		 */
		len = strlen(name_buf);
		products[count].name = malloc(len + 1);
		if (products[count].name == NULL) {
			perror("malloc");
			free_products(products, count);
			fclose(f);
			return 1;
		}
		memcpy(products[count].name, name_buf, len + 1);

		products[count].price = (unsigned int)strtoul(price_buf, NULL, 10);
		count++;
	}

	fclose(f);

	qsort(products, count, sizeof(products[0]), by_price);

	printf("Sorted %zu products by price:\n", count);
	for (i = 0; i < count; i++)
		printf("  %6u  %s\n", products[i].price, products[i].name);

	/* Every name was malloc'd; give all of it back. */
	free_products(products, count);

	return 0;
}
