# Demo: Which Entry a New Channel Gets

A program that opens three channels, closes one in the middle, opens again, then does the same with entry 0.

## Goal

See the rule by which the kernel picks a file descriptor: the lowest entry of the table that is free.

## Background

`lowest-fd.c` prints every `open()` with the descriptor it returned, and every `close()`.
It opens `/dev/null` each time; what is opened does not matter, only where it lands in the table.

## Build and run

```console
make
./lowest-fd
```

## Results and explanations

```text
$ ./lowest-fd
open()    = 3
open()    = 4
open()    = 5
close(4)
open()    = 4
close(0)
open()    = 0
close(3)
close(5)
```

The first three calls fill entries 3, 4 and 5.
Closing 4 leaves a gap, and the next `open()` fills the gap: it returns 4, and not 6.

Then the program closes entry 0, its standard input, and opens `/dev/null` once more.
The new channel gets descriptor 0.
From here on, anything in this process that reads from the standard input, `scanf()`, `getchar()`, `read(0, ...)`, reads from `/dev/null`, and does not know it.

Two consequences follow from this small rule.

A descriptor is a number that gets reused.
A program that closes a descriptor and goes on using the number, by mistake, may be talking to a different channel that was opened in the meantime.
This is the I/O version of using memory after `free()`.

And "standard input" means entry 0, whatever it leads to.
A shell that runs `sort < names.txt` arranges, before starting `sort`, for entry 0 to lead to `names.txt` and not to the terminal.
`sort` reads descriptor 0 as it always does.
How the shell does it is a subject of lecture 10 and of lab 10.

## Going further

* Close entry 1 and call `printf()` afterwards.
  Where does the text go? Open a file right after the `close(1)` and try again.
* Replace the last `open_one()` with `dup(3)`.
  Which descriptor does `dup()` return, and what does it lead to?
* Run `./lowest-fd < /dev/null` and `./lowest-fd 0<&-`, which starts the program with entry 0 closed.
  What does the first `open()` return in the second case?

## References

* `man 2 open`, *RETURN VALUE*: "the lowest-numbered file descriptor not currently open for the process"
* `man 2 dup`, `man 2 close`
