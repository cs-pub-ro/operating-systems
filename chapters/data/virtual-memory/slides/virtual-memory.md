---

## Virtual Memory

----

### Virtual Memory

![VM1](virtual-memory/media/VM-1.svg)

----

### Virtual Memory

* Programs work with virtual memory as if it was physical memory
* Each process can address the entire address space (potentially, more than the size of RAM) => simplicity
* Each process is encapsulated (cannot have access to another process's memory) => security
* Penalties: extra hardware and software needed, extra work is done when accessing memory

----

### How Do We Store Data?

* When we rent a storage unit, its size is fixed
* Even if we store a coin, we still get a moderately large storage unit
* The same goes for memory

----

### Pages/Frames

![PG](virtual-memory/media/pages.svg)

----

### Pages/Frames

* A page is a virtual memory unit
* A frame is a physical memory unit
* A page/frame size is typically 4 KB
* Virtual pages are mapped to physical frames
* The mapping is stored in a page table
* Each page has access rights

----

### An Example - How does it work?

```c
int *arr = malloc(2000 * sizeof(int));
arr[1500] = 7;
```

----

### An Example - How does it work?

![EX1](virtual-memory/media/vm-example1.svg)

----

### What About Physical Memory?

* Should we also allocate physical memory upfront?
* What if the program does not end up using that memory?
* Maybe we should allocate only when a memory location is actually used
* We mark allocated pages that don't have a corresponding frame with (U)

----

### An Example - How does it work?

![EX2](virtual-memory/media/vm-example2.svg)

----

### An Example - How does it work?

* The requested address is checked to see if it was allocated (virtually)
* If not => _segmentation fault_
* If yes, then we must retrieve it
* Wait, what about physical frames?

----

### What About Physical Memory? (part 2)


![EX3](virtual-memory/media/vm-example3.svg)

----

### What About Physical Memory? (part 2)

* This strategy is called **demand paging**
* We only allocate physical frames once they are needed
* The pages that have been allocated, along with their mapping status, are stored in a ledger, called the page table
* `demo/alloc_physical/`

----

### An Example - How does it work?

![EX4](virtual-memory/media/vm-example4.svg)

----

### An Example - How does it work?

* Subsequent accesses to virtual addresses that have been mapped to a physical frame simply check that the virtual address is valid
* No need to allocate any other physical frames

----

### An Example - How does it work?

![EX5](virtual-memory/media/vm-example5.svg)

----

### Benefits of Virtual Memory

* Each process can have a different memory mapping
* Physical RAM can be mapped into multiple processes at once
    - shared memory
* Memory regions can have access permissions
    - read, write, execute
* [Quiz](quiz/vm-draw.md)

---

### Page Faults

* Occur when a virtual address access cannot be performed
* Examples:
  - A valid virtual address is accessed, but no physical frame is allocated
  - An invalid virtual address is accessed

----

### Page Fault Handlers

* Page faults are handled by pre-registered OS routines: **page fault handlers**
* A hardware unit generates a page fault that is treated by the operating system
* Once a page fault is addressed, the instruction that caused it is re-executed (assuming the OS was able to treat the page fault)

---

### Implementation of Virtual Memory

![VM](virtual-memory/media/VM.svg)

----

### CPU

* The CPU always works with virtual addresses
* When a load is made, the MMU intercepts the address

----

### Memory Management Unit (MMU)

* hardware component that checks whether the virtual address is valid
* stores the mappings (**page tables**) between virtual and physical addresses

----

### The Page Table

* maps virtual (page) addresses to physical (frame) addresses
* is typically stored in memory (RAM)
* For faster access, modern systems use ...

----

### Translation Lookaside Buffers (TLB)

* a cache of the page table
* two memory accesses (access to page table and access to actual data) are reduced to a TLB cache access and a memory access

----

### Page Fault Triggers

* If the virtual address is part of the page table, i.e. there is a physical counterpart address for it, the MMU forwards the physical address to the memory subsystem
* If not, a page fault is triggered

----

### The Operating System

* had previously registered a page fault handler
* the page fault causes the execution of the page fault handler (part of the operating system)

----

### The Page Fault Handler

* verifies the virtual address is valid, i.e. it was allocated; issues memory exception (i.e. _segmentation fault_) if not
* if the address is valid, verifies if there is an already allocated physical frame for the virtual page; allocates it if not
* verifies if the access rights allow this access
* updates the page table with the latest mappings
* reruns the instruction that caused the page fault

----

### The Memory Subsystem

* works only with physical addresses
* the MMU will forward only physical addresses, after it resolves the virtual address mapping
* [Quiz](quiz/swap.md)

---

### Swapping

* What happens if a process requires more memory than the available physical RAM?
* Frames that haven't been used in a while are evicted on the disk
* Once those frames are required they are brought up in RAM
* However, a large penalty will be incurred
* Typically, systems will freeze once the swap is used

----

### Swapping

![SWAP](virtual-memory/media/Swap.svg)

----

### Swapping

![SWAPARCH](virtual-memory/media/Swap-arch.svg)

* [Quiz](quiz/swap.md)

---

### Case Study: Index Out Of Bounds

----

### What is the result of running the following code?

```c
void main()
{
	/* some code, may contain allocations */

	int *arr = malloc(2000 * sizeof(int));
	arr[2005] = 10;
}
```

* [Quiz](quiz/index-out-of-bounds.md)

---

### OS Implementation Of Virtual Memory

----

### OS Data Structures

![OSVM](virtual-memory/media/OSVM.svg)

* [Quiz](quiz/sdfsd)

----

### OS Interface To Virtual Memory

* `/proc/<PID>/mem` - access to virtual memory
  - `demo/proc_mem/`
* `/proc/<PID>/page_map` - access to page mappings
  - `demo/proc_pagemap/`
* `/dev/mem` - access to physical memory
  - `demo/proc_pagemap/`

---

## Final Quiz

* [Quiz](quiz/vm-final.md)

---

## The End
