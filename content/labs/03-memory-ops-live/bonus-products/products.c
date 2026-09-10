/*
 * Read a list of products from a file and print them sorted by price, using a
 * linked list that grows to hold as many products as the file contains -- with
 * no fixed limit.
 *
 * This is the fully dynamic version of 02-products.  There the number of
 * products was capped and the array was static; only each name lived on the
 * heap.  Here nothing is bounded: every product is a heap-allocated node, with
 * its own heap-allocated name, linked into a list kept sorted by price.
 * Fill in the three TODOs.
 *
 * Input format: one product per two lines -- a name, then an integer price.
 *
 * Build:  make
 * Run:    ./products [products.txt]
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define LINE_SIZE	256

/* A node owns its name and points at the next node (NULL at the tail). */
struct product {
	unsigned int price;
	char *name;
	struct product *next;
};

/*
 * Insert a new product, keeping the list sorted by ascending price.
 *
 * `head` is the address of the head pointer, not the head node, so the same
 * code can update the caller's head (when the new node is the cheapest) or a
 * node's `next` (when it goes later in the list).
 *
 * Returns 0 on success, -1 if an allocation failed.
 */
static int list_insert(struct product **head, unsigned int price,
		       const char *name)
{
	/*
	 * TODO 1: create the node.
	 *
	 * malloc() a `struct product`.  malloc() node->name to exactly
	 * strlen(name) + 1 bytes and copy the name into it.  Set node->price.
	 * The list can hold any number of products, so every node and every
	 * name is its own heap block.  If either malloc() fails, free anything
	 * you already allocated and return -1.
	 */

	/*
	 * TODO 2: splice the node into the list so it stays sorted by price,
	 * ascending.
	 *
	 * Walk from the head to the first node whose price is greater than
	 * this one, and link the new node in just before it.  Remember the new
	 * node may belong at the very front -- `head` is a pointer to the head
	 * pointer precisely so you can update it in that case with the same
	 * code as any other position.
	 */

	(void)head;
	(void)price;
	(void)name;
	return 0;
}

/* Free every node, and the name each one owns. */
static void list_free(struct product *head)
{
	/*
	 * TODO 3: free the whole list.
	 *
	 * Walk it, freeing each node->name and then the node.  Once you free a
	 * node you can no longer read node->next, so save it in a local first.
	 */
	(void)head;
}

int main(int argc, char **argv)
{
	const char *path = (argc > 1) ? argv[1] : "products.txt";
	struct product *head = NULL;
	char name_buf[LINE_SIZE];
	char price_buf[LINE_SIZE];
	size_t count = 0;
	struct product *p;
	FILE *f;

	f = fopen(path, "r");
	if (f == NULL) {
		perror("fopen");
		return 1;
	}

	/* No cap: read products until the file runs out. */
	while (fgets(name_buf, sizeof(name_buf), f) != NULL &&
	       fgets(price_buf, sizeof(price_buf), f) != NULL) {
		unsigned int price;

		name_buf[strcspn(name_buf, "\n")] = '\0';
		price = (unsigned int)strtoul(price_buf, NULL, 10);

		if (list_insert(&head, price, name_buf) != 0) {
			perror("malloc");
			list_free(head);
			fclose(f);
			return 1;
		}
		count++;
	}

	fclose(f);

	printf("Sorted %zu products by price:\n", count);
	for (p = head; p != NULL; p = p->next)
		printf("  %6u  %s\n", p->price, p->name);

	list_free(head);

	return 0;
}
