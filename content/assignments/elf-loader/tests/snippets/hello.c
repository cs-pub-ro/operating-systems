// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>
#include <sys/syscall.h>
#include <unistd.h>

int main(int argc, char **argv)
{
	printf("Hello, world!\n");
	fflush(stdout);

	syscall(SYS_exit_group, 0);

	return 0; // Should never be reached
}
