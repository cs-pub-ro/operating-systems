# Multithreaded List Operations

Concurrent access to shared data cause inconsistent behavior.
In the case of pointers, this may cause pointers to refer unallocated memory regions, causing a segmentation fault.

This demo showcases the causing of a segmentation fault within a multithreaded program using doubly-linked lists.

First build it:

```console
make
```

The run it and see segmentation fault messages happening:

```console
$ ./thread-list-app
Segmentation fault (core dumped)

$ ./thread-list-app
reached head when removing. not good.
Segmentation fault (core dumped)

$ ./thread-list-app
Segmentation fault (core dumped)
```
