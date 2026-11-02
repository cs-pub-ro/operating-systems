# Demo: Creating a Process with posix_spawn()

Create a child process from an executable, wait for it, and read how it ended.

## Goal

See the three process operations in one program: create a child, wait for it, read its exit status.

## Background

[`posix_spawn()`](https://man7.org/linux/man-pages/man3/posix_spawn.3.html) is the simplest way to start a process from a program: give it the path of an executable and its arguments, and it returns the child's PID.
`posix_spawn.c` runs `/usr/bin/sleep 100` as a child, prints the PIDs, then calls `waitpid()`.
`WIFEXITED()` says whether the child exited normally, and `WEXITSTATUS()` gives the value it returned.

## Build and run

```console
make
./posix_spawn
```

## Results and explanations

```text
$ ./posix_spawn
PID: 24687, parent PID: 8217, child PID: 24688
Process exited with status 0
Process exited successfully.
```

The child has its own PID and its parent PID is this process.
While the child runs, a second terminal can see it:

```console
$ ps -ef | grep '[s]leep 100'
razvan    24688   24687  0 15:46 pts/3    00:00:00 /usr/bin/sleep 100
```

`waitpid()` blocks until the child finishes, after which the status word says it exited with 0.

## Going further

* Remove the `waitpid()` and run it again: the child is left behind as a zombie, which is the next demo.
* Pass a bad path to `posix_spawn()` and read its return value: unlike `exec()`, it reports the failure through its return code.

## References

* `man 3 posix_spawn`, `man 2 waitpid`, `man 2 wait`
