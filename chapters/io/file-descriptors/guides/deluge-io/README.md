# `Deluge` I/O

Most of the time, file handling is a simple operation from the perspective of the application.
To see how this looks in practice, we'll examine how the [Deluge Bittorent client](https://www.deluge-torrent.org/) performs I/O operations.

As a BitTorrent client, Deluge manages both local and network-based I/O.
The two "local" operations include **reading files from disk** to share with other clients and **writing downloaded files to disk**.
These are the core tasks we’ll focus on here.

Additionally, Deluge handles two [network-related I/O](../../../ipc/reading/network-sockets.md) operations: **requesting files from other peers** on the internet (which are temporarily stored in memory as they download) and **sending file parts** to other clients (involving reading from disk, storing temporarily in memory, and then transmitting online).

## Local I/O in Deluge

First of all, clone the [Deluge repository](https://github.com/deluge-torrent/deluge).
Now we are free to explore the source code for actions of interest.

### Writing Data to Files

Now find the `write_torrentfile()` function in the repository.

It defines an inner function called `write_file()`, which does the actual writing.
Notice that it's very similar to the example we saw in `simple-file-operations/support/file_operations.py`:

```Python
with open(filepath, 'wb') as save_file:
    save_file.write(filedump)

# Same as:
#   save_file = open(filepath, 'wb')
#   save_file.write(filedump)
#   save_file.close()
```

The `with` keyword is just a _context manager_ that makes sure `save_file` is also closed when its "body" finished.
Writing the data is done simply by calling the `write()` function.
As you've probably figured out, there's an entire **software stack** beneath this `write()` function that sends the data first to libc and then to the kernel.
Furthermore, the kernel itself has its own separate stack for handling I/O requests.

![Software Stacks Everywhere](../../media/software-stacks-everywhere.jpeg)

### Error Handling

What is noteworthy about this short snippet is the (slightly) bigger picture - the error handling:

```Python
try:
    with open(filepath, 'wb') as save_file:
        save_file.write(filedump)
except OSError as ex:
    log.error('Unable to save torrent file to: %s', ex)
```

This is similar to the [`DIE()` macro](https://github.com/open-education-hub/operating-systems/blob/6c5082600239e5a6bfcb612f41986cf2660323bb/content/common/utils/utils.h#L23-L30) you have seen **(and used, right?)** throughout the labs, but less brutal.
While the `DIE()` macro kills the program upon encountering an error, Deluge's `try - except` approach simply logs an error and continues.
As you might imagine, there is no silver bullet when it comes to error handling.
What is important is that errors are somehow accounted for and not ignored.

This is especially true for I/O-related errors.
Because I/O handling means dealing with peripherals or devices outside the typical CPU-RAM interaction.
The more devices, the higher the complexity.
The higher the complexity, the higher the likelihood of errors.

[Quiz](../../drills/questions/local-io-errors.md)

### Reading Data from Files

Now find the `load_resume_data_file()` function in the Deluge source code.
It is used when (re)starting to seed existing files to peers.

The function looks through all possible copies and backups of the file and loads them to a "torrent" format given by [`libtorrent`](https://www.libtorrent.org/).
For this, it calls `lt.bdecode()`.

As before, error handling is important:

```Python
try:
    with open(_filepath, 'rb') as _file:
        resume_data = lt.bdecode(_file.read())
except (OSError, EOFError, RuntimeError) as ex:
    if self.torrents:
        log.warning('Unable to load %s: %s', _filepath, ex)
    resume_data = None
```

So now we know how Deluge handles local files.
But we still don't know how it gets those files from peers.
We'll find out how in the following sections.
