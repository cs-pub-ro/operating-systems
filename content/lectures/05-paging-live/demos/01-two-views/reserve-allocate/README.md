# Demo: Which View Each Step Edits

Reserve 4 MB, write byte 0 of every page, write byte 4095 of every page, unmap.

## Run

Two terminals.
First:

```console
make
./reserve_allocate
```

Second, at every prompt:

```console
ps -o pid,comm,vsz,rss,min_flt,maj_flt -p $(pidof reserve_allocate)
```

## Ask

* After `mmap()`: which column moved, and which structure did that edit?
* After the first writes: which columns moved, and by how many pages?
* After the second writes: why did nothing move?
