# Session 09: I/O Interface - Full Contents

## 0. Pitch

- **demo**: `/proc/<PID>/io`
- **demo**: `fwrite()` vs `write()` vs `write()` with `O_DIRECT` vs `write()` with `O_DIRECT | O_SYNC`

## 1. Processes and the Outside World

- process uses threads and virtual address space for compute (CPU + memory)
- data is read from and written to I/O
- **diagram**: I/O channels: `read` / `write`
- **diagram**: types of I/O channels: socket-like (connect to another process) and file-like (connect to a device)
- **demo**: `lsof`

## 2. The Process I/O Interface

- working with I/O channels
- **diagram**: create, open, read, write, stat, ioctl, close, delete
- file descriptor
- **demo**: I/O operations on a file
- **demo**: I/O operations on a FIFO

## 3. File Descriptor table

- per-process descriptor table
- I/O interface for processes
- **diagram**: pointers for channel structures
- creating new entries
- **demo**: file descriptor table size

## 4. Types of I/O Channels

- socket-like vs file-like
- identifying a channel
  - filesystem entry
  - port
  - inherited file descriptor
- **demo**: sample channels:
  - socket-like (IPC: process-to-process)
      - pipe
      - FIFO
      - Unix-domain socket
      - network socket
  - file-like (process-to-file / device)
      - file

## 5. File Channel Internals

- open permissions
- file pointer
- reference to actual file information
- reference counter
- **demo**: file permissions

## 6. File Channel Operations

- **diagram**: logical view of file: array of bytes, size
- **demo**: read, write, seek, stat
- size vs actual size
- **demo**: truncate

## Conclusion and Takeaways

- Processes use I/O channels to interact with the outside world (outside the process address space).
- The operating system exposes an I/O interface: file descriptors and operations with file descriptors.
- There are two large types of I/O channels: socket-like - process-to-process, and file-like: process to device
- For file-like I/O channels, the channel structure stores open permissions, the file cursor, a reference counter and the reference to the actual file metadata.
- Typical file operations modify contents, size and file cursor / pointer.
- A file descriptor is an index into the file descriptor table, that contains pointers to a channel structure.
