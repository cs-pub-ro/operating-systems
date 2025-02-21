# Copy-on-Write

So far, you know that the parent and child process have separate virtual address spaces.
But how are they created, namely how are they "separated"?
And what about the **PAS (physical address space)**?
Of course, we would like the stack of the parent, for example, to be physically distinct from that of the child, so they can execute different functions and use different local variables.

But should **all** memory sections from the PAS of the parent be distinct from that of the child?
What about some read-only memory sections, such as `.text` and `.rodata`?
And what about the heap, where the child _may_ use some data previously written by the parent and then override it with its own data.

The answer to all of these questions is a core mechanism of multiprocess operating systems called **Copy-on-Write**.
It works according to one very simple principle:
> The VAS of the child process initially points to the same PAS as that of the parent.
> A (physical) frame is only duplicated by the child when it attempts to **write** data to it.

This ensures that read-only sections remain shared, while writable sections are shared as long as their contents remain unchanged.
When changes happen, the process making the change receives a unique frame as a modified copy of the original frame _on demand_.

In the image below, we have the state of the child and parent processes right after `fork()` returns in both of them.
See how each has its own VAS, both of them being mapped to (mostly) the same PAS.

![Copy-on-Write](../media/copy-on-write-initial.svg)

When one process writes data to a writeable page (in our case, the child writes to a heap page), the frame to which it corresponds is first duplicated.
Then the process' page table points the page to the newly copied frame, as you can see in the image below.

![Copy-on-Write](../media/copy-on-write-final.svg)

For a real-world example of **Copy-on-Write** in action, take a look at [this brief paragraph](https://redis.io/docs/latest/develop/get-started/faq/#background-saving-fails-with-a-fork-error-on-linux) explaining how [Redis](https://redis.io/) uses this technique to snapshot its data without blocking the server.

**Be careful!**
Do not confuse **copy-on-write** with **demand paging**.
Remember from the [Data chapter](reading/working-with-memory.md) that **demand paging** means that when you allocate memory, the OS allocates virtual memory that remains unmapped to physical memory until it's used.
On the other hand, **copy-on-write** posits that the virtual memory is already mapped to some frames.
These frames are only duplicated when one of the processes attempts to write data to them.
