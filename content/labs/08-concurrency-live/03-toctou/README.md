# Exercise: A Name With Two Owners

**Tools:** GCC, Make

## Goal

Find and close a check-then-act bug in a library where every access to the shared data is already locked.
Afterwards you will be able to tell "every access is protected" from "every operation is protected", and to spot a decision that outlives the lock it was made under.

## Background

`registry.c` is a registry of user names.
A name can be registered once: `registry_register()` returns 1 to the thread that gets the name and 0 to everybody who asks for it afterwards.

`chall` starts eight threads that all want the same five hundred names.
For each name the threads line up at a barrier, so that they ask at the same moment, as close as the executable can arrange.
Of the eight, exactly one has to be told that the name is its own.

The library was written by somebody who knew about race conditions.
There is a mutex in the registry, and it is taken, correctly, in every function that reads or writes the array of names: `registry_contains()` locks, looks, and unlocks; `registry_add()` locks, stores, and unlocks.
No two threads are ever in the array at the same time.

And still names end up with two owners, and three.

A bug of this kind has a name, **time of check to time of use**, or TOCTOU: a program checks that something is true, and then acts as if it were still true, when in between the two it had no way of keeping it true.

## Your Task

1. Run `./chall` a few times and read what it reports.
1. Read `registry_register()`, and write down, as a sequence of steps of two threads, how the same name can be given to both.
   Mark the moment at which the first thread's knowledge stops being true.
1. Change the library so that the check and the act cannot be separated.
   You may reorganize the functions of `registry.c` as you see fit, as long as the functions declared in `registry.h` keep doing what the header says.

A mutex of the default kind must not be locked again by the thread that holds it.

## Build & Run

```console
make
./chall
```

## Check Your Work

* The flag has to be printed on every run; run it twenty times.
* If your first attempt ends with the time-out message, find out which thread is waiting for which lock before you change anything.
* Be ready to show the teaching assistant the interleaving you wrote down in step 2.
* Say why adding a second mutex, used only in `registry_register()`, would also work here, and what would break it later.
