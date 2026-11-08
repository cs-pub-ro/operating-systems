# Demo: Time in the Ready Queue

## Run

```console
make
./waiting_time 8
./waiting_time 64
./waiting_time 512 > waits.txt; sort -k5 -n waits.txt | tail
```

## Ask

* With fewer threads than CPUs a yield costs a microsecond. Why?
* With 512 threads the longest wait is 175 ms. What is the thread doing during that time, and who decides when it ends?
