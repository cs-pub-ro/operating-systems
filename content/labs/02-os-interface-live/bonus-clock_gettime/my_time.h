#ifndef MY_TIME_H
#define MY_TIME_H

#include <time.h>

/*
 * my_clock_gettime - wrapper around the clock_gettime(2) system call.
 *
 * Retrieves the current time for the given clock ID and stores it in *tp.
 * Returns 0 on success, -1 (negated errno) on failure.
 *
 * Prototype mirrors libc:
 *   int clock_gettime(clockid_t clkid, struct timespec *tp);
 */
/* TODO: declare my_clock_gettime() here. */

/*
 * my_time - wrapper similar to time(2) from the standard C library.
 *
 * Returns the current time as seconds since the Epoch (1970-01-01 00:00:00 UTC).
 * If tloc is not NULL, the return value is also stored in *tloc.
 *
 * Prototype mirrors libc:
 *   time_t time(time_t *tloc);
 */
/* TODO: declare my_time() here. */

#endif /* MY_TIME_H */
