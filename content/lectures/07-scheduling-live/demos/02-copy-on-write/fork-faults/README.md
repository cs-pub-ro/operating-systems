# Demo: The Page Faults of a Fork

## Run

```console
make
./fork_faults
```

In a second terminal, at every prompt:

```console
ps -o pid,ppid,comm,min_flt,maj_flt,rss,vsz -p "$(pgrep -d, -x fork_faults)"
```

## Ask

* The child starts with 4 MB resident and a couple of dozen faults. What was copied at the fork?
* Reading 512 pages: one fault. Writing 512 pages: 512 faults. What does each of those faults do?
* The child is gone, and the parent's 1,024 writes still cost 1,025 faults. Why?
