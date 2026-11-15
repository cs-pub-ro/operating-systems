# Demo: A Deadlock

Two accounts, each with a lock; one thread transfers from `a` to `b`, the other from `b` to `a`.

## Run

```console
make
./deadlock
```

In a second terminal, while it sits there:

```console
ps -L -o pid,tid,state,pcpu,wchan:20,comm -p $(pidof deadlock)
```

Stop it with `Ctrl+C`, then:

```console
./ordered
```

To see who holds what: `gdb ./deadlock`, `run`, `Ctrl+C`, `thread apply all bt 4`.

## Ask

* What state are the threads in, and how much CPU do they use? Is the program running?
* Which lock does each thread hold, and which is it waiting for?
* `ordered` takes the same two locks. What does it do differently?
