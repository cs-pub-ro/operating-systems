# Preparing the Challenge: heap-mayhem

How this challenge is built, packaged, deployed, and solved.
The solving write-up is in [`README.md`](README.md).

This challenge is four Docker stages, each with its own README.
Docker is the only requirement; no host compiler, Python or pwntools install is needed.

## Stages

* [`build/`](build/README.md) — compiles `chall.c` in a reproducible Debian image and copies out the exact `libc.so.6` and loader it linked against. This binary is built as a **PIE** (the default), on purpose: it is the one challenge that keeps ASLR in play.
* [`publish/`](publish/README.md) — zips the binary and its libc/loader into the archive players receive.
* [`deploy/`](deploy/README.md) — serves the binary under `xinetd` in a container, on host port **31021**, with ASLR left enabled.
* [`solve/`](solve/README.md) — runs the reference `exploit.py` locally, against a local deployment, or against a remote target. This stage ships **only** `exploit.py`: the exploit must leak and compute an address at runtime, so there is no shell-script or by-hand form. The binary must be present so the exploit can read the two symbol offsets.

## Quick start

```console
# build
cd build && docker build -t heap-mayhem-builder . && \
    docker run --rm -v "$(pwd):/build" heap-mayhem-builder make && cd ..
cp build/chall build/libc.so.6 build/ld-linux-x86-64.so.2 publish/

# deploy (serves on localhost:31021)
docker build -t heap-mayhem-deploy -f deploy/Dockerfile .
docker run -d --rm -p 31021:31337 --name heap-mayhem-container heap-mayhem-deploy

# check
nc localhost 31021
```

The `flag` file in this directory is copied into the container as `flag.txt` at deploy time; the binary reads it with `fopen("flag.txt", ...)` from its working directory.
Follow the four stage READMEs in order for the full detail.
