# Process I/O Data

Processes use I/O interfaces to interact with other processes or files - outside the process address space.
Processes send and receive data via I/O interfaces, using primitives such as `read()` / `write()` or `receive()` / `send()`.

We can see the number of bytes read / written and the number of read / write system calls by reading the [`/proc/<pid>/io` file](https://man7.org/linux/man-pages/man5/proc_pid_io.5.html).

To see the data of the current shell, use:

```console
$ cat /proc/$$/io
rchar: 7052226
wchar: 115976
syscr: 9058
syscw: 1183
read_bytes: 245760
write_bytes: 57344
cancelled_write_bytes: 45056
```

In the output above, the values correspond to:

- `7052226` characters were read by the shell.
- `115976` characters were written by the shell.
- There were `9058` read systen calls.
- There were `1183` write systen calls.
- There were `245760` bytes read from storage.
- There were `57344` bytes written to storage.

To see the data for the memory-expensive process in the system, use:

```console
$ cat /proc/$(ps -e -o pid --sort rss | tail -1 | tr -d ' ')/io
rchar: 24359128
wchar: 85325436
syscr: 490777
syscw: 489143
read_bytes: 20006912
write_bytes: 0
cancelled_write_bytes: 0
```

As the listing above shows a browser (Chromium), there are no bytes written to storage.
A lot of the data is the result of networking related interactions.
