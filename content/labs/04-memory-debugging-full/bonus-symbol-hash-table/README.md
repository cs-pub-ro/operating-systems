# Bonus: (Hard) The Symbol Table With Two Bugs

**Tools:** GCC, Make, GDB, Valgrind

## Goal

Reference (bug-free) implementation of the symbol hash table.
This is the exercise that needs **both** tools in the same program: a crash that GDB locates and Valgrind explains, and a quiet loss of data that only a careful reading of the output, or Valgrind's uninitialised-value check, reveals.

## Background

A small hash table mapping a program's symbol names, the sort `nm` or `objdump` prints, to two pieces of information: the address the symbol lives at, and which region of the process image owns that address (`.text`, `.data`, `.rodata` or `.bss`).
It is a toy model of what a linker or a debugger keeps internally.

Collisions are resolved by **separate chaining**: `table->buckets` is an array of linked-list heads, and the djb2 string hash picks the bucket.

```C
typedef struct symbol_entry {
	char *name;			/* heap copy of the symbol name (the key) */
	void *address;			/* where the symbol lives                 */
	sym_region_t region;		/* which segment "address" belongs to     */
	struct symbol_entry *next;	/* next entry in this bucket's chain      */
} symbol_entry_t;
```

Two things about that struct drive both bugs:

* `next` is part of the node's state, and nothing initialises it for you.
* A bucket's chain is reached through `table->buckets[i]`, which is a pointer like any other, and has to be updated when the first node goes away.

Files:

* `symbol_hash_table.h` — the interface: types and function prototypes.
* `symbol_hash_table.c` — the implementation.
* `main.c` — a driver that inserts twelve symbols into a deliberately small **8-bucket** table, so that chains of two and three form; then looks symbols up, updates one, removes one, and prints the table before and after.

The table is undersized on purpose.
With one symbol per bucket the bugs still fire, but the chains are what make them visible.

## Build & Run

```console
make
./symtab
```

```text
== inserting 12 symbols into a table with 8 buckets ==

== full dump ==
symbol table: 12 entries in 8 buckets
bucket 1:
  shutdown_hook        0x401380  .text
  g_version            0x604018  .data
bucket 2:
  main                 0x401000  .text
bucket 4:
  g_connection_pool    0x606880  .bss
  g_request_count      0x604010  .data
bucket 5:
  print_report         0x4012a0  .text
bucket 6:
  usage_message        0x402048  .rodata
  g_log_buffer         0x606040  .bss
  compute_sum          0x401120  .text
bucket 7:
  g_retry_limit        0x604020  .data
...
```

Then the lookups, the update of `g_version`, the removal of `g_retry_limit`, and a second dump with eleven entries.

```console
valgrind --leak-check=full ./symtab
```

```text
==...==   total heap usage: 27 allocs, 27 frees, 4,722 bytes allocated
==...== All heap blocks were freed -- no leaks are possible
==...== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

Twenty-seven allocations: the table, the bucket array, and twelve entries each holding a node and a name, plus stdio's own.

## Results and Explanations

### What the buggy version does

Run on a terminal, the shipped version prints a first dump whose header says `12 entries` and whose body lists **six** symbols, one per bucket; reports `compute_sum -> not found` although it was inserted; updates `g_version`; removes `g_retry_limit`; and then crashes in the second dump, right after printing `bucket 7:`.

Two symptoms, two bugs.
The crash is the loud one and the natural place to start; the header disagreeing with the list above it is the quiet one, and it was on the screen the whole time.

### Bug 1 — `symtab_remove()` did not repair the bucket head

```C
			if (prev == NULL)
				table->buckets[index] = entry->next;
			else
				prev->next = entry->next;
