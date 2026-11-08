# Demo: Creating a Process with posix_spawn()

## Run

```console
make
./posix_spawn
```

In a second terminal, while it runs:

```console
ps -ef | grep '[s]leep 100'
```

## Ask

* Which PID is the parent and which is the child?
* What does `waitpid()` do, and what would happen without it?
