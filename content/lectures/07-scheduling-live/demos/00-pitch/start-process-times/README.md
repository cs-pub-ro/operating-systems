# Demo: The Times of a Started Process

## Run

```console
sudo sh -c 'echo 3 > /proc/sys/vm/drop_caches'
\time -v find /usr/share > /dev/null
\time -v find /usr/share > /dev/null
```

## Ask

* Same command, same instructions. Why 13% of a CPU the first time and 99% the second?
* Note the two context-switch counts; they come back in part 05.
