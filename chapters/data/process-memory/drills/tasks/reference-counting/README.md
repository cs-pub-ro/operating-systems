# Operator overloading

Navigate to the `reference-counting/support/` directory in the lab archive (or `chapters/data/process-memory/drills/tasks/reference-counting/support` if you are working directly in the repository).
Analyze the `operators.d` file.
A `struct` is defined that also implements 4 special functions: a constructor, a copy constructor, an assignment operator and a destructor.
Each of these special functions may be called automatically by the compiler:

- the constructor is called automatically whenever an object is initialized with a field of a type that corresponds to the constructor parameter type.
- the copy constructor is called automatically when an object is initialized from an object of the same type.
- the assignment operator is called automatically when an object is assigned an object of the same type.
- the destructor is called automatically whenever an object goes out of scope.

**Note: the difference between initialization and assignment is that the initialization occurs when an object is being declared and occurs a single time (`Obj o1 = 1`), whereas assignment is decoupled from the declaration site and may occur multiple times (provided that the variable is mutable).**

Compile and run the program in `operators.d`.
Notice how the different special functions are automatically called.
Considering the definition of `Obj` from the file `operators.d`, answer the following.

Analyze the `refcount_skel.d`.
A reference counted `int` array is implemented, however, some bits are missing.
Run the code, try to understand what happens.

The constructor allocates memory for the array, whereas the destructor deallocates it.
Compile and run the code.
Notice how the array's memory  is automatically managed.

1. Uncomment the following line in the `main` function (`//test1()`).
   Run the code.
   What happens?
   Why?

1. The reference counted array does not implement the copy constructor.
   Comment the `version(none)` annotation for the copy constructor and implement the logic so that the reference counted array is correct.
   When an object is initialized from another object, we need to appropriately set the fields and then increment the reference count.
   Once you have completed this exercise, make sure the output is correct and that the reference counted array is not freed too early.

1. Uncomment the following line in the `main` function (`//test2()`).
   Run the code.
   What happens?
   Why?
   Use GDB to find out.

1. The reference counted array does not implement the assignment operator.
   Comment the `version(none)` annotation for the assignment operator and implement the logic so that the reference counted array is correct.
   When an object is assigned to another object, we need to first decrement the count for the object that is being assigned to, then fill the fields similarly to the copy constructor case and lastly increment the count for the assigned object.
   After completing the exercise, make sure that the memory is properly managed.

1. Play with your reference counted array and create different scenarios to test its limits.

If you're having difficulties solving this exercise, go through [this](../../../reading/process-memory.md) reading material.
