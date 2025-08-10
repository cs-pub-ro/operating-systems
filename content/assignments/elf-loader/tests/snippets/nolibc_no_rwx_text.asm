section .data
    msg     db  "Hello, .text test!", 10 ; Message + newline
    msglen  equ $ - msg             ; Length of the message

section .rodata
    ro_msg  db "test"

section .text
    global _start

_start:
    ; write(stdout=1, msg, msglen)
    mov     rax, 1          ; syscall: write
    mov     rdi, 1          ; file descriptor: stdout
    mov     rsi, msg        ; pointer to message
    mov     rdx, msglen     ; message length
    syscall

    mov BYTE [_start], 0

    ; exit(0)
    mov     rax, 60         ; syscall: exit
    xor     rdi, rdi        ; status = 0
    syscall
