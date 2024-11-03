# Fork Faults

Now let's see the copy-on-write mechanism in practice.
Keep in mind that `fork()` is a function used to create a process.

Open two terminals (or better: use [`tmux`](https://github.com/tmux/tmux/wiki)).
In one of them, compile and run the code in `fork-faults/support/fork_faults.c`.
After each time you press `Enter` in the first terminal window, run the following command in the second window:

```console
student@os:~/.../fork-faults/support$ ps -o min_flt,maj_flt -p $(pidof fork_faults)
```

It will show you the number of minor and major page faults performed by the `fork_faults` process and its child.

[Quiz 1](../tasks/questions/parent-faults-before-fork.md)

Note that after `fork()`-ing, there is a second row in the output of `ps`.
That corresponds to the child process.
The first one still corresponds to the parent.

[Quiz 2](../tasks/questions/child-faults-after-write.md)

Now it should be clear how demand paging differs from copy-on-write.
Shared memory is a similar concept.
It's a way of marking certain allocated pages so that copy-on-write is disabled.
As you may imagine, changes made by the parent to this memory are visible to the child and vice-versa.
