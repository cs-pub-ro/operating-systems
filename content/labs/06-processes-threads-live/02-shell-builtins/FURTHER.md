# Going Further: Builtin Commands

## What else must be a builtin

You showed that `cd` must run in the shell.
Which other common shell commands must be builtins for the same reason?
Think of anything that changes the shell's own state: its environment, its variables, where it is.

## cd -

`cd -` returns to the previous directory.
What would the shell have to remember, and when, to support it?

## exit with a status

`exit` can take a number: `exit 3`.
Where does that number go, and how would the shell that started yours read it back?
