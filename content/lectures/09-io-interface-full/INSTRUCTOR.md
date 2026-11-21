# Instructor Notes: Lecture 09, I/O Interface

Notes for whoever delivers this lecture.
Nothing here is addressed to students.

## Shape of the delivery

The slot is 100 minutes: 50, a 10-minute break, 50.
In practice it is 40 + 10 + 40.
Plan for 80 minutes of content and treat the rest as spare.

The lecture follows [`STORYLINE.md`](STORYLINE.md); the storyline figure is on the fourth slide, and it is worth putting it back up at the break and at the end.
Open from lecture 08's last line: the threads stop computing and start waiting, for files, for devices, for each other.

The spine is one walk, from the number to the table to the structure: parts 02, 03 and 05.
Draw it once on the board and add to the same drawing each time: the `3` in the process, then the table, then the channel box with its four fields, then the file.
By part 05 the board should look like the open-file figure.

The pitch is not answered by the lecture, and it is better to say so than to let the room wait for it.
It shows that there is depth under `write()`; the lecture then describes the surface all four programs share.

Parts 01 and 04 both talk about the two families.
Part 01 is the behaviour, data that stays against data that passes; part 04 is how the ends meet.
Keep part 04 short: lectures 10 and 11 exist.

| Block | Part | Minutes | Notes |
| --- | --- | ---: | --- |
| 1 | 00. Pitch | 8 | `/proc/<PID>/io` of the shell and of a browser; `make run` in `write-layers`, started early because the last program takes ten seconds; the four-writes figure. |
| 1 | 01. Processes and the outside world | 9 | The process-outside figure; the two-families figure; `lsof` on the shell and on the browser. |
| 1 | 02. The process I/O interface | 12 | The operations figure; `write_file` and `read_file`; ask "why 3?"; `receive_fifo` and `send_fifo` in two terminals. |
| 1 | 03. The file descriptor table | 11 | The fd-table figure, drawn; `fdtsize` with `ulimit -n 64`; `lowest-fd`. |
| -- | *break* | 10 | |
| 2 | 04. Types of I/O channels | 10 | `channels`; the channel-types figure; one pair from `comm-channels`, the Unix socket. |
| 2 | 05. File channel internals | 15 | The open-file figure; `channel-perm`; `file-pointer`, asking for a prediction before each scenario. |
| 2 | 06. File channel operations | 12 | The logical-view figure; `file-ops`, predicting each line; `truncate` and `ls -lsh`. |
| 2 | 07. Conclusion | 3 | Leave the takeaway slide up during questions. |

## Which demos to run live

Everything runs at once except `write_o_direct_o_sync`, which takes about ten seconds on a consumer NVMe disk, and the receivers, which wait for their senders.
Have two terminals open in the same directory for the FIFO, the socket pair and `file-ops step`.
Numbers in the slides come from a desktop with an NVMe disk, Linux 6.14 and ext4; on the lecture machine they will differ, and the last line of the pitch most of all.

* **`00-pitch/process-io`**: `cat /proc/$$/io`, then the same for a browser you started before the lecture.
  Read `syscr` aloud and divide by the uptime of the browser.
* **`00-pitch/write-layers`**: `./fwrite`, `./write`, `./write_o_direct`, and ask for a guess before `./write_o_direct_o_sync`.
  Let the ten seconds pass in silence; it is the point.
  `strace -c -e trace=write ./fwrite` for the 257 against 2,049, if there is time.
* **`01-process-outside/lsof`**: on the shell, then on the browser, piped through `less`.
  Point at `TYPE` and at `FD`, and say that the next half hour is about the second.
* **`02-io-interface/file`**: `./write_file`, `ls -l`, `./read_file`.
  Ask why `open()` returned 3 and leave the question open until part 03.
* **`02-io-interface/fifo`**: `./receive_fifo` in one terminal and let it sit at `open() ...`; `ls -l fifo_channel` in the other, then `./send_fifo`.
  Ask what the receiver is doing while it waits, and in which state of lecture 07 it is.
* **`03-file-descriptor-table/fdtsize`**: `ulimit -n`, `./fdtsize`, then `(ulimit -n 64; ./fdtsize)`.
  Ask why 1,021 and not 1,024.
