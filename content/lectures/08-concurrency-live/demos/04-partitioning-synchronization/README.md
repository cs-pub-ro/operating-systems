# Demo: Partitioning and Synchronization

* [`list/`](list) --- ten threads changing one linked list, without a lock and with one.
* [`kernel-contention/`](kernel-contention) --- workers that share nothing in user space, as threads and as processes.

The partitioned case is `sum_partition` in [`00-pitch/sum/`](../00-pitch/sum).