```

The buggy version had only the `else` branch, guarded as `if (prev != NULL)`.
Removing a node from the **middle** of a chain worked; removing the **first** node of a chain freed it and left `table->buckets[index]` pointing straight at the freed block.

`g_retry_limit` is the only symbol in bucket 7, so it is a head, and the bug fires on the one removal the driver performs.

**Where: GDB.**

```console
gdb ./symtab
(gdb) run
(gdb) backtrace
```

```text
#0  __strlen_evex () at ../sysdeps/x86_64/multiarch/strlen-evex-base.S:81
#1  0x00007ffff7c6f7a0 in __printf_buffer (...) at ./stdio-common/vfprintf-process-arg.c:435
#2  0x00007ffff7c705f3 in __vfprintf_internal (...) at ./stdio-common/vfprintf-internal.c:1544
#3  0x00007ffff7c64043 in __printf (format=<optimized out>) at ./stdio-common/printf.c:33
#4  0x0000555555555b92 in symtab_print (table=0x5555555592a0) at symbol_hash_table.c:185
#5  0x00005555555555e7 in main () at main.c:90
```

The top frames are inside libc, which is normal and not informative: `printf()` was handed a `char *` that does not point at a string.
`frame 4` is the first one in this program, and `main.c:90` is the second dump.

```text
(gdb) frame 4
(gdb) print *entry
$1 = {name = 0x55555555a <error: Cannot access memory at address 0x55555555a>, address = 0xc83e90791a5c9db6, region = SYM_REGION_DATA, next = 0x0}
```

A `name` that is not a pointer and an `address` that is random: this is not an entry any more, it is what the allocator wrote into the block after it was freed.
GDB cannot say who freed it.

**Why: Valgrind.**

```console
valgrind ./symtab
```

```text
==1489101== Invalid read of size 4
==1489101==    at 0x109B7F: symtab_print (symbol_hash_table.c:185)
==1489101==    by 0x1095E6: main (main.c:90)
==1489101==  Address 0x4aa2910 is 16 bytes inside a block of size 32 free'd
==1489101==    at 0x484D8BF: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==1489101==    by 0x109AB8: symtab_remove (symbol_hash_table.c:157)
==1489101==    by 0x1095A4: main (main.c:84)
==1489101==  Block was alloc'd at
==1489101==    by 0x109922: symtab_insert (symbol_hash_table.c:119)
```

Three facts, and the middle one is the answer: the block was freed *by the removal*, and something read it afterwards.
Note that the line Valgrind names first is the **read**, in `symtab_print()`.
That is where the effect surfaced, not where the bug is.
The bug is the missing assignment in `symtab_remove()`, several function calls earlier.

**The general rule:** a singly linked list has two removal shapes, not one.
The head has no predecessor to relink, so something else, the array slot or the list handle, has to be updated instead.
Code that only ever tests `prev != NULL` handles one of the two.

### Bug 2 — `symtab_insert()` never set `entry->next`

```C
	entry->name = strdup(name);
	...
	/* Prepend to the bucket's chain. */
	entry->next = table->buckets[index];
	table->buckets[index] = entry;
```

The buggy version had the second of those two lines and not the first.
`malloc()` does not zero memory, only `calloc()` does, so `next` held whatever was previously in that heap block.

On this machine, what was previously in those blocks was nothing: the entries come from fresh heap, which the kernel hands over zeroed, so every `next` happened to read as `NULL`.
That is why the program did not crash in the first dump.
Instead, every insert made its bucket a one-element chain, and whatever was in the bucket before was dropped on the floor: twelve symbols in, six listed, `compute_sum` gone, and a header that still says twelve because `count` was maintained correctly.
On a machine, or a run, where the blocks were recycled and `next` held a stale pointer, the same bug walks into garbage and crashes on the first insert that collides.
Uninitialised memory that happens to be zero is the most dangerous kind, because the program looks like it works.

**Where and why: the output, a print, or Valgrind.**
The header and the list under it disagree, which is enough to point at `symtab_insert()`.
A print there of the new entry's `next` and of the head it is about to replace shows the loss directly:

```text
insert g_log_buffer       next=(nil) old_head=0x55555555a370
```

The old head is a real entry, and nothing points at it any more.
Memcheck says the same thing on the very first insert, long before any symptom:

```text
Conditional jump or move depends on uninitialised value(s)
   at 0x1098A4: find_entry (symbol_hash_table.c:97)
   by 0x1098ED: symtab_insert (symbol_hash_table.c:110)
   by 0x109394: main (main.c:50)
 Uninitialised value was created by a heap allocation
   at 0x484A858: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
   by 0x109922: symtab_insert (symbol_hash_table.c:119)
```

Line 97 is `while (entry != NULL)`.
Testing an uninitialised pointer is already an error, before anything is dereferenced, and the last two lines, from `--track-origins=yes`, name the `malloc()` the value came from.

**The general rule:** a freshly `malloc()`ed struct is uninitialised, all of it, even when it reads as zero.
Either assign every field explicitly, or use `calloc()`.
Assigning three fields out of four is the bug that hides best.

### What the exercise is actually teaching

Two bugs, two symptoms, and the symptom is what picks the tool:

| Bug | Symptom | Found with |
| --- | --- | --- |
| Dangling bucket head | Crash, after the removal | GDB to the frame; Valgrind's use-after-free report for the cause |
| Uninitialised `next` | Wrong output: six symbols under a header of twelve | Reading the output; a print in `symtab_insert()`; Memcheck's uninitialised-value report |

Reading the source first does not work well here, which is the other half of the design.
The crash draws all the attention, the quiet bug sits above it in the same output, and the way through is to fix, rebuild, rerun and let what is left choose the next tool.

## References

* `man 1 gdb`, and the [GDB documentation](https://sourceware.org/gdb/current/onlinedocs/gdb.html/)
* `man 1 valgrind`, and the [Memcheck manual](https://valgrind.org/docs/manual/mc-manual.html)
* `man 3 malloc`, `man 3 calloc`, `man 3 strdup`
* [djb2](http://www.cse.yorku.ca/~oz/hash.html) — the string hash used here
