# Demo: A Shared List

Ten threads add to, remove from and search one doubly-linked list.

## Run

```console
make
./thread-list-app
./thread-list-app
./thread-list-app-mutex
```

Look at `list_add_item()` in `list.c`, and at `lock()` and `unlock()` in `thread-list-app.c`.

## Ask

* How many writes does adding a node take, and what does the list look like between two of them?
* The sum could be cut into a piece per thread. Why can the list not?
* With the mutex, how many threads are changing the list at any moment? What are the others doing?
