# Buffer Overflow Overwrite

Up until this point we have seen how we can exploit a buffer to leak information.
However, this vulnerability may be used most of the time to overwrite data.

Take for example the code in `chapters/data/memory-security/guides/buffer-overflow-overwrite/support/bo_write.c`.
Compile and run the code.
What happens?
Why?

## Practice

Open the `guides/buffer-overflow-overwrite/support/bo_write_practice.c` file.
Analyze the code, then compile it and run it.

1. Try to find an input that alters the control flow of the program so that "Comm-link online" is printed.
You are not allowed to modify the source file.

1. Try to find an input that alters the control flow of the program so that "Channel open." is printed.
You are not allowed to modify the source file.

**Note:** Addresses are 8 bytes long on 64 bit machines.

1. Can you think of a different input that results in printing "Comm-link online"?
