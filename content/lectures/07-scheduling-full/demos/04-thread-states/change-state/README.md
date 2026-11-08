# Demo: A Thread Changing State

One thread that burns the CPU, then waits for input, then burns again, watched from a second terminal.

## Goal

See a thread move between running and blocked, and see which of its two times, elapsed and CPU, advances in each state.

## Background

`change_state.c` loops forever: it waits for `ENTER` with `fgets()`, then runs a CPU-intensive loop for a few seconds, then waits again.
While it waits it is blocked on `read()`, in the wait queue of the terminal; while it loops it is running, or ready whenever the kernel gives the CPU to someone else for a moment.

## Build and run

```console
make
./change_state
```

In a second terminal, while it waits at the prompt and again while it burns:

```console
ps -o pid,comm,state,etime,cputime -p "$(pgrep -x change_state)"
```

## Results and explanations

```text
$ ./change_state
 * Entering a CPU intensive phase
 -- Press ENTER to continue ...
 * Entering a CPU intensive phase
 -- Press ENTER to continue ...
```

```text
    PID COMMAND         S     ELAPSED     TIME
1378742 change_state    S       00:01 00:00:00      waiting at the prompt
1378742 change_state    R       00:04 00:00:03      in the CPU-intensive phase
1378742 change_state    S       00:13 00:00:03      back at the prompt
1378742 change_state    R       00:16 00:00:06      burning again
1378742 change_state    S       00:25 00:00:06      at the prompt again
```

At the prompt the thread is `S`, blocked in `read()`, and its CPU time does not move while the elapsed time does.
In the loop it is `R`, and both move together: three seconds of elapsed time, three seconds of CPU time.
The program's whole life is the elapsed time; its CPU time is the sum of the bursts.

This is the browser of the pitch, in miniature: a long elapsed time, a small CPU time, and the difference spent in `S`.

## Going further

* `top -p <pid>` shows the same flips live, with `%CPU` at 100 in the loop and 0 at the prompt.
* Replace `fgets()` with `sleep(5)` and the state at the "prompt" is still `S`, now waiting for a timer rather than the terminal.
* The same program is used by the [show-context-switches demo](../../05-context-switch/show-context-switches) of part 05, where the counters behind the `R`/`S` flips are read.

## References

* `man 1 ps`, `state`, `etime`, `cputime`
* `man 3 fgets`, `man 2 read`
