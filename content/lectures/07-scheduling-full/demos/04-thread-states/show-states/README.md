# Show Thread States

To show the states of current threads in the system, use:

```console
$ ps -e -L -o pid,lwp,comm,state
[...]
 110945  110964 ThreadPoolForeg S
 110945  110965 ThreadPoolForeg S
 110945  110966 ThreadPoolForeg S
 110945  110967 ThreadPoolForeg S
 110945  110968 ThreadPoolForeg S
 110945  110969 ThreadPoolForeg S
 110945  110970 ThreadPoolForeg S
 110945  110971 ThreadPoolForeg S
 110945  110972 ThreadPoolForeg S
 110945  110973 ThreadPoolForeg S
 110945  110974 ThreadPoolForeg S
 110945  110975 ThreadPoolForeg S
 110945  110976 ThreadPoolForeg S
 110977  110977 kworker/u97:16  I
 110980  110980 ps              R
```

The final column of the output is the thread state, as documented in the [manual page for `ps` - section `PROCESS STATE CODES`](https://man7.org/linux/man-pages/man1/ps.1.html#PROCESS_STATE_CODES):

```text
D    uninterruptible sleep (usually IO)
I    Idle kernel thread
R    running or runnable (on run queue)
S    interruptible sleep (waiting for an event to complete)
T    stopped by job control signal
t    stopped by debugger during the tracing
W    paging (not valid since the 2.6.xx kernel)
X    dead (should never be seen)
Z    defunct ("zombie") process, terminated but not reaped by its parent
```

Generally, we see threads in the `R` (ready or running) state and on `S` (blocked / sleeping state).
