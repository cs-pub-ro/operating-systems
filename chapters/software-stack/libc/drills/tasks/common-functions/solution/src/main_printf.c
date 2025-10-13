// SPDX-License-Identifier: BSD-3-Clause

#include <string.h>

#include "./syscall.h"
#include "./os_string.h"
#include "./printf.h"

static const char src[] = "warhammer40k";
static char dest[128];
static char out_buffer[256];

static char putchar_buffer[1024];
static int putchar_buffer_len;

/* REMOVE 5 */
void flush(void)
{
	write(1, putchar_buffer, putchar_buffer_len);
	putchar_buffer_len = 0;
}

/* _putchar implementation has to be provided. */
void _putchar(char character)
{
	/* TODO 5: Store the character in putchar_buffer. Flush on \n or when the length is 1024. */
	putchar_buffer[putchar_buffer_len] = character;
	putchar_buffer_len++;
	if (character == '\n' || putchar_buffer_len == 1024)
		flush();

	/* REPLACE 1 */
	/* write(1, &character, 1); */
}

int main(void)
{
	/* TODO 5: Replace printf() with sprintf() and write(). */
	sprintf(out_buffer, "[before] src is at %p, len is %lu, content: \"%s\"\n", src, os_strlen(src), src);
	write(1, out_buffer, strlen(out_buffer));

	sprintf(out_buffer, "[before] dest is at %p, len is %lu, content: \"%s\"\n", dest, os_strlen(dest), dest);
	write(1, out_buffer, strlen(out_buffer));

	/* REPLACE 2 */
	/* printf("[before] src is at %p, len is %lu, content: \"%s\"\n", src, os_strlen(src), src); */
	/* printf("[before] dest is at %p, len is %lu, content: \"%s\"\n", dest, os_strlen(dest), dest); */

	printf("copying src to dest\n");
	os_strcpy(dest, src);

	/* TODO 5: Replace printf() with sprintf() and write(). */
	sprintf(out_buffer, "[after] src is at %p, len is %lu, content: \"%s\"\n", src, os_strlen(src), src);
	write(1, out_buffer, strlen(out_buffer));

	sprintf(out_buffer, "[after] dest is at %p, len is %lu, content: \"%s\"\n", dest, os_strlen(dest), dest);
	write(1, out_buffer, strlen(out_buffer));

	/* REPLACE 2 */
	/* printf("[after] src is at %p, len is %lu, content: \"%s\"\n", src, os_strlen(src), src); */
	/* printf("[after] dest is at %p, len is %lu, content: \"%s\"\n", dest, os_strlen(dest), dest); */

	exit(0);
	return 0;
}
