# Exercise: Overflow a Heap Buffer (heap-0)

**Tools:** nc, GDB, pwntools

## Goal

Overflow a heap buffer to change a "safe" variable the program never lets you write to, and read out the flag.

## Background

The program puts two buffers on the heap, next to each other.

* `input_data` — you can write to this one through the menu.
* `safe_var` — the author thinks you cannot touch this one.

`safe_var` starts out as `"bico"`.
Nothing in the program ever changes it.
You win the moment `safe_var` is anything other than `"bico"`.

The catch is the write path: it uses `scanf("%s", input_data)`, which keeps writing until it sees whitespace, not until the buffer is full.
Write enough and your input runs off the end of `input_data` and into `safe_var`.

## Your Task

1. Run the program and choose *Print Heap*. It prints the address of `input_data` and the address of `safe_var`.
1. Subtract the two addresses. That difference is how many bytes you must write before you start overwriting `safe_var`.
   (It is larger than the demo's 32 — measure it, do not assume.)
1. Choose *Write to buffer* and send that many filler bytes followed by a few more.
1. Choose *Print Flag*. Do it locally first, then against the deployed service.

## Build & Run

Locally, a placeholder `flag.txt` is included so you can test right away:

```console
./chall
```

Against the deployed service, type the same menu choices into netcat:

```console
nc 141.85.224.106 31010
```

## Check Your Work

You have solved it when the program prints the flag instead of "everything is still secure".
Work the overflow distance out from the two printed addresses, not by trial and error, and be ready to explain to the teaching assistant why it is larger than the bytes the program asked `malloc` for.

Submit the flag: <https://ctf.security.cs.pub.ro/so>
