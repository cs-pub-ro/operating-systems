# Preparing the Challenge: demo-heap-0

How this challenge is built, packaged, deployed, and solved.
The solving write-up is in [`README.md`](README.md).

This challenge, like every other in the session, is four Docker stages, each with its own README.
Docker is the only requirement; no host compiler, Python or pwntools install is needed.

## Stages

* [`build/`](build/README) — compiles `chall.c` in a reproducible Debian image and copies out the exact `libc.so.6` and loader it linked against. Heap layout is a glibc detail, so the matching libc ships with the binary.
* [`publish/`](publish/README) — zips the binary and its libc/loader into the archive players receive.
* [`deploy/`](deploy/README) — serves the binary under `xinetd` in a container, on host port **31000**.
* [`solve/`](solve/README) — runs the reference solution (`solve.sh` or `exploit.py`) locally, against a local deployment, or against a remote target.

## Quick start

```console
# build
cd build && docker build -t demo-heap-0-builder . && \
    docker run --rm -v "$(pwd):/build" demo-heap-0-builder make && cd ..
cp build/chall build/libc.so.6 build/ld-linux-x86-64.so.2 publish/

# deploy (serves on localhost:31000)
docker build -t demo-heap-0-deploy -f deploy/Dockerfile .
docker run -d --rm -p 31000:31337 --name demo-heap-0-container demo-heap-0-deploy

# check
nc localhost 31000
```

The `flag` file in this directory is copied into the container as `flag.txt` at deploy time; the binary reads it with `fopen("flag.txt", ...)` from its working directory.
Follow the four stage READMEs in order for the full detail.
