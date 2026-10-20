# Segmentation Fault

A memory access violation (segmentation fault) appears in two situations:
- the accessed page is not reserved
- the accessed page doesn't have the correct permissions

The program below walks through 8 situations of accessing memory, depending on the type of access, the place of access (within bounds or out of bounds) and the permissions of the page.

First build it:

```console
make
```

The run it with the corresponding argument (as shown in the usage message):

```console
$ ./segfault
./segfault <option>
  1 - read access on write perm
  2 - write access on write perm
  3 - out-of-bounds read access on write perm
  4 - out-of-bounds write access on write perm
  5 - read access on read perm
  6 - write access on read perm
  7 - out-of-bounds read access on read perm
  8 - out-of-bounds write access on read perm
```
