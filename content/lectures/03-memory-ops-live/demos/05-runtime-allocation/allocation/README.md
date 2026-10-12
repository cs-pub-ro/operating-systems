# Demo: Watching the Dynamic Areas Change

`alloca()`, a hundred recursive calls, four `malloc()`s and `free()`s, an `mmap()` and `munmap()`, with a pause after each.

## Run

Two terminals.
First:

```console
make
./allocation
```

Second, at every prompt:

```console
pmap -x $(pidof allocation)
```

Watch `[ stack ]`, the first `rw--- [ anon ]` line, and the total.

## Ask

* The stack went from 136 KB to 420 KB and its start address moved. Which way, and who asked for it?
* The heap grew for the `malloc()`s and shrank for the `free()`s. Would it have shrunk if the *first* block had been freed instead of all four?
* The mapping came and went completely. Why is it an area of its own and the heap is not?
