# Interaction Between Threads and Fibers

As we mentioned before, multiple fibers can run on the same thread, and a scheduler is implemented on each thread.
By default, the scheduling algorithm is [`round_robin`](https://www.guru99.com/round-robin-scheduling-example.html).
It runs the fibers, in the order of their creation, until they yield or finish their work.
If a fiber yields, it is placed at the back of the round-robin queue.
Using this scheduler, each thread only uses its fibers;
if one thread has more work to do than another, bad luck.
This may lead to starvation.

But there are other scheduler implementations, such as `shared_work` and `work_stealing`.
Follow the `user-level-threads/support/threads_and_fibers.cc` implementation.
It creates multiple fibers and threads, and uses the `shared_work` scheduler to balance the workload between the threads.
Each main fiber, from each thread, is suspended until all worker fibers have completed their work, using a condition variable.

```cpp
cnd_count.wait( lk, []{ return 0 == fiber_count; } );
```

The program also uses `thread local storage` and `fiber local storage` to store the ID of each thread / fiber.

Now change the `shared_work` scheduler into the `work_stealing` one.
It takes a parameter, the number of threads that will use that scheduler.

Compile, rerun and note the differences.
The `work_stealing` scheduler, as the name suggests, will "steal" fibers from other schedulers.
So, if the `shared_work` scheduler tried to balance the available work between the available threads, the `work_stealing` one will focus on having as many threads as possible on 100% workload.
Vary the number of threads and fibers, and the workload (maybe put each fibre to do some computational-intensive work), and observe the results.
