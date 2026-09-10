#include <stddef.h>
#include <stdio.h>

/**
 * Low-level syscall wrapper (x86-64 Linux calling convention).
 * You do not need to modify this function.
 */
long my_syscall(long number, long arg1, long arg2, long arg3,
		long arg4, long arg5, long arg6)
{
	long ret;
	register long r10 asm("r10") = arg4;
	register long r8  asm("r8")  = arg5;
	register long r9  asm("r9")  = arg6;

	asm volatile (
		"syscall"
		: "=a" (ret)
		: "a" (number), "D" (arg1), "S" (arg2), "d" (arg3),
		  "r" (r10), "r" (r8), "r" (r9)
		: "rcx", "r11", "memory"
	);

	return ret;
}

/*
 * 1: the x86-64 syscall number for getpid.
 *
 * Check it yourself with:
 *     grep '__NR_getpid ' /usr/include/x86_64-linux-gnu/asm/unistd_64.h
 */
#define SYS_getpid	39

/*
 * 2: getpid(2) wrapper.
 *
 *   pid_t getpid(void);   (we use `long` for simplicity)
 *
 * getpid takes no arguments at all, so every argument slot is 0. The kernel
 * returns the PID in %rax, which my_syscall() hands straight back.
 */
long my_getpid(void)
{
	return my_syscall(SYS_getpid, 0, 0, 0, 0, 0, 0);
}


int main(void)
{
	printf("PID: %lu\n", my_getpid());

	return 0;
}
