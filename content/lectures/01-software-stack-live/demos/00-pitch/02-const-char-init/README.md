# Demo: `char *str` and `char str[]`

The same literal, two declarations, one crash.

## Run

```console
cd ../../../../01-software-stack-full/demos/00-pitch/02-const-char-init
make
./char-array-init
./char-ptr-init
```

Then show where the bytes are:

```console
objdump -s -j .rodata char-ptr-init
readelf -lW char-ptr-init | head
objdump -d --no-show-raw-insn char-array-init | grep movabs
```

## Ask

* The first line of output is identical in both. Only the write differs. Why?
* Which layer refuses the write: the compiler, the linker, the kernel, or the hardware?
* What does adding `const` change, and at what point?
