# Demos

One directory per demo, holding the commands to run and the question to ask about the result.
Nothing else: the sources, the reference output and the explanations live in the [full half of the session](../../02-os-types-interface-full/demos), and there is exactly one copy of each.

Run a demo from its directory over there:

```console
cd ../../02-os-types-interface-full/demos/02-os-interface/syscalls
make
```

| Demo | Shows | Run it live? |
| --- | --- | --- |
| [`00-pitch`](00-pitch) | A bare program runs mostly kernel instructions. | Yes --- the opener |
| [`01-make-os/unikraft`](01-make-os/unikraft) | The smallest OS is still large. | Only if pre-built |
| [`02-os-interface/syscalls`](02-os-interface/syscalls) | Talking to the kernel directly. | Yes --- with `strace` |
| [`02-os-interface/syscall-overhead`](02-os-interface/syscall-overhead) | What a system call costs. | Yes |
| [`03-privileged-domain`](03-privileged-domain) | The boundary is in silicon. | Yes --- also under `sudo` |
| [`04-optimize-os-interface/fwrite`](04-optimize-os-interface/fwrite) | Buffering in user space. | Yes |
| [`04-optimize-os-interface/sendfile`](04-optimize-os-interface/sendfile) | Pushing work into the kernel. | Needs two terminals |

## Before the lecture

```console
cd ../../02-os-types-interface-full/demos
( cd 00-pitch && make )
( cd 02-os-interface/syscalls && make )
( cd 02-os-interface/syscall-overhead && make )
( cd 03-privileged-domain && make )
( cd 04-optimize-os-interface/fwrite && make )
( cd 04-optimize-os-interface/sendfile && make && ./create_file.sh )
```

Needs `gcc`, `make`, `nasm`, `strace`, and `perf` (`sudo`, for the instruction counts).
The Unikraft demo needs its own toolchain; build it ahead of time or show the numbers.
