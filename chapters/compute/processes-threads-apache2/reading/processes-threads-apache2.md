# Usage of Processes and Threads in `apache2`

We'll take a look at how a real-world application - the `apache2` HTTP server - makes use of processes and threads.
Since the server must be able to handle multiple clients at the same time, it must therefore use some form of concurrency.
When a new client arrives, the server offloads the work of interacting with that client to another process or thread.

The choice of whether to use multiple processes or threads is not baked into the code.
Instead, `apache2` provides a couple of modules called MPMs (Multi-Processing Modules).
Each module implements a different concurrency model, and the users can pick whatever module best fits their needs by editing the server configuration files.

The most common MPMs are

- `prefork`: there are multiple worker processes, each process is single-threaded and handles one client request at a time
- `worker`: there are multiple worker processes, each process is multi-threaded, and each thread handles one client request at a time
- `event`: same as `worker` but designed to better handle some particular use cases

In principle, `prefork` provides more stability and backwards compatibility, but it has a bigger overhead.
On the other hand, `worker` and `event` are more scalable, and thus able to handle more simultaneous connections, due to the usage of threads.
On modern systems, `event` is almost always the default.

## Conclusion

So far, you've probably seen that spawning a process can "use" a different program (hence the path in the args of `system` or `Popen`), but some languages such as Python allow you to spawn a process that executes a function from the same script.
A thread, however, can only start from a certain entry point **within the current address space**, as it is bound to the same process.
Concretely, a process is but a group of threads.
For this reason, when we talk about scheduling or synchronization, we talk about threads.
A thread is, thus, an abstraction of a task running on a CPU core.
A process is a logical group of such tasks.

We can sum up what we've learned so far by saying that processes are better used for separate, independent work, such as the different connections handled by a server.
Conversely, threads are better suited for replicated work: when the same task has to be performed on multiple cores.
However, replicated work can also be suited for processes.
Distributed applications, however, leverage different processes as this allows them to run on multiple physical machines at once.
This is required by the very large workloads such applications are commonly required to process.

These rules are not set in stone, though.
Like we saw in the `apache2` example, the server uses multiple threads as well as multiple processes.
This provides a degree of stability - if one worker thread crashes, it will only crash the other threads belonging to the same process - while still taking advantage of the light resource usage inherent to threads.

These kinds of trade-offs are a normal part of the development of real-world applications.
