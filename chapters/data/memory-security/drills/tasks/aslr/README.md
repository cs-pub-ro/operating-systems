# ASLR

Navigate to the `aslr` directory in the lab archive (or `chapters/data/memory-security/drills/tasks/aslr` if you are working directly in the repository) and run `make skels` to generate the `support/` folder.
Then navigate to `support/src`.

Use the `Makefile.aslr` file to compile the `chapters/data/memory-security/drills/tasks/aslr/support/aslr.c` file:

```console
student@os:~/.../drills/tasks/aslr/support/$ make -f Makefile.aslr
```

By default, ASLR and PIC are enabled.
Observe the results.
Next, we disable ASLR:

```console
student@os:~/.../drills/tasks/aslr/support/$ echo 0 | sudo tee /proc/sys/kernel/randomize_va_space
```

Even though the code is compiled with PIC, both library and user functions have the same address between runs.
Re-enable ASLR:

```console
student@os:~/.../drills/tasks/aslr/support/$ echo 2 | sudo tee /proc/sys/kernel/randomize_va_space
```

Disable PIC by uncommenting the `-fno-PIC` and `LDFLAGS` lines.

We observe that for randomization to work, we need to instruct the OS to randomize the program sections and the compiler to generate code that is position independent.

If you're having difficulties solving this exercise, go through [this](../../../reading/memory-security.md) reading material.

## Checker

To run the checker, go into the `tests` directory located in `src`, then type `make check`.
A successful output of the checker should look like this :

```console
student@os:~/.../drills/tasks/aslr/support/src/tests make check
test_aslr                        ........................ passed ... 100

========================================================================

Total:                                                           100/100
```
