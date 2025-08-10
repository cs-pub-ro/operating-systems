// SPDX-License-Identifier: BSD-3-Clause

#include <sys/auxv.h>
#include <stdio.h>
#include <sys/syscall.h>
#include <unistd.h>

int main(int argc, char **argv)
{
	unsigned long v = getauxval(AT_NULL);

	printf("%lu\n", v);
	fflush(stdout);

	syscall(SYS_exit_group, 0);

	return 0;
}
