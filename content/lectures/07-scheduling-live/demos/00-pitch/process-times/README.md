# Demo: The Times of a Process

## Run

Pick a process that has been open for days, a browser or an editor:

```console
./get_times_for_pid.sh <pid>
ps -o pid,comm,etime,cputime,%cpu -p <pid>
./get_times_for_pid.sh $$
```

## Ask

* Three times: user, system, elapsed. Which two add up, and which one is far larger?
* What was the process doing for the rest of its elapsed time?
