# Publish

Packages the challenge artifacts (heap-havoc) for distribution to players.

## Prerequisites

Build the challenge first (see `../build/README.md`), then copy the artifacts here:

```console
cp ../build/chall ../build/libc.so.6 ../build/ld-linux.so.2 .
```

## Creating the distribution archive

```console
docker build -t heap-havoc-publisher .
docker run --rm -v "$(pwd):/data" heap-havoc-publisher
```

This produces `heap-havoc.zip` in this directory, containing the binary and the matching libc/loader.

## Clean

```console
rm -f heap-havoc.zip
```
