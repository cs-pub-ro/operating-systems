# Deploy

Deployment configuration for the "heap-havoc" challenge.
Uses `xinetd` inside a Docker container to serve the challenge over TCP.

## Prerequisites

Ensure `../publish/` contains `chall`, `libc.so.6`, and `ld-linux.so.2` (see `../build/README.md` and `../publish/README.md`), and that `../flag` exists (the flag file for this challenge).

## Building the image

The build context must be the parent directory (`..`), so files from `publish/`, `deploy/`, and the `flag` file can all be copied in:

```console
docker build -t heap-havoc-deploy -f Dockerfile ..
```

## Running the container

```console
docker run -d --rm -p 31020:31337 --name heap-havoc-container heap-havoc-deploy
```

The challenge is now reachable at `localhost:31020`:

```console
nc localhost 31020
```

## Stopping the container

```console
docker stop heap-havoc-container
```
