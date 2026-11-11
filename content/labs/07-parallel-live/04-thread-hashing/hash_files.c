// SPDX-License-Identifier: BSD-3-Clause

/*
 * Hash many files: the names are read from a list, one per line, and the
 * MD5 digest of each file is computed with md5_file() and printed.  For now
 * one thread hashes the files one after another; they are to be hashed at
 * the same time, one thread per file.
 *
 *     ./hash_files <list>
 *     ./hash_files files.txt
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <pthread.h>

#include "md5.h"

#define MAX_FILES	256
#define MAX_PATH	4096

/*
 * TODO 1: declare a struct for what one thread works on: the file it has to
 * hash, and the place where it leaves the result for the main thread.
 */

/* Seconds since some fixed point in the past; only differences mean anything. */
static double now(void)
{
	struct timespec ts;

	clock_gettime(CLOCK_MONOTONIC, &ts);

	return ts.tv_sec + ts.tv_nsec / 1e9;
}

/*
 * Read the file names in the list at `path`, one per line, into `files`.
 * Empty lines are skipped.  Returns how many names there are, or -1 if the
 * list cannot be read or holds more than MAX_FILES names.  Already written.
 */
static int read_list(const char *path, char *files[])
{
	char line[MAX_PATH];
	int count = 0;
	FILE *list;

	list = fopen(path, "r");
	if (list == NULL) {
		perror(path);
		return -1;
	}

	while (fgets(line, sizeof(line), list) != NULL) {
		line[strcspn(line, "\n")] = '\0';
		if (line[0] == '\0')
			continue;
		if (count == MAX_FILES) {
			fprintf(stderr, "%s: more than %d files\n", path, MAX_FILES);
			fclose(list);
			return -1;
		}
		files[count] = strdup(line);
		if (files[count] == NULL) {
			perror("strdup");
			fclose(list);
			return -1;
		}
		count++;
	}
	fclose(list);

	return count;
}

/*
 * TODO 2: write the function every thread runs: hash one file with
 * md5_file().  It must not print; the main thread does.
 */

int main(int argc, char *argv[])
{
	char *files[MAX_FILES];
	char hex[MD5_HEX_LEN];
	double t_start, t_end;
	int nfiles, failed, i;

	if (argc != 2) {
		fprintf(stderr, "Usage: %s <list>\n", argv[0]);
		return 1;
	}

	nfiles = read_list(argv[1], files);
	if (nfiles < 0)
		return 1;

	t_start = now();

	/*
	 * The hashing: sequential for now, one file after another.
	 *
	 * TODO 3: start one thread per file, all of them before waiting for
	 * any.
	 * TODO 4: join every thread, and print its result here, in the main
	 * thread, in the order of the list.
	 */
	failed = 0;
	for (i = 0; i < nfiles; i++) {
		if (md5_file(files[i], hex) < 0)
			failed++;
		else
			printf("%s  %s\n", hex, files[i]);
	}

	t_end = now();

	/* On standard error, so that the hashes alone can be compared. */
	fprintf(stderr, "%d files, %d failed, %.3f s\n", nfiles, failed, t_end - t_start);

	for (i = 0; i < nfiles; i++)
		free(files[i]);

	return failed ? 1 : 0;
}
