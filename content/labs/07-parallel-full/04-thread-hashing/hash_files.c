// SPDX-License-Identifier: BSD-3-Clause

/*
 * Hash many files at the same time, one thread per file: the names are read
 * from a list, one per line, and each thread computes the MD5 digest of one
 * file with md5_file().  The main thread prints the digests, in the order
 * of the list, after it has joined the threads.
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

/* What one thread works on: a file, and the place its digest goes. */
struct job {
	const char *path;	/* the file to hash                        */
	char hex[MD5_HEX_LEN];	/* its digest, written by the thread       */
	int failed;		/* non-zero if the file could not be read  */
};

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
 * list cannot be read or holds more than MAX_FILES names.
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
 * What every thread runs: hash its own file into its own job.  The digest
 * and the flag belong to this thread alone until it is joined, so nothing
 * is locked.
 */
static void *hash_job(void *arg)
{
	struct job *job = arg;

	job->failed = md5_file(job->path, job->hex) < 0;

	return NULL;
}

int main(int argc, char *argv[])
{
	static struct job jobs[MAX_FILES];
	pthread_t threads[MAX_FILES];
	char *files[MAX_FILES];
	double t_start, t_end;
	int nfiles, failed, i, rc;

	if (argc != 2) {
		fprintf(stderr, "Usage: %s <list>\n", argv[0]);
		return 1;
	}

	nfiles = read_list(argv[1], files);
	if (nfiles < 0)
		return 1;

	t_start = now();

	/* First loop: one job and one thread per file, all started. */
	for (i = 0; i < nfiles; i++) {
		jobs[i].path = files[i];
		rc = pthread_create(&threads[i], NULL, hash_job, &jobs[i]);
		if (rc != 0) {
			fprintf(stderr, "pthread_create: %s\n", strerror(rc));
			break;
		}
	}
	nfiles = i;

	/*
	 * Second loop: join every thread, and only then read what it left in
	 * its job.  The lines come out in the order of the list, whatever
	 * order the threads finished in.
	 */
	failed = 0;
	for (i = 0; i < nfiles; i++) {
		pthread_join(threads[i], NULL);
		if (jobs[i].failed)
			failed++;
		else
			printf("%s  %s\n", jobs[i].hex, jobs[i].path);
	}

	t_end = now();

	/* On standard error, so that the hashes alone can be compared. */
	fprintf(stderr, "%d files, %d failed, %.3f s\n", nfiles, failed, t_end - t_start);

	for (i = 0; i < nfiles; i++)
		free(files[i]);

	return failed ? 1 : 0;
}
