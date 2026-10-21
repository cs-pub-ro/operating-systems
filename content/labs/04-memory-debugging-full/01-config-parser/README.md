# Exercise: The Config Parser That Forgets

**Tools:** GCC, Make, Valgrind

## Goal

Reference (leak-free) implementation of the config parser.
The exercise builds on the leak demo: two leaks instead of one, allocated in different functions and owned by different parts of the program, and the Valgrind report that tells them apart.

## Background

The program reads a file of `key = value` lines, skipping blank lines and comments, stores the settings, and then looks up four keys and prints their values.

```C
/* One "key = value" line. Both strings are heap copies owned by the setting. */
struct setting {
	char *key;
	char *value;
};
```

Heap memory is allocated in three places, and each block has an owner:

| Allocated in | What | Owner | Freed in |
| --- | --- | --- | --- |
| `config_add()` | the key | the setting | `config_free()` |
| `config_add()` | the value | the setting | `config_free()` |
| `config_get()` | a copy of the value | the caller of `config_get()` | `main()` |

`config_get()` returns a copy rather than a pointer into the table, so that the caller can keep the value after the configuration is gone; its comment says so, and says that the caller owns the copy.
The buggy version got the first row right and the other two wrong.

Files:

* `main.c` — the fixed implementation.
* `config.txt` — six settings, two comment lines and two blank lines.

## Build & Run

```console
make
./config config.txt
```

```text
6 settings loaded
hostname = reports.example.org
port = 8080
log_level = warning
timeout = (not set)
```

Same output as the buggy version.
The fourth key is not in the file, so `config_get()` returns `NULL` and the program prints `(not set)`.

```console
valgrind --leak-check=full ./config config.txt
```

```text
==1477560==   total heap usage: 18 allocs, 18 frees, 8,805 bytes allocated
==1477560== All heap blocks were freed -- no leaks are possible
==1477560== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

Eighteen allocations: six keys, six values, three copies, and three blocks of stdio's own.

## Results and Explanations

### The report on the buggy version

```text
==1481877== HEAP SUMMARY:
==1481877==     in use at exit: 88 bytes in 9 blocks
==1481877==   total heap usage: 18 allocs, 9 frees, 8,805 bytes allocated
==1481877==
==1481877== 33 bytes in 3 blocks are definitely lost in loss record 1 of 2
==1481877==    at 0x484A858: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==1481877==    by 0x4939EDE: strdup (strdup.c:42)
==1481877==    by 0x1094A9: config_get (main.c:75)
==1481877==    by 0x1097DC: main (main.c:144)
==1481877==
==1481877== 55 bytes in 6 blocks are definitely lost in loss record 2 of 2
==1481877==    at 0x484A858: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==1481877==    by 0x4939EDE: strdup (strdup.c:42)
==1481877==    by 0x1093DD: config_add (main.c:53)
==1481877==    by 0x109668: config_load (main.c:117)
==1481877==    by 0x109777: main (main.c:138)
==1481877==
==1481877== LEAK SUMMARY:
==1481877==    definitely lost: 88 bytes in 9 blocks
```

Two loss records, because the lost blocks were allocated from two different places, and Valgrind groups leaks by the stack trace of the allocation.
Each record is read the same way as in the demo: how much was lost, and where it came from.

The block counts say which is which before any code is read.
`config.txt` holds six settings, so six values were copied in `config_add()`: that is record 2.
`main()` looks up four keys and three of them are found, so `config_get()` made three copies: that is record 1.
The bytes agree too: `reports.example.org`, `8080` and `warning` are 30 characters plus three terminators, and the six values are 49 characters plus six.

### FIX 1 — `config_free()` freed the key and not the value

```C
	for (i = 0; i < cfg->count; i++) {
		free(cfg->settings[i].key);
		free(cfg->settings[i].value);
	}
```

The buggy loop had only the first `free()`.
A setting owns two heap strings, so its teardown needs two `free()` calls, and the easiest way to get this right is to count: for every `strdup()` in `config_add()`, one `free()` in `config_free()`.

### FIX 2 — `main()` never freed the copy from `config_get()`

```C
		char *value = config_get(&cfg, keys[i]);

		printf("%s = %s\n", keys[i], value != NULL ? value : "(not set)");
		free(value);
```

The comment above `config_get()` says the caller owns the copy, and the caller did nothing about it.
This is the most common leak in real code: a function hands out heap memory, and the caller either does not read the comment or forgets.
`free(NULL)` is defined to do nothing, so the `(not set)` case needs no `if`.

### Why Valgrind points at `strdup()`

Both stack traces end in `strdup()`, and neither names `config_free()` or the loop in `main()`.
That is not a limitation of this report; it is what a leak is.
There is no line where the leak happened, only a `free()` that never ran, and the one concrete fact available is where the orphaned block was allocated.
From the allocation, follow the pointer: who receives it, where is it last used, and who was supposed to release it.

### What the two leaks have in common, and what they do not

The reports look the same, and the fixes are each one line.
The ownership is different.
The first leak is inside a data structure: the struct that owns two blocks and a teardown that frees one.
The second crosses a function boundary: an API that returns heap memory and a caller that keeps none of its promises.
The second kind is worth recognising on sight, because every library you will use has functions like `config_get()`, and their documentation says who frees the result in one sentence that is easy to skip.

## References

* `man 3 strdup`, `man 3 free` — in particular that `free(NULL)` does nothing
* `man 1 valgrind`, and the [Memcheck manual on leak kinds](https://valgrind.org/docs/manual/mc-manual.html#mc-manual.leaks)
