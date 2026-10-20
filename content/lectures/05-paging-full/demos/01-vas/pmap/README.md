# Virtual Address Space Views

To view the address space of the current process as a list of memory areas, use:

```console
pmap $$
```

There is no easy way to get the contents of the page table view.
We can compute the number of valid PTEs (Page Table Entries) by dividing the virtual address space size to 4K (the size of each page).
