# Wild Pointer Arithmetic Info Leak

Navigate to the `pointer-arithmetic-leak/` in the lab archive (or `chapters/data/memory-security/drills/tasks/pointer-arithmetic-leak` if you are working directly in the repository) and run `make skels` to generate the `support/` folder.
Then navigate to `support/src`.

Open and analyze the `buff_leak.c` file.

The pointer `p` points to the stack.
However, we can modify any variable that is declared in the program through `p`.
All we need to know is the offset of the other memory locations that we wish to access.

Run the program and try to input the correct offsets to modify variables from different regions of our program.
Once a correct offset is given as input, the program will output a validation message.

Note that adding or subtracting user-provided values to pointers enables an attacker to observe a program's entire memory!
If you're having difficulties solving this exercise, go through [this](../../../reading/memory-security.md) reading material.
