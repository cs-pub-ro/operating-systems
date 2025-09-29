---
parent: Lab 5 - Memory Security
nav_order: 1
---

# Task: Pointer Arithmetic Leak

Navigate to `labs/lab-05/tasks/pointer-arithmetic-leak`.
Then navigate to `support/src`.

Navigate to the `labs/lab-05/tasks/pointer-arithmetic-leak/support/` directory.
Open and analyze the `buff_leak.c` file.

The pointer `p` points to the stack.
However, we can modify any variable that is declared in the program through `p`.
All we need to know is the offset of the other memory locations that we wish to access.

Run the program and try to input the correct offsets to modify variables from different regions of our program.
Once a correct offset is given as input, the program will output a validation message.

Note that adding or subtracting user-provided values to pointers enables an attacker to observe a program's entire memory!
If you're having difficulties solving this exercise, go through [this](../../reading/memory-security.md) reading material.