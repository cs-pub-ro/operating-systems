# Thread-Local Storage

Threads can use isolated global variables as thread-local storage or thread-specific data.
They are to be used similar to global variables, except they are defined per thread.

This demo showcases the use of thread-local storage.

First, build it:

```console
make
```

Now run the resulting executable:

```console
$ ./tls
sum (address: 0x760747fff6b8): 0
sum (address: 0x760746ffd6b8): 20000000
sum (address: 0x7607477fe6b8): 10000000
sum (address: 0x7607457fa6b8): 50000000
sum (address: 0x760744ff96b8): 60000000
sum (address: 0x7607467fc6b8): 30000000
sum (address: 0x7607437f66b8): 90000000
sum (address: 0x760743ff76b8): 80000000
sum (address: 0x760745ffb6b8): 40000000
sum (address: 0x7607447f86b8): 70000000
```

From the output you can see that each thread uses a different address / location of the `sum` variable (defined with the `__thread` prefix).
