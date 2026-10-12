# Demo: Where Data Sits Decides Speed

Two programs fill the same 64 MB array with the same values, one row by row and one column by column.
Same instructions, one of them nine times slower.

## Goal

Show that the CPU's cache is real and that the order a program touches memory in decides whether the cache helps.
This is the measurement behind the "performance" reason in the pitch.

## Background

`x` is an 8192 x 8192 array of bytes, laid out in memory row after row: `x[i][j]` is at offset `i * 8192 + j`.
`row.c` walks it in that order, so consecutive writes hit consecutive bytes.
`column.c` walks it column first: `x[j][i]` for `j = 0, 1, 2, ...`, so consecutive writes are 8 KB apart.

The CPU does not fetch memory a byte at a time but a **cache line** at a time, 64 bytes on x86.
`row` writes 64 consecutive bytes for every line fetched; `column` writes one byte per line and then moves on, and by the time it comes back to the next byte of that line, 8192 lines later, the line is long gone from the cache.

## Build and run

```console
make
time ./row
time ./column
```

With `perf`, which needs `sudo` and `kernel.perf_event_paranoid` at 2 or lower:

```console
sudo perf stat -e instructions,cache-misses ./row
sudo perf stat -e instructions,cache-misses ./column
```

## Results and explanations

```text
$ time ./row
real    0m0.050s
$ time ./column
real    0m0.460s
```

Nine times slower for the same work.
`perf` says where the time goes:

```text
$ sudo perf stat -e instructions,cache-misses ./row
     1,279,597,512      instructions
         1,261,585      cache-misses
       0.089 seconds time elapsed

$ sudo perf stat -e instructions,cache-misses ./column
     1,280,513,994      instructions
        57,935,620      cache-misses
       0.910 seconds time elapsed
```

The instruction counts agree to four digits: the programs do the same amount of computing.
The cache misses differ forty-six times, and each miss is a trip to memory that the CPU has to wait for.
`column` is not doing more work; it is waiting more.

The programs are compiled with `-O0` on purpose.
At `-O2` the compiler can see that `row` touches memory sequentially and vectorise it, which makes the gap larger still but muddies the comparison, since the two programs would no longer run the same instructions.

## Going further

* Change `SIZE` to 64 and the two programs take the same time: a 4 KB array fits in the cache whole, and the order no longer matters.
  Find the size at which `column` starts to lose; it tells you the size of your cache.
* `perf stat -e L1-dcache-load-misses,LLC-load-misses` splits the misses by cache level.
* Swap the two loops in `column.c` -- `for j` outside, `for i` inside -- without changing the index expression, and it becomes `row` in all but name.
  The data layout did not change; only the order of access did.

## References

* `man 1 perf-stat`
* Ulrich Drepper, [What Every Programmer Should Know About Memory](https://people.freebsd.org/~lstewart/articles/cpumemory.pdf), section 3 on CPU caches
* `lscpu` and `getconf -a | grep CACHE` print the cache sizes of the machine
