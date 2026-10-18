# Demo: Allocation Changes the List of Areas

Four megabytes with `malloc()` and with `mmap()`, in one call and in 1024, while `pmap` watches.

## Run

Two terminals.
First:

```console
make
./memory_ops_entire
```

Second, at every prompt:

```console
pmap -x $(pidof memory_ops_entire)
```

Then the same with `./memory_ops_pages`.

## Ask

* One `malloc()` of 4 MB: a new area or a larger heap? And 1024 `malloc()`s of 4 KB?
* 1024 `mmap()` calls, four new lines in `pmap`. What happened to the other thousand?
* Read the `RSS` column: 4,108 KB for the heap, 0 for the 4 MB mapping. Both are 4 MB of address space. What is the difference?
