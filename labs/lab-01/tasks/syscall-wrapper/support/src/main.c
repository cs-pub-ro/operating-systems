// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "./syscall.h"

static void reverse_string(char *a, unsigned int len)
{
	/* TODO: reverse_string function */

static unsigned int os_itoa(int n, char *a)
{
	/* TODO: itoa function */

int main(void)
{
	char buffer[128], os_itoa_buff[10];
	char aux_buff[10] = {};
	int n, number = 12345;
	int pid;
	unsigned int num_digits;

	write(1, "Hello, world!\n", 14);

	/* Read and write back input from standard input. */
	write(1, "Give input: ", 12);
	n = read(0, buffer, 128);
	write(1, "Here's your input back: ", 24);
	write(1, buffer, n);

	/* Test os_itoa() function. */
	os_itoa(number, os_itoa_buff);
	sprintf(aux_buff, "%d", number);
	if (strcmp(aux_buff, os_itoa_buff) == 0)
		write(1, "os_itoa() test passed!\n", 22);
	else
		write(1, "os_itoa() test failed!\n", 22);
	write(1, "\n", 1);

	/* Get and print the process ID. */
	pid = getpid();
	num_digits = os_itoa(pid, buffer);
	write(1, "PID: ", 5);
	write(1, buffer, num_digits);
	write(1, "\n", 1);

	exit(0);
	return 0;
}
