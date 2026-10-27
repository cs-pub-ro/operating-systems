---
title: "OS: Data (part 2)"
revealOptions:
  background-color: 'aquamarine'
  transition: 'none'
  slideNumber: true
  autoAnimateDuration: 0.0
---

# Virtual Memory

1. Memory Operations
1. Process (Virtual) Address Space
1. Virtual Memory and Physical Memory
1. (Virtual) Memory Operations: Reservation vs Allocation
1. The Page Table
1. Conclusion and Takeaways

---

### Pitch

- **demo**: browser virtual memory use
- **demo**: allocate 10TB of memory

---

### Virtual Memory vs Physical Memory

<div style="text-align: left;">

Physical memory:
- belongs to the system
- is predefined
- cannot be accessed directly

Virtual memory:
- belongs to each process - the process virtual address space
- is capped per process - but it's a lot
- is used for addressing

---

### Why Virtual Memory?

- each process view the entire memory of its own - simple to use memory: everything starts from zero
- each process is isolated in its own view - security
- can allocate more virtual memory than system memory
- can share memory

---

### More Virtual Memory than Physical Memory

- share memory
- swapped memory
- not-yet-used memory (on-demand paging)

---

### Summary of Memory Operations

- **diagram**: allocation as new area or extending existing area
- **demo**: allocation and deallocation: see update of process map: `malloc()` and `mmap()`
- **demo**: malloc size; based on `brk` and / or `mmap` syscalls
- **diagram**: allocator in libc, makes `brk` and / or `mmap` syscalls

---

### Process Virtual Address Space

```c
struct zone *pvas_head;
struct zone {
      unsigned long start;
      unsigned long size;
      unsigned int permissions;
      struct zone *prev, *next;
};
```

---

### Physical Memory and Virtual Memory

- **demo**: `ps -o pid,cmd,vsz,rss $$`
- reserve virtual memory: `mmap()` / `malloc()`

---

### Memory Operations

- reserve virtual memory: `mmap()` / `malloc()`
- allocate physical memory: at access
- **diagram**: steps are: reserve, allocate, map (associate)
- **demo**: reservation and then allocation

---

### More Virtual Memory than Physical Memory

- some virtual memory is mapped
- some is shared
- some is only reserved, not mapped - demand paging
- some is swapped

---

### Where is the Virtual to Physical Mapping Kept?

We need a map structure. **Page Table**

---

### Pages

- smallest allocation unit
- **pages**: virtual page
- **frames**: physical pages
- virtual index and **page frame number** (`pfn`)
- easy management: allocate, share, swap
- no fragmentation

---

### The Page Table

```c
struct page page_table[N];
struct page {
    bool valid;
    unsigned int frame_index;
    unsigned int permissions;
    unsigned int flags;
}
```

---

### The Page Table (2)

- a page table per process
- N is the index of the virtual page

---

### Conclusion and Takeaways

- virtual memory is at the core of modern operating systems and applications
- virtual memory is presented as a process virtual address space (per process): a list of zones
- all operations deal with virtual memory, all addresses are virtual addresses
- memory allocation reserves virtual memory
- memory access allocates physical memory and maps it to virtual memory
- virtual memory is managed by a page table
