// SPDX-License-Identifier: BSD-3-Clause

/*
 * Count the occurrences of a word in a large file.  The file is mapped
 * into memory once.  For now one thread searches all of it; the search is
 * to be split between as many threads as asked for, every thread adding
 * what it found to one shared total.
 *
 *     ./search <file> <word> <threads>
 *     ./search big.txt kernel 4
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <fcntl.h>
#include <pthread.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/stat.h>

#define MAX_THREADS	64

/* What one thread works on: a part of the file, and the word to look for. */
struct region {
	const char *start;	/* first byte of this thread's part        */
	size_t len;		/* how many bytes it covers                */
	const char *needle;	/* the word to look for                    */
};

/*
 * The result.  Every thread will add to it.
 *
 * TODO 1: declare and initialize a mutex to protect it.
 */
static size_t total;

/* Seconds since some fixed point in the past; only differences mean anything. */
static double now(void)
{
	struct timespec ts;

	clock_gettime(CLOCK_MONOTONIC, &ts);

	return ts.tv_sec + ts.tv_nsec / 1e9;
}

/*
 * Map the whole file at `path` into memory, read-only.  On success returns
 * 0 and fills in the address and the size of the mapping.  Already written.
 */
static int map_file(const char *path, const char **data, size_t *size)
{
	struct stat st;
	void *addr;
	int fd;

	fd = open(path, O_RDONLY);
	if (fd < 0) {
		perror(path);
		return -1;
	}

	if (fstat(fd, &st) < 0) {
		perror("fstat");
		close(fd);
		return -1;
	}

	addr = mmap(NULL, st.st_size, PROT_READ, MAP_PRIVATE | MAP_POPULATE, fd, 0);
	close(fd);
	if (addr == MAP_FAILED) {
		perror("mmap");
		return -1;
	}

	*data = addr;
	*size = st.st_size;

	return 0;
}

/*
 * Count how many times `needle` occurs in the `len` bytes at `buf`, by
 * comparing at every position.  Occurrences do not overlap, the way
 * `grep -o` counts them.  Already written.
 */
static size_t count_matches(const char *buf, size_t len, const char *needle)
{
	size_t nlen = strlen(needle);
	size_t count = 0;
	size_t i = 0;

	while (i + nlen <= len) {
		if (memcmp(buf + i, needle, nlen) == 0) {
			count++;
			i += nlen;
		} else {
			i++;
		}
	}

	return count;
}

/*
 * TODO 2: write the function every thread runs.  It gets a pointer to its
 * own region, counts the matches in it, and adds them to `total`.  Keep the
 * critical section as short as it can be.
 */

int main(int argc, char *argv[])
{
	const char *data, *needle;
	double t_start, t_end;
	int nthreads;
	size_t size;

	if (argc != 4) {
		fprintf(stderr, "Usage: %s <file> <word> <threads>\n", argv[0]);
		return 1;
	}

	needle = argv[2];
	nthreads = atoi(argv[3]);
	if (needle[0] == '\0' || nthreads < 1 || nthreads > MAX_THREADS) {
		fprintf(stderr, "the word must not be empty, threads must be between 1 and %d\n",
			MAX_THREADS);
		return 1;
	}

	if (map_file(argv[1], &data, &size) < 0)
		return 1;

	t_start = now();

	/*
	 * The search: sequential for now, one call over the whole file,
	 * whatever `nthreads` says.
	 *
	 * TODO 3: cut the file into `nthreads` regions.  Every byte has to be
	 * searched, and a match that starts in one region and ends in the
	 * next has to be counted exactly once.
	 * TODO 4: start one thread per region.
	 * TODO 5: join every thread; only then is `total` complete.
	 */
	total = count_matches(data, size, needle);

	t_end = now();

	printf("%zu matches, %d thread(s), %.3f s\n", total, nthreads, t_end - t_start);

	munmap((void *) data, size);

	return 0;
}
