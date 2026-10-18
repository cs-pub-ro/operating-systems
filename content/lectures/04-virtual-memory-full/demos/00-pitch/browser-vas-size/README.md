# Demo: A Browser With 1.5 TB of Memory

Ask `ps` how large a browser process is, and get an answer larger than the machine.

## Goal

Put a number on the board that cannot be physical memory, before saying the words "virtual memory".

## Run

```console
ps -e -o pid,vsz,rss,comm --sort -vsz | head -6
```

`vsz` is the virtual size of the process, `rss` the resident set size, both in kilobytes.
`--sort -vsz` puts the largest address spaces first.

## Results and explanations

On a desktop with 59 GB of RAM and 80 GB of swap:

```text
$ ps -e -o pid,vsz,rss,comm --sort -vsz | head -6
    PID    VSZ   RSS COMMAND
  32573 1544448496 879760 chrome
  34405 1533182040 904016 Discord
 253577 1528348464 346232 signal-desktop
 506856 1526472832 863656 chrome
 253389 1524308312 298804 element-desktop
```

The first line says the process has a 1,544,448,496 KB address space: 1.44 TiB, on a machine whose RAM and swap together come to 139 GB.
Its `RSS`, the part actually in memory, is 880 MB.
The other four are the same kind of program: Discord, Signal and Element are all Chromium with a chat window drawn on top, and all four say the same 1.5 TB.

`pmap` gives the same total, and shows where it is:

```text
$ pmap $(pgrep -f chrom | tail -1) | tail -1
 total       1283528500K
$ pmap -x 32573 | sort -k2 -n -r | head -3
00001a8800000000 1073741824       0       0 -----   [ anon ]
00003c6c00000000 268435456       0       0 -----   [ anon ]
```

One anonymous area of exactly 1 TiB, another of 256 GiB, with no permissions at all (`-----`) and nothing resident.
Chromium's JavaScript engine reserves them on purpose, as a fenced-off region it will hand out pieces of later; the reservation costs nothing until a piece is used.

Two things to take from it:

* **The address space of a process is not the memory it uses.**
  `VSZ` is what the process may address; `RSS` is what it holds right now; and the first can be a thousand times the second.
* **Whatever an address is, it is not a place in RAM.**
  There are not 1.5 TB of places.
  Part 02 of the lecture says what it is instead.

## Going further

* `grep -E 'VmSize|VmRSS|VmPeak|VmHWM' /proc/<pid>/status` is where `ps` gets the two numbers, plus the peaks of both.
* `pmap -x <pid> | awk '$3 == 0' | wc -l` counts the areas of a process with nothing resident at all.
* `ps -e -o pid,vsz,rss,comm --sort -rss | head` sorts by the other column; the order changes, and the ratio between the columns is the point.

## References

* `man 1 ps` (`vsz`, `rss`), `man 1 pmap`, `man 5 proc` (`/proc/[pid]/status`)
* [The V8 Sandbox](https://v8.dev/blog/sandbox), on why the engine reserves a terabyte it does not use
