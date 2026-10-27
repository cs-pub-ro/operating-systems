# Demo: A Minimal Shell

**Tools:** GCC, Make, strace

## Goal

Run a program from inside your own, the way a shell does: create a new process with `fork()`, replace its program with `exec()`, and wait for it with `waitpid()`.
Afterwards you will be able to say what each of the three calls does, why a shell needs all three, and what goes wrong without each one.

## Background

A process is a running program: its own memory, its own open files, its own place in the scheduler's queue.
On Linux a new process is not created from nothing; it is created as a **copy of an existing one**, by `fork()`.
The copy, the **child**, runs the same program as the original, the **parent**, from the same point: `fork()` returns in both.
It returns 0 in the child and the child's process ID in the parent, which is how the two tell themselves apart.

A copy of the shell is not what we want to run, so the child then replaces its own program with another: `exec()`.
The process stays the same, same PID, same open files, but its memory is thrown away and loaded again from the new executable, and it starts from that program's `main()`.
A successful `exec()` therefore never returns: there is nothing to return to.

The parent, meanwhile, asks to be told when the child is done, with `waitpid()`.
Until then, it sleeps.

```C
pid_t pid = fork();

if (pid == 0) {			/* child */
	execlp(command, command, (char *) NULL);
	perror(command);	/* only reached if exec failed */
	exit(127);
}

waitpid(pid, NULL, 0);		/* parent */
```

`execlp()` is one of six `exec` variants, all of which end in the same system call, `execve()`.
The `p` means the command is looked up in `PATH`, the way a shell does, so `ls` finds `/usr/bin/ls`; the `l` means the arguments are passed as a list, ending in `NULL`.
The first argument is the program to run, the second is what the program will see as its own `argv[0]`; by convention the two are the same.

Files:

* `shell.c` — the shell, with the three system calls filled in.

## Build & Run

```console
make
./shell
```

```text
minish> ls
Makefile  shell  shell.c
minish> date
Tue Oct 27 01:02:24 AM EET 2026
minish> nosuchcmd
nosuchcmd: No such file or directory
minish> ls -l
ls -l: No such file or directory
minish> exit
```

`exit` is the one built-in; Ctrl-D ends the shell too.
`ls -l` fails because the shell passes the whole line as the command name, spaces included; arguments are the first exercise.

## Results and Explanations

### Step 1 — `fork()`

```C
pid = fork();
if (pid < 0) {
	perror("fork");
	return;
}
```

After this line there are two processes, both executing the line after it.
The only difference between them is the value in `pid`: 0 in the child, the child's PID in the parent.
Everything below is written once and runs twice, and the `if` on `pid` is what sends each process its own way.

A negative return is a failure (too many processes, out of memory), and there is no child.

### Step 2 — `exec()`, in the child only

```C
if (pid == 0) {
	execlp(command, command, (char *) NULL);
	perror(command);
	exit(127);
}
```

The child's program is replaced.
If `execlp()` returns at all, it failed: the command was not found, or is not executable.
The `perror()` and `exit()` after it are not dead code; they are the failure path.
The exit matters: without it, a child that failed to exec would fall through into the parent's code and go on reading commands, and there would be two shells reading the same terminal.

127 is the status shells use for "could not run the command", which is why `bash` says `command not found` with `$?` at 127.

### Step 3 — `waitpid()`, in the parent only

```C
if (waitpid(pid, NULL, 0) < 0)
	perror("waitpid");
```

The parent blocks until the child ends.
Without it, the prompt is printed at once, before the command's output, and the command's output arrives on top of it.
The `NULL` is where the child's exit status would go; the first exercise uses it.

### What the demo looks like, stage by stage

| Stage | What happens on `ls` |
| --- | --- |
| exec only, no fork | `ls` runs, and the shell is gone: its program was replaced, there is nobody left to print the next prompt. |
| fork and exec, no wait | `ls` runs, but the next prompt appears before the listing, and the shell reads the next line while `ls` is still writing. |
| all three | The listing, then the prompt. |

### What the kernel saw

```console
printf 'ls\nexit\n' | strace -f -e trace=execve,clone,wait4 ./shell
```

```text
execve("./shell", ["./shell"], ...) = 0
minish> clone(child_stack=NULL, flags=CLONE_CHILD_CLEARTID|CLONE_CHILD_SETTID|SIGCHLD, ...) = 74887
[pid 74886] wait4(74887,  <unfinished ...>
[pid 74887] execve("/usr/local/bin/ls", ["ls"], ...) = -1 ENOENT (No such file or directory)
[pid 74887] execve("/usr/bin/ls", ["ls"], ...) = 0
Makefile  shell  shell.c
[pid 74887] +++ exited with 0 +++
<... wait4 resumed>NULL, 0, NULL)       = 74887
--- SIGCHLD {si_signo=SIGCHLD, si_code=CLD_EXITED, si_pid=74887, si_status=0, ...} ---
minish>
```

Three library calls, three system calls, with different names: `fork()` is `clone()` with the `SIGCHLD` flag, `execlp()` is one `execve()` per directory of `PATH` until one succeeds, and `waitpid()` is `wait4()`.
The `SIGCHLD` line at the end is the kernel telling the parent that a child ended; the shell ignores it here, and the second bonus exercise has a use for it.

## References

* `man 2 fork`, `man 3 exec`, `man 2 execve`, `man 2 waitpid`
* `man 7 environ` — `PATH`, and what `execlp()` does with it
* `man 1 bash` — *Exit Status*, for the 127 convention
