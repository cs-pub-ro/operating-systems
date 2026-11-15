# Demo: Partitioning and Synchronization

| Demo | What it shows |
| --- | --- |
| [`list/`](list) | Ten threads changing one linked list: a segmentation fault without a lock, a correct list with one. A list cannot be cut into a piece per thread. |
| [`kernel-contention/`](kernel-contention) | Eight threads that share nothing in user space and still wait for each other, on a lock inside the kernel; eight processes doing the same work do not. |

The partitioned case is [`00-pitch/sum/`](../00-pitch/sum): `sum_partition` gives each thread a variable of its own.
