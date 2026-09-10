# Bonus: Sort Products With a Linked List

**Tools:** GCC, Make, Valgrind

## Goal

Rebuild `02-products` so it can handle *any* number of products, by storing them in a linked list that grows as the file is read instead of a fixed array.
Afterwards you will be able to allocate an unbounded number of small objects, keep them in order, and free every one.

## Background

In `02-products` the number of products was capped at 32 and the array was static; only the names were on the heap.
Here there is no cap: every product is its own heap node, linked into a list.

```c
struct product {
	unsigned int price;
	char *name;
	struct product *next;
};
```

Each product now costs **two** allocations — the node and its name — and the list can be any length.
Keep the list sorted by price as you build it, so no separate sort is needed.

Open `products.c`.
`main`, the read loop and the printing are written; you fill in three TODOs, all in the two list helpers.

## Your Task

1. **TODO 1** — in `list_insert`, create the node: `malloc` a `struct product`, `malloc` and copy its name (`strlen(name) + 1` bytes), and set its price.
   Free what you allocated and return `-1` if a `malloc` fails.
1. **TODO 2** — in `list_insert`, splice the node into the list at the position that keeps it sorted by ascending price.
   The new node may belong at the front; `head` is a pointer to the head pointer so you can update it there.
1. **TODO 3** — in `list_free`, free every node and every name.
   Save `next` before you free a node — once it is freed you cannot read `node->next` from it.

## Build & Run

```console
make
./products products.txt
valgrind --leak-check=full ./products products.txt
```

`make clean` removes the binary.

## Check Your Work

The products must print from cheapest to dearest, and there are more than 32 of them in `products.txt`./

Then run under `valgrind --leak-check=full` and aim for "in use at exit: 0 bytes": for *N* products you allocate *N* nodes and *N* names, and every one must be freed.
Deliberately break it to learn the failure modes — free only the nodes and not the names, or read `node->next` after freeing the node — and read what Valgrind says about each before fixing it.
