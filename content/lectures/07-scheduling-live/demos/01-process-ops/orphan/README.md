# Demo: An Orphan Process

## Run

```console
make
./orphan
```

In a second terminal:

```console
ps -o pid,ppid,cmd -C sleep
ps -o pid,cmd --no-headers -p <the ppid above>
```

## Ask

* Who is the child's parent now, and why is it not the `orphan` process?
* Why can an orphan never stay a zombie?
