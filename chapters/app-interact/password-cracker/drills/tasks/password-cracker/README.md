# Password cracker

Navigate to `chapters/app-interact/password-cracker/drills/tasks/password-cracker/support`.
Creating 26 processes is not very realistic, since it's unlikely that a usual machine has that many cores.

Modify the program so that it only creates 4 workers.
Each worker will receive 2 characters instead of one, defining an interval to search.
For example, the first worker will receive `a` and `f`, meaning it will brute-force passwords starting with `a`, `b`, `c`, `d`, `e`, or `f`, the second `g` - `l`, and so on.

Check that the `worker()` function is indeed called from different worker processes.
One simple way to do this is to print out the current process ID at the beginning of the function.
To get the current process ID, use the `getpid()` function from the `os` module.

If you're having difficulties solving this exercise, go through [this](../../../reading/password-cracker.md) reading material.
