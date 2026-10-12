# Demo: Where Every Kind of Variable Lives

Initialised global, uninitialised global, constant, local array, `alloca()`, `static` local, `malloc()`, `mmap()`: each prints its address.

## Run

```console
make
./allocation-types
nm allocation-types | grep -E 'init_data|ro_data|local_scope_data|heap_data|mapped_data'
size allocation-types
```

## Ask

* Three address ranges. Which variables share one, and why?
* `nm` prints addresses from the file, before it has run. Which of the printed addresses does it already know?
* `local_scope_data` is declared inside a function and lands next to the globals. What does `static` actually mean?
* `.bss` is 16 KB in memory. How many bytes of it are in the file?