* **`03-file-descriptor-table/lowest-fd`**: ask for the number before each `open()`.
  The `close(0)` is where the room wakes up.
* **`04-channel-types/channel-list`**: `./channels`, and read the table top to bottom; `lsof -p $(pidof channels) -a -d 8-10` from the second terminal for the sockets.
* **`04-channel-types/comm-channels`**: `./pipe`, and the Unix socket pair.
  The others are for the README and for lectures 10 and 11.
* **`05-channel-internals/open-perm`**: `./channel-perm` is the one to run; show the source of step 1 first and ask what `write()` will do.
  `./open-perm` on a file with 444 only if someone doubts the first half.
* **`05-channel-internals/file-pointer`**: show scenario 1 in the source, ask what the second read returns, run; repeat for `dup()` and for `fork()`.
  This is the most valuable demo of the second half.
* **`06-file-channel-ops/file-ops`**: `./file-ops step`, asking for both numbers before each ENTER.
  `cat /proc/$(pidof file-ops)/fdinfo/3` from the second terminal, once, after the `read(256)`.
* **`06-file-channel-ops/truncate`**: `df -h .` first, then `./truncate`, `ls -lh`, `ls -sh`, `du -h`.
  `make clean` afterwards, or the file is still there next year.

## What students get wrong

* **"A file descriptor is a pointer to the file" / "it is the file".**
  It is an index, and what it indexes points to a channel, which points to the file.
  Three levels; `file-pointer` scenario 1 separates the channel from the file, scenario 2 separates the descriptor from the channel.
* **"`FILE *` and a file descriptor are the same thing."**
  `FILE *` is the C library's structure, in user space, with the buffer of the pitch in it and a descriptor inside.
  `fileno()` gets the descriptor out.
* **"`fwrite()` writes to the disk" / "`write()` writes to the disk".**
  The pitch is the cure.
  Neither does, and the second is closer by one copy.
* **"The file pointer belongs to the file."**
  Scenario 1 of `file-pointer`: one file, two pointers.
* **"Descriptor 3 in two processes is the same channel."**
  Every demo prints 3.
  Then scenario 3 of `file-pointer`, where after `fork()` it *is* the same channel, and the reason is the copy and not the number.
* **"`close()` closes the file."**
  It empties an entry and drops a reference.
  Scenario 2 of `file-pointer` goes on reading after a `close()`.
* **"Permissions are checked when I read or write."**
  `channel-perm`, steps 3 and 4.
  Expect the follow-up "so how do you revoke access?", and the honest answer: for an open channel, you do not.
* **"`read()` returns as many bytes as I asked for."**
  `read_file` asks for 255 and gets 13; `file-ops` asks for 256 and gets 0.
* **"A return of 0 from `read()` is an error."**
  It is the end of a file, or the other end closing, and `-1` is the error.
* **"`lseek()` moves data" / "`lseek()` goes to the disk".**
  It changes a number in the channel, and is among the cheapest system calls there are.
* **"The size of a file is how much disk it uses."**
  `truncate`.
* **"Everything is a file."**
  Say instead that everything is reached through a file descriptor.
  A socket is not a file: it has no size and cannot be sought.
  What is shared is the handle and four or five calls.

## Things that go wrong in the room

* `write_o_direct` and `write_o_direct_o_sync` fail at `open()` with *Invalid argument* on `tmpfs`, on some encrypted home directories and on some network file systems.
  Run the demo from a directory on a local disk, and check before the lecture.
* On a disk with 4,096-byte logical blocks, `write()` with `O_DIRECT` fails for 512-byte records.
  `lsblk -o NAME,LOG-SEC` tells; if it says 4096, set `RECORD_SIZE` to 4096 and `NUM_RECORDS` to 256, and say that `fwrite` and `write` now cost the same.
* The time of `write_o_direct_o_sync` depends on the disk more than on anything else: ten seconds on a consumer NVMe, well under a second on a server disk with a protected write cache, a minute or more on a hard disk or a USB stick.
  In a virtual machine it may be fast, because the host does not honour the flush.
  Measure on the lecture machine, and lower `NUM_RECORDS` if it is too slow to sit through.
* `ulimit -n` is not 1024 everywhere.
  Some terminals start their shells with a soft limit of a million, and `./fdtsize` then takes a second and prints 1,048,573.
  Use `(ulimit -n 1024; ./fdtsize)` and say what the default is.
