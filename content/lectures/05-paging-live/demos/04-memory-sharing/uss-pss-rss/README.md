# Demo: RSS, PSS and USS for One Process

## Run

```console
grep -E '^[0-9a-f]|^Rss:|^Pss:' /proc/$$/smaps | head -20
smem -P bash -c "pid command uss pss rss" | grep -E "PID|^ *$$ "
```

## Ask

* The code zone: 1,240 KB of `Rss`, 63 KB of `Pss`. How many processes share it?
* The heap: `Pss` equals `Rss`. Why can a writable zone not be shared the same way?
