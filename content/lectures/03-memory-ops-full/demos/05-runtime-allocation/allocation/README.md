# Demo: Watching the Dynamic Areas Change

A program that allocates on the stack, on the heap and with `mmap()`, one step at a time, pausing after each so that `pmap` can show what changed.

## Goal

See each of the three dynamic areas grow and shrink, and notice which of them the program asked for and which grew by itself.

## Background

The steps, in order:

1. `alloca(64 KB)` in a function, touched with `memset()`, then the function returns.
1. A hundred recursive calls, each with a 4 KB local array, then they all return.
1. Four `malloc(64 KB)`, touched, then four `free()`.
1. `mmap(64 KB)`, then `munmap()`.

The buffers are touched because allocating memory and using it are different events: an area can grow without any of it being resident, and `pmap`'s `RSS` column only moves when pages are actually written.

## Build and run

Two terminals.
In the first:

```console
make
./allocation
```

In the second, at every prompt:

```console
pmap -x $(pidof allocation)
```

Watch three lines: `[ stack ]`, the first `rw--- [ anon ]` line (the heap), and the total.

## Results and explanations

### The stack

```text
00007ffc7f72d000     136      16      16 rw---   [ stack ]      before
00007ffc7f72d000     136      76      76 rw---   [ stack ]      after alloca(64 KB)
00007ffc7f6e6000     420     420     420 rw---   [ stack ]      100 calls deep
00007ffc7f6e6000     420     420     420 rw---   [ stack ]      after they return
```

The stack area starts at 136 KB with 16 KB in use.
`alloca(64 KB)` does not change the area at all; it only makes 60 KB more of it resident, because the kernel had reserved more than the program had touched.
The hundred frames need 400 KB, which is more than the reservation, and the area grows to 420 KB -- and its start address drops by 284 KB, because the stack grows towards lower addresses.
Nothing in the program asked for that growth: the first write past the end of the area faulted, the kernel saw that the fault was just below the stack, and extended it.
After the calls return, the area stays at 420 KB.
The frames are gone, but the kernel does not shrink a stack.

### The heap

```text
00005c74ca0dc000     132      12      12 rw---   [ anon ]      before
00005c74ca0dc000     268     268     268 rw---   [ anon ]      after 4 x malloc(64 KB)
00005c74ca0dc000     140     140     140 rw---   [ anon ]      after 4 x free()
```

Four 64 KB blocks do not fit in the 132 KB the heap started with, so the allocator extended it, with `brk()`, to 268 KB.
Freeing them left the top of the heap unused, and the allocator gave it back, again with `brk()`, down to 140 KB.
`strace -e trace=brk ./allocation < /dev/null` shows exactly those two moves, up and then down.
The heap can shrink only from the top; a freed block in the middle stays part of the area.

### The mapping

```text
total kB            3048                                          before
total kB            3112                                          after mmap(64 KB)
total kB            3048                                          after munmap()
```

`mmap()` adds a 64 KB anonymous area at a high address, among the libraries, and `munmap()` removes it.
Unlike the heap, a mapping is an area of its own, and giving it back returns all of it.

### Three areas, three behaviours

| Area | Grows when | Grows how | Shrinks when |
| --- | --- | --- | --- |
| stack | a write lands just past its end | the kernel extends it on the fault | never, during the run |
| heap | `malloc()` finds no free chunk | the allocator calls `brk()` | `free()` empties the top, and the allocator calls `brk()` back |
| mapping | `mmap()` is called | the kernel creates an area | `munmap()` removes it |

## Going further

* Replace the recursion depth with 10,000 and the program dies: the stack has a limit (`ulimit -s`, 8 MB by default), and growing past it is a `SIGSEGV` the kernel will not fix.
* Change the heap step to `malloc(1 MB)` and the heap line does not move; a new `[ anon ]` area appears instead, because large requests bypass the heap.
  The [`malloc-kb` demo](../malloc-kb) is about that threshold.
* Free only the first two blocks instead of all four and watch the heap stay at 268 KB: the top is still in use.

## References

* `man 3 alloca`, `man 3 malloc`, `man 2 brk`, `man 2 mmap`
* `man 1 pmap`, `man 3 ulimit` (`ulimit -s` in the shell)
