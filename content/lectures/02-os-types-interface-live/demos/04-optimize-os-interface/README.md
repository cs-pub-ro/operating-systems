# Demo: Optimizing the OS Interface

Two demos, the two directions you can move work to make fewer of the expensive crossings from part 02.

* [`fwrite/`](fwrite) -- batch the crossings by buffering in user space.
* [`sendfile/`](sendfile) -- remove them by pushing the whole job into the kernel.
