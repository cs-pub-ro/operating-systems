#include <stddef.h>

/* x86-64 syscall number for write (see /usr/include/asm/unistd_64.h). */
#define SYS_write	1

/* Standard file descriptor for stdout. */
#define STDOUT_FILENO	1

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
 * write(2) wrapper.
 *
 * Layer 2: turns the generic my_syscall() into a typed, easy to use
 * function. Only fills in the first three arguments (fd, buf, count);
 * the rest are 0.
 */
long my_write(int fd, const char *buf, size_t count)
{
	return my_syscall(SYS_write, fd, (long)buf, (long)count, 0, 0, 0);
}

/*
 * puts()-like helper.
 *
 * Layer 3: a small piece of "libc" built on top of my_write(). It computes
 * the string length itself (no strlen from libc) and writes the string
 * followed by a newline to stdout.
 */
int my_puts(const char *s)
{
	size_t len = 0;

	while (s[len] != '\0')
		len++;

	my_write(STDOUT_FILENO, s, len);
	my_write(STDOUT_FILENO, "\n", 1);

	return 0;
}

int main(void)
{
	my_puts("Hello from a raw write(2) system call!");
	my_puts("No printf, no libc puts -- just my_syscall().");

	return 0;
}
