# Memory Security

Memory security is one of the most important aspects in today's computer systems.
Its main objectives are to avoid the development of vulnerable code and prevent attackers from exploiting existing memory vulnerabilities.
Memory protection techniques are implemented at all levels of memory abstraction: hardware, operating system and programming language.
In addition, third-party software tools may be used to statically and dynamically examine a program to identify vulnerabilities when working with memory.

In this section, we will focus on the main memory vulnerabilities and how to exploit them.
We will use the C programming language for presentation purposes, however, these examples may be reproduced in any language that implements arrays as pointers without bounds and allows the liberal use of pointers.

## Wild Pointer Arithmetic Info Leak

In C, once a pointer has been initialized with a valid address it can potentially access any location of the process address space.
This is problematic for situations where the binary contains sensitive information.
Take for example a server that authenticates users: if the password is stored in some buffer, then if a pointer is wrongfully used, it can end up leaking the password.

## ASLR

Address Space Layout Randomization (ASLR) is a protection technique employed by operating systems to make it harder for attackers to identify code locations to jump to.
Essentially, every program section (including shared library code) is mapped at a random virtual address every time the program is run.
That way, it is harder for the attacker to exploit a buffer overflow: the address of a potential code target is different with each run.

To enable randomization, there are 2 steps that need to be taken:

1. Enable ASLR on the operating system.
This enables the operating system to map library code at different virtual addresses in a program.

1. Compile our code as Position Independent Code (PIC).
This instructs the compiler to generate code such that it does not use absolute addresses when calling functions or accessing variables.
As a consequence, the code may be loaded at any given address in memory.

On most Linux systems, ASLR is enabled by default.
Modern compilers generate position independent code by default.

## Stack Protector

As observed in the previous quiz, ASLR prevents an attacker (most of the times) from discovering a reliable address where to jump to, however, it does not prevent the occurrence of a buffer overflow.
An effective strategy to protect against buffer overflow is represented by the stack protector (or stack canary).
Between the end of the buffer and the return address (below the saved base pointer `rbp`), a random value is placed on the stack.
Before the function returns, the value is checked: if the initial value was modified, then an exception is issued and the program is aborted.

Stack canaries are enabled by default, however, for learning purposes we have disabled it by passing `-fno-stack-protector` to the compiler.

## Bypassing the Stack Protector

The stack protector is generally placed immediately after the old `rbp`.
With this information we can craft various exploits to bypass it:

- Leak the canary and do not modify it.
Reading the canary, as long as we do not modify it is not going to cause any disturbances.
If we have the canary, we can just include it in our payload and happily overwrite the return address.

- If we have access to a pointer that we can modify appropriately, we can just jump over the canary and directly modify the return address.

- In case we have multiple buffers defined in the same stack frame, we can simply overwrite data in a buffer that is placed above the buffer we are exploiting without the stack protector intervention.
