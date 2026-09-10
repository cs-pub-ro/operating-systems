# Bonus: The JSON Parser With a Heap Buffer Overflow

**Tools:** GCC, Make, GDB, Valgrind

## Goal

Reference (bug-free) implementation of the mini JSON library.
This is the exercise that **only Valgrind can solve**: a one-byte heap overflow that never once changes what the program prints.

## Background

A small in-memory JSON library, of the kind you would find inside a config-file loader or a tiny RPC layer:

* `json_value.h` — the interface: the tagged-union `json_value_t`, the ownership rule ("a container owns every child stored in it"), and the parser, serializer and constructor prototypes.
* `json_value.c` — the implementation: a recursive-descent parser, a single-line serializer, and a growable string buffer used while decoding string literals.
* `main.c` — parses a well-formed document, prints it and round-trips it through the serializer, feeds the parser two kinds of malformed input to check they are rejected cleanly, and builds a small tree by hand with the constructor API.

The part that matters is the string buffer.
Every JSON string literal in the input — object keys included — is decoded character by character into a `strbuf_t`, which grows by doubling, and is then handed to the caller as a fresh heap string:

```C
typedef struct {
	char *data;
	size_t len;	/* characters written so far */
	size_t cap;	/* bytes the buffer can hold */
} strbuf_t;
```

Note that `len` counts **characters**, and nothing in the buffer reserves room for a terminator.
The buffer is not a C string; the thing handed to the caller has to be.

## Build & Run

```console
make
./jsontool
```

```text
== parsing a well-formed document ==
parsed ok. {"name":"Ada Lovelace","born":1815,...}

== round-tripping through serialize() ==
{"name":"Ada Lovelace","born":1815,...}

== rejecting malformed input (trailing comma) ==
rejected as expected: unexpected character at offset 9

== rejecting malformed input (mismatched brackets) ==
rejected as expected: expected ',' or ']' in array at offset 19

== building a tree by hand with the constructor API ==
{"id":42,"label":"hand-built","flags":[true,false,null]}

== done ==
all good.
```

The buggy version prints exactly this, byte for byte.

```console
valgrind --leak-check=full ./jsontool
```

```text
==...==   total heap usage: 98 allocs, 98 frees, 7,753 bytes allocated
==...== All heap blocks were freed -- no leaks are possible
==...== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

## Results and Explanations

### The bug

`strbuf_finish()` allocates the block it hands to the caller:

```C
static char *strbuf_finish(strbuf_t *sb)
{
	char *result;

	/* +1 so there is room for the NUL terminator even when len == cap. */
	result = malloc(sb->len + 1);
	if (result != NULL) {
		memcpy(result, sb->data, sb->len);
		result[sb->len] = '\0';
	}

	free(sb->data);

	return result;
}
```

The buggy version asked for `sb->len` bytes and then wrote `result[sb->len]`.
Valid indices into a block of `len` bytes run `0 .. len - 1`, so `result[len]` is the first byte past the end — every single time, for every string in the document.

The comment on the buggy line was `/* Trim the buffer down to exactly the bytes that were written. */`, and it is accurate: that is exactly what the code does.
The mistake is that "the bytes that were written" is not the same as "the bytes the caller needs".
A C string is its characters **plus** a terminator, and the return type `char *` is a promise that the terminator is there.

### Why the output was perfect anyway

The overflow writes exactly one byte, and the byte it writes is `'\0'`.

Heap allocators do not hand out blocks of exactly the size requested: they round up to an alignment boundary and keep bookkeeping between blocks.
A 4-byte request typically occupies a 32-byte slot, so byte 4 lands in padding that nothing else is using.
Writing a zero there corrupts nothing observable, on this input, on this allocator, today.

That is the entire reason this exercise exists.
The program is not *nearly* correct; it has undefined behaviour on every string it parses.
It merely has undefined behaviour that has not yet been unlucky.
A different allocator, a different string length, a slightly different document, or `-fsanitize=address` — and the same code corrupts something that matters.

### Finding it

```console
valgrind ./jsontool
```

```text
Invalid write of size 1
   at 0x1097BA: strbuf_finish (json_value.c:65)
   by 0x10A3BB: parse_string_raw (json_value.c:387)
   by 0x10A64F: parse_object (json_value.c:476)
   by 0x10A877: parse_value (json_value.c:529)
   by 0x10A9C9: json_parse (json_value.c:557)
   by 0x109394: main (main.c:44)
 Address 0x4aa1134 is 0 bytes after a block of size 4 alloc'd
   at 0x484A858: malloc
   by 0x109781: strbuf_finish (json_value.c:62)
```

Memcheck hands over the complete answer in nine lines:

* **what** — an invalid write of one byte;
* **where** — `json_value.c:65`, the terminator assignment;
* **how far out** — `0 bytes after a block of size 4`, i.e. the very first byte past the end;
* **which block** — allocated three lines earlier, at `json_value.c:62`, in the same function.

The allocation and the overflow being three lines apart is what makes this one easy.
When the two stack traces name the same function, the arithmetic between them is the bug.

The block of size 4 is the key `"name"` — the first string in the document, and only the first of many.
Memcheck reports 49 errors from 12 contexts here: the bug fires on every string the parser decodes, and the misplaced terminator is then *read* out of bounds by the `strlen()` and `printf("%s")` calls that use those strings later.
Five of the twelve contexts are the write, seven are reads that followed it.

Comparing the byte totals is a nice confirmation of that: the buggy run allocates 7,735 bytes and the fixed one 7,753.
The difference is 18 bytes, which is 18 strings decoded, one extra byte each.

### Why gdb is the wrong tool here

There is no crash to break on, no wrong value to print, and no variable whose change you could watch — the write goes to memory that belongs to no variable at all.
You can *confirm* the bug in `gdb` once you know where it is, by comparing the requested size against the number of bytes written, but you cannot find it that way.

This is the exact mirror of `01-grade-histogram`, where Valgrind was structurally blind and only `gdb` could help.
Neither tool is the debugger; the pair is.

## References

* `man 3 malloc`, `man 3 memcpy`
* `man 1 valgrind`, and the [Memcheck manual](https://valgrind.org/docs/manual/mc-manual.html)
* [AddressSanitizer](https://github.com/google/sanitizers/wiki/AddressSanitizer)
* [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259) — the JSON grammar this parser implements a subset of
