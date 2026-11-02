# Demo: The Instruction Pointer and the Stack Pointer

Two groups of threads, running two different functions, each printing the two pointers that define it.
Threads in the same function share an instruction pointer; every thread has a stack pointer of its own.

## Goal

See that a thread is an instruction pointer and a stack pointer: threads running the same code share the first, and every thread has its own second.

## Background

A thread's execution is defined by where it is in the code, the instruction pointer (IP), and where its call chain lives, the stack pointer (SP).
`ip_sp.c` creates three threads running `thread_sleep1()` and three running `thread_sleep2()`, and each prints its `pthread_self()` id, the address of the instruction it is at, and the address of a local variable, which is on its stack.

The IP is read with a one-line inline assembly that loads the current instruction address (`lea`); the SP is approximated by the address of a local variable.

## Build and run

```console
make
./ip_sp
```

The threads sleep, so there is time to look; it ends on its own.

## Results and explanations

```text
[thread 129133308802752] IP: 0x40127d, SP: 0x757230ffedec
[thread 129133300410048] IP: 0x40127d, SP: 0x7572307fddec
[thread 129133292017344] IP: 0x40127d, SP: 0x75722fffcdec
[thread 129133283624640] IP: 0x4012f6, SP: 0x75722f7fbdec
[thread 129133275231936] IP: 0x4012f6, SP: 0x75722effadec
[thread 129133266839232] IP: 0x4012f6, SP: 0x75722e7f9dec
```

The three threads running `thread_sleep1()` report the same IP, `0x40127d`; the three running `thread_sleep2()` report `0x4012f6`.
`nm` confirms the two addresses are inside the two functions:

```text
$ nm ip_sp | grep ' t thread'
0000000000401256 t thread_sleep1
00000000004012cf t thread_sleep2
```

Same function, same instruction pointer: the threads share the code.
Every SP is different, and the values are about 8 MB apart, one default stack size: each thread has its own stack.

## Going further

* Give the two functions the same body and the IPs still differ, because each function is compiled to its own address; the IP names the *code*, not what it does.
* Print `&arg` as well as the local: it too is on the thread's stack, a different one per thread.

## References

* `man 3 pthread_self`, `man 3 pthread_create`
