#ifndef MYSTRING_H
#define MYSTRING_H

#include <stddef.h>

/*
 * Your job: implement these four in mystring.c.
 *
 * Each one mirrors a real C library function. Match the real semantics
 * exactly -- including the return value, which is easy to overlook.
 * See the man pages: strlen(3), strcpy(3), strcat(3), memcpy(3).
 */

/* Number of bytes before the terminating '\0'. The '\0' is not counted. */
size_t my_strlen(const char *s);

/*
 * Copy the string src (including its '\0') into dest.
 * Returns dest.
 */
char *my_strcpy(char *dest, const char *src);

/*
 * Append src to the end of the string already in dest, and '\0'-terminate.
 * dest must already contain a valid string.
 * Returns dest.
 */
char *my_strcat(char *dest, const char *src);

/*
 * Copy exactly n bytes from src to dest. Knows nothing about '\0': n is the
 * only thing that stops it.
 * The two regions must not overlap (that is memmove's job, not ours).
 * Returns dest.
 */
void *my_memcpy(void *dest, const void *src, size_t n);

#endif /* MYSTRING_H */
