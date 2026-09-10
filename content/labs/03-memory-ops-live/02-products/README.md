# Exercise: Sort Products by Price

**Tools:** GCC, Make, Valgrind

## Goal

Read a list of products from a file, sort them by price, and print them.
Afterwards you will be able to explain why the *array* of products needs no `malloc` while each product *name* does — and free every allocation so the program leaks nothing.

## Background

Each product is two lines in the file: a name, then an integer price.
A product is a struct with a price and a pointer to its name:

```c
struct product {
	unsigned int price;
	char *name;
};
```

Two sizes are fixed and one is not.
The number of products is capped at `MAX_PRODUCTS`, so `products` is a plain fixed-size array and the lines are read into fixed-size buffers — no allocation there.
But a name is as long as the input says, and the single read buffer is reused for every line, so each name has to be **copied somewhere that lasts**: a heap block sized to exactly that name.

Open `products.c`.
The struct, the fixed array, the read loop, the sort and the printing are written; you fill in two TODOs.

## Your Task

1. **TODO 1** — inside the read loop, give the name a home on the heap.
   Measure its length, `malloc` exactly `strlen(name_buf) + 1` bytes (the `+ 1` is for the `'\0'`), copy the name in, and store the pointer in `products[count].name`.
   Check `malloc`'s result for `NULL`.
1. **TODO 2** — after the products are printed, `free` every name you allocated.

## Build & Run

```console
make
./products products.txt
valgrind --leak-check=full ./products products.txt
```

## Check Your Work

The products must print from cheapest to dearest.

Then run it under `valgrind --leak-check=full` and read the last lines.
Every block you allocated has to be freed by the time the program exits — "in use at exit: 0 bytes" is what you are aiming for.
Try deleting your `free` loop and running Valgrind again to see what a leak looks like, then put it back.
