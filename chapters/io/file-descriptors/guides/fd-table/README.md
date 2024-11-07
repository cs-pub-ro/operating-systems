# File Descriptor Table

Just as each process has its own Virtual Address Space for memory access, it also maintains its own **File Descriptor Table** (FDT) for managing open files.
In this section we will explore how the process structures change when executing syscalls like `open()`, `read()`, `write()`, and `close()`.

Upon startup, every process has three **file descriptors** that correspond to standard input (`stdin`), standard output (`stdout`), and standard error (`stderr`).
These descriptors are inherited from the parent process and occupy the **first three** entries in the process's **FDT**.

| fd    | Open File Struct   |
|-------|--------------------|
| 0     | `stdin`            |
| 1     | `stdout`           |
| 2     | `stderr`           |

Each entry **points to** an **open file structure** which stores data about the current session:

- **Permissions**: define how the file can be accessed (read, write, or execute);
  these are the options passed to `open()`.
- **Offset**: the current position inside the file from which the next read or write operation will occur.
- **Reference Count**: The number of file descriptors referencing this open file structure.
- **Inode Pointer**: A pointer to the inode structure that contains both the data and metadata associated with the file.

These **Open File Structures** are held in the **Open File Table (OFT)**, which is global across the system.
Whenever a new file is opened, a new entry is created in this table.

To illustrate this, let's consider a code snippet and examine how the File Descriptor Table and Open File Table would appear.
We will focus on `fd`, permissions, offset, and reference count, as the inode pointer is not relevant at this moment.
For simplicity, we'll also omit the standard file descriptors, as they remain unchanged.

```c
int fd = open("file.txt", O_RDONLY);
int fd2 = open("file2.txt", O_WRONLY | O_APPEND);
int fd3 = open("file.txt", O_RDWR);
```

| OFT index | Path        | Perm | Off    | `RefCount`  |
|-----------|-------------|------|--------|-------------|
| ...       | ...         | ...  | ...    | ...         |
| 123       | `file.txt`  | r--  | 0      | 1           |
| 140       | `file2.txt` | -w-  | 150    | 1           |
| 142       | `file.txt`  | rw-  | 0      | 1           |

| fd    | Open File Struct (OFT index)  |
|-------|-------------------------------|
| 3     | 123                           |
| 4     | 140                           |
| 5     | 142                           |

Let's discuss the changes from the OFT and FDT to understand what happened:

- `open("file.txt", O_RDONLY)` created a new **open file structure** in the **Open File Table** for `file.txt`.
   The entry has read-only (`O_RDONLY`) permissions and offset `0`, representing the start of the file.
   Subsequently, file descriptor `3` was assigned to point to this OFT entry, and the reference counter was set to `1`.
- `open("file2.txt", O_WRONLY)` created a similar structure in the OFT for `file2.txt`, but with write-only (`O_WRONLY`) permissions and an offset of `150`, representing the end of the file (`O_APPEND`).
   It then assigned this entry to file descriptor `4`.
- `open("file.txt", O_RDWR)` created a new **open file structure** for `file.txt` and assigned it to file descriptor `5`.

At this point, one might wonder why the last `open()` call didn't reuse the entry at file descriptor `3` and increase its reference counter instead.
It might seem logical, but doing so would lead to conflicts with the **permissions** and **offset** of the two open file structures.
**Remember:** each `open()` call creates a new **open file structure** in the **Open File Table**.

This raises the question about the necessity for a reference counter.
The short answer is `dup()` (or `dup2()`) syscall, which duplicates a file descriptor.
Let's continue our previous example with the following snippet:

```c
// fd = 3 (from the previous snippet)
int fd4 = dup(fd);
```

| OFT index | Path        | Perm | Offset | `RefCount`  |
|-----------|-------------|------|--------|-------------|
| ...       | ...         | ...  | ...    | ...         |
| 123       | `file.txt`  | r--  | 0      | 2           |
| 140       | `file2.txt` | -w-  | 150    | 1           |
| 142       | `file.txt`  | rw-  | 0      | 1           |

| fd    | Open File Struct (OFT index)  |
|-------|-------------------------------|
| 3     | 123                           |
| 4     | 140                           |
| 5     | 142                           |
| 6     | 123                           |

The call to `dup(fd)` created a new file descriptor (`6`) that points to the same **open file structure** as its argument `fd` (which equals `3` in our example).
This operation also incremented the reference counter for the entry `123` in the **Open File Table**.

As a result, operations performed on file descriptor `3` and file descriptor `6` are equivalent.
For instance, `read(3)` and `read(6)` will both increment the shared file offset, while the offset of file descriptor `5` will remain unchanged.
If you want to see a concrete example of when duplicating file descriptors is useful, check out `file-descriptors/guides/fd-table/support/redirect-stdout.c`.

Now that you know how to create entries in the **File Descriptor Table** and the **Open File Table**, it’s important to understand how to remove them.
Calling `close()` will **always** free a file descriptor, but it will **only decrement** the reference counter of the **open file structure**.
The actual closing of the file occurs when the reference counter reaches `0`.
