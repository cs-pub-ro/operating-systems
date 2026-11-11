# Instructor Notes: Hashing Files With Several Processes

## Purpose

Parallelism with processes, using nothing that session 06 did not teach.
The single idea is the position of the wait: in the loop that forks, the program is sequential; in a loop of its own afterwards, it is parallel.
It is also the set-up for the next exercise, which does the same work with threads.

## Expected answers

* **TODO 1**: a loop with `fork()`; in the child `execlp("md5sum", "md5sum", files[i], (char *) NULL)` followed by `perror()` and `_exit()`; in the parent `pids[i] = pid`.
* **TODO 2**: a loop with `waitpid(pids[i], &status, 0)` and a test of `WIFEXITED(status)` and `WEXITSTATUS(status)`.

`execvp()` with a small `argv` array is as good; so is `wait()` in place of `waitpid()`, since every child is waited for either way.

## Things students get wrong

* **`waitpid()` inside the first loop.**
  Habit from the shell.
  The output is right; the README's check on timing, and the `strace` one, are there to catch it.
  If a student's time is about a third of a second on the reference files, this is why.
* **No `_exit()` after `execlp()`.**
  Invisible while the exec works.
  Have them misspell `md5sum` on purpose: each failed child continues the loop and forks the remaining files itself, and the process count explodes, 2 to the power of 16 at worst.
  Do this with **four** files in the list, not sixteen.
* **`exit()` instead of `_exit()` in the child.**
  Works here; `exit()` flushes the parent's buffered output a second time, which shows as duplicated lines in programs that had printed something before the fork.
* **Forgetting the `NULL` at the end of `execlp()`**, or passing the file as the first argument, so that `md5sum` gets no file and reads standard input: the program hangs, sixteen times over.
  Ctrl-D sixteen times, or Ctrl-C.
* **Comparing unsorted output with `md5sum`'s** and concluding the hashes are wrong.
* **Counting failures with `status != 0`** rather than through the macros.
  Works for exit statuses, and is wrong for the reason given in session 06.
* **`./hash_files files.txt | head`**: `head` exits early, the remaining children are killed by `SIGPIPE`, and the summary reports them as failed.
  Correct behaviour, and a surprise.

## Verified reference values

| Fact | Value |
| --- | --- |
| `./gen_files.sh` | 16 files of 16 MiB, 256 MiB in all |
| Fork loop, then wait loop | 0.047 s |
| Wait inside the fork loop | 0.350 s |
| `md5sum $(cat files.txt)`, one process | 0.32 s |
| One `md5sum` on one 16 MiB file | 0.021 s |
| A missing file in the list | `17 files, 1 failed`, exit status 1 |
| `strace -f -c`, 4 files | 4 `clone`, 49 `execve` of which 44 failed, on the reference machine's `PATH` |
| `make test` | 8 files of 2 MiB; hashes equal to `md5sum`'s after sorting; missing file reported |

## Practical notes

* The skeleton does not hash anything, and compiles with a warning that `pids` is unused, until TODO 1 is done.
* The summary goes to standard error so that standard output is only digests and can be piped to `sort`.
* `gen_files.sh` takes a file count and a size in MiB: `./gen_files.sh 8 4` for small VMs.
  `/dev/urandom` at 256 MiB takes about a second.
* `data/` and `files.txt` are git-ignored; `04-thread-hashing` uses the same ones.
* `make test` recreates `data/` with small files and removes it at the end, so run it before `gen_files.sh`, not after.
* The list holds at most 256 names.
