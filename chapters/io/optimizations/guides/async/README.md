# Async

Enter the `chapters/io/optimizations/guide/async/` folder for some implementations of a simple request-reply server in C.
Here we have the implementation of a server that computes the n-th fibonacci number.
The server serves requests in different ways:

* **synchronous** server: `server.c`
* **multiprocess** server: `mp_server.c`
* **multithreaded** server: `mt_server.c`

**Note:** There is no asynchronous C variant, because of the unstable API of [`libaio`](https://pagure.io/libaio) and [`io_uring`](https://unixism.net/loti/what_is_io_uring.html).

1. Benchmark the synchronous server to have a reference point.
   Run `./server 2999` in one terminal and `time ./client_bench.sh 2999` in another.
   `client_bench.sh` we'll run `8` instances of `client.py` that make a request.

   ```console
   student@os:~/async/support$ time ./client_bench.sh 2000
   [...]
   root: Connected to localhost:2000
   root: Sending 30
   function(30): 1346269

   real    0m1.075s
   user    0m0.301s
   sys     0m0.029s
   ```

   The value you obtain might be different, but you should observe a speed-up when benchmarking the other two solutions.

1. Benchmark the multiprocess and multithreaded alternatives and see which one got the best speed increase.
   You can obtain more relevant values by tweaking parameters in `client_bench.sh`.
   For example, you could increase the **number of clients** or the **fibonacci value to compute**.

1. Begin by benchmarking the synchronous server to establish a baseline.
   Run `./server 2999` in one terminal and `time ./client_bench.sh 2999` in another.
   The `client_bench.sh` script will initiate `8` instances of `client.py`, each making a request.
   The output might look like this:

   ```console
   student@os:~/async/support$ time ./client_bench.sh 2000
   [...]
   root: Connected to localhost:2000
   root: Sending 30
   function(30): 1346269

   real    0m1.075s
   user    0m0.301s
   sys     0m0.029s
   ```

   Although the actual value may vary, you should observe a noticeable speed-up when testing the other two solutions.

1. Next, benchmark the multiprocess and multithreaded alternatives to determine which offers the best performance improvement.
   To obtain more meaningful results, adjust parameters in `client_bench.sh`, such as increasing the **number of clients** or the **Fibonacci value to compute**.

If you're having difficulties understanding the support code, go through [this reading material](../../reading/async-io.md).
If you want to practice this yourself, go through the [Async Server task](../../drills/tasks/async-server/README.md).
