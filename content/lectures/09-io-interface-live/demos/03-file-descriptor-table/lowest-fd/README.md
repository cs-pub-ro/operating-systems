# Demo: Which Entry a New Channel Gets

Read `main()` in `lowest-fd.c` and write down the number each `open()` will return, before running it.

## Run

```console
make
./lowest-fd
```

## Ask

* What does `open()` return after `close(4)`? What is the rule?
* What does `open()` return after `close(0)`?
* From then on, where does `scanf()` read from in this process?
* How could a shell use this to run `sort < names.txt`?
