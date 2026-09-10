# Exercise: Sort Products by Price

**Tools:** GCC, Make, Valgrind

## Goal

Reference implementation of the product-sorting exercise.
It is the counterpart to `01-xor-encrypt`: there every size was known ahead of time, so nothing was dynamic; here one size — the length of each product name — is decided by the input, and that single unknown is exactly what forces `malloc`.

## Background

The program reads products from a file, sorts them by price, and prints them.
Each product is two lines: a name, then an integer price.

```c
#define MAX_PRODUCTS	32

struct product {
	unsigned int price;
	char *name;
};
```

Two of the three quantities are fixed at compile time, and one is not:

* The **number of products** is capped at `MAX_PRODUCTS`, so `struct product products[MAX_PRODUCTS]` is a plain static-size array, and the input lines are read into fixed-size buffers.
* The **length of a name** is not known until the line is read.
  So each name is copied out of the shared read buffer into a heap block sized to exactly that name — `malloc(strlen + 1)` — which the product then owns and must free.

Files:

* `products.c` — the completed implementation.
* `products.txt` — 32 products, two lines each.

## Build & Run

```console
make
./products products.txt
```

`make run` does the same, and `make test` checks the result:

```console
make test
```

## Results and Explanations

### Why the name is on the heap and the array is not

The array is `products[MAX_PRODUCTS]` — its size is a constant, so it lives in `main`'s stack frame and needs no allocation.
The names cannot work that way: a name is as long as the input says, and reserving a fixed `char name[64]` inside each struct would both waste space on short names and truncate long ones.

```c
name_buf[strcspn(name_buf, "\n")] = '\0';

len = strlen(name_buf);
products[count].name = malloc(len + 1);
if (products[count].name == NULL) {
	perror("malloc");
	free_products(products, count);
	fclose(f);
	return 1;
}
memcpy(products[count].name, name_buf, len + 1);
```

`name_buf` is a single fixed buffer reused for every line, so the name has to be *copied somewhere that lasts*.
`malloc(len + 1)` reserves exactly the right amount — the `+ 1` is for the `'\0'` terminator, the classic off-by-one every C string allocation has to get right.
`memcpy` of `len + 1` bytes copies the string and its terminator in one go.

### Ownership: every `malloc` has a matching `free`

Each product owns the block its `name` points at, so every one of them has to be released:

```c
static void free_products(struct product *products, size_t count)
{
	size_t i;

	for (i = 0; i < count; i++)
		free(products[i].name);
}
```

This runs on **both** ways out of the program: the normal path at the end, and the error path if a `malloc` fails partway through — where it frees exactly the names allocated so far, `count` of them, and no more.
Freeing on every path is the habit this whole session is building.

### Sorting

`qsort` reorders the array of structs in place, using `by_price` to compare two products.
The comparison *compares* the prices rather than subtracting them, because the prices are `unsigned` and `a - b` would wrap around to a huge positive value when `a < b` — a classic comparator bug.

Note that sorting moves the structs, `name` pointers and all, so no strings are copied or freed by the sort: each heap block simply has a different array slot pointing at it afterwards.

### Checking for leaks

```console
valgrind --leak-check=full ./products products.txt
```

```text
    total heap usage: 35 allocs, 35 frees, ... bytes allocated
    in use at exit: 0 bytes in 0 blocks
All heap blocks were freed -- no leaks are possible
ERROR SUMMARY: 0 errors from 0 contexts
```

Thirty-two of those allocations are the names; the rest belong to stdio.
Unlike `01-xor-encrypt`, where a clean report was trivial because the program owned no heap memory at all, here the clean report actually means something — miss one `free` and the count no longer balances.

## References

* `man 3 malloc`, `man 3 free`
* `man 3 qsort` — and why a comparator must not subtract unsigned values
* `man 3 fgets`, `man 3 strcspn`, `man 3 strtoul`
