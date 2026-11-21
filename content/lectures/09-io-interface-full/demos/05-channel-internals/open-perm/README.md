# Demo: Open Permissions

Two programs about who may do what: one asks which `open()` the kernel allows on a file, the other shows what happens after `open()` has succeeded.

## Goal

Tell the permissions of a file, which are kept in the file system, from the permissions of a channel, which are chosen at `open()` and kept in the channel.

## Background

A file has permissions in the file system: read, write and execute, for its owner, its group and everybody else.
`ls -l` shows them, and `chmod` changes them.

A channel has permissions too: `open()` is told `O_RDONLY`, `O_WRONLY` or `O_RDWR`, and the channel is for reading, for writing, or for both.

| Program | What it does |
| --- | --- |
| `open-perm <file>` | prints the permissions of the file, then tries to open it in each of the three modes |
| `channel-perm` | makes a file, `notes.txt`, and goes through four steps with it, described below |

## Build and run

```console
make
echo hello > f.txt
chmod 644 f.txt; ./open-perm f.txt
chmod 444 f.txt; ./open-perm f.txt
chmod 200 f.txt; ./open-perm f.txt
chmod 000 f.txt; ./open-perm f.txt
rm -f f.txt
./channel-perm
```

Run them as an ordinary user: `root` is allowed everything, and the demo shows nothing.

## Results and explanations

```text
$ chmod 644 f.txt; ./open-perm f.txt
f.txt has permissions 644 in the file system
  open(O_RDONLY)  = 3
  open(O_WRONLY)  = 3
  open(O_RDWR  )  = 3
$ chmod 444 f.txt; ./open-perm f.txt
f.txt has permissions 444 in the file system
  open(O_RDONLY)  = 3
  open(O_WRONLY)  refused: Permission denied
  open(O_RDWR  )  refused: Permission denied
$ chmod 200 f.txt; ./open-perm f.txt
f.txt has permissions 200 in the file system
  open(O_RDONLY)  refused: Permission denied
  open(O_WRONLY)  = 3
  open(O_RDWR  )  refused: Permission denied
$ chmod 000 f.txt; ./open-perm f.txt
f.txt has permissions 000 in the file system
  open(O_RDONLY)  refused: Permission denied
  open(O_WRONLY)  refused: Permission denied
  open(O_RDWR  )  refused: Permission denied
```

`open()` compares what is asked with what the file allows, and refuses if the request goes beyond it.
A channel can therefore have at most the permissions of the file, and may have fewer: the file with 644 can be opened for reading only.

The second program shows what the channel's permissions do afterwards.

```text
$ ./channel-perm
1. the file is 644, the channel is opened O_RDONLY
  write(3)  refused: Bad file descriptor
2. the file is 644, the channel is opened O_RDWR
  write(3)  = 4
3. chmod 000: nobody may open the file any more
  open(O_RDONLY)  refused: Permission denied
4. the channel opened at step 2 is still here
  write(3)  = 4
```

**Step 1.**
The owner may write the file, and `write()` is refused all the same, because this channel was opened for reading.
The error is `EBADF`, *bad file descriptor*, and not `EACCES`, *permission denied*: `write()` does not look at the file's permissions at all.
It looks at the channel, and the channel is the wrong kind for writing.

**Steps 2 to 4.**
A channel is opened for reading and writing, and then the file is made untouchable.
A new `open()` is refused, as in the first program.
The old channel goes on working.

The file's permissions are checked once, by `open()`.
What `open()` granted is written into the channel, and from then on only the channel is consulted.

This is a design decision, and it is what lets a program open a file while it has the right to, and keep using it after giving up that right, or pass the open channel to a program that never had it.

## Going further

* Run `sudo ./open-perm f.txt` on the file with permissions 000.
  What does `root` get?
* The program uses `open()`; `fopen()` takes `"r"`, `"w"`, `"a"`, `"r+"`, `"w+"` and `"a+"`.
  Which flags of `open()` does each become? `strace` a small program to check.
* In step 1, replace `O_RDONLY` with `O_WRONLY` and `write()` with `read()`.
  Is the error the same?
* Read `/proc/<PID>/fdinfo/3` of a program that waits with a file open, and decode the `flags` line with `man 2 open`.
  The value is in octal.

## References

* `man 2 open`, under `O_RDONLY`, `O_WRONLY`, `O_RDWR`, and under `EACCES`
* `man 2 write`, under `EBADF`
* `man 2 chmod`, `man 7 inode` under *The file type and mode*
* `man 3 fopen`, the table of modes and `open()` flags
