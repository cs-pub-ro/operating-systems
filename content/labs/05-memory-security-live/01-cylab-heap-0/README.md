# Exercise: Overflow a Heap Buffer (heap-0)

**Tools:** GDB, pwntools

Are overflows just a stack concern?

## Goal

Overflow a heap buffer to corrupt an adjacent "safe" variable you are never given a way to write to, and read out the flag.

The service is deployed at `141.85.224.106:31010`.

## Background

The program keeps two heap allocations: `input_data`, which you can write to through the menu, and `safe_var`, which the author believes is out of reach.
`safe_var` starts out as `"bico"`, and nothing in the program ever changes it — the win condition fires as soon as it is *anything else*.

The write path uses `scanf("%s", input_data)`, which stops at whitespace, not at the size of the buffer.

## Your Task

1. Run the binary and use *Print Heap* to read the addresses of `input_data` and `safe_var`.
   The distance between them is how far you have to write.
1. Write a payload that fills `input_data`'s chunk and spills into `safe_var`.
1. Trigger *Print Flag* and capture the flag — locally first, then against the remote service your teaching assistant provides.

Automating this with [pwntools](https://docs.pwntools.com/) will make the later challenges much easier, so start as you mean to go on.

## Build & Run

```console
./chall
```

It reads `flag.txt` from the current directory; create a placeholder to test locally.
Point your exploit at the deployment with `nc 141.85.224.106 31010`, or from pwntools with `remote("141.85.224.106", 31010)`.

## Check Your Work

You have solved it when the program prints the flag instead of "everything is still secure".
Work out the overflow distance from the two printed addresses rather than by trial and error, and be ready to explain to the teaching assistant why it is larger than the 5 bytes the program asked `malloc` for.

Submit the flag:

- Link SO CTF: https://ctf.security.cs.pub.ro/so/challenges#01-cylab-heap-0-3
- Link CyLab Academy: <https://learn.cylabacademy.org/library/438>
