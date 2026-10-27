# Demo: A Minimal Shell

A shell is a program that runs other programs: it reads a command, starts it, waits for it to finish, and asks for the next one.
`shell.c` has the reading and the loop written; what is missing is the three steps in the middle, which are three system calls: `fork()` to create a second process, `exec()` to replace that process's program with the command, and `waitpid()` to wait for it.
The commands are single words, so `ls` and `date` work and `ls -l` does not yet.

Together with the teaching assistant you will fill in the three TODOs in `shell.c` one at a time, and run the shell after each: with the exec alone the shell is gone after the first command, with the fork added it survives, and with the wait added the prompt comes back only when the command is done.
The question to leave with: why does starting a program take two system calls, and what would a single one look like?
