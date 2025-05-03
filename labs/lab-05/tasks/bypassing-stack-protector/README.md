---
parent: Lab 5 - Memory Security
nav_order: 4
---

# Task: Bypassing the Stack Protector

Navigate to `labs/lab-05/tasks/bypassing-stack-protector`.
Then navigate to `support/src`.

Inspect the `labs/lab-05/tasks/bypassing-stack-protector/support/stack_protector.c` source file.
Compile the program and examine the object code.
Try to identify the canary value.
Using the `addr` variable, write 2 instructions: one that indexes `addr` to overwrite the canary with the correct value and one that indexes `addr` to overwrite the return address with the address of function `pawned()`.
In case of a successful exploit a video will be offered as reward.

If you're having difficulties solving this exercise, go through [this](../../reading/memory-security.md) reading material.

## Checker

To run the checker, go into the `tests` directory located in `src`, then type `make check`.
A successful output of the checker should look like this :

```console
student@os:~/.../drills/tasks/aslr/support/src/tests make check
test_bypassing-stackprotector    ........................ passed ... 100

========================================================================

Total:                                                           100/100
```