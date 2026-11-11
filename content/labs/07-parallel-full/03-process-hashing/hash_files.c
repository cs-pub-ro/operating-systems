// SPDX-License-Identifier: BSD-3-Clause

/*
 * Hash many files at the same time, one process per file: the names are
 * read from a list, one per line, and `md5sum` is run on each of them.  All
 * the processes are started first, and only then waited for.
 *
 *     ./hash_files <list>
 *     ./hash_files files.txt
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

#define MAX_FILES	256
#define MAX_PATH	4096

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

int main(int argc, char *argv[])
{
	char *files[MAX_FILES];
	pid_t pids[MAX_FILES];
	int nfiles, failed, status, i;
	double t_start, t_end;

	if (argc != 2) {
		fprintf(stderr, "Usage: %s <list>\n", argv[0]);
		return 1;
	}

	nfiles = read_list(argv[1], files);
	if (nfiles < 0)
		return 1;

	t_start = now();

	/*
	 * First loop: start every child, and remember its PID.  The parent
	 * does not wait here, so by the end of the loop all the children are
	 * running, at the same time, on as many cores as there are.
	 */
	for (i = 0; i < nfiles; i++) {
		pids[i] = fork();
		if (pids[i] < 0) {
			perror("fork");
			break;
		}
		if (pids[i] == 0) {
			execlp("md5sum", "md5sum", files[i], (char *) NULL);
			/* Only reached if the exec failed. */
			perror("md5sum");
			_exit(127);
		}
	}
	nfiles = i;

	/*
	 * Second loop: wait for every child.  The order does not matter: a
	 * child that has already ended waits, as a zombie, to be collected.
	 */
	failed = 0;
	for (i = 0; i < nfiles; i++) {
		if (waitpid(pids[i], &status, 0) < 0) {
			perror("waitpid");
			failed++;
			continue;
		}
		if (!WIFEXITED(status) || WEXITSTATUS(status) != 0)
			failed++;
	}

	t_end = now();

	/* On standard error, so that the hashes alone can be piped to `sort`. */
	fprintf(stderr, "%d files, %d failed, %.3f s\n", nfiles, failed, t_end - t_start);

	for (i = 0; i < nfiles; i++)
		free(files[i]);

	return failed ? 1 : 0;
}
