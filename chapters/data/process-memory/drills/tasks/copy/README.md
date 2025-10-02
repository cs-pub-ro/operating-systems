# Memory Mapping

Navigate to the `copy/` directory from the lab archive (or `chapters/data/process-memory/drills/tasks/copy/` if you are working directly in the repository), run `make skels` and open the `support/src` directory.
Here you will find these files:

* `read_write_copy.c` in which you will implement copying with `read` / `write` syscalls
* `mmap_copy.c` in which you will implement copying using `mmap`
* `benchmark_cp.sh` script which runs the two executables `mmap_copy` and `read_write_copy`

1. Complete the implementations for the `read_write_copy.c` and `mmap_copy.c` files.
   The goal is to copy the `in.dat` file to `out.dat` using the `read` / `write` syscalls and `mmap` respectively.
   Check your work by running the `checker.sh` script in the `support/tests/` directory.

1. Once you have a working implementation, run the `benchmark_cp.sh` script to compare the performance of the two approaches.
   The output should look like this:

   ```console
   student@os:~/.../drills/tasks/copy/support$ ./benchmark_cp.sh
   Benchmarking mmap_copy on in.dat
   time passed 54015 microseconds

   Benchmarking read_write_copy on in.dat
   time passed 42011 microseconds
   ```

   Run the script a few more times.
   As you can see, there isn't much of a difference between the two approaches.
   Although we would have expected the use of multiple system calls to cause overhead, it's too little compared to the memory copying overhead.

1. Add a `sleep()` call to the `mmap_copy.c` file **after** the files were mapped.
   Rebuild the program and run it.
   On a different console, use `pmap` to view the two new memory regions that were added to the process, by mapping the `in.dat` and `out.dat` files.

If you're having difficulties solving this exercise, go through [this](../../../reading/process-memory.md) reading material.
