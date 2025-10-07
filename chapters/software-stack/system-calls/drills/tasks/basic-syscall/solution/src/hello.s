; SPDX-License-Identifier: BSD-3-Clause

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


    # TODO 10: print "Hello, world!"
    # Call write(1, "Hello, world!\n", 14).
    # rax <- __NR_write (index of write syscall: 1)
    # rdi <- first syscall argument (fd: 1)
    # rsi <- second syscall argument (buffer: hello)
    # rdx <- third syscall argument (length: 14)
    mov $1, %rdi
    lea hello(%rip), %rsi
    mov $14, %rdx
    mov $1, %rax
    syscall

    # TODO 10: print "Bye, world!"
    # Call write(1, "Bye, world!\n", 12).
    # rax <- __NR_write (index of write syscall: 1)
    # rdi <- first syscall argument (fd: 1)
    # rsi <- second syscall argument (buffer: bye)
    # rdx <- third syscall argument (length: 12)
    mov $1, %rdi
    lea bye(%rip), %rsi
    mov $12, %rdx
    mov $1, %rax
    syscall

    # TODO 10: read from stdin
    # Call read(0, buffer, 128).
    # rax <- __NR_read (index of read syscall: 0)
    # rdi <- first syscall argument (fd: 0)
    # rsi <- second syscall argument (buffer: buffer)
    # rdx <- third syscall argument (length: len)
    mov $0, %rdi
    lea buffer(%rip), %rsi
    mov $len, %rdx
    mov $0, %rax
    syscall

    # TODO 10: print the content of buffer
    # Call write(1, buffer, size).
    # rax <- __NR_write (index of write syscall: 1)
    # rdi <- first syscall argument (fd: 1)
    # rsi <- second syscall argument (buffer: buffer)
    # rdx <- third syscall argument (length: size from rax)
    mov $1, %rdi
    lea buffer(%rip), %rsi
    mov %rax, %rdx
    mov $1, %rax
    syscall

    # TODO 4: sleep for 2 seconds using nanosleep
    lea timespec(%rip), %rdi  # Pointer to timespec structure
    xor %rsi, %rsi            # NULL for remaining time
    mov $35, %rax             # Syscall number for nanosleep (35)
    syscall

    # TODO 6: exit
    # Call exit(0).
    # rax <- __NR_exit (index of exit syscall: 60)
    # rdi <- first syscall argument (error_code: 0)
    mov $0, %rdi
    mov $60, %rax
    syscall

    leave
    ret
