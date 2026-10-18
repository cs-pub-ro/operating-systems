# Demo: Copy a File Using a Local Buffer

**Tools:** GCC, Make

## Goal

Copy a file through a **local buffer** on the stack, and see that this memory, too, needs no allocation and no release -- and that it is the only one of the four kinds that can simply be too big.

## Background

A buffer declared inside a function:

```C
int main(int argc, char *argv[])
{
	char buffer[BUFFER_SIZE];
	...
}
```

lives in the function's **stack frame**.
The frame is created when the function is entered and dropped when it returns; the buffer comes and goes with it, and nothing in the code allocates or frees it.

Where the global buffer belongs to the process, the local one belongs to a call.
That makes it the natural choice for scratch space a function needs only while it runs -- with one constraint the other variants do not have.
The stack has a fixed limit, 8 MiB by default:

```console
ulimit -s
```

Every frame of every active function shares it, so a single large local array can take most of it, and a slightly larger one overflows it.

## Build & Run

```console
make
dd if=/dev/urandom of=input.bin bs=1M count=4
./copy_file input.bin output.bin
diff input.bin output.bin && echo "Files are identical"
make clean
```

## Results and Explanations

### Step 1 -- the local buffer

```C
unsigned char buffer[BUFFER_SIZE];
```

Compare `size` with the global-buffer variant:

```text
$ size copy_file
   text    data     bss     dec     hex filename
   3036     672      16    3724     e8c copy_file
```

The megabyte is gone from the executable entirely.
The buffer is created at run time, by moving the stack pointer when `main()` is entered -- a single subtraction, the cheapest allocation there is -- and the stack area grows to hold it as the pages are touched.

### Step 2 -- writing

The write and its short-write check are the same as in the global-buffer variant, and so is the cleanup: the `fail_dst` and `fail_src` labels, two `fclose()` calls, nothing else.

### Where the stack runs out

Change `BUFFER_SIZE` to `16 * 1024 * 1024`, rebuild, and run:

```text
$ ./copy_file input.bin output.bin
Segmentation fault (core dumped)
```

A 16 MiB frame does not fit in an 8 MiB stack.
The crash is immediate, on the first touch of the buffer, and nothing in the source says why: there is no return value to check, because nothing was called.
`ulimit -s unlimited` makes the program work again, which is how you confirm the diagnosis -- not how you fix it.
Large buffers belong in one of the other three places.

## References

* `man 3 fread`, `man 3 fwrite`
* `ulimit -s`, and `man 2 getrlimit` -- `RLIMIT_STACK`
* `man 1 size`
