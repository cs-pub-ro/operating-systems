# Buffer Overflow Info Leak

Since arrays decay to pointers in C, the same effect may be obtained by using them.

Navigate to the `chapters/data/memory-security/guides/buffer-overflow-leak/support/` directory.
Open and analyze the `array_leak.c` file.

Compile and run the program.
Can you extract any information from the output?
Can you identify the return address of the main function?

**Note:** You can use `objdump -d -M intel array_leak` to check the stack layout.
**Note:** Depending on the environment the layout may differ.

Next, open and analyze the `string_leak.c` file.
Compile and run the program.
To better understand the output, use `xxd` to interpret the output as hexadecimal bytes:

```console
student@os:~/.../guides/buffer-overflow-leak/support/$ ./string_leak | xxd
```

**Note:** `73` and `6f` are the ascii values of `s` and `o`

## Practice

In file `string_leak.c` replace the usage of `memcpy` with `strcpy`.
Do not modify anything else (including the size of the buffer).
As the name suggests, `strcpy()` is specialized for string copies, therefore we don't need to specify how much we want to copy.
What is the result?
Is the result correct?
Explain the result.
