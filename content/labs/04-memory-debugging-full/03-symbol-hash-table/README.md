# Exercise: The Symbol Table With Three Bugs

**Tools:** GCC, Make, GDB, Valgrind

## Goal

Reference (bug-free) implementation of the symbol hash table.
This is the exercise that needs **both** tools in the same program: a crash for `gdb`, a use-after-free that Valgrind pinpoints, and a leak that only a leak check can see.

## Background

A small hash table mapping a program's symbol names — the sort `nm` or `objdump` prints — to two pieces of information: the address the symbol lives at, and which region of the process image owns that address (`.text`, `.data`, `.rodata` or `.bss`).
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

Two things about that struct drive all three bugs:

* An entry owns **two** heap blocks — the node itself and the `strdup()`ed name — so every removal has two frees to get right.
* `next` is part of the node's state, and nothing initialises it for you.

Files:

* `symbol_hash_table.h` — the interface: types and function prototypes.
* `symbol_hash_table.c` — the implementation.
* `main.c` — a driver that inserts twelve symbols into a deliberately small **8-bucket** table, so that chains of two and three form; then looks symbols up, updates one, removes one, and prints the table before and after.

The table is undersized on purpose.
With one symbol per bucket, two of the three bugs never fire.

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

The three bugs are independent, but they do not surface independently: each one hides the ones after it.
That is why the exercise insists on fixing them one at a time and rerunning in between — the order below is the order the program reveals them, not the order they appear in the file.

### Bug 1 — `symtab_insert()` never set `entry->next`

```C
	entry->name = strdup(name);
	...
	/* Prepend to the bucket's chain. */
	entry->next = table->buckets[index];
	table->buckets[index] = entry;
```

The buggy version had the second of those two lines and not the first.
`malloc()` does not zero memory — only `calloc()` does — so `next` held whatever was previously in that heap block.
Every chain walk then followed a garbage pointer.

**Symptom:** a segmentation fault in the very first dump.
Before it dies, the dump lists at most one symbol per bucket, and the header still claims twelve entries: the counter was maintained correctly, the chains were not.

**How it is found.** The crash comes first, so `gdb` comes first:

```console
gdb ./symtab
(gdb) run
(gdb) backtrace
```

```text
#0  __strlen_evex () at ../sysdeps/x86_64/multiarch/strlen-evex-base.S:81
#1  0x00007ffff7c6f7a0 in __printf_buffer (...) at vfprintf-process-arg.c:435
...
#4  0x0000555555555b7f in symtab_print (table=0x5555555592a0) at symbol_hash_table.c:185
```

The top frames are inside libc, which is normal and not informative: `printf` was handed a `char *` that does not point at a string.
Walk up with `frame 4` until you reach code from this program, then `print *entry`.
The name and address will be nonsense, and `next` will be a value nothing in `symtab_insert()` ever wrote.

Memcheck finds it too, and says so more precisely than the crash does:

```text
Conditional jump or move depends on uninitialised value(s)
   at 0x1098A4: find_entry (symbol_hash_table.c:98)
   by 0x1098ED: symtab_insert (symbol_hash_table.c:111)
   by 0x109394: main (main.c:50)
```

Line 98 is `while (entry != NULL)`.
Testing an uninitialised pointer is already an error, before anything is dereferenced — this report appears during the *first insert*, long before the crash.

**The general rule:** a freshly `malloc()`ed struct is uninitialised, all of it.
Either assign every field explicitly, or use `calloc()`.
Assigning three fields out of four is the bug that hides best, because the fourth one usually contains a plausible-looking value.

### Bug 2 — `symtab_remove()` did not repair the bucket head

```C
			if (prev == NULL)
				table->buckets[index] = entry->next;
			else
				prev->next = entry->next;
```

The buggy version had only the `else` branch, guarded as `if (prev != NULL)`.
Removing a node from the **middle** of a chain worked; removing the **first** node of a chain freed it and left `table->buckets[index]` pointing straight at the freed block.

`g_retry_limit` is the only symbol in bucket 7, so it is a head, and the bug fires on the one removal the driver performs.

**Symptom:** with bug 1 fixed, the program gets much further — through the first dump, the lookups and the update — and then dies in the **second** dump, right after printing `bucket 7:`.
A bug that depends on *which* entry is touched is a bug about structure, not about a value.

**How it is found.** This is Valgrind's home ground:

```console
valgrind ./symtab
```

```text
Invalid read of size 8
 Address 0x4aa1908 is 8 bytes inside a block of size 32 free'd
    by 0x109AA9: symtab_remove (symbol_hash_table.c:157)
 Block was alloc'd at
    by 0x109922: symtab_insert (symbol_hash_table.c:120)
```

Three facts, and the middle one is the answer: the block was freed *by the removal*, and something read it afterwards.
Note that the line Valgrind names first is the **read**, in `symtab_print`.
That is where the effect surfaced, not where the bug is.
The bug is the missing assignment in `symtab_remove()`, several function calls earlier.

**The general rule:** a singly linked list has two removal shapes, not one.
The head has no predecessor to relink, so something else — the array slot, or the list handle — has to be updated instead.
Code that only ever tests `prev != NULL` handles one of the two.

### Bug 3 — `symtab_remove()` freed the node but not its name

```C
			free(entry->name);
			free(entry);
```

An entry owns two blocks.
`symtab_destroy()` frees both for every entry it walks; `symtab_remove()` freed only the node, so the key of any removed symbol was orphaned.

**Symptom:** none whatsoever.
With the first two bugs fixed, the program runs to completion and prints a table that is correct in every respect.

```console
valgrind --leak-check=full ./symtab
```

```text
14 bytes in 1 blocks are definitely lost in loss record 1 of 1
   by 0x4938EDE: strdup (strdup.c:42)
   by 0x109943: symtab_insert (symbol_hash_table.c:124)
```

Fourteen bytes: `g_retry_limit` is thirteen characters plus a terminator.
The report points at the `strdup()` that created the block, because a leak has no moment of its own.

**The general rule:** the frees have to mirror the allocations.
List every heap block a `symbol_entry_t` owns, then check each teardown path — `symtab_remove()` and `symtab_destroy()` — releases all of them.
A structure with two owned blocks and two teardown paths has four opportunities to get it wrong.

### What the exercise is actually teaching

Three bugs, three symptoms, and the symptom is what picks the tool:

| Bug | Symptom | Found with |
| --- | --- | --- |
| Uninitialised `next` | Crash, immediately | `gdb` backtrace; Memcheck also flags the uninitialised test |
| Dangling bucket head | Crash, but only after a removal | Valgrind's use-after-free report |
| Leaked key | Nothing at all | `valgrind --leak-check=full` |

Reading the source first does not work here, which is the other half of the design.
Each bug hides the next, so there is no run on which all three are visible, and the only way through is to fix, rebuild, rerun and let the new symptom choose the next tool.

## References

* `man 1 gdb`, and the [GDB documentation](https://sourceware.org/gdb/current/onlinedocs/gdb.html/)
* `man 1 valgrind`, and the [Memcheck manual](https://valgrind.org/docs/manual/mc-manual.html)
* `man 3 malloc`, `man 3 calloc`, `man 3 strdup`
* [djb2](http://www.cse.yorku.ca/~oz/hash.html) — the string hash used here
