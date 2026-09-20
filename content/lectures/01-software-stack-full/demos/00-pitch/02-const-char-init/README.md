# Demo: `char *str` and `char str[]` Are Not the Same Declaration

Two programs differ in one character.
One prints two lines and exits; the other prints one line and dies with a segmentation fault.

## Goal

Show that a declaration is not only a statement about types: it also decides *where* the bytes live, and where they live decides whether they can be written.

## Background

Both programs start from the same literal:

```c
char *str = "*Hello!";	/* char-ptr-init.c */
char str[] = "*Hello!";	/* char-array-init.c */
```

The first declares a pointer and points it at the string literal, which the compiler has placed among the program's constants.
The second declares an array of eight characters, local to `main()`, and *copies* the literal into it at run time.

Then both programs do the same thing: write to `str[0]`.

## Build and run

```console
make
./char-array-init
./char-ptr-init
```

## Results and explanations

```text
$ ./char-array-init
str is '*Hello!', str+1 is 'Hello!'
str+1 is 'Hello!'

$ ./char-ptr-init
str is '*Hello!', str+1 is 'Hello!'
Segmentation fault (core dumped)
```

Note that the first line is identical.
Reading works in both; only the write differs, and it differs by crashing.

The evidence is in the binaries.
In `char-ptr-init`, the literal is stored in the `.rodata` section:

```console
$ objdump -s -j .rodata char-ptr-init
Contents of section .rodata:
 2000 01000200 2a48656c 6c6f2100 73747220  ....*Hello!.str
 ...
```

and `.rodata` is mapped by a program segment whose flags say `R`, read but not write:

```console
$ readelf -lW char-ptr-init
  Type           Offset   VirtAddr           ...  Flg Align
  LOAD           0x000000 0x0000000000000000 ...  R   0x1000
  LOAD           0x001000 0x0000000000001000 ...  R E 0x1000
  LOAD           0x002000 0x0000000000002000 ...  R   0x1000
  LOAD           0x002db0 0x0000000000003db0 ...  RW  0x1000
```

In `char-array-init`, there is no pointer into the constants at all.
The compiler turns the initialisation into a single store of the eight bytes onto the stack:

```console
$ objdump -d --no-show-raw-insn char-array-init
...
    11a4:	movabs $0x216f6c6c65482a,%rax
    11ae:	mov    %rax,-0x10(%rbp)
```

`0x216f6c6c65482a` is `*Hello!` plus its terminating NUL, read backwards because x86 is little-endian.
The stack is writable, so the write to `str[0]` succeeds.

Three layers had to agree for this to happen, and none of them is C:

1. The **compiler** decided that a string literal belongs in a read-only section.
1. The **linker** collected `.rodata` into a segment marked read-only.
1. The **kernel**, when it mapped the executable at `execve()` time, honoured that flag in the page tables, so the hardware itself refuses the store and raises a fault, which the kernel turns into `SIGSEGV`.

The C standard says only that modifying a string literal is undefined behaviour.
Everything about *how* the undefined behaviour shows up -- a fault rather than a silently corrupted constant -- comes from the layers below.

## Going further

* Add `const` where it belongs: `const char *str = "*Hello!";` makes the compiler reject the write instead of the hardware.
  This is the version you should be writing.
* Compile `char-ptr-init.c` with `gcc -Wwrite-strings` and read the warning.
* Try `char str[] = "*Hello!";` at file scope instead of inside `main()`, and look at which section it lands in with `objdump -t`.
  It is still writable, but it is no longer on the stack.
* Two identical literals in the same program may share storage, because they are constants.
  Print `"*Hello!" == "*Hello!"` and see.

## References

* `man 1 objdump`, `man 1 readelf`
* [ELF program headers](https://man7.org/linux/man-pages/man5/elf.5.html) -- the `p_flags` field is the `R`/`W`/`E` column above
</content>
