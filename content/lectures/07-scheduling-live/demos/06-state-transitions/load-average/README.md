# Demo: The Load Average

## Run

```console
make
./load_average $(( 2 * $(nproc) ))
```

In a second terminal, every few seconds:

```console
cat /proc/loadavg
```

## Ask

* The fourth field jumps at once; the first climbs slowly. What is each one counting?
* Twice as many busy threads as CPUs. Where are the extra ones at any moment?
