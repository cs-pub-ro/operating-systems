# Going Further: Commands With Arguments

## The exec family

`execvp()` is one of six `exec` functions.
Read `man 3 exec` and work out what the letters mean: why does a shell need the `v` (vector) form and the `p` (search `PATH`) form, rather than the `l` form the demo used?

## What the child inherits

The child printed to your terminal without opening anything.
Which of its resources came from the shell, and through which system call?
Where, between `fork()` and `execvp()`, would a shell change them to implement `ls > out.txt`?

## Limits

`tokenize()` stops at `MAX_TOKENS` words.
What happens to a longer line right now, and how would you report it instead of dropping words silently?
