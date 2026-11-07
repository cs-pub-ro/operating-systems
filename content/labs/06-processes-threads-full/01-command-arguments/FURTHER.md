# Going Further: Commands With Arguments

## The exec family

`execvp()` is one of six `exec` functions; the letters say how arguments are passed and how the program is found.

* `l` — arguments written out as separate parameters, ending in `NULL` (`execlp`).
* `v` — arguments as a vector, one `char *[]` array (`execvp`).
* `p` — look the program up in `PATH`; without it the first argument is a path.
* `e` — pass an explicit environment.

**Question.** Why can a shell not keep using `execlp` once commands have a variable number of arguments?

*Answer.* `execlp` needs the arguments written in the source, one C parameter each.
A command line's length is not known until it is read, so the call cannot be written.
`execvp` takes an array sized at run time, which is what a shell needs.

## What the child inherits

**Question.** The child printed to the same terminal without opening anything.
Why, and where would redirection fit?

*Answer.* `fork()` copies the file descriptors and `execvp()` keeps them, so the child's descriptors 0, 1 and 2 are the shell's — the terminal.
Redirection is the shell replacing those descriptors in the child, after `fork()` and before `execvp()`.
Wiring that up is a later session's topic.

## Limits

**Question.** `tokenize()` stops at `MAX_TOKENS` words.
What happens to a longer line, and how would you report it?

*Answer.* The extra words are dropped: `strtok()` keeps returning them but the `count < max` guard stops storing them, and the array is still NULL-terminated, so the command runs with the first `MAX_TOKENS` arguments and no warning.
To report it, check whether `strtok()` still has a word left after the loop and print an error instead of running a truncated command.
