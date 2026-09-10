#include <unistd.h>

#include "./utils/printf/printf.h"

/*
 * TODO: implement _putchar().
 *
 * _putchar() is the single output hook required by the printf/ library.
 * Every character produced by printf(), sprintf(), etc. is routed through
 * this function before reaching the outside world.
 *
 * Your task: write `character` to standard output (file descriptor 1) using
 * the write(2) system call.
 *
 * Prototype (declared in ./utils/printf/printf.h):
 *   void _putchar(char character);
 *
 * Hint: write(2) signature:
 *   ssize_t write(int fd, const void *buf, size_t count);
 */
void _putchar(char character)
{
	/* TODO: call write() to output `character` to stdout (fd 1). */
}
