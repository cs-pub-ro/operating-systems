// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <string.h>

#include "os_string.h"
#include "utils.h"
#include "graded_test.h"

static int test_strcat_return(void)
{
	char *src = "abcd";
	char dest[10] = {0};
	char *p;

	p = os_strcat(dest, src);

	return p == dest;
}

static int test_strcat_len(void)
{
	char *src = "abcd";
	char dest[10] = "xyz";
	size_t dest_len = strlen(dest);

	os_strcat(dest, src);

	return strlen(dest) == dest_len + strlen(src);
}

static int test_strcat_data(void)
{
	char *src = "abcd";
	char dest[10] = "xyz";

	os_strcat(dest, src);

	return !strcmp(dest, "xyzabcd");
}

static struct graded_test all_tests[] = {
	{ test_strcat_return, "test_strcat_return", 33 },
	{ test_strcat_len, "test_strcat_len", 33 },
	{ test_strcat_data, "test_strcat_data", 34 },
};

int main(void)
{
	/* Change to LOG_DEBUG for more messages. */
	log_set_level(LOG_INFO);

	run_tests(all_tests, sizeof(all_tests) / sizeof(all_tests[0]));

	return 0;
}
