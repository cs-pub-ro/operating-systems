#include <unistd.h>

#include "printf.h"

/*
 * _putchar() is the single output hook required by the printf/ library.
 * Every character produced by printf(), sprintf(), etc. is routed through
 * this function before reaching the outside world.
 *
 * It writes `character` to standard output (file descriptor 1) using the
 * write(2) system call. That single call is the entire porting layer between
 * the library and the operating system.
 *
 * Prototype (declared in ./utils/printf/printf.h):
 *   void _putchar(char character);
 */
void _putchar(char character)
{
	write(1, &character, 1);
}
