# C - TLS on Demand

The perspective of C towards TLS is the following: everything is shared by default.
This makes multithreading easier and more lightweight to implement than in other languages, like D, because synchronization is left entirely up to the developer, at the cost of potential unsafety.

Of course, we can specify that some data belongs to the TLS, by preceding the declaration of a variable with `__thread` keyword.
Enter the `tls-on-demand/` directory of the extracted archive (or `chapters/compute/synchronization/drills/tasks/tls-on-demand/` if you are working directly in the repository) and run `make skels`.
Now enter `support/src` and follow the TODOs.

1. Create the declaration of `var` and add the `__thread` keyword to place the variable in the TLS of each thread.
   Recompile and run the code a few more times.
   You should see that in the end, `var` is 0.

1. Print the address and value of `var` in each thread.
   See that they differ.

1. Modify the value of `var` in the `main()` function before calling `pthread_create()`.
   Notice that the value doesn't propagate to the other threads.
   This is because, upon creating a new thread, its TLS is initialised.

[Quiz 1](../../questions/tls-synchronization.md)

[Quiz 2](../../questions/tls-var-copies.md)
