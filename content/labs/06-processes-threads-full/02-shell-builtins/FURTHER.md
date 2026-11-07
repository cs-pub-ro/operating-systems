# Going Further: Builtin Commands

## What else must be a builtin

**Question.** Which other common shell commands must be builtins, for the same reason as `cd`?

*Answer.* Anything that changes the shell's own process state and must outlive one command: `export` and `unset` (the environment), shell-variable assignment, `cd` (the working directory), `exit` (whether the shell runs), `umask`, and job-control commands such as `fg`, `bg` and `jobs`.
Each of them would be lost if run in a child, because the child's copy of that state dies with it.

## cd -

**Question.** `cd -` returns to the previous directory.
What must the shell remember, and when?

*Answer.* Before each successful `chdir()`, the shell saves the directory it is leaving (its current one, from `getcwd()` or from `$PWD`).
`cd -` then changes to that saved value and prints it, the way real shells do.
Two slots — `$PWD` and `$OLDPWD` — are enough.

## exit with a status

**Question.** `exit` can take a number: `exit 3`.
Where does it go?

*Answer.* It becomes the shell's own exit status: `exit(atoi(argv[1]))`.
The process that started your shell reads it through `waitpid()` and `WEXITSTATUS()` — exactly the mechanism the next bonus uses on the shell's own children.
With no argument, `exit` uses the status of the last command run.
