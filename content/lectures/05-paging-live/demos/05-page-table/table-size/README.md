# Demo: How Much Page Table a Process Has

## Run

```console
grep -E 'VmSize|VmRSS|VmPTE' /proc/$$/status
grep -E 'VmSize|VmRSS|VmPTE' /proc/$(pgrep -f chrom | tail -1)/status
```

## Ask

* One entry per page of 128 TiB, 8 bytes each: how large is the flat table?
* The shell's tables take 60 KB. What makes the difference?
* The browser reserves 1.5 TB and its tables take 8 MB. Why does the reservation cost nothing in tables?
