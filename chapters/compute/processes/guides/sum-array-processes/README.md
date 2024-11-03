# Sum Array Processes

## Sum of the Elements in an Array

Let's assume we only have one process on our system, and that process knows how to add the numbers in an array.
It can use however many resources it wants, since there is no other process to contest it.
It would probably look like the code in `chapters/compute/processes/guides/sum-array-processes/support/c/sum_array_sequential.c`.
The program also measures the time spent computing the sum.
Let's compile and run it:

```console
student@os:~/.../sum-array/support/c$ ./sum_array_sequential
Array sum is: 49945994146
Time spent: 127 ms
```

You will most likely get a different sum (because the array is made up of random numbers) and a different time than the ones shown above.
This is perfectly fine.
Use these examples qualitatively, not quantitatively.

## Spreading the Work Among Other Processes

Due to how it's implemented so far, our program only uses one of our CPU's cores.
We never tell it to distribute its workload to other cores.
This is wasteful as the rest of our cores remain unused:

```console
student@os:~$ lscpu | grep ^CPU\(s\):
CPU(s):                          8
```

We have 7 more cores waiting to add numbers in our array.

![What if we used 100% of the CPU?](../../media/100-percent-cpu.jpeg)

What if we use 7 more processes and spread the task of adding the numbers in this array between them?
If we split the array into several equal parts and designate a separate process to calculate the sum of each part, we should get a speedup because now the work performed by each individual process is reduced.

Let's take it methodically.
Compile and run `sum_array_processes.c` using 1, 2, 4 and 8 processes respectively.
If your system only has 4 cores ([hyperthreading](https://www.intel.com/content/www/us/en/gaming/resources/hyper-threading.html) included), limit your runs to 4 processes.
Note the running times for each number of processes.
We expect the speedups compared to our reference run to be 1, 2, 4 and 8 respectively, right?

[Quiz](../../drills/questions/processes-speedup.md)

You most likely did get some speedup, especially when using 8 processes.
Now we will try to improve this speedup by using **threads** instead.

Also notice that we're not using hundreds or thousands of processes.
Assuming our system has 8 cores, only 8 _threads_ can run at the same time.
In general, **the maximum number of threads that can run at the same time is equal to the number of cores**.
In our example, each process only has one thread: its main thread.
So by consequence and by forcing the terminology (because it's the main thread of these processes that is running, not the processes themselves), we can only run in parallel a number of processes equal to at most the number of cores.
