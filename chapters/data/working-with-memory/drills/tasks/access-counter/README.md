# Access Counter

Navigate to the `access-counter/` directory from the lab archive (or `chapters/data/working-with-memory/drills/tasks/access-counter/support` if you are working directly in the repository).

Your goal is to update the `src/access_counter.c` source code file to capture memory access exceptions (i.e. the `SIGSEGV` signal) and to update page permissions in order for the access to eventually succeed.
Use `mprotect` to update the protection of the pages in stages: read, write and then exec.
Each time an update is made, the `counter` variable is increased;
this is used for testing.

The signal handler is already in place as the `access_handler()` function.
It is called any time a `SIGSEGV` signal is being sent out to the current process.
You will update the handler by following the `TODO` comments and instructions here.

The `pages` array stores information about accessed pages.
Assume the `MAX_PAGES` size of the array is enough to store information.
When an existing page is accessed and causes a memory exception, the permission is update, in the stages mentioned above: read, write, and then exec.
When a new page is accessed, a new entry is filled in the `pages` array, initialized with read protection.
Use `mmap()` to reserve virtual pages.
Use anonymous mapping (i.e. the `MAP_ANONYMOUS`) flag.
Use any permissions required.

To test it, enter the `tests/` directory and run:

```console
make check
```

In case of a correct solution, you will get an output such as:

```text
./run_all_tests.sh
test_access_read                  ........................ passed ...   9
test_access_write                 ........................ passed ...   9
test_access_exec                  ........................ passed ...  10
test_access_read_write            ........................ passed ...  12
test_access_read_exec             ........................ passed ...  12
test_access_write_exec            ........................ passed ...  12
test_access_exec_read             ........................ passed ...  12
test_access_exec_write            ........................ passed ...  12
test_access_write_read            ........................ passed ...  12

Total:                                                           100/100
```

If you're having difficulties solving this exercise, go through [this](../../../reading/working-with-memory.md) reading material.
