# Stack Access

Threads share the address space of the process.
Each thread has their own stack, but, still, that stack is part of the same address space.
This means that a thread has the capacity to access the stack of another thread.

This demo showcases how a thread can modify the data on another thread's stack.

First, build it:

```console
make
```

And then run it:

```console
$ ./stack-access
reader: local_var is 0x11111111, local_var address is: 0x7168d1bfee9c
reader: going to for 5 seconds ...
writer: going to sleep for 2 seconds ...
writer: write 0x22222222 to reader local_var (address is 0x7168d1bfee9c)
writer: end execution
reader: local_var is 0x22222222
reader: end execution
```

The scenario is:
1. The first thread initializes a variable, then sleeps.
1. The second thread updates the variable.
1. The first thread wakes up, and reads the variable.

The variable on the first thread's stack can be modified by the second thread.
This is done with assistance from a global variable that stores the address of the local variable.
