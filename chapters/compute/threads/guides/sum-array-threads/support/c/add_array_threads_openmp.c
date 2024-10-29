// SPDX-License-Identifier: BSD-3-Clause

#include <stdlib.h>
#include <stdio.h>
#include <sys/time.h>
#include <errno.h>
#include <string.h>
#include <omp.h>

#include "include/generate_random_array.h"
#include "include/array_utils.h"
#include "utils/utils.h"

#define ARR_SIZE 50

void init_array(int *array)
{
	for (int i = 0; i < ARR_SIZE; i++)
		array[i] = i;
}

void print_array(int *array)
{
	for (int i = 0; i < ARR_SIZE; i++)
		printf("%d ", array[i]);

	printf("\n\n");
}

int main(int argc, char *argv[])
{
	int num_threads;
	int *array;

	if (argc < 2) {
		fprintf(stderr, "Usage: %s <num_threads>\n", argv[0]);
		exit(1);
	}

	array = malloc(sizeof(*array) * ARR_SIZE);
	DIE(!array, "Error when allocating array");

	num_threads = atoi(argv[1]);

	init_array(array);

	print_array(array);

	omp_set_num_threads(num_threads);

	// TODO: Add 100 to each element of the array

	print_array(array);

	free(array);

	return 0;
}
