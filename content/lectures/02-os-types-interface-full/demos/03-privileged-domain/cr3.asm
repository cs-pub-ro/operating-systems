section .rodata
    first: db "first", 10, 0
    second: db "second", 10, 0

section .text

global main

main:
    push rbp
    mov rbp, rsp

    ; write(1, "first\n", 6);
    mov rdx, 6
    mov rsi, first
    mov rdi, 1
    ; write syscall
    mov rax, 1
    syscall

    mov rax, cr3

    ; write(1, "second\n", 7);
    mov rdx, 7
    mov rsi, second
    mov rdi, 1
    ; write syscall
    mov rax, 1
    syscall

    leave
    ret
