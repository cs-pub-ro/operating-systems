/* SPDX-License-Identifier: BSD-3-Clause */

#ifndef OS_STRING_H_
#define OS_STRING_H_	1

unsigned long os_strlen(const char *s);
char *os_strcpy(char *dest, const char *src);

/* TODO 1: Declare strcat(). */
char *os_strcat(char *dest, const char *src);

#endif
