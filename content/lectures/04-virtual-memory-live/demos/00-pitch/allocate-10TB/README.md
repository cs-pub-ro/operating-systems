# Demo: Allocate 10 TB

Ten thousand `mmap()` calls of a gigabyte each, on a machine with 64 GB.

## Run

Two terminals.
First:

```console
make
./allocate_gb 10240
```

Second, at each prompt:

```console
ps -o pid,vsz,rss,cmd -p $(pidof allocate_gb)
pmap -x $(pidof allocate_gb) | tail -3
```

## Ask

* `VSZ` went from 2.7 MB to 10 TiB. What did `RSS` do?
* The loop took a fraction of a second. What did the kernel *not* do, for it to be that fast?
* Ten thousand calls, and `pmap` shows one new line. Why?
* Try `./allocate_gb 140000`. Where does it stop, and why there?
