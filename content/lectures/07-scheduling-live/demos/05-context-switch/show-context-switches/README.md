# Demo: Counting Context Switches

Uses the `change_state` program of part 04.

## Run

```console
make -C ../../04-thread-states/change-state
../../04-thread-states/change-state/change_state
```

In a second terminal, at the prompt and during each burst:

```console
pid=$(pgrep -x change_state)
grep switches /proc/$pid/task/$pid/sched
```

## Ask

* One voluntary switch per wait at the prompt. What did the thread call?
* A hundred involuntary switches per burst, on a thread that never asked to leave. Who took the CPU, and why?
