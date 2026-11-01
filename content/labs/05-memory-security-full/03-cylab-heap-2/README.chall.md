# Preparing the Challenge: 03-cylab-heap-2

How this challenge is built, packaged, deployed, and solved.
The solving write-up is in [`README.md`](README.md).

This challenge, like every other in the session, is four Docker stages, each with its own README.
Docker is the only requirement; no host compiler, Python or pwntools install is needed.

## Stages

* [`build/`](build/README.md) — compiles `chall.c` in a reproducible Debian image (with `-no-pie`, so `win()`'s address is a stable constant) and copies out the exact `libc.so.6` and loader it linked against.
* [`publish/`](publish/README.md) — zips the binary and its libc/loader into the archive players receive.
* [`deploy/`](deploy/README.md) — serves the binary under `xinetd` in a container, on host port **31012**.
* [`solve/`](solve/README.md) — runs the reference solution (`solve.sh` or `exploit.py`) locally, against a local deployment, or against a remote target.

## Quick start

```console
# build
cd build && docker build -t 03-cylab-heap-2-builder . && \
    docker run --rm -v "$(pwd):/build" 03-cylab-heap-2-builder make && cd ..
cp build/chall build/libc.so.6 build/ld-linux-x86-64.so.2 publish/

# deploy (serves on localhost:31012)
docker build -t 03-cylab-heap-2-deploy -f deploy/Dockerfile .
docker run -d --rm -p 31012:31337 --name 03-cylab-heap-2-container 03-cylab-heap-2-deploy

# check
nc localhost 31012
```

The `flag` file in this directory is copied into the container as `flag.txt` at deploy time; the binary reads it with `fopen("flag.txt", ...)` from its working directory.
Follow the four stage READMEs in order for the full detail.
