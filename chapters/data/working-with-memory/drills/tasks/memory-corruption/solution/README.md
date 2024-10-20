# Debugging the program

The issue lies in the `print_bit_array()` function.
Specifically, the line:

```c
while (i >= 0) {
```

The variable `i` is of type `unsigned int` and therefore it can never be less than 0.
When `i--` causes the value of `i` to wrap around after reaching 0, it becomes a very large unsigned integer (typically `2^32 - 1` on a 32-bit system), leading to the segmentation fault error (it tries to access an invalid memory index in `the_bits[]`).
