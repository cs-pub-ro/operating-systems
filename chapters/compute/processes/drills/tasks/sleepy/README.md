# Creating a process

## Higher level - Python

Enter the `sleepy/` directory (or `chapters/compute/processes/drills/tasks/sleepy` if you are working directly in the repository).
Run `make` and then enter `support/` folder and go through the practice items below.

Use the `tests/checker.sh` script to check your solutions.

```bash
./tests/checker.sh
sleepy_creator ...................... passed ... 30
sleepy_creator_wait ................. passed ... 30
sleepy_creator_c .................... passed ... 40
100 / 100
```

Head over to `sleepy_creator.py`.

1. Solve the `TODO`: use `subprocess.Popen()` to spawn 10 `sleep 1000` processes.

   Start the script:

   ```console
   student@os:~/.../tasks/sleepy/support$ python3 sleepy_creator.py
   ```

   Look for the parent process:

   ```console
   student@os:~$ ps -e -H -o pid,ppid,cmd | (head -1; grep "python3 sleepy_creator.py")
   ```

   It is a `python3` process, as this is the interpreter that runs the script, but we call it the `sleepy_creator.py` process for simplicity.
   No output will be provided by the above command, as the parent process (`sleepy_creator.py`) dies before its child processes (the 10 `sleep 1000` subprocesses) finish their execution.
   The parent process of the newly created child processes is an `init`-like process: either `systemd`/`init` or another system process that adopts orphan processes.
   Look for the `sleep` child processes using:

   ```console
   student@os:~$ ps -e -H -o pid,ppid,cmd | (head -1; grep sleep)
    PID    PPID         CMD
   4164    1680     sleep 1000
   4165    1680     sleep 1000
   4166    1680     sleep 1000
   4167    1680     sleep 1000
   4168    1680     sleep 1000
   4169    1680     sleep 1000
   4170    1680     sleep 1000
   4171    1680     sleep 1000
   4172    1680     sleep 1000
   4173    1680     sleep 1000
   ```

   Notice that the child processes do not have `sleepy_creator.py` as a parent.
   What's more, as you saw above, `sleepy_creator.py` doesn't even exist anymore.
   The child processes have been adopted by an `init`-like process (in the output above, that process has PID `1680` - `PPID` stands for _parent process ID_).

   [Quiz](../../questions/parent-of-sleep-processes.md)

1. Solve the `TODO`: change the code in `sleepy_creator_wait.py` so that the `sleep 1000` processes remain the children of `sleepy_creator_wait.py`.
   This means that the parent / creator process must **not** exit until its children have finished their execution.
   In other words, the parent / creator process must **wait** for the termination of its children.
   Check out [`Popen.wait()`](https://docs.python.org/3/library/subprocess.html#subprocess.Popen.wait) and add the code that makes the parent / creator process wait for its children.
   Before anything, terminate the `sleep` processes created above:

   ```console
   student@os:~$ pkill sleep
   ```

   Start the program, again, as you did before:

   ```console
   student@os:~/.../tasks/sleepy/support$ python3 sleepy_creator.py
   ```

   On another terminal, verify that `sleepy_creator_wait.py` remains the parent of the `sleep` processes it creates:

   ```console
   student@os:~$ ps -e -H -o pid,ppid,cmd | (head -1; grep sleep)
    PID    PPID                CMD
   16107   9855         python3 sleepy_creator.py
   16108   16107           sleep 1000
   16109   16107           sleep 1000
   16110   16107           sleep 1000
   16111   16107           sleep 1000
   16112   16107           sleep 1000
   16113   16107           sleep 1000
   16114   16107           sleep 1000
   16115   16107           sleep 1000
   16116   16107           sleep 1000
   16117   16107           sleep 1000
   ```

   Note that the parent process `sleepy_creator_wait.py` (`PID 16107`) is still alive, and its child processes (the 10 `sleep 1000`) have its ID as their `PPID`.
   You've successfully waited for the child processes to finish their execution.

   If you're having difficulties solving this exercise, go through [this](../../../guides/create-process.md) reading material.

## Lower level - C

Now let's see how to create a child process in C.
There are multiple ways of doing this.
For now, we'll start with a higher-level approach.

Go to `sleepy_creator.c` and use [`system`](https://man7.org/linux/man-pages/man3/system.3.html) to create a `sleep 1000` process.

[Quiz](../../questions/create-sleepy-process-ending.md)

The `man` page also mentions that `system` calls `fork()` and `exec()` to run the command it's given.
If you want to find out more about them, head over to the [Arena and create your own mini-shell](tasks/mini-shell.md).
