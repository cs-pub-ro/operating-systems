/* SPDX-License-Identifier: BSD-3-Clause */

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

    ; TODO: print "Hello, world!"

    ; TODO: print "Bye, world!"

    ; TODO: read from buffer

    ; TODO: print the content of buffer

    ; TODO: sleep for 2 seconds using nanosleep

    ; TODO: exit

    xor rax, rax
    leave
    ret
