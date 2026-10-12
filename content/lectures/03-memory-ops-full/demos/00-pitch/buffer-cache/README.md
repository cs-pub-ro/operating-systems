# Demo: Memory You Do Not See Is Working for You

The kernel keeps copies of recently read files in memory, in the buffer cache.
Look at how much there is, then drop it and feel the difference.

## Goal

Show that the "used" memory of a machine is not only its programs: a large share is the kernel spending memory to avoid disk reads.
This is part 01's memory hierarchy felt from the outside.

## Background

Reading a file from disk takes milliseconds; reading the same bytes from memory takes nanoseconds.
So the kernel keeps every page it reads from disk in memory after it has handed it to the program, in case it is asked for again, and only throws it away when a program needs the memory for something else.
That cache is what `free` reports as `buff/cache`.
It is why the second start of a program is faster than the first, and why a machine that has been up for a day has almost no "free" memory and is none the worse for it.

## Run

```console
free -h
```

Then, **on your own machine only**, drop the cache and start a large program twice:

```console
sync
echo 3 | sudo tee /proc/sys/vm/drop_caches
time firefox --version        # or any large program: the first start reads it from disk
time firefox --version        # the second start finds it in the cache
```

## Results and explanations

```text
$ free -h
               total        used        free      shared  buff/cache   available
Mem:            59Gi        25Gi       4.7Gi       2.0Gi        31Gi        33Gi
Swap:           79Gi       2.4Mi        79Gi
```

Of 59 GB, programs use 25 GB and the buffer cache holds 31 GB: more than the programs.
Only 4.7 GB is free in the sense of holding nothing, but 33 GB is **available**, because the cache can be given up the moment a program asks.

After `drop_caches`, `buff/cache` falls to a few hundred megabytes, and the machine becomes noticeably sluggish for a while: every program start, every file open, every directory listing goes back to the disk until the cache has refilled.
The first start of a program after the drop is a **cold start**; the second is a **warm start**, and the difference between the two timings is the disk.

The lesson is that "used" and "free" are the wrong words for memory.
Memory that holds a cached file is doing useful work, and a kernel that left it empty would be wasting it.

## Going further

* `vmtouch` (a small tool, packaged on most distributions) shows which pages of a given file are currently in the cache, and can pin or evict them.
* The first demo of lecture 01, [`03-find-buffer-cache`](../../../../01-software-stack-full/demos/00-pitch/03-find-buffer-cache), is the same effect measured on `find`: the second run fifteen times faster.
* `/proc/meminfo` has the detailed breakdown that `free` summarises: `Cached`, `Buffers`, `Dirty` (cached data not yet written to disk) and more.

## References

* `man 1 free`, `man 5 proc` (`/proc/meminfo`, `/proc/sys/vm/drop_caches`)
* [Linux ate my RAM!](https://www.linuxatemyram.com/) -- the one-page explanation of why free memory is not the number to look at