* `./lowest-fd` behaves the same with its input redirected; `./channels` does not wait for ENTER unless its standard input is a terminal.
* `./channels` and the network receivers use port 4242.
  If something else on the machine has it, `bind()` fails with *Address already in use*; change `PORT`.
  A second `./channels` while the first waits fails the same way, which is a question in the README.
* A receiver that was interrupted leaves `fifo_channel` or `socket_channel` behind.
  The programs cope; `make clean` removes them.
* `./send_fifo` with no receiver waits in `open()`, and with no FIFO fails with *No such file or directory*.
  Start the receiver first.
* `pidof file-ops` finds nothing if the program is not waiting; run it with `step`.
  If two are running, `pidof` prints two PIDs and the `cat` fails.
* `./open-perm` and `./channel-perm` show nothing as `root`, which is allowed everything.
  In a container where you are `root`, this demo does not work.
* `./truncate` leaves a file that `ls -l` reports as 20 GiB.
  Backup tools and `cp` without `--sparse` take it at its word; remove it.
  On a file system without sparse files, FAT on a USB stick for instance, the `ftruncate()` fails or really writes 20 GiB.
* `lsof` is not installed on every system; `ls -l /proc/<PID>/fd` is the fallback and is in the demo.
  Listing a browser's channels may need the browser to be yours, and a browser installed as a snap or flatpak shows long paths that wrap; pipe through `cut -c1-120`.

## Cuts, if you are behind

In order, the first things to drop:

1. `strace -c` in the pitch, and the second `lsof`.
1. The network pairs of `comm-channels`; keep `./pipe` and say the rest in one sentence each.
1. `./open-perm` with the four `chmod`s; `channel-perm` carries the idea.
1. `lowest-fd`; state the rule and keep the `close(0)` for lecture 10.
1. `truncate`; the hole at the end of `file-ops` already shows that size is not space.
1. The FIFO demo; say that the same calls work on a pipe, and show the table.

Do not cut the four writes, "why 3?", `fdtsize`, `file-pointer` or `file-ops`; those are the lecture's five load-bearing demonstrations.

## Links to the rest of the course

Say these explicitly.

* Lecture 02's buffered `fwrite()` is the first step of the pitch, and its user and kernel boundary is why a descriptor is a number and not a pointer.
* Lecture 03's buffer cache, and lecture 05's page cache, are where `write()` leaves the data.
* Lecture 04's demand paging is the sparse file's idea, applied to memory.
* Lecture 06's `fork()` copies the descriptor table, which is scenario 3 of `file-pointer`, and its threads share one table.
* Lecture 07's blocked state is where `receive_fifo` sits; a voluntary context switch is what an I/O call that waits looks like to the scheduler.
* Lecture 08's shared data includes the file pointer after `fork()`; `O_APPEND` is a critical section provided by the kernel; and checking permissions once at `open()` is how the interface avoids a check-then-use race.
* Lab 09 is the practical side of this lecture.
* Lecture 10 is pipes and local IPC, and redirection, which is `lowest-fd` plus `dup2()`.
* Lecture 11 is sockets and the network.

## Further demos worth writing

* **`ioctl()` on a terminal**: `TIOCGWINSZ` for the size of the window, printed again after the window is resized; the "control" operation has no demo of its own.
* **`O_APPEND` against `lseek()` and `write()`**: two processes that append to one log, with and without the flag, and the records that get overwritten without it.
* **Deleting an open file**: `unlink()` while a channel is open, the file still readable through the descriptor, and `lsof` showing `(deleted)`; the reference from the channel to the file, made visible.
* **`fsync()` once against `O_SYNC` always**: the pitch's fourth program with one synchronization at the end; it is in the pitch demo's *Going further* and deserves a program.
* **A descriptor leak**: a small server loop that forgets a `close()` on one error path, watched with `ls /proc/<PID>/fd | wc -l` until it hits the limit.
* **`pread()` in threads**: two threads reading one file through one descriptor, with `read()` and with `pread()`, as the file-pointer version of lecture 08's shared counter.
* **Passing a descriptor over a Unix socket**: the fourth way of meeting, `SCM_RIGHTS`, for lecture 10.
