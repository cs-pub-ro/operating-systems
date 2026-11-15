# Synchronized Access

To get consistent results, access to shared variables must be synchronized.

This demo showcases how synchronization provides consistent results, and how it's implemented.

First, build all files:

```console
make
```

There are two executables, one with synchronized / atomic access and one without.
For the non-atomic variant, results are inconsisten:

```console
$ ./sum_threads
sum is: 1090666

$ ./sum_threads_atomic
sum is: 4500000
```

To see what's happening we disassemble the code:

```console
$ aarch64-linux-gnu-objdump -d sum_threads_atomic
[...]
  400b3c:       c85f7c20        ldxr    x0, [x1]
  400b40:       8b100011        add     x17, x0, x16
  400b44:       c80ffc31        stlxr   w15, x17, [x1]
  400b48:       35ffffaf        cbnz    w15, 400b3c <__aarch64_ldadd8_sync+0x1c>
[...]
```

We notice that there is a loop to constantly try to make the addition (busy waiting) until successful.
