# Stack Protector

Navigate to `stack-protector/` directory in the lab archive (or `chapters/data/memory-security/drills/tasks/stack-protector` if you are working directly in the repository) and run `make skels` to generate the `support/` folder.
Then navigate to `support/src`.

Comment the `-fno-stack-protector` switch from `stack-protector/support/Makefile`, recompile and run the `bo_practice_write` executable.
Examine the binary with `objdump` and identify the instructions that set and test the canary.
Observe what happens when a buffer overflow occurs.

If you're having difficulties solving this exercise, go through [this](../../../reading/memory-security.md) reading material.

## Checker

To run the checker, go into the `tests` directory located in `src`, then type `make check`.
A successful output of the checker should look like this :

```console
student@os:~/.../drills/tasks/aslr/support/src/tests make check
test_stackprotector              ........................ passed ... 100

========================================================================

Total:                                                           100/100
```
