# Demo: One Megabyte, Four Ways

Four programs that write 2,048 records of 512 bytes to `f.dat`.
Compare `fwrite.c` with `write.c`, then look at the three ways `write.c` is built in the `Makefile`.

## Run

```console
make
./fwrite
./write
./write_o_direct
./write_o_direct_o_sync
strace -c -e trace=write ./fwrite
strace -c -e trace=write ./write
```

The fourth program takes several seconds.

## Ask

* Guess the time of each before running it. How far apart are the first and the last?
* The loop is the same in all four. What is different when each call returns?
* How many `write()` system calls does `fwrite` make, and why not 2,048?
* After which of the four is the data safe if the power goes out?
