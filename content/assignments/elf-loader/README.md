# ELF Loader Assignment

## Objecives

* Practice working with virtual memory, memory protection, and manual relocation.
* Understand the difference between different types of executables, like PIE, non-PIE, statically-linked, etc.
* Understand the stack layout expected by an executable, environment variables, auxiliary vector, command-line arguments, etc.

## Statement

Implement a custom minimal ELF loader, capabale of loading and executing statically linked binaries in Linux.

Your loader must eventually support:

* Minimal static binaries that make direct Linux syscalls (without libc)
* Statically linked **non-PIE** C programs using `libc`
* Statically linked **PIE** executables

## Support Code

The support code consists of three directories:

* `src/` where you will create your sollution
* `test/` contains the test suite and a bash script to verify your work

The test suite consists of source code files (`.c` and `.asm`), that will be compiled and then executed using your loader.
You can use the `Makefile` to compile all test files.

## Implementation

The assignment is split into **4 graded parts**, totaling **90 points** (10 points are given by the linter):

### 1. ELF header validation (**10 points**)

**Goal:** Before loading the ELF file, check if it is a valid, 64-bit ELF.
You must check for 2 cases:

* Check the [ELF magic](https://unix.stackexchange.com/questions/153352/what-is-elf-magic), defined [here](https://chromium.googlesource.com/external/elfutils/+/dts-0.168/libelf/elf.h#120).
* Check the [ELF class](https://chromium.googlesource.com/external/elfutils/+/dts-0.168/libelf/elf.h#123), it should be `ELFCLASS64`.

In case any of the items above are wrong, print one of the following messages and exit with the corresponding error code:

`Not a valid ELF file`, exit with code 3.

or

`Not a 64-bit ELF`, exit with code 4.

### 2. Minimal loader for syscall-only binaries (**10 points**)

**Goal:** Make the loader work with extremely minimal ELF binaries (usually written in assembly) that make direct syscalls and do not use libc.

* All memory segments can be loaded with `RWX` permissions.
* No need to set up `argv`, `envp`, or auxiliary vectors.
* These binaries call syscall instructions directly, so `libc` is not used.

For this task, you will need to:

* Open the file and map it somewhere in the memory
* Pass through the section headers, and for the `PT_LOAD` sections create new memory regions (they can have RWX permissions for now), then copy the section from the file into the newly created memory region.
* Pass the execution to the new ELF, by jumping to the entry point.

**Examples/Resources:**

* [ELF Specification](https://refspecs.linuxbase.org/elf/gabi4+/ch5.pheader.html)
* [OSDev](https://wiki.osdev.org/ELF)

### 3. Load memory regions with correct permissions (**10 points**)

**Goal:** Instead of RWX, check the memory protection flags (`PF_R`, `PF_W`, `PF_X`) from the ELF `Program Headers`.

* Use `mprotect()` or map with the correct permissions directly using `mmap()`.

**Key Concepts:**

* `PT_LOAD` program headers contain `p_flags` to specify memory permissions.
* These must be respected to mimic the kernel loader.
* [ELF Specification](https://refspecs.linuxbase.org/elf/gabi4+/ch5.pheader.html)

### 4. Support static non-PIE binaries with libc (**30 points**)

**Goal:** Load and run statically linked **non-PIE** C binaries compiled with libc (e.g., via `gcc -static`).

* Must set up a valid process **stack**, including:

  * `argc`, `argv`, `envp`
  * `auxv` vector (with entries like `AT_PHDR`, `AT_PHENT`, `AT_PHNUM`, etc.)

For this, you need to map a new memory region, that will become the new stack, then copy all the required information there.

The executable expects the stack layout as seen in the figure below:

![Stack Layout](./img/stack-layout.drawio.svg)

You can see more details about the stack [here](https://lwn.net/Articles/631631/).

You will have to reserve a memory region large enough for the stack (you can use the maximum allowed stack size, using `getrlimit`, or you can use a hardcoded value large enough to fit everything).
After that, you need to copy the argc, argv and envp in the expected layout, then set up the auxv.

**Note:** `argv` and `envp`, since they consist of strings, will be placed as the **pointer to the string** on the stack, not the string itself.
**Note:** Make sure the mapped regions have the correct length, **be careful of the difference between `p_filesz` and `p_memsz`**.

#### argc, argv (5 points out of 30)

The command-line arguments must be placed first at the top of the stack, as seen in the picture above.
The loader can be used as `./elf_loader ./no-pie-exec arg1 arg2 arg3`.
`arg1`, `arg2` and `arg3` must be placed on the stack for the loaded executable.
`argc` will be also placed on the at the top of the stack.

#### envp (5 points out of 30)

The environment variables should be placed after the command-line arguments.
For this, you just have to copy everything from the `char **envp` array and place it on the stack.

#### auxv (10 points out of 30)

The auxiliary vector, auxv, is a mechanism for communicating information from the kernel to user space.
It's basically a list of key-value pairs that contains different information about the state of the executable.
You can see the keys and required values of the auxv [in the man pages](https://man7.org/linux/man-pages/man3/getauxval.3.html).
For example, for the key `AT_PAGESZ` (defined as 6 in [elf.h](https://elixir.bootlin.com/glibc/glibc-2.42.9000/source/elf/elf.h#L1205)), that needs to contain the value of the page size, the memory will look as follows:

```text
0xfff......    --> High Addresses
-----------
  4096         # Page Size
   6           # AT_PAGESZ key
-----------
-----------
0x000......    --> Low Addresses
```

The auvx must end with an `AT_NULL` key with a 0 value, so an auxv that sets `AT_PAGESZ`, `AT_UID` and `AT_NULL` will look like this on the stack:

![Auxv Example](./img/auxv-example.drawio.svg)

**Note:** Beware of the `AT_RANDOM` entry, the application will crash if you do not set it up properly.

**Docs:**

* [How programs get run: ELF binaries](https://lwn.net/Articles/631631/) (See section: `Populating the stack`)
* [auxv man page](https://man7.org/linux/man-pages/man3/getauxval.3.html)

### 5. Support static PIE executables (**30 points**)

**Goal:** Make your loader support static **PIE (Position Independent Executable)** binaries.

* ELF type will be `ET_DYN`, and segments must be mapped at a **random base address**.
* Entry point and memory segment virtual addresses must be adjusted by the `load_base`.

**Additional Requirements:**

* Must still build a valid stack (`argc`, `argv`, `auxv`, etc.)
* Handle relocation of entry point and program headers correctly.

You will need to load all the segments relative to a random base address
Beware of the auxv entries, some of them will need to be adjusted to the offset.

**Docs:**

* [What is a PIE binary?](https://eli.thegreenplace.net/2011/08/25/load-time-relocation-of-shared-libraries)
* [Example ELF Loader](https://0xc0ffee.netlify.app/osdev/22-elf-loader-p2)
* [Another ELF Loader Example](https://www.mgaillard.fr/2021/04/15/load-elf-user-mode.html)

## Debugging

Here are some useful tips and tools to debug your ELF loader:

### General Tips

* **Start simple**: First test with a syscall-only ELF binary (e.g., `write` + `exit`).
* **Use GDB**: Run `gdb ./elf_loader` and set breakpoints in the loader and inside the loaded ELF.
  You can use `add-symbol-file path-to-elf start-address` to debug the libc entry and the elf execution with debugging symbols.
* **Check memory layout**: Print segment addresses and protections. You can use `pmap $(pidof elf-loader)`
* **Use PWNGDB**: Use [`PwnGDB`](https://github.com/pwndbg/pwndbg) or other similar plugins. They provide a lot of help during debugging.

#### Useful Tools

* `readelf -l -h your_binary`
* `objdump -d your_binary`
* `gdb ./elf_loader`
* `pmap $(pidof elf_loader)`

#### Debugging Example

Let's say the `no_pie` test fails with a segmentation fault, with no other messages printed.
In order to debug that, we must run `gdb ./src/elf-loader` and `run ./tests/snippets/no_pie`:

```gdb
$rax   : 0xcc0
$rbx   : 0x1
$rcx   : 0x0000000000427aee  →  0xc7a777fffff0003d ("="?)
$rdx   : 0x0
$rsp   : 0x00007ffff7df6bc0  →  0x0000000000401835  →  0x20ec8348e5894855
$rbp   : 0x00007ffff7df6c00  →  0x0000000000000000
$rsi   : 0x20
$rdi   : 0x0
$rip   : 0x0000000000403e7b  →  0x894864c030028b48
$r8    : 0x0
$r9    : 0x00000000004a8480  →  "glibc.malloc.mxfast"
$r10   : 0x53053053
$r11   : 0x246
$r12   : 0x00007ffff7df6c28  →  0x00007ffff7df7fe8  →  "./tests/snippets/no_pie"
$r13   : 0x0
$r14   : 0x00000000004aa000  →  0x00000000004582f0  →  0xffefc1c5fa1e0ff3
$r15   : 0x00000000004004e8  →  0x0000000000000000
$eflags: [ZERO carry PARITY adjust sign trap INTERRUPT direction overflow RESUME virtualx86 identification]
$cs: 0x33 $ss: 0x2b $ds: 0x00 $es: 0x00 $fs: 0x00 $gs: 0x00
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── stack ────
0x00007ffff7df6bc0│+0x0000: 0x0000000000401835  →  0x20ec8348e5894855    ← $rsp
0x00007ffff7df6bc8│+0x0008: 0x0000000000401710  →  0x8949ed31fa1e0ff3
0x00007ffff7df6bd0│+0x0010: 0x0000000000000000
0x00007ffff7df6bd8│+0x0018: 0x0000000000000002
0x00007ffff7df6be0│+0x0020: 0x00007fffffffda98  →  0x00007fffffffde42  →  "/home/stefan/projects/facultate/asist/elf-loader/a[...]"
0x00007ffff7df6be8│+0x0028: 0x00007fffffffdab0  →  0x00007fffffffdeb0  →  "SHELL=/bin/bash"
0x00007ffff7df6bf0│+0x0030: 0x00007ffff7ff25e8  →  0x00007ffff7f42b60  →  <frame_dummy+0000> endbr64
0x00007ffff7df6bf8│+0x0038: 0x0000000000000001
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── code:x86:64 ────
     0x403e6c                  mov    edi, r13d
     0x403e6f                  call   0x428e80
     0x403e74                  mov    rdx, QWORD PTR [rip+0xa5bcd]        # 0x4a9a48
 →   0x403e7b                  mov    rax, QWORD PTR [rdx]
     0x403e7e                  xor    al, al
     0x403e80                  mov    QWORD PTR fs:0x28, rax
     0x403e89                  cmp    QWORD PTR [rip+0xa60f7], 0x0        # 0x4a9f88
     0x403e91                  je     0x403e9f
     0x403e93                  call   0x0
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "elf-loader", stopped 0x403e7b in ?? (), reason: SIGSEGV
```

Note that during this tutorial we use [`gef`](https://github.com/hugsy/gef), that is almost identical to `pwngdb`.
We advise you to use `pwngdb`, there will be no difference in commands used.

We can see that the program crashes somewhere with no code or debugging symbols attached, so we can assume it is inside the loaded ELF.
To test this, let's break before we jump to the program entry point.

```gdb
$ break elf-loader.c:197 # This is the line for `__asm__ __volatile__`, it will be a different line for you
Breakpoint 1 at 0x7ffff7f437c8: file elf-loader.c, line 197.
$ run ./tests/snippets/no_pie
●→ 0x7ffff7f437c8 <load_and_run+0c3c> mov    rax, QWORD PTR [rbp-0x1d0]
   0x7ffff7f437cf <load_and_run+0c43> mov    rdx, QWORD PTR [rbp-0x190]
   0x7ffff7f437d6 <load_and_run+0c4a> mov    rsp, rax
   0x7ffff7f437d9 <load_and_run+0c4d> xor    rbp, rbp
   0x7ffff7f437dc <load_and_run+0c50> jmp    rdx
   0x7ffff7f437de <load_and_run+0c52> nop
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── source:elf-loader.c+197 ────
    192         *(uint64_t *)sp = argc;
    193
    194         void (*entry)() = base + (void (*)())ehdr->e_entry;
    195
    196         // Transfer control
●→  197         __asm__ __volatile__(
    198                         "mov %0, %%rsp\n"
    199                         "xor %%rbp, %%rbp\n"
    200                         "jmp *%1\n"
    201                         :
    202                         : "r"(sp), "r"(entry)
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "elf-loader", stopped 0x7ffff7f437c8 in load_and_run (), reason: BREAKPOINT
```

Now we do some `ni` to step with every instruction, until we reach some point where no c code is available anymore (after the `jmp rdx`).

```gdb
     0x401707                  pop    rbp
     0x401708                  ret
     0x401709                  nop    DWORD PTR [rax+0x0]
 →   0x401710                  endbr64
     0x401714                  xor    ebp, ebp
     0x401716                  mov    r9, rdx
     0x401719                  pop    rsi
     0x40171a                  mov    rdx, rsp
     0x40171d                  and    rsp, 0xfffffffffffffff0
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── threads ────
[#0] Id 1, Name: "elf-loader", stopped 0x401710 in ?? (), reason: SINGLE STEP
```

We check the mapping of the memory:

```gdb
$ vmmap
[ Legend:  Code | Stack | Heap ]
Start              End                Offset             Perm Path
0x0000000000400000 0x0000000000401000 0x0000000000000000 r--
0x0000000000401000 0x000000000047f000 0x0000000000000000 r-x
0x000000000047f000 0x00000000004a5000 0x0000000000000000 r--
0x00000000004a5000 0x00000000004b2000 0x0000000000000000 rwx
0x00007ffff7600000 0x00007ffff7e00000 0x0000000000000000 rw-
0x00007ffff7e72000 0x00007ffff7f33000 0x0000000000000000 r-- .../elf-loader/assignment-elf-loader/tests/snippets/no_pie
0x00007ffff7f33000 0x00007ffff7f35000 0x0000000000000000 r-- [vvar]
0x00007ffff7f35000 0x00007ffff7f37000 0x0000000000000000 r-- [vvar_vclock]
0x00007ffff7f37000 0x00007ffff7f39000 0x0000000000000000 r-x [vdso]
0x00007ffff7f39000 0x00007ffff7f42000 0x0000000000000000 r-- .../elf-loader/assignment-elf-loader/src/elf-loader
0x00007ffff7f42000 0x00007ffff7fc9000 0x0000000000009000 r-x .../elf-loader/assignment-elf-loader/src/elf-loader
0x00007ffff7fc9000 0x00007ffff7ff2000 0x0000000000090000 r-- .../elf-loader/assignment-elf-loader/src/elf-loader
0x00007ffff7ff2000 0x00007ffff7ff7000 0x00000000000b9000 r-- .../elf-loader/assignment-elf-loader/src/elf-loader
0x00007ffff7ff7000 0x00007ffff7ff9000 0x00000000000be000 rw- .../elf-loader/assignment-elf-loader/src/elf-loader
0x00007ffff7ff9000 0x00007ffff7fff000 0x0000000000000000 rw-
0x00007ffff7fff000 0x00007ffff8021000 0x0000000000000000 rw- [heap]
0x00007ffffffdd000 0x00007ffffffff000 0x0000000000000000 rw- [stack]
0xffffffffff600000 0xffffffffff601000 0x0000000000000000 --x [vsyscall]
```

Our current instruction is at address `0x401710`, which is inside a memory region allocated by `mmap` for the `no_pie` file, we can use `add-symbol-file`.
`add-symbol-file` expects the **start address of the `.text` section**, so let's get that.

```bash
$ readelf -S tests/snippets/no_pie

[...]
  [ 7] .text             PROGBITS         **0000000000401100**  00001100
       000000000007d880  0000000000000000  AX       0     0     64
  [ 8] .fini             PROGBITS         000000000047e980  0007e980
```

The `.text` address is the one placed inside `**`, `0x0000000000401100`.

So, bach to `gdb`:

```gdb
$ add-symbol-file tests/snippets/no_pie 0x0000000000401100
add symbol table from file "tests/snippets/no_pie" at
        .text_addr = 0x401100
Reading symbols from tests/snippets/no_pie...
$  context
...
 →   0x401710 <_start+0000>    endbr64
     0x401714 <_start+0004>    xor    ebp, ebp
     0x401716 <_start+0006>    mov    r9, rdx
     0x401719 <_start+0009>    pop    rsi
...
```

Now we can see where we are in the code of `no_pie`, the `_start` function.
Let's see where it crashes:

```gdb
     0x403e74 <__libc_start_main_impl+0144> mov    rdx, QWORD PTR [rip+0xa5bcd]        # 0x4a9a48 <_dl_random+139145856>
 →   0x403e7b <__libc_start_main_impl+014b> mov    rax, QWORD PTR [rdx]
     0x403e7e <__libc_start_main_impl+014e> xor    al, al
     0x403e80 <__libc_start_main_impl+0150> mov    QWORD PTR fs:0x28, rax
```

**Note:** If the application crashes in the `__libc_start_main_impl` function, it's most likely because of the stack (`AUXV` values), or the memory layout (make sure the mapped regions have the correct length, **be careful of the difference between `p_filesz` and `p_memsz`**).

In our case, we can see the `rdx` register, that is dereferenced, is 0.
We can also see on the instruction above, that `rdx` is set to `_dl_random+139145856`.

The name of `_dl_random` suggests something to do with `auxv[AT_RANDOM]`.
Also, if we look into the libc source code (you are not required to do this, you should be able to solve all the issues using gdb, but sometimes looking at the source code helps), `_dl_random` [is actually set to `auxv[AT_RANDOM]`](https://elixir.bootlin.com/glibc/glibc-2.42.9000/source/sysdeps/unix/sysv/linux/dl-parse_auxv.h#L55).
We did not set the `AT_RANDOM` value in our loader, so it's `NULL`, which is why it will crash with a `SEGV`.

We set the `AT_RANDOM` value to a memory region pointing to random data, as the [man page](https://man7.org/linux/man-pages/man3/getauxval.3.html) says, the crash disappears, and the `no_pie` elf is loaded properly.

## Running the Checker

In order to check the assignment in an environment as similar to the one on Gitlab CI, you can run the checker, including linters with:

```console
student@so:~/.../assignments/elf-loader$ ./local.sh checker
```

## Compilation Tips

To start the testing, run `make check` in the `tests/` directory.
You can modify the source files in `tests/snippets` and try different things.
To run the loader manually, use `./elf-loader ../tests/snippets/<test-name> arg1 arg2 ...`.
