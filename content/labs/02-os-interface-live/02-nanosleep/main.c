#include <stddef.h>
#include <stdio.h>
#include <time.h>

/**
 * Syscall wrapper, just like presented in the demo
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

/* TODO 1: define the x86-64 syscall number for nanosleep here. */
#define SYS_nanosleep	/* ??? */

/*
 * TODO 2: nanosleep(2) wrapper.
 *
 *   int nanosleep(const struct timespec *req, struct timespec *rem);
 *
 * `req` points to the requested sleep duration. `rem`, if not NULL, is
 * filled with the remaining time when the sleep is interrupted by a signal.
 *
 * Call my_syscall() with the nanosleep number, passing the two pointers as
 * the first two arguments (cast them to `long`) and 0 for the rest.
 * Return the kernel's result.
 */
long my_nanosleep(const struct timespec *req, struct timespec *rem)
{
	/* TODO: replace this with a call to my_syscall(...). */
	return -1;
}

/*
 * TODO 3: sleep()
 *
 * Layer 3 helper, like libc's sleep(). It should:
 *   1. build a `struct timespec` for `seconds` seconds (0 nanoseconds);
 *   2. call my_nanosleep() to sleep for that duration (pass NULL for `rem`).
 *
 * unsigned int sleep(unsigned int seconds);
 * Return 0 (the number of seconds left unslept; keep it simple here).
 */
unsigned int my_sleep(unsigned int seconds)
{
	/* TODO: build a struct timespec and call my_nanosleep(). */
	return 0;
}

int main(void)
{
	printf("Sleeping for 2 seconds...\n");
	my_sleep(2);
	printf("Woke up!\n");

	return 0;
}
