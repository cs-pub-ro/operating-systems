# Solve

Solution script and a containerized solver environment for the "demo-heap-1" challenge.

## Prerequisites

1. Build the solver image:

   ```console
   docker build -t demo-heap-1-solver .
   ```

1. Ensure `../publish/chall` exists (for local solving) -- see `../build/README.md` and `../publish/README.md`.

## Running the solution

### 1. Local solve (inside container)

Runs the exploit against the binary directly inside the solver container.
We mount the current directory (for `exploit.py`) and `../publish` (for `chall` and its libc/loader).

```console
docker run --rm -it \
    -v "$(pwd):/solve" \
    -v "$(pwd)/../publish:/publish" \
    -w /publish \
    demo-heap-1-solver \
    python3 /solve/exploit.py
```

### 2. Solve against a local deployment

Runs the exploit against the challenge service started via `../deploy/README.md` (listening on `localhost:31001`).

> [!NOTE] **Linux:** `--network host` lets the container reach `localhost` on the host directly. **macOS/Windows:** use `host.docker.internal` instead of `127.0.0.1` and drop `--network host`.

```console
docker run --rm -it --network host \
    -v "$(pwd):/solve" \
    demo-heap-1-solver \
    python3 /solve/exploit.py REMOTE HOST=127.0.0.1 PORT=31001
```

### 3. Solve against a remote target

```console
docker run --rm -it \
    -v "$(pwd):/solve" \
    demo-heap-1-solver \
    python3 /solve/exploit.py REMOTE HOST=1.2.3.4 PORT=31001
```
