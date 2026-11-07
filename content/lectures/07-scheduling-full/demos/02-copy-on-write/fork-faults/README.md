# Copy on Write: Page Faults

When using `fork()`, copy-on-write is used.
This means that, at the very beginning, the child and the parent share the same physical address space.
Each have their own virtual address space that maps to the same physical address space.
All pages in the virtual address space of each are marked as read-only.
And the virtual memory areas are marked as copy-on-write.
When a write operation happens, the physical page is duplicated, and the mapping is update to point to the new physical page (and the permissions are updated to read-write).

This demo demonstrates the various page operations (including page faults caused by copy-on-write operations) when using fork and copy-on-write.

First, build it:

```console
make
```

Now run the `fork_faults` executable binary:

```console
$ ./fork_faults
```

In another console, monitor the faults and the virtual size and resident set size:

```console
$ ps -o pid,ppid,comm,min_flt,maj_flt,rss,vsz $(pidof fork_faults)
```

Then, go step by step through the execution of `fork_faults` in the first console.
Notice the following:

- Creating a child process has minimal effects on the number of page faults.
- Reading from a page causes no page fault.
- Writing to a page causes a page fault in the child and the allocation of new physical page (and the update of permissions in the page table entry).
- Writing to a page causes a page fault in the parent and the update of permissions in the page table entry.
