; SPDX-License-Identifier: BSD-3-Clause

extern printf
extern pthread_create
extern pthread_join
extern NUM_ITER
extern var

global increment_var
global decrement_var

section .bss
	var resq 1

section .text
increment_var:
	push rbp
	mov rbp, rsp

	; Load NUM_ITER into rcx
	mov rcx, NUM_ITER
loop_increment:

 	; Atomic increment of var
	lock inc dword [var]

	; Loop for NUM_ITER iterations
	loop loop_increment

	leave
	ret

decrement_var:
	push rbp
	mov rbp, rsp

	; Load NUM_ITER into rcx
	mov rcx, NUM_ITER
loop_decrement:

	; TODO 1: Decrement var atomically
	lock dec dword [var]

  	; Loop for NUM_ITER iterations
	loop loop_decrement

	leave
	ret
