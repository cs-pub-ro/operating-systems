# Demo: Ten Processes, Four Ways

## Run

```console
./generate.sh && ./build.sh
./instantiate-one-static-multiple-times.sh
smem -P '^\./work/hel' -c "pid command uss pss rss"
./kill.sh
./instantiate-multiple-static.sh
smem -P '^\./work/hel' -c "pid command uss pss rss"
./kill.sh
```

Then the two dynamic scenarios the same way, and `./clean.sh` at the end.

## Ask

* Ten copies of one static executable: 708 KB of `RSS` each, 115 KB of `PSS`. What is the 650 KB in between?
* Ten different static executables: `USS`, `PSS` and `RSS` agree. What is left to share?
* The dynamic ones have the largest `RSS` and the smallest `PSS`. With whom is libc shared?
