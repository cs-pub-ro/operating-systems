# Demo: Who Shares the File Pointer

A file that holds `0123456789abcdef`, and two descriptors for it, obtained in three ways.
Each read takes four characters.
Predict what the second read of each scenario returns, before running.

## Run

```console
make
./file-pointer
```

## Ask

* After two `open()` calls, what does the second read return? How many file pointers are there?
* After `dup()`, what does the second read return? What did `dup()` create?
* Descriptor 3 was closed, and reading through 4 still works. Why?
* After `fork()`, the child reads first. What does the parent get, and what does that say about where the file pointer is kept?
