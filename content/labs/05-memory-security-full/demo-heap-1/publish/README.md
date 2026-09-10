# Publish

Packages the challenge artifacts (demo-heap-1) for distribution to players.

## Prerequisites

Build the challenge first (see `../build/README.md`), then copy the artifacts here:

```console
cp ../build/chall ../build/libc.so.6 ../build/ld-linux-x86-64.so.2 .
```

## Creating the distribution archive

```console
docker build -t demo-heap-1-publisher .
docker run --rm -v "$(pwd):/data" demo-heap-1-publisher
```

This produces `demo-heap-1.zip` in this directory, containing the binary and the matching libc/loader.

## Clean

```console
rm -f demo-heap-1.zip
```
