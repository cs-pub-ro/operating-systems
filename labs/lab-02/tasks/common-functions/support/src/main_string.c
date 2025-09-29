// SPDX-License-Identifier: BSD-3-Clause

#include "./syscall.h"
#include "./os_string.h"

static const char src[] = "warhammer40k\n";
static char dest[128];

int main(void)
{
	os_strcpy(dest, src);

	write(1, "Destination string is: ", 23);
	write(1, dest, os_strlen(dest));

	exit(0);
	return 0;
}
