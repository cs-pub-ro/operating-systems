section .bss
    mybuf: resb 64
    len equ $-mybuf

section .rodata
    gimme_msg: db "Gimme message: ", 0

section .text

global main

main:
    push rbp
    mov rbp, rsp

    ; write(1, "Gimme message: ", 15);
    mov rdx, 15
    mov rsi, gimme_msg
    mov rdi, 1
    ; write syscall
    mov rax, 1
    syscall

    ; read(0, mybuf, 64);
    mov rdx, 64
    mov rsi, mybuf
    mov rdi, 0
    ; read syscall
    mov rax, 0
    syscall

    ; write(1, buffer, len);
    mov rdx, rax
    mov rsi, mybuf
    mov rdi, 1
    ; write syscall
    mov rax, 1
    syscall

    ; exit_group(0)
    xor rdi, rdi
    mov rax, 231
    syscall

    leave
    ret
