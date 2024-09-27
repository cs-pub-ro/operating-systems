# Memory Allocation Strategy

Navigate to the `guides/memory-alloc/support/` directory.
It contains 3 implementations of the same program in different languages: C, Python and D.
The program creates a list of entries, each entry storing a name and an id.
The purpose of this exercise is to present the different strategies that programming languages adopt to manage memory.

## C

The C implementation manages the memory manually.
You can observe that all allocations are performed via `malloc()` and the memory is freed using `free()`.
Arrays can be defined as static (on the stack) or dynamic (a pointer to some heap memory).
Stack memory doesn't need to be freed, hence static arrays are automatically deallocated.
Heap memory, however, is managed by the user, therefore it is the burden of the programmer to find the optimal memory strategy.
This offers the advantage that you can fine tune the memory usage depending on your application, but this comes with a cost: more often than not, managing memory is a highly complex error-prone task.

## Python

The Python implementation of the program has no notion of memory allocation.
It simply defines variables and the garbage collector takes care of allocating and deallocating memory.
Notice how the destructor is called automatically at some point when the garbage collector deems that the list is not used anymore.
Garbage collection lifts the burden of memory management from the user, however, it may be unsuitable for certain scenarios.
For example, real-time applications that need to take action immediately once a certain event occurs cannot use a garbage collector (GC).
That is because the GC usually stops the application to free dead objects.

## D

The previous 2 examples have showcased extreme situations: fully manual vs fully automatic memory management.
In D, both worlds are combined: variables may be allocated manually on the stack/heap or via the garbage collector (for brevity, `malloc()`-based allocation is not presented in this example).
Arrays that are allocated on the stack behave the same as in C, whereas arrays allocated with the garbage collector mimic Python lists.
Classes are also garbage collected.
