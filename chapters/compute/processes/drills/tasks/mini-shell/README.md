# Mini-shell

As you might remember, to create a new process you need to use `fork` (or `clone`) and `exec` system calls.
If you don't take a look at [what happens under the hood when you use `system`](guides/system-dissected.md).

Enter the `chapters/compute/processes/drills/tasks/mini-shell` folder, run `make skels`, open the `support/src` folder and go through the practice items below.

Use the `tests/checker.sh` script to check your solutions.

```bash
./checker.sh
mini_shell: ls ................ passed ... 50
mini_shell: pwd ................ passed ... 25
mini_shell: echo hello ................ passed ... 25
100 / 100
```

1. With this knowledge in mind, let's implement our own mini-shell.
    Start from the skeleton code in `mini_shell.c`.
    We're already running our Bash interpreter from the command-line, so there's no need to `exec` another Bash from it.
    Simply `exec` the command.

    [Quiz](../drills/questions/mini-shell-stops-after-command.md)

    So we need a way to "save" the `mini_shell` process before `exec()`-ing our command.
    Find a way to do this.

    > **Hint**:  You can see what `sleepy` does and draw inspiration from there.
    > Use `strace` to also list the calls to `clone()` performed by `sleepy` or its children.
    > [Remember](./guides/clone.md) what `clone()` is used for and use its parameters to deduce which of the two scenarios happens to `sleepy`.
