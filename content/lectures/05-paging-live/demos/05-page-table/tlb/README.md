# Demo: What a TLB Miss Costs

## Run

```console
make
sudo perf stat -e dTLB-load-misses,dTLB-loads ./tlb
sudo perf stat -e dTLB-load-misses,dTLB-loads ./tlb huge
```

## Ask

* 1.49 million misses for 1.05 million accesses, one byte per page. What does the hardware do on each miss?
* With 2 MB pages: 13,569 misses. How many translations cover 512 MB now?
* The time dropped from 6.5 to 4.9 ns, not to zero. What is the rest?
