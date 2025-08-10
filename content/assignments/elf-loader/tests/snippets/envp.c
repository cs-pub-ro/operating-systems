// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>
#include <sys/syscall.h>
#include <unistd.h>

const int a = 1;

int main(int argc, char **argv)
{
	char *env = malloc(30);

	env = getenv("ENV_TEST");
	printf("ENV: %s\n", env);
	fflush(stdout);

	syscall(SYS_exit_group, 0);

	return 0; // Should never be reached
}
