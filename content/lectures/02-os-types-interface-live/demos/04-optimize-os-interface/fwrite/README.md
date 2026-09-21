# Demo: Buffering in User Space

The same ten million one-byte writes, once through the C library's buffer and once with the buffer switched off.

## Run

```console
cd ../../../../02-os-types-interface-full/demos/04-optimize-os-interface/fwrite
make
./fwrite_buffered
./fwrite_unbuffered
```

For where the time goes:

```console
sudo perf stat -e instructions ./fwrite_buffered
sudo perf stat -e instructions ./fwrite_unbuffered
```

The only difference in the source is one `setvbuf(..., _IONBF, ...)`.
The unbuffered version is more than twenty times slower.

## Ask

* The output files are identical. Where did the twenty-fold difference go?
* With the buffer on, how many `write` system calls does ten million `fwrite`s make? (`strace -c` will tell you.)
* What did the buffer cost, and why is it the default?
