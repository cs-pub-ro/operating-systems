; The same message, with no library at all below it: the program is linked by
; `ld` rather than by `gcc`, so nothing but these instructions runs.  The two
; system calls it makes -- `write` and `exit` -- are the whole of the program's
; conversation with the operating system.

section .rodata

hello db "Hello, World!", 10
hello_len equ $ - hello

section .text

global _start

_start:
	; write(1, hello, hello_len);
	mov rax, 1			; __NR_write
	mov rdi, 1			; fd: standard output
	mov rsi, hello			; buf
	mov rdx, hello_len		; count
	syscall

	; exit(0);
	mov rax, 60			; __NR_exit
	mov rdi, 0			; status
	syscall
