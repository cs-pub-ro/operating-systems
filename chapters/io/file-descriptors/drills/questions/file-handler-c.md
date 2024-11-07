# File handler in C

## Question Text

What is the type of the file handler in the C code located in `chapters/io/file-descriptors/support/simple-file-operations/file_operations.c`?

## Question Answers

- `File`

+ `FILE *`

- `FILE`

- `void *`

- `struct file`

## Feedback

The file is opened using either of the following lines:

```c
f = fopen(file_name, "r");

f = fopen(file_name, "w");
```

The type of `f` is `FILE *`:
`FILE *f`.
