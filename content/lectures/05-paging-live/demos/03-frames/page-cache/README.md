# Demo: The Page Cache

## Run

```console
free -m
fincore /usr/bin/bash /usr/lib/x86_64-linux-gnu/libc.so.6 2>/dev/null
```

## Ask

* 21 GB of `buff/cache`, and `available` counts it. Why can the kernel give it away?
* Every page of `bash` is resident. Whose frames are those, and how many processes map them?
