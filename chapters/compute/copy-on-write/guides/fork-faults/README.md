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

As a **bonus**, you are going to learn about a Linux memory optimization mechanism called [Transparent Huge Pages (THP)](https://docs.kernel.org/admin-guide/mm/transhuge.html) and its effects on the TLB.
If we were to `mmap`, for example, 1024 _contiguous_ pages (of 4 kb each) in memory, they would occupy 1024 entries in the page table and, in turn, in the TLB.
However, they can be managed much more efficiently using THP.
It works by taking that memory region and remapping it using **huge pages** of a fixed size each (for example: 2mb).
This way, we may address the same memory using a lot less TLB entries, boosting performance.

To enable this mechanism on your system, run the following command:

```console
student@os:~/.../fork-faults/support$ sudo bash -c "echo always > /sys/kernel/mm/transparent_hugepage/enabled"
```

No need to worry about breaking anything.
It lasts only for this session (i.e. it resets on reboot).

Now, enable THP for pages of a specific size, such as 2 mb:

```console
student@os:~/.../fork-faults/support$ sudo bash -c "echo always > /sys/kernel/mm/transparent_hugepage/hugepages-2048kB/enabled"
```

Set `NUM_PAGES` to 1024 in `fork-faults.c`, recompile the program and see the results.

[Quiz 3](../tasks/questions/huge-page-allocation.md)

Now it should be clear how demand paging differs from copy-on-write.
Shared memory is a similar concept.
It's a way of marking certain allocated pages so that copy-on-write is disabled.
As you may imagine, changes made by the parent to this memory are visible to the child and vice-versa.
