# Deploy

Deployment configuration for the "heap2" challenge.
Uses `xinetd` inside a Docker container to serve the challenge over TCP.

## Prerequisites

Ensure `../publish/` contains `chall`, `libc.so.6`, and `ld-linux-x86-64.so.2` (see `../build/README.md` and `../publish/README.md`), and that `../flag` exists (the flag file for this challenge).

## Building the image

The build context must be the parent directory (`..`), so files from `publish/`, `deploy/`, and the `flag` file can all be copied in:

```console
docker build -t heap2-deploy -f Dockerfile ..
```

## Running the container

```console
docker run -d --rm -p 31012:31337 --name heap2-container heap2-deploy
```

The challenge is now reachable at `localhost:31012`:

```console
nc localhost 31012
```

## Stopping the container

```console
docker stop heap2-container
```
