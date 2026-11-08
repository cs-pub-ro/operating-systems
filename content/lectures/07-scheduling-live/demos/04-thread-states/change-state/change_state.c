#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/wait.h>

#include "utils.h"

static void wait_for_input(const char *msg)
{
	char buf[32];

	printf(" * %s\n", msg);
	printf(" -- Press ENTER to continue ..."); fflush(stdout);
	fgets(buf, 32, stdin);
}

int main(void)
{
	unsigned int i, j;
	unsigned int val;

	while (1) {
		wait_for_input("Entering a CPU intensive phase");
		for (i = 0; i < 10000000; i++) {
			val = val ^ i;
			for (j = 0; j < 1000; j++)
				val = val ^ j;
		}
	}

	return 0;
}
