# Demo: RSS, PSS and USS for One Process

The resident memory of the shell, split into what it shares and what it owns, area by area and in total.

## Goal

Define the three metrics on a real process, and see which areas are shared and which are private.

## Run

```console
grep -E '^[0-9a-f]|^Rss:|^Pss:' /proc/$$/smaps | head -20
smem -P bash -c "pid command uss pss rss" | grep -E "PID|^ *$$ "
```

## Results and explanations

```text
$ grep -E '^[0-9a-f]|^Rss:|^Pss:' /proc/$$/smaps | head -16
62c63254a000-62c63257a000 r--p 00000000 fc:03 29884740   /usr/bin/bash
Rss:                 192 kB
Pss:                   9 kB
62c63257a000-62c6326b0000 r-xp 00030000 fc:03 29884740   /usr/bin/bash
Rss:                1240 kB
Pss:                  63 kB
62c6326ea000-62c6326f3000 rw-p 001a0000 fc:03 29884740   /usr/bin/bash
Rss:                  36 kB
Pss:                  36 kB
62c66092d000-62c660f62000 rw-p 00000000 00:00 0          [heap]
Rss:                6228 kB
Pss:                6228 kB
```

For every area, `Rss` is how much of it is resident and `Pss` is that amount with each shared page divided by the number of processes mapping it.
The shell's code area has 1,240 KB resident and a `Pss` of 63 KB: about twenty shells and scripts are running on this machine, and the one copy of `bash`'s code in the page cache is split twenty ways.
Its writable data and its heap have `Pss` equal to `Rss`: private pages, nobody else's.

The pattern is general.
Read-only and executable areas backed by a file are shared with every process that maps the same file; writable areas are private, because the first write to a shared page gives the process a copy of its own (part 04's copy-on-write).

```text
$ smem -P bash -c "pid command uss pss rss" | grep -E "PID|^ *$$ "
  PID Command                          USS      PSS      RSS
26566 -bash                           6524     6654    11144
```

`smem` adds the third metric: `USS`, the pages only this process maps.
For the shell, 6.5 MB is unique (the heap, mostly), the `PSS` adds 130 KB as its share of `bash` and libc, and the `RSS` adds the full 4.5 MB of those shared pages as if the shell owned them.

| metric | counts a shared page as | adds up over processes to |
| --- | --- | --- |
| `RSS` | one full page, in every process | more than the memory in use |
| `PSS` | 1/n of a page, in each of the n processes | the memory the processes use |
| `USS` | nothing | what would be freed if they all exited |

## Going further

* `/proc/$$/smaps_rollup` gives the totals of the same fields in one place, including `Shared_Clean`, `Shared_Dirty`, `Private_Clean` and `Private_Dirty`.
* `smem -m` turns the table around: per mapped file, how many processes map it and the total `PSS`; libc is near the top.
* Open a second terminal and run the same command: the shell's `Pss` for `bash` drops a little, because there is one more sharer.

## References

* `man 5 proc` (`/proc/[pid]/smaps`), `man 8 smem`
