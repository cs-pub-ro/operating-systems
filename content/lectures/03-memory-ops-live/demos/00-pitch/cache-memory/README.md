# Demo: Where Data Sits Decides Speed

Two programs fill the same 64 MB array, row by row and column by column.

## Run

```console
make
time ./row
time ./column
sudo perf stat -e instructions,cache-misses ./row
sudo perf stat -e instructions,cache-misses ./column
```

## Ask

* Same instruction count to four digits, nine times the time. Where did the time go?
* Forty-six times the cache misses. What is a cache miss costing, in instructions not executed?
* The data did not change and the arithmetic did not change. What did?
