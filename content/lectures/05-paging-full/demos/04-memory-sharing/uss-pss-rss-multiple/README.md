# Demo: Ten Processes, Four Ways

Ten copies of a "Hello, World!" that sleeps, started four ways: from one static executable, from one dynamic executable, from ten different static executables, from ten different dynamic ones.
`smem` reports `USS`, `PSS` and `RSS` for each.

## Goal

See what is shared between processes and what is not, and read the three metrics as answers to three different questions.

## Background

`generate.sh` writes ten C files that differ only in the string they print; `build.sh` builds each one twice, dynamically (`hello-NN`, 16 KB) and statically (`hello-static-NN`, 800 KB).
The four `instantiate-*.sh` scripts start ten processes in the background, one per scenario, and `kill.sh` ends them.
Everything lands in `work/`, which `clean.sh` removes.

`smem -P` filters by command line; the `-t` row at the bottom is the total.

## Build and run

```console
./generate.sh
./build.sh
./instantiate-one-static-multiple-times.sh
smem -P '^\./work/hel' -c "pid command uss pss rss"
./kill.sh
```

Then the same with the other three `instantiate-*.sh` scripts, and `./clean.sh` at the end.

## Results and explanations

### Ten processes from one static executable

```text
  PID Command                          USS      PSS      RSS
1416067 ./work/hello-static-01            52      115      708
1416074 ./work/hello-static-01            52      115      708
...
   10                                   556     1186     7116
```

Each process has 708 KB resident and owns 52 KB of it: its stack, its data, the page the allocator touched.
The other 650 KB are the executable's code and read-only data, one copy in the page cache, mapped by all ten; `PSS` gives each a tenth of it.
Ten processes, 7.1 MB of `RSS`, 1.2 MB of actual memory.

### Ten processes from one dynamic executable

```text
  PID Command                          USS      PSS      RSS
1416097 ./work/hello-01                  100      104     1688
1416098 ./work/hello-01                  100      104     1688
...
   10                                  1044     1084    16872
```

`RSS` more than doubled, to 1,688 KB each, because libc is now a separate mapping and its resident pages count towards every process.
`PSS` barely moved: 104 KB, of which 100 KB is private.
libc is shared not just with these ten but with every process on the machine, hundreds of them, so each one's share of it rounds to almost nothing.
The sum of `RSS` is 16.9 MB; the memory in use is 1.1 MB.

### Ten processes from ten different static executables

```text
  PID Command                          USS      PSS      RSS
1416114 ./work/hello-static-03           708      708      712
1416115 ./work/hello-static-04           708      708      712
...
   10                                  7088     7088     7128
```

Now `USS`, `PSS` and `RSS` agree: ten different files, ten copies of libc's code linked into them, nothing in common, nothing shared.
7.1 MB of `RSS`, and 7.1 MB in use: six times what the same ten processes cost from one executable.

### Ten processes from ten different dynamic executables

```text
  PID Command                          USS      PSS      RSS
1416142 ./work/hello-07                  112      116     1688
1416137 ./work/hello-02                  116      120     1692
...
   10                                  1176     1216    16936
```

Ten different executables, but each is 16 KB and nearly all of a process is libc, which is still one copy.
`USS` is 12 KB higher than with one executable, for the one page of code each file has of its own; everything else is as before.

### The four, side by side

| ten processes from | `USS` each | `PSS` each | `RSS` each | real total |
| --- | ---: | ---: | ---: | ---: |
| one static executable | 52 KB | 115 KB | 708 KB | 1.2 MB |
| one dynamic executable | 100 KB | 104 KB | 1,688 KB | 1.1 MB |
| ten static executables | 708 KB | 708 KB | 712 KB | 7.1 MB |
| ten dynamic executables | 116 KB | 120 KB | 1,692 KB | 1.2 MB |

Three things to take from it:

* **Sharing is implicit and it is everywhere.**
  Nobody asked for it; the kernel maps the same frames of the page cache into every process that runs the same file, and it does so for the executable and for every library.
* **`RSS` answers "what does this process have mapped", not "what does it cost".**
  `PSS` answers the second, and sums to the truth; `USS` answers "what would go away if this process did".
* **Dynamic linking is a memory decision, not only a disk one.**
  Lab 01 built both kinds of executable; this is the difference at run time, times the number of processes.

## Going further

* `smem -m -P hello` lists the mappings instead of the processes: the executable, libc, `ld-linux`, each with its total `PSS` across the ten.
* Make the ten dynamic processes write to a large global array and watch `USS` grow and `PSS` follow: written pages are private, whatever they came from.
* Start a hundred instead of ten (`num_times` in the scripts) and the per-process `PSS` of the static run drops to about 60 KB.

## References

* `man 8 smem`, `man 5 proc` (`/proc/[pid]/smaps`)
