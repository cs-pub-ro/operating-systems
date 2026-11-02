# Demo: Threads Share the Address Space

## Run

```console
ps -e -o pid,comm,nlwp --sort -nlwp | head
ls /proc/<pid>/task
diff <(cat /proc/<pid>/maps) <(cat /proc/<pid>/task/<tid>/maps)
```

## Ask

* The `diff` is empty: every thread sees the same `maps`. What, then, does each thread have of its own?
* The first task has the same id as the process. Which thread is that?
