#include <stddef.h>
#include <time.h>

#include "my_time.h"

/**
 * Low-level syscall wrapper (x86-64 Linux calling convention).
 * You do not need to modify this function.
 */
static long my_syscall(long number, long arg1, long arg2, long arg3,
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

/* TODO 1: define the x86-64 syscall number for clock_gettime here. */
#define SYS_clock_gettime	/* ??? */

/*
 * TODO 2: my_clock_gettime() — clock_gettime(2) wrapper.
 *
 *   int clock_gettime(clockid_t clkid, struct timespec *tp);
 *
 * Pass `clkid` as the first argument and `tp` (cast to `long`) as the second.
 * Use 0 for the remaining arguments.
 * Return the value returned by my_syscall().
 */
int my_clock_gettime(clockid_t clkid, struct timespec *tp)
{
	/* TODO: replace this with a call to my_syscall(...). */
	return -1;
}

/*
 * TODO 3: my_time() — time(2) implemented on top of my_clock_gettime().
 *
 *   time_t time(time_t *tloc);
 *
 * Steps:
 *   1. Declare a local `struct timespec ts`.
 *   2. Call my_clock_gettime(CLOCK_REALTIME, &ts).
 *   3. If tloc is not NULL, store ts.tv_sec in *tloc.
 *   4. Return ts.tv_sec.
 */
time_t my_time(time_t *tloc)
{
	/* TODO: implement using my_clock_gettime(). */
	return (time_t)-1;
}
