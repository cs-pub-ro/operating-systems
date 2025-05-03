// SPDX-License-Identifier: BSD-3-Clause

#include <string.h>

#include "./syscall.h"
#include "./os_string.h"
#include "./printf.h"

static const char src[] = "warhammer40k";
static char dest[128];
static char out_buffer[256];

static char putchar_buffer[1024];
static char putchar_buffer_len;


/* _putchar implementation has to be provided. */
void _putchar(char character)
{
	/* TODO: Store the character in putchar_buffer. Flush on \n or when the length is 1024. */
	write(1, &character, 1);
}

int main(void)
{
	/* TODO: Replace printf() with sprintf() and write(). */

	printf("[before] src is at %p, len is %lu, content: \"%s\"\n", src, os_strlen(src), src);
	printf("[before] dest is at %p, len is %lu, content: \"%s\"\n", dest, os_strlen(dest), dest);

	printf("copying src to dest\n");
	os_strcpy(dest, src);

	/* TODO: Replace printf() with sprintf() and write(). */

	printf("[after] src is at %p, len is %lu, content: \"%s\"\n", src, os_strlen(src), src);
	printf("[after] dest is at %p, len is %lu, content: \"%s\"\n", dest, os_strlen(dest), dest);

	exit(0);
	return 0;
}
