section .rodata

hello db "Hello, World!", 10, 0

section .text

global main

main:
    push rbp
    mov rbp, rsp

    ; write(1, "Hello, World!\n", 14);
    mov rdx, 14
    mov rsi, hello
    mov rdi, 1
    ; write syscall
    mov rax, 1
    syscall

    leave
    ret
