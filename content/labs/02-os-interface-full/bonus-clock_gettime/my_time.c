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

/*
 * 1: the x86-64 syscall number for clock_gettime.
 *
 * Check it yourself with:
 *     grep '__NR_clock_gettime ' /usr/include/x86_64-linux-gnu/asm/unistd_64.h
 */
#define SYS_clock_gettime	228

/*
 * 2: my_clock_gettime() — clock_gettime(2) wrapper.
 *
 *   int clock_gettime(clockid_t clkid, struct timespec *tp);
 *
 * `tp` is an *output* parameter: the kernel writes the current time into
 * memory the caller owns. Both arguments go into registers as plain machine
 * words, so the pointer is cast to `long`.
 */
int my_clock_gettime(clockid_t clkid, struct timespec *tp)
{
	return (int)my_syscall(SYS_clock_gettime, (long)clkid, (long)tp,
			       0, 0, 0, 0);
}

/*
 * 3: my_time() — time(2) implemented on top of my_clock_gettime().
 *
 *   time_t time(time_t *tloc);
 *
 * time() reports only whole seconds, so it reads CLOCK_REALTIME and keeps
 * tv_sec. The odd dual interface -- return the value *and* optionally store
 * it through a pointer -- is inherited from V7 Unix and kept for
 * compatibility. This mirrors how glibc implements time() internally.
 */
time_t my_time(time_t *tloc)
{
	struct timespec ts;

	my_clock_gettime(CLOCK_REALTIME, &ts);
	if (tloc != NULL)
		*tloc = ts.tv_sec;
	return ts.tv_sec;
}
