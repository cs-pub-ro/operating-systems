/* SPDX-License-Identifier: BSD-3-Clause */

.section .bss
    .lcomm buffer, 128

.equ len, 128

.section .rodata

hello:
    .ascii "Hello, world!\n\0"

bye:
    .ascii "Bye, world!\n\0"

.section .data

    # Structure to hold 2 seconds and 0 nanoseconds
    timespec:
        .quad 2              # 2 seconds
        .quad 0              # 0 nanoseconds

.section .text

.global main

main:
    push %rbp
    mov %rsp, %rbp


    # TODO: print "Hello, world!"

    # TODO: print "Bye, world!"

    # TODO: read from stdin

    # TODO: print the content of buffer

    # TODO: sleep for 2 seconds using nanosleep

    # TODO: exit

    leave
    ret
