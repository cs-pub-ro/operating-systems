/*
 * Read a list of products from a file and print them sorted by price, using a
 * linked list that grows to hold as many products as the file contains -- with
 * no fixed limit.
 *
 * This is the fully dynamic version of 02-products.  There the number of
 * products was capped and the array was static; only each name lived on the
 * heap.  Here nothing is bounded: every product is a heap-allocated node, with
 * its own heap-allocated name, linked into a list that is kept sorted by price
 * as it is built.  Two allocations per product on the way in, and two frees per
 * product when the list is torn down.
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
 * `head` is the address of the head pointer, not the head node.  That one
 * extra level of indirection lets the same two lines splice the node in
 * whether it belongs at the very front (where the pointer to update is the
 * caller's head) or later in the list (where it is some node's next).
 *
 * Returns 0 on success, -1 if an allocation failed.
 */
static int list_insert(struct product **head, unsigned int price,
		       const char *name)
{
	struct product *node;
	struct product **link;

	node = malloc(sizeof(*node));
	if (node == NULL)
		return -1;

	node->name = malloc(strlen(name) + 1);
	if (node->name == NULL) {
		free(node);
		return -1;
	}
	memcpy(node->name, name, strlen(name) + 1);
	node->price = price;

	/* Find the first node that is more expensive; insert just before it. */
	link = head;
	while (*link != NULL && (*link)->price <= price)
		link = &(*link)->next;

	node->next = *link;
	*link = node;

	return 0;
}

/* Free every node, and the name each one owns. */
static void list_free(struct product *head)
{
	while (head != NULL) {
		struct product *next = head->next;

		free(head->name);
		free(head);
		head = next;
	}
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
