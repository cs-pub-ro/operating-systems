---
title: "OS: Data (part 3)"
revealOptions:
  background-color: 'aquamarine'
  transition: 'none'
  slideNumber: true
  autoAnimateDuration: 0.0
---

# Virtual Memory Internals

1. Memory Operations
1. Process (Virtual) Address Space
1. Virtual Memory and Physical Memory
1. (Virtual) Memory Operations: Reservation vs Allocation
1. The Page Table
1. Conclusion and Takeaways

---

### Pitch

- **demo**: number of page faults by an application & system-level
- **demo**: total value of RSS vs. total physical memory used

---

### Process Virtual Address Space (OS View)

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

### Process Virtual Address Page (Hardware / Page Table View)

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

### Process Virtual Address Space

- **demo**: `pmap $$` how many zones, how many valid PTEs
- **diagram**: zones, page table, correspondence

---

### Managing the Virtual Address Space

- zones: managed by OS
- page table: managed by hardware / MMU / MTU (Memory Management Unit, Memory Translation Unit)

---

### Virtual to Physical Address Translation

- we only use virtual addresses
- done by MMU / MTU
- page address + offset -> translate page address to frame address -> add offset

---

### Virtual Memory Reservation

- only affects the list of zones view
- does not affect page table
- reserved explicitly by a memory allocation call (`malloc()`, `mmap()`)
- **diagram**: reserve virtual memory

---

### Physical Memory Allocation and Mapping

- only affects the page table - validity bit is updated
- virtual memory areas not affected
- allocate at access - not explicit
- **diagram**: allocation of physical memory, mapping frames to pages, validation of PTEs

---

### Page Fault

- **demo**: show page fault metrics of processes
- a page fault is triggered when access is done to a page that's invalid or with the wrong permissions

---

### Page Fault Flow

- **diagram** with flow
- memory access instruction
- aim to translate virtual address to physical address (MMU / MTU)
- if page table entry is invalid, trigger page fault
- run page fault handler
- check the zones view (OS)
- allocate or find physical page (frame)
- map frame to page: update page table entry

---

### Page Fault Metrics

- **demo**: reservation and allocation, see `vsz`, `rss`, `min_flt`, `maj_flt` metrics

---

### Segmentation Fault

- page fault types: minor page fault, major page fault, invalid page fault (causes seg fault), permissions page fault (generally causes segfault)
- **demo**: seg faults

---

### Page Fault Scenarios

- **diagram**: demand paging
- **diagram**: swapping

---

### Memory Sharing

- **demo**: resident memory used by 10 processes started from:
  - the same dynamic executable
  - the same static executable
  - 10 different dynamic executables
  - 10 different static executables

---

### Memory Sharing Types

- **diagram**: same physical memory, multiple address spaces accessing it
- implicit: executables, libraries
- explicit: `shm...` calls, require synchronization - part of App Interaction lectures

---

### Storing the Page Table

- page table in memory
- two issues:
  - double memory access: use TLB - a cache of the page table: **diagram**
  - a lot of space use multi-level paging: **diagram**

---

### Conclusion and Takeaways

- virtual memory gives the appearance of using more memory than actually being used
- physical memory is allocated at access
- page table stores state of the physical page
- invalid page may mean not part of the VAS (segfault at access), or not yet allocated / mapped (no segfault at access)

---

### Conclusion and Takeaways (2)

- allocation is triggered by access, and by signal sent by the MMU / MTU to the operating system (page fault handler)
- frames not used are swapped on disk (swap space)
- benefit of virtual memory is memory sharing
- downside of virtual memory is space allocated for page table (alleviated with multi-level paging) and double memory access (page table + actual access) (alleviated by TLB)
