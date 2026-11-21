// SPDX-License-Identifier: BSD-3-Clause

/*
 * Write NUM_RECORDS records to a file with fwrite(): the C library collects
 * them in a buffer of its own, in the memory of the process, and calls
 * write() only when the buffer is full.
 */

#include <stdio.h>

#include "utils.h"
#include "write.h"

static char record[RECORD_SIZE];

int main(void)
{
	double start, stop;
	size_t n;
	FILE *f;
	int i;

	f = fopen(FILE_NAME, "w");
	DIE(f == NULL, "fopen");

	start = now_ms();
	for (i = 0; i < NUM_RECORDS; i++) {
		n = fwrite(record, RECORD_SIZE, 1, f);
		DIE(n != 1, "fwrite");
	}
	stop = now_ms();

	report("fwrite", stop - start);

	fclose(f);

	return 0;
}
