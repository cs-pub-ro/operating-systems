# Demo: A New Stack per Thread

## Run

```console
make
./create_threads
```

In a second terminal, after each `ENTER`:

```console
pmap $(pidof create_threads)
ps -o pid,cmd,vsz,rss,nlwp $(pidof create_threads)
```

## Ask

* What appears in `pmap` with each new thread, and how big is it?
* `vsz` grows by ~8 MB per thread but `rss` barely moves. Why? (Recall lecture 04.)
