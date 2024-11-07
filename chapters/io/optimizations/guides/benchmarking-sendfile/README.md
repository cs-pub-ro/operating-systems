# Benchmarking `sendfile()`

Navigate to `chapters/io/optimizations/guides/benchmarking-sendfile/support` and run `make` to prepare the test file.

`sendfile()` transfers data between two file descriptors directly within the kernel, bypassing user-space buffers.
This process is known as [zero-copy](../../reading/zero-copy.md).
Having established that `sendfile()` is likely faster than traditional I/O operations, it's time to put this theory to the test!

The code in `server.py` creates two threads that behave nearly identically.
One listens on port `8081` and handles connections using `read()` and `send()`, while the other listens on port `8082` and uses `sendfile()`.
Start the server in one terminal with `python server.py`.
In a second terminal, run `benchmark_client.py read-send` followed by `benchmark_client.py sendfile` to compare the performance.

The results below are generic, and your outcomes may vary significantly depending on factors such as disk performance, network interface card (NIC), kernel version, Python version, and system load.

```console
student@os:/.../benchmarking-sendfile/support$ python3 benchmark_client.py read-send
Time taken: 7.175773588009179 seconds

student@os:/.../benchmarking-sendfile/support$ python3 benchmark_client.py sendfile
Time taken: 3.71454380400246 seconds
```

Using `sendfile()` **halves the number of copies** required, reducing it from 4 to 2.
This should translate to a roughly halved running time as well, making `sendfile()` a clear performance improvement over traditional methods.

You can explore another example of **zero-copy** in practice in this [Quiz: Why is `cp` faster than `mmap()`-based `cp`](../../../file-descriptors/drills/questions/mmap-read-write-benchmark.md).
