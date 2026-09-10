#include <stddef.h>
#include <stdio.h>

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

/* TODO 1: define the x86-64 syscall number for getpid here. */
#define SYS_getpid	/* ??? */

/*
 * TODO 2: getpid(2) wrapper.
 *
 * getpid() takes NO arguments and returns the PID of the calling process.
 * Call my_syscall() with the getpid syscall number and 0 for every
 * argument, then return the result.
 *
 * Prototype: pid_t getpid(void);   (we use `long` for simplicity)
 */
long my_getpid(void)
{
	/* TODO: replace this with a call to my_syscall(...). */
	return -1;
}


int main(void)
{
	printf("PID: %lu\n", my_getpid());

	return 0;
}
