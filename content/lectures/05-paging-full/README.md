# Data (part 3)

# 0. Pitch

- **demo**: number of page faults by an application & system-level
- **demo**: total value of RSS vs. total physical memory used

# 1. Process Virtual Address Space: Perspectives

- list of zones vs array of page descriptions (PTE - page table entry)

  ```c
  struct zone *pvas_head;
  struct zone {
        unsigned long start;
        unsigned long size;
        unsigned int permissions;
        struct zone *prev, *next;
  };

  struct page page_table[N];
  struct page {
      bool valid;
      unsigned int frame_index;
      unsigned int permissions;
      unsigned int flags;
  }
  ```

- **demo**: `pmap $$` how many zones, how many valid PTEs
- **diagram**: zones, page table, correspondence
- zones: managed by OS
- page table: managed by hardware / MMU / MTU (Memory Management Unit, Memory Translation Unit)
- virtual to physical address translation (done by MMU / MTU): page address + offset, translate page address to frame address, add offset

# 2. (Virtual) Memory Operations

- virtual memory reservation: only affects the list of zones view
  - reserved explicitly by a memory allocation call (`malloc()`, `mmap()`)
- **diagram**: reserve virtual memory
- allocate physical memory: only affects the page table - validity bit is updated
- allocate at access - not explicit
- **diagram**: allocation of physical memory, mapping frames to pages, validation of PTEs

# 3. Page Fault

- **demo**: show page fault metrics of processes
- a page fault is triggered when access is done to a page that's invalid or with the wrong permissions
- flow is: memory access instruction, aim to translate virtual address to physical address (MMU / MTU); if page table entry is invalid, trigger page fault; run page fault handler; check the zones view; allocate physical page and update page table entry
- **diagram** with flow
- **demo**: reservation and allocation, see `vsz`, `rss`, `min_flt`, `maj_flt` metrics
- run kernel space code: syscall or memory access causing a page fault
- page faults: minor page fault, major page fault, invalid page fault (causes seg fault), permissions page fault (generally causes segfault)
- **demo**: seg faults
- **diagram**: demand paging
- **diagram**: swapping

# 4. Memory Sharing

- **demo**: resident memory used by 10 processes started from:
  - the same dynamic executable
  - the same static executable
  - 10 different dynamic executables
  - 10 different static executables
- **diagram**: same physical memory, multiple address spaces accessing it
- implicit: executables, libraries
- explicit: `shm...` calls, require synchronization - part of App Interaction lectures

# 5. Storing the Page Table

- page table in memory
- two issues:
  - double memory access: use TLB - a cache of the page table: **diagram**
  - a lot of space use multi-level paging: **diagram**

# Conclusion and Takeaways

- virtual memory gives the appearance of using more memory than actually being used
- physical memory is allocated at access
- page table stores state of the physical page
- invalid page may mean not part of the VAS (segfault at access), or not yet allocated / mapped (no segfault at access)
- allocation is triggered by access, and by signal sent by the MMU / MTU to the operating system (page fault handler)
- frames not used are swapped on disk (swap space)
- benefit of virtual memory is memory sharing
- downside of virtual memory is space allocated for page table (alleviated with multi-level paging) and double memory access (page table + actual access) (alleviated by TLB)
