# Instructor Notes: Commands With Arguments

## Purpose

The first individual exercise, and the smallest step past the demo: the same `fork`/`exec`/`wait`, with `execvp()` and an argument array instead of `execlp()` and a bare name.
It isolates one idea — arguments reach a program as `argv` — before the next exercise adds builtins and the bonuses add operators and background.

Keep it short: a group that did the demo should finish this in a few minutes.
The point to make is that the shell, not the kernel, splits the line, and that the split array *is* the program's `argv`.

## Points to hammer

* **`execvp` vs `execlp`.** `v` is a vector (array) known at run time; `l` is a list written in the source.
  A command line's length is not known in advance, so a shell must use the `v` form.
* **The array is NULL-terminated.** `execvp()` reads `argv` until a `NULL`; the provided `tokenize()` puts it there.
* **Only the child execs.** A successful `execvp()` never returns, so the error path must end the child with `exit(127)`.

## Things that go wrong

* **Passing `argv[0]` only**, or re-passing `tokens[0]` twice, instead of the whole array.
* **Forgetting `exit(127)`** after `execvp()`: on a bad command the child falls through into the shell's loop, and two shells share the terminal.
* **`waitpid()` inside the child branch**: the child waits for itself; ask which process runs each line.

## Verified reference values

| Fact | Value |
| --- | --- |
| `echo one two three` | `one two three` |
| `ls -l` | long listing (worked, unlike in the demo) |
| `nosuchcmd` | `nosuchcmd: No such file or directory`, shell continues |
| `strace -f -e trace=execve`, `ls -l` | one succeeding `execve("/usr/bin/ls", ["ls", "-l"], ...)` |

## Practical notes

* Still no `cd`, no exit status, no quoting; `exit` is a plain `strcmp` in `main()`.
  Those are the next exercise and the bonuses.
* Operators mean nothing here: `ls ; pwd` runs a single program called `ls` with arguments `;` and `pwd`.
  That is expected, and is what `bonus-command-chaining` fixes.
