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

/*
 * 1: the x86-64 syscall number for nanosleep.
 *
 * Check it yourself with:
 *     grep '__NR_nanosleep ' /usr/include/x86_64-linux-gnu/asm/unistd_64.h
 */
#define SYS_nanosleep	35

/*
 * 2: nanosleep(2) wrapper.
 *
 *   int nanosleep(const struct timespec *req, struct timespec *rem);
 *
 * Both parameters are pointers, and the calling convention passes everything
 * as a machine word, so they are cast to `long`. A NULL `rem` casts to 0,
 * which is exactly what the kernel expects for "do not report the remainder".
 */
long my_nanosleep(const struct timespec *req, struct timespec *rem)
{
	return my_syscall(SYS_nanosleep, (long)req, (long)rem, 0, 0, 0, 0);
}

/*
 * 3: sleep()
 *
 *   unsigned int sleep(unsigned int seconds);
 *
 * Layer 3, built on top of the wrapper: describe the duration as a timespec
 * and hand it to my_nanosleep(). Both fields must be set -- tv_nsec is not
 * zeroed for you, and a garbage value there is either a very long sleep or
 * an EINVAL.
 *
 * We always return 0. A real sleep() returns the number of seconds left
 * unslept, which means looping on `rem` when a signal interrupts the sleep;
 * that is the optional bonus mentioned in the exercise.
 */
unsigned int my_sleep(unsigned int seconds)
{
	struct timespec req;

	req.tv_sec = (time_t)seconds;
	req.tv_nsec = 0;

	my_nanosleep(&req, NULL);

	return 0;
}

int main(void)
{
	printf("Sleeping for 2 seconds...\n");
	my_sleep(2);
	printf("Woke up!\n");

	return 0;
}
