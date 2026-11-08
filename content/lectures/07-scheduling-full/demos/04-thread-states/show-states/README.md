# Demo: Showing Thread States

The state of every thread on the machine, as `ps` reports it.

## Goal

Read a thread's state from `ps`, map the letters onto running, ready and blocked, and see that nearly every thread is blocked.

## Background

The kernel keeps a state per thread, and `ps -o state` prints it as one letter.
`ps -L` lists threads (one line per `LWP`, light-weight process) rather than processes.

## Build and run

Nothing to build.

```console
ps -e -L -o pid,lwp,comm,state
ps -e -L -o state --no-headers | sort | uniq -c
ps -e -L -o pid,lwp,comm,state | grep ' R$'
```

## Results and explanations

```text
$ ps -e -L -o pid,lwp,comm,state
    PID     LWP COMMAND         S
      1       1 systemd         S
      2       2 kthreadd        S
[...]
 815888  815888 chrome          S
 815888  815981 chrome          S
[...]
 110977  110977 kworker/u97:16  I
 110980  110980 ps              R
```

The letters, from the `PROCESS STATE CODES` section of `man ps`:

```text
R    running or runnable (on run queue)
S    interruptible sleep (waiting for an event to complete)
D    uninterruptible sleep (usually IO)
I    Idle kernel thread
T    stopped by job control signal
t    stopped by debugger during the tracing
Z    defunct ("zombie") process, terminated but not reaped by its parent
X    dead (should never be seen)
```

Against the lecture's three states: `R` is **running or ready** (`ps` does not tell the two apart; both are "on the run queue"); `S` and `D` are **blocked**, in a wait queue, the second kind unable to be woken by a signal; `I` is a kernel thread with nothing to do; `T` and `t` are stopped, a fourth state outside the three; `Z` is a thread that will never run again.

```text
$ ps -e -L -o state --no-headers | sort | uniq -c
    262 I
      3 R
   4452 S
```

Of 4,717 threads, 3 are running or ready, and one of them is `ps`.
Almost everything is `S`: waiting for a key, a packet, a timer, a lock, a child.

## Going further

* `ps -e -L -o pid,lwp,comm,state,wchan` adds the kernel function each sleeping thread is waiting in: `do_wait` for a parent in `wait()`, `hrtimer_nanosleep` for a `sleep()`, `ep_poll` or `do_select` for an event loop.
* Run `yes > /dev/null &` and the histogram gains an `R`; run `cat` with no input and it gains an `S`; run `sleep 100 & kill -STOP $!` and it gains a `T`.
* `cat /proc/<pid>/status | grep State` is the same letter, with a word after it.

## References

* `man 1 ps`, section `PROCESS STATE CODES`, and `wchan`
* `man 5 proc`, `/proc/[pid]/status`
