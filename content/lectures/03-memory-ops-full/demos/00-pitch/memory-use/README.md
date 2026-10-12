# Demo: Memory Is What Runs Out

List the processes on a desktop by how much memory each holds, and look at the top.

## Goal

Make memory concrete as the resource that runs out first, before any definition of what it is.

## Run

```console
ps -e -o pid,comm,rss --sort -rss | head -20
```

`rss` is the resident set size: how many kilobytes of the process are actually in physical memory right now.
`--sort -rss` puts the biggest first.

## Results and explanations

On a desktop with a browser, a chat client and an office suite open:

```text
$ ps -e -o pid,comm,rss --sort -rss | head -8
    PID COMMAND           RSS
  33283 chrome          1657396
  31705 chrome          1394884
  32312 chrome          982264
 747284 chrome          952568
  32573 chrome          865060
  34405 Discord          850136
 641932 chrome          821156
```

The largest single process is a browser at 1.6 GB, and the browser is not one process but dozens: each tab, each extension and the GPU helper run separately, and every one of them holds its own copy of the rendering engine's working state.
Messaging applications are the next tier, because most of them are a browser engine with a chat window drawn on top.

Two things to take from it:

* **Memory is the first thing a machine runs out of.**
  CPUs are rarely the limit on a desktop; memory is, and when it is, everything slows at once, because the kernel starts moving pages out to disk.
* **A process's memory is not its executable.**
  `chrome` on disk is a few hundred megabytes; the process is gigabytes.
  The difference is dynamic allocation, which is the second half of the lecture.

The memes exist because everyone has felt this:

* [Chrome, Chrome, yes papa](https://www.reddit.com/r/pcmasterrace/comments/f8rex3/chrome_chrome_yes_papa/)
* [Chrome and RAM](https://devrant.com/rants/2552559/chrome)

## Going further

* `ps -o pid,comm,rss,vsz` adds `vsz`, the size of the whole address space.
  It is usually much larger than `rss`: part 03 of the lecture is about why an address space can be far bigger than the memory it uses.
* `top` or `htop` show the same numbers live, and `free -h` shows the total; the [buffer-cache demo](../buffer-cache) reads that output.
* `cat /proc/<pid>/status | grep -i vm` lists a process's memory from the kernel's side, in more detail than `ps`.

## References

* `man 1 ps`, `man 5 proc` (the `/proc/[pid]/status` fields)
