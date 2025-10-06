; SPDX-License-Identifier: BSD-3-Clause

section .bss

    buffer resb 128
    len equ 128

section .data

    ; Structure to hold 2 seconds and 0 nanoseconds
    timespec:
        dq 2              ; 2 seconds
        dq 0              ; 0 nanoseconds

section .rodata

    hello db "Hello, world!", 10, 0
    bye db "Bye, world!", 10, 0

section .text

global main

main:
    push rbp
    mov rbp, rsp

    ; TODO 11: print "Hello, world!"
    ; Call write(1, "Hello, world!\n", 14).
    ; rax <- __NR_write (index of write syscall: 1)
    ; rdi <- first syscall argument (fd: 1)
    ; rsi <- second syscall argument (buffer: hello)
    ; rdx <- third syscall argument (length: 14)
    mov rdi, 1
    mov rsi, hello
    mov rdx, 14
    mov rax, 1
    syscall


    ; TODO 11: print "Bye, world!"
    ; Call write(1, "Bye, world!\n", 12).
    ; rax <- __NR_write (index of write syscall: 1)
    ; rdi <- first syscall argument (fd: 1)
    ; rsi <- second syscall argument (buffer: hello)
    ; rdx <- third syscall argument (length: 12)
    mov rdi, 1
    mov rsi, bye
    mov rdx, 12
    mov rax, 1
    syscall


    ; TODO 11: read from buffer
    ; Call read(0, buffer, 128).
    ; rax <- __NR_read (index of read syscall: 0)
    ; rdi <- first syscall argument (fd: 0)
    ; rsi <- second syscall argument (buffer: buffer)
    ; rdx <- third syscall argument (length: len)
    mov rdi, 0
    mov rsi, buffer
    mov rdx, len
    mov rax, 0
    syscall


    ; TODO 11: print the content of buffer
    ; Call write(1, buffer, size).
    ; rax <- __NR_write (index of write syscall: 1)
    ; rdi <- first syscall argument (fd: 1)
    ; rsi <- second syscall argument (buffer: buffer)
    ; rdx <- third syscall argument (length: size - rax)
    mov rdi, 1
    mov rsi, buffer
    mov rdx, rax
    mov rax, 1
    syscall


    ; TODO 4: sleep for 2 seconds using nanosleep
    lea rdi, [timespec]
    xor rsi, rsi
    mov rax, 35
    syscall

    ; TODO 6: exit
    ; Call exit(0).
    ; rax <- __NR_exit (index of exit syscall: 60)
    ; rdi <- first syscall argument (status: 0)
    mov rdi, 0
    mov rax, 60
    syscall

    xor rax, rax
    leave
    ret
