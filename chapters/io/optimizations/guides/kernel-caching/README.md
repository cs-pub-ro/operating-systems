# Kernel Caching

I/O is critical to system efficiency, but also often its weakest link.
Techniques to improve I/O performance include [buffering](../../../file-descriptors/guides/libc-FILE-struct/), [zero-copy](../../../optimizations/reading/zero-copy.md), and [async I/O](../../../optimizations/reading/async-io.md).
Among these, buffering is the most common and powerful.

Remember `buffering/support/benchmark_buffering.sh` or `file-mappings/support/benchmark_cp.sh`.
They both used this line:

```bash
sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"
```

The line invalidates caches, forcing the OS to perform I/O operations directly from the disk.
This ensures that the scripts benchmark the C code's performance alone, without any speedup from cached data.

The kernel goes even further with **buffering**.
This time, it’s at a level beyond syscalls like `read()` and `write()`, using a strategy known as **caching**.
While buffering helps with handling the **next data** efficiently by reading in advance or delaying writes, caching is about speeding up repeated access to the **same data**.
Just as your browser caches frequently visited pages or your CPU caches recent addresses, the OS caches files that are accessed often, such as logs or configuration files.

When the OS encounters a file access, it stores portions of that file in memory so that subsequent requests can read or modify data from RAM rather than waiting on the slower disk.
This makes I/O faster.

## Caching in action

Navigate to `chapters/io/optimizations/guides/kernel-caching/support` and run `make` to create a large file that we'll use for benchmarking.
We have two scripts to benchmark the `cp` command with and without caching:

```console
student@os:/.../kernel-caching/support$ ./benchmark_cp.sh
make: 'large-file.txt' is up to date.
Benchmarking cp on a 1 GB file...

real    0m1.473s
user    0m0.001s
sys     0m0.985s

student@os:/.../kernel-caching/support$ ./benchmark_cp_allow_caching.sh
make: 'large-file.txt' is up to date.
Benchmarking cp on a 1 GB file...

real    0m0.813s
user    0m0.000s
sys     0m0.837s
```

Each subsequent benchmark actually reads the data from the caches populated or refreshed by the previous one.
So running the script multiple times might improve the results.

You can use `free -h` to view how much data your kernel is caching.
Look at the `buff/cache` column.
One possible output is shown below.
It says the OS is caching 7 GB of data.

```console
student@os:~$ free -h
              total        used        free      shared  buff/cache   available
Mem:           15Gi       8,1Gi       503Mi       691Mi       7,0Gi       6,5Gi
Swap:         7,6Gi       234Mi       7,4Gi
```
