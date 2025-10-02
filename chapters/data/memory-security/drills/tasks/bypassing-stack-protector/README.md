# Bypassing the Stack Protector

Navigate to the `bypassing-stack-protector` directory in the lab archive (or `chapters/data/memory-security/drills/tasks/bypassing-stack-protector` if you are working directly in the repository) and run `make skels` to generate the `support/` folder.
Then navigate to `support/src`.

Inspect the `bypassing-stack-protector/support/stack_protector.c` source file.
Compile the program and examine the object code.
Try to identify the canary value.
Using the `addr` variable, write 2 instructions: one that indexes `addr` to overwrite the canary with the correct value and one that indexes `addr` to overwrite the return address with the address of function `pawned()`.
In case of a successful exploit a video will be offered as reward.

If you're having difficulties solving this exercise, go through [this](../../../reading/memory-security.md) reading material.

## Checker

To run the checker, go into the `tests` directory located in `src`, then type `make check`.
A successful output of the checker should look like this :

```console
student@os:~/.../drills/tasks/aslr/support/src/tests make check
test_bypassing-stackprotector    ........................ passed ... 100

========================================================================

Total:                                                           100/100
```
