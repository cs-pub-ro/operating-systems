# Memory Protection

Let's navigate to the `memory-protection/` directory from the lab archive (or `chapters/data/working-with-memory/drills/tasks/memory-protection/` if you are working directly in the repository), run `make skels` and enter the `support/src/` directory.

Inspect the `mem_prot.c` source file.
The file uses different access types for the `data` variable and the `do_nothing` function.

Build it:

```console
student@os:~/.../memory-protection/support/$ make
gcc -g -Wall -Wextra -Werror -I../../../../../common/makefile/../utils -I../../../../../common/makefile/../utils/log  -c -o mem_prot.o mem_prot.c
gcc mem_prot.o ../../../../../common/makefile/../utils/log/log.o  -o mem_prot

student@os:~/.../memory-protection/support/$ ./mem_prot
reading from .data section
writing to .data section
reading from .text section
executing .text section
```

All current actions in the program are valid.

Let's uncomment each commented line in the program and try again:

```console
student@os:~/.../memory-protection/support/$ ./mem_prot
reading from .data section
writing to .data section
reading from .text section
executing .text section
executing .data section
Segmentation fault (core dumped)
```

We now receive the dreaded _Segmentation fault_ message when we try to access a memory section with wrong permissions.

Permissions come into play when we control the memory address via pointers.
But even for programming languages that don't offer pointers (such as Python) issues may still arise.

In the `str.py` file, we look to modify `str[1]`, but this fails:

```console
student@os:~/.../memory-protection/support/$ ./str.py
n, 110, n
Traceback (most recent call last):
  File "./str.py", line 5, in <module>
    str[1] = 'z'
TypeError: 'str' object does not support item assignment
```

This fails because strings are, in Python, immutable.
Once a string is being created, it can not be modified;
you have to create a new string.

1. Add a variable named `ro` that you define as `const`.
   The variable will be placed on a read-only section (`.rodata`) such as that write and execution access would result in _Segmentation fault_.

   Access the `ro` variable and show that, indeed, for write and execution access, _Segmentation fault_ is issued.

   Check your work by running the `checker.sh` script in `support/tests/`.

If you're having difficulties solving this exercise, go through [this](../../../reading/working-with-memory.md) reading material.
