# Simple File Operations

To manipulate the file (read its contents, modify them, change its size etc.), each process must first get a **handler** to this file.
Think of this handler as an object by which the process can identify and refer to the file.

Now take a look at the code examples in `file-descriptors/guides/simple-file-operations/support`.
Each of them reads the contents of `file.txt`, modifies them, and then reads the previously modified file again.
Use `make` to compile the C code, and `make java-file-operations` to compile the Java code.

Now run the programs repeatedly in whatever order you wish:

```console
student@os:~/.../simple-file-operations/support$ python3 file_operations.py
File contents are: OS Rullz!
Wrote new data to file
File contents are: Python was here!

student@os:~/.../simple-file-operations/support$ ./file_operations  # from the C code
File contents are: Python was here!
Wrote new data to file
File contents are: C was here!

student@os:~/.../simple-file-operations/support$ java FileOperations
File contents are: Python was here!
Wrote new data to file
File contents are: Java was here!
```

Note that each piece of code creates a variable, which is then used as a handler.

[Quiz](../../drills/questions/file-handler-c.md)
