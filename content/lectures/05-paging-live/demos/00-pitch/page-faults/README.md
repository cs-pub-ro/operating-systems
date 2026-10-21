# Demo: Ten Billion Page Faults

## Run

```console
grep -E '^pgfault|^pgmajfault' /proc/vmstat
awk '{printf "up %.1f days\n", $1 / 86400}' /proc/uptime
ps -eo pid,min_flt,maj_flt,rss,comm --sort -min_flt | head -4
ps -o pid,min_flt,maj_flt,rss,comm -p $$
```

## Ask

* Divide the first number by the seconds of uptime. How many per second, on an idle machine?
* 148,220 major faults out of 9.7 billion. What is different about those?
* A browser process has 1.65 billion faults and 600 MB resident. How can it fault more times than it has pages?
