# Build

Source code and build environment for the "heap3" challenge.

## Building

Build the builder image, then run it against this directory (mounted so the compiled binary is written back to your host machine):

```console
docker build -t heap3-builder .
docker run --rm -v "$(pwd):/build" heap3-builder make
```

This produces `chall`, `libc.so.6`, and `ld-linux-x86-64.so.2` in this directory -- the binary and the exact libc/loader it was built and tested against.
Shipping the matching libc/loader matters here: this challenge is a heap exploit, and heap chunk layout depends on the specific glibc allocator implementation.

## Post-build

Copy the artifacts to `publish/`:

```console
cp chall libc.so.6 ld-linux-x86-64.so.2 ../publish/
```

## Clean

```console
docker run --rm -v "$(pwd):/build" heap3-builder make clean
```
