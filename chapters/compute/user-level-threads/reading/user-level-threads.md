# User-Level Threads

User-level threads differ from the threads you are used to (kernel-level threads, those created by `pthread_create`).
This kind of threads are scheduled by an user-level scheduler, and can run on the same kernel-level thread.
From now on, we will refer to user-level threads as fibers, and kernel-level threads as simply threads.

We will use the fiber implementation from `libboost`.
This implementation uses a cooperative scheduler on each thread, meaning that each fiber has to yield, in order for other fiber to be executed.
We will also use C++, and the standard `thread` implementation.

## Prerequisites

Unless you are using the OS docker image, you will need to install `cmake` and `libboost`.
You can do this with the following command:

```console
student@os:~$ sudo apt-get install cmake libboost-context-dev libboost-fiber-dev
```

## Creation

Follow the `user-level-threads/support/simple.cc` implementation.
It creates `NUM_FIBERS` fibers, that each prints "Hello World".
To compile and run the program, do the following steps:

```console
student@os:~/.../user-level-threads/support$ mkdir build/
student@os:~/.../user-level-threads/support$ cd build/
student@os:~/.../user-level-threads/support$ cmake -S .. -B .
student@os:~/.../user-level-threads/support$ make
student@os:~/.../user-level-threads/support$ ./simple
```

The `cmake` step must be executed only once.
After modifying the source files, it is enough to run `make`.

### Practice: Sleeper Fiber

Add in `user-level-threads/support/simple.cc` a fiber that sleeps for 5 seconds, before the other ones are created.
What happens?
Answer in this [quiz](../drills/questions/sleeping-on-a-fiber.md).

## No system calls

Use `strace` to find calls to `clone()` in the execution of `simple`.
Can you find any?
Provide your answer in this [quiz](../drills/questions/fiber-strace.md)
Remember that `clone()` is the system call used to create **kernel-level** threads, as pointed out [here](clone).

## Synchronization

By default, the fibers that run on the same thread are synchronized - no race-conditions can occur.
This is illustrated by the `user-level-threads/support/sum.cc` implementation.

The user can, however, implement further synchronization, by using the `yield()` call, or classic synchronization methods, like mutexes, barriers and condition variables.

### Yielding

As the scheduler is cooperative, each fiber can yield (or not), to allow another fiber to run.
Follow the `user-level-threads/support/yield_launch.cc` implementation and run it.
Note the `boost::fibers::launch::dispatch` parameter provided to the fiber constructor.
It notifies the scheduler to start the fibre as soon as it is created.
In order to explain the output, we must consider that the fibers are created by a **main fiber**, that is scheduled along with the others, in this case.

#### Practice

Modify the launch parameter into `boost::fibers::launch::post`, compile and notice the differences.
The `post` parameter notifies the scheduler not to start the fibers immediately, but rather place them into an execution queue.
Their execution will start after the main fiber calls the `join()` function.

### Barriers

Follow the `user-level-threads/support/yield_barrier.cc` implementation.
It uses a barrier to achieve the same result as the previous implementation, that used `post` as the launch parameter.

### C++ unique_lock

`unique_lock` is a type of mutex that is unlocked automatically when the end of its scope is reached (end of function or bracket-pair).
