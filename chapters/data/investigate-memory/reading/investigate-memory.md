# Investigate Memory Actions

Memory actions generally mean:

- memory access: read, write or execute
- memory allocation
- memory deallocation

By far, the most important actions are allocation and deallocation.
Because, if not done right, these can get to memory loss and poor memory use.

Memory loss generally happens in the form of memory leaks.

## `malloc()` in Musl

Each libc (or memory allocator such as `jemalloc`) uses their own implementation of `malloc()`, `free()` and other functions.
[Musl libc](https://musl.libc.org/) is a lightweight standard C library that provides compatible features with the more heavyweights [GNU libc](https://www.gnu.org/software/libc/).

Take a look through implementation of `malloc()` and `free()` in [Musl libc](https://elixir.bootlin.com/musl/v1.2.3/source/src/malloc).
See all three implementations for `malloc()`:

* the one in `lite_malloc.c`
* the one in `mallocng/malloc.c`
* the one in `oldmalloc/malloc`

See also [the implementation of `free()`](https://elixir.bootlin.com/musl/v1.2.3/source/src/malloc/mallocng/free.c#L101).
And [the implementation of `calloc()`](https://elixir.bootlin.com/musl/v1.2.3/source/src/malloc/calloc.c#L33).

You needn't spend too much time browsing the implementation of these functions, just having a broad understanding of how they work.
