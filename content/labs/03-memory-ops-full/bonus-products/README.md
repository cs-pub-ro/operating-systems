# Bonus: Sort Products With a Linked List

**Tools:** GCC, Make, Valgrind

## Goal

Reference implementation of the linked-list product sorter.
It is `02-products` with the last fixed quantity removed: the number of products is no longer capped, so the static array becomes a heap-allocated linked list that grows to fit whatever the file contains.

## Background

`02-products` kept a static `struct product[32]` and heap-allocated only the names.
That works until there are more than 32 products.
Here every product is its own node on the heap, linked into a list:

```c
struct product {
	unsigned int price;
	char *name;
	struct product *next;
};
```

Now **two** things are allocated per product — the node and its name — and the list can be any length.
The list is kept sorted by price as it is built, so no separate sort pass is needed.

Files:

* `products.c` — the completed implementation.
* `products.txt` — 40 products, more than the old array could hold.

## Build & Run

```console
make
./products products.txt
make test
valgrind --leak-check=full ./products products.txt
```

## Results and Explanations

### Sorted insertion with a pointer to a pointer

The interesting part is `list_insert`, which puts each new node straight into its sorted place:

```c
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

	link = head;
	while (*link != NULL && (*link)->price <= price)
		link = &(*link)->next;

	node->next = *link;
	*link = node;

	return 0;
}
```

The parameter is `struct product **head` — the address of the head pointer, not the head node.
That extra level of indirection is what lets one pair of lines handle both cases a linked-list insert normally splits into:

* inserting at the **front** (the new node is the cheapest), where the pointer that has to change is the caller's `head`, and
* inserting **later**, where the pointer that has to change is some node's `next`.

`link` walks across exactly those pointers.
The loop stops at the first node more expensive than the new one, `*link` is the node that should come *after* the new one, and the two assignments splice it in.
Written with a plain `prev` pointer instead, the front case needs a separate `if`; the pointer-to-pointer removes it.

### Two allocations in, two frees out

Each product now owns two heap blocks, so tearing the list down frees two per node — in the right order:

```c
static void list_free(struct product *head)
{
	while (head != NULL) {
		struct product *next = head->next;

		free(head->name);
		free(head);
		head = next;
	}
}
```

`next` is saved **before** `free(head)`, because reading `head->next` after freeing `head` is a use-after-free — the exact bug this session keeps circling back to.
`list_free` also runs on the allocation-failure path in `main`, so a mid-file `malloc` failure still leaves nothing behind.

### Checking for leaks

```console
valgrind --leak-check=full ./products products.txt
```

```text
    total heap usage: 83 allocs, 83 frees, ... bytes allocated
    in use at exit: 0 bytes in 0 blocks
All heap blocks were freed -- no leaks are possible
ERROR SUMMARY: 0 errors from 0 contexts
```

For 40 products that is 40 nodes plus 40 names — 80 of the allocations are ours, and every one has a matching free.

## Going Further

See `FURTHER.md` for variations: appending and sorting afterwards, deleting a node, and why storing indices or a tail pointer changes the trade-offs.

## References

* `man 3 malloc`, `man 3 free`
* `man 3 fgets`, `man 3 strcspn`, `man 3 strtoul`
* Linus Torvalds on the pointer-to-pointer list technique: ["Understanding pointers"](https://github.com/mkirchner/linked-list-good-taste)
