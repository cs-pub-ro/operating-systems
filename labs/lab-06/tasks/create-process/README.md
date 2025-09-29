---
parent: Lab 6 - Multiprocess and Multithread
nav_order: 3
---

# Task: Create Process

Enter the `labs/lab-06/tasks/create-process/` directory, run `make skels`, open the `support/src` folder and go through the practice items below.

Use the `tests/checker.sh` script to check your solutions.

```bash
./checker.sh
exit_code22 ...................... passed ... 50
second_fork ...................... passed ... 50
100 / 100
```

1. Change the return value of the child process to 22 so that the value displayed by the parent is changed.

1. Create a child process of the newly created child.

Use a similar logic and a similar set of prints to those in the support code.
Take a look at the printed PIDs.
Make sure the PPID of the "grandchild" is the PID of the child, whose PPID is, in turn, the PID of the parent.
