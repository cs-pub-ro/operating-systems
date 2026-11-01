# Preparing the Challenge: bonus-cylab-heap-havoc

How this challenge is built, packaged, deployed, and solved.
The solving write-up is in [`README.md`](README.md).

This challenge is **32-bit**, but the pipeline is the same four Docker stages as the rest of the session, each with its own README.
Docker is the only requirement; no host-side 32-bit toolchain is needed.

## Stages

* [`build/`](build/README.md) — compiles `chall.c` as a 32-bit, non-PIE binary in a Debian image that installs `gcc-multilib`, and copies out the matching 32-bit `libc.so.6` and `ld-linux.so.2` from `/usr/lib32`.
* [`publish/`](publish/README.md) — zips the binary and its 32-bit libc/loader into the archive players receive.
* [`deploy/`](deploy/README.md) — serves the binary under `xinetd` on host port **31020**, through a wrapper that reads two lines from the connection and re-execs the binary with them as `argv[1]`/`argv[2]` (a socket carries no `argv`).
* [`solve/`](solve/README.md) — runs the reference solution (`solve.sh` or `exploit.py`) locally, against a local deployment, or against a remote target.

## Quick start

```console
# build (32-bit)
cd build && docker build -t heap-havoc-builder . && \
    docker run --rm -v "$(pwd):/build" heap-havoc-builder make && cd ..
cp build/chall build/libc.so.6 build/ld-linux.so.2 publish/

# deploy (serves on localhost:31020)
docker build -t heap-havoc-deploy -f deploy/Dockerfile .
docker run -d --rm -p 31020:31337 --name heap-havoc-container heap-havoc-deploy

# check -- send two lines (name1, name2)
nc localhost 31020
```

The `flag` file in this directory is copied into the container as `flag.txt` at deploy time; the binary reads it with `fopen("flag.txt", ...)` from its working directory.
Follow the four stage READMEs in order for the full detail.
