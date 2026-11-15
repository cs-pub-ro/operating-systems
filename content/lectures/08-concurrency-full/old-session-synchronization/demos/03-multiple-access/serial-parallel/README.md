# Serial Access vs Parallel Access

Parallel multithreaded access to a variable can cause inconsistent results.
Multiple threads are scheduled on different CPUs and end up simultaneously writing a given variable.
Consistent results are obtained with a serial approach (but that takes more).
Another approach is synchronization.

This demo showcases how non-synchronized parallelism can cause inconsistent results.

First build it:

```console
make
```

Now run the serial case, and get consistent results:

```console
$ ./serial
sum is: 450000000

$ ./serial
sum is: 450000000

$ ./serial
sum is: 450000000
```

Whereas, with a parallel run, you get inconsistent results:

```console
$ ./parallel
sum is: 68539300

$ ./parallel
sum is: 82509599

$ ./parallel
sum is: 80660647
```

This is because the threads are scheduled on multiple CPUs and they end up simultaneously writing to the same variable.

Even if we run the parallel case (with multiple threads), on a single CPU, results would be inconsistent.
This is because threads are preempted, and the preemption can happen in the middle of updating the `sum` variable:

```console
$ taskset --cpu-list 0 ./parallel
sum is: 75524336

$ taskset --cpu-list 0 ./parallel
sum is: 159617490

$ taskset --cpu-list 0 ./parallel
sum is: 126728231
```

This happens because the `sum += v` instruction translates into multiple assembly instructions:

```console
$ objdump -d -M intel parallel
[...]
    1227:       48 8b 15 02 2e 00 00    mov    rdx,QWORD PTR [rip+0x2e02]        # 4030 <sum>
    122e:       48 8b 45 f8             mov    rax,QWORD PTR [rbp-0x8]
    1232:       48 01 d0                add    rax,rdx
    1235:       48 89 05 f4 2d 00 00    mov    QWORD PTR [rip+0x2df4],rax        # 4030 <sum>
[...]
```

Interestingly, the parallel case is slower than the serial case because of the additional work required by the scheduler and by cache thrashing:

```console
$ \time -v ./serial
sum is: 450000000
        Command being timed: "./serial"
        User time (seconds): 0.13
        System time (seconds): 0.00
        Percent of CPU this job got: 99%
        Elapsed (wall clock) time (h:mm:ss or m:ss): 0:00.13
[...]

$ \time -v ./parallel
sum is: 76912760
        Command being timed: "./parallel"
        User time (seconds): 1.85
        System time (seconds): 0.00
        Percent of CPU this job got: 794%
        Elapsed (wall clock) time (h:mm:ss or m:ss): 0:00.23
```
