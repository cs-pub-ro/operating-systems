# Multithreaded

Enter the `multithreaded/` directory (or `chapters/compute/threads/drills/tasks/multithreaded/` if you are working directly in the repository).
Run `make` and then enter `support/` folder and go through the practice items below.

1. Use the Makefile to compile `multithreaded.c`, run it and follow the instructions.

    The aim of this task is to familiarize you with the `pthreads` library.
    In order to use it, you have to add `#include <pthread.h>` in `multithreaded.c` and `-lpthread` in the compiler options.

    The executable creates 5 threads besides the main thread, puts each of them to sleep for **5 seconds**, then waits for all of them to finish.
    Give it a run and notice that the total waiting time is around **5 seconds** since you started the last thread.
    That is the whole point - they each run in parallel.

1. Make each thread print its ID once it is done sleeping.

    Create a new function `sleep_wrapper2()` identical to `sleep_wrapper()` to organize your work.
    So far, the `data` argument is unused (mind the `__unused` attribute), so that is your starting point.
    You must keep `sleep_wrapper2()`'s signature unchanged because `pthread_create()` requires a function of type `void *(*)(void *)`.
    What you can and should do is to pass a pointer to a `int` as argument, and then cast `data` to `int *` inside `sleep_wrapper2()`.

    **Note:** Do not simply pass `&i` as argument to the function.
    This will make all threads to use the **same integer** as their ID.

    **Note:** Do not use global variables.

    If you get stuck you can google `pthread example` and you will probably stumble upon [this](https://gist.github.com/ankurs/179778).

1. On top of printing its ID upon completion, make each thread sleep for a different amount of time.

    Create a new function `sleep_wrapper3()` identical to `sleep_wrapper()` to organize your work.
    The idea is to repeat what you did on the previous exercise and use the right argument for `sleep_wrapper3()`.
    Keep in mind that you cannot change its definition.
    Bonus points if you do not use the thread's ID as the sleeping amount.
