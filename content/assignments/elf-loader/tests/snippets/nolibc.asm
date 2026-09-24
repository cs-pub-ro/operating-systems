; SPDX-License-Identifier: BSD-3-Clause

section .data
    msg     db  "Hello, world!", 10 ; Message + newline
    msglen  equ $ - msg             ; Length of the message

section .rodata
    msg_rodata     db  "Hello from rodata!", 10 ; Message + newline
    msglen_rodata  equ $ - msg_rodata             ; Length of the message

section .text
    global _start

_start:
    ; write(stdout=1, msg, msglen)
    mov     rax, 1          ; syscall: write
    mov     rdi, 1          ; file descriptor: stdout
    mov     rsi, msg        ; pointer to message
    mov     rdx, msglen     ; message length
    syscall

    mov     rax, 1
    mov     rdi, 1
    mov     rsi, msg_rodata
    mov     rdx, msglen_rodata
    syscall

    ; exit(0)
    mov     rax, 60         ; syscall: exit
    xor     rdi, rdi        ; status = 0
    syscall
