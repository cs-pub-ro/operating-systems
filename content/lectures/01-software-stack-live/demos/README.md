# Demos

One directory per demo, holding the commands to run and the question to ask about the result.
Nothing else: the sources, the reference output and the explanations live in the [full half of the session](../../01-software-stack-full/demos), and there is exactly one copy of each.

Run a demo from its directory over there:

```console
cd ../../01-software-stack-full/demos/00-pitch/01-copy-string
make
```

| Demo | Shows | Run it live? |
| --- | --- | --- |
| [`00-pitch/01-copy-string`](00-pitch/01-copy-string) | The same string built two ways, thirty times apart. | Yes |
| [`00-pitch/02-const-char-init`](00-pitch/02-const-char-init) | One character between running and crashing. | If there is time |
| [`00-pitch/03-find-buffer-cache`](00-pitch/03-find-buffer-cache) | The same command, fifteen times faster on the second run. | Yes |
| [`00-pitch/04-python-string-edit`](00-pitch/04-python-string-edit) | An assignment that does nothing, and changes the complexity. | Show the table |
| [`02-software-stack`](02-software-stack) | The same message from five heights, counted in system calls. | Yes |
| [`04-versus`](04-versus) | What a security guarantee costs. | Yes |
| [`06-software-interaction`](06-software-interaction) | Four containers, three protocols, one web page. | Only if already up |

## Before the lecture

```console
cd ../../01-software-stack-full/demos
( cd 00-pitch/01-copy-string && make )
( cd 00-pitch/02-const-char-init && make )
( cd 02-software-stack && make )
( cd 04-versus && make )
```

Needs `gcc`, `g++`, `make`, `nasm`, `strace`, `python3`, `/usr/bin/time` and the OpenSSL development files.
