/*
 * Two processes, the same address, two different values.
 *
 * The program writes its own PID into a global variable and prints where that
 * variable lives.  Run two copies side by side: the address is the same in
 * both, and the contents are not.  Built with -no-pie, so that the address is
 * the same from one run to the next; see the README for what changes when it
 * is not.
 */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#include "utils.h"

static int value = 1;

static void wait_for_input(const char *msg)
{
	char buf[32];

	printf(" * %s\n", msg);
	printf(" -- Press ENTER to continue ...\n");
	fflush(stdout);
	fgets(buf, 32, stdin);
}

int main(void)
{
	int local;

	value = getpid();
	local = value * 10;

	printf("pid %d: &value = %p, value = %d\n", getpid(), (void *)&value, value);
	printf("pid %d: &local = %p, local = %d\n", getpid(), (void *)&local, local);
	printf("pid %d: code   = %p\n", getpid(), (void *)&main);

	wait_for_input("both values written; start the other copy now");

	printf("pid %d: value is still %d, local is still %d\n", getpid(), value, local);

	return 0;
}
