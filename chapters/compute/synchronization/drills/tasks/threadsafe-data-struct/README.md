# Synchronization - Thread-Safe Data Structure

Now it's time for a fully practical exercise.
Go to the `threadsafe-data-struct/` directory of the extracted archive (or `chapters/compute/synchronization/drills/tasks/threadsafe-data-struct/` if you are working directly in the repository), then open the `support/` folder.
In the file `clist.c` you'll find a simple implementation of an array list.
Although correct, it is not (yet) thread-safe.

The code in `test.c` verifies its single-threaded correctness, while the one in `test_parallel.c` verifies it works properly with multiple threads.
Your task is to synchronize this data structure using whichever primitives you like.
Try to keep the implementation efficient.
Aim to decrease your running times as much as you can.
