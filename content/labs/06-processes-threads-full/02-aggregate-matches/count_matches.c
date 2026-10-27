// SPDX-License-Identifier: BSD-3-Clause

/*
 * Count how many times a word occurs in a large file, with several threads:
 * each thread counts in its own part of the file and hands its count back
 * to the main thread, which adds them up.
 *
 *     ./count_matches big.txt kernel 4
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <pthread.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/stat.h>

#define MAX_THREADS	64

/* What one thread works on, and where it leaves its result. */
struct region {
	int id;			/* thread number                           */
	const char *start;	/* first byte of this thread's part        */
	size_t len;		/* how many bytes it covers                */
	const char *needle;	/* the word to look for                    */
	size_t count;		/* the result: matches found in the part   */
};

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

	addr = mmap(NULL, st.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
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
 * Count how many times `needle` occurs in the `len` bytes at `buf`.
 * Occurrences do not overlap, the way `grep -o` counts them.  Already written.
 */
static size_t count_matches(const char *buf, size_t len, const char *needle)
{
	size_t nlen = strlen(needle);
	const char *end = buf + len;
	const char *p = buf;
	size_t count = 0;

	while (p + nlen <= end) {
		p = memchr(p, needle[0], end - p);
		if (p == NULL || p + nlen > end)
			break;
		if (memcmp(p, needle, nlen) == 0) {
			count++;
			p += nlen;
		} else {
			p++;
		}
	}

	return count;
}

/*
 * What every thread runs: count in its region, store the result in the
 * region, and return a pointer to it.  The region lives in main()'s
 * array, so the pointer is still good after the thread is gone.
 */
static void *count_region(void *arg)
{
	struct region *r = arg;

	r->count = count_matches(r->start, r->len, r->needle);

	return &r->count;
}

int main(int argc, char *argv[])
{
	struct region regions[MAX_THREADS];
	pthread_t threads[MAX_THREADS];
	const char *data, *needle;
	size_t size, chunk, overlap, total;
	int nthreads, i, rc;
	void *result;

	if (argc != 4) {
		fprintf(stderr, "Usage: %s <file> <word> <threads>\n", argv[0]);
		return 1;
	}

	needle = argv[2];
	nthreads = atoi(argv[3]);
	if (nthreads < 1 || nthreads > MAX_THREADS) {
		fprintf(stderr, "threads must be between 1 and %d\n", MAX_THREADS);
		return 1;
	}

	if (map_file(argv[1], &data, &size) < 0)
		return 1;

	/*
	 * Cut the file into `nthreads` parts.  A match that starts in one
	 * part and ends in the next would be seen by neither, so every part
	 * but the last reaches `strlen(needle) - 1` bytes into the next one:
	 * far enough to finish a match that started inside it, not far
	 * enough to start a new one.
	 */
	chunk = size / nthreads;
	overlap = strlen(needle) - 1;
	for (i = 0; i < nthreads; i++) {
		size_t offset = (size_t) i * chunk;

		regions[i].id = i;
		regions[i].start = data + offset;
		regions[i].len = (i == nthreads - 1) ? size - offset : chunk + overlap;
		regions[i].needle = needle;
		regions[i].count = 0;
	}

	for (i = 0; i < nthreads; i++) {
		rc = pthread_create(&threads[i], NULL, count_region, &regions[i]);
		if (rc != 0) {
			fprintf(stderr, "pthread_create: %s\n", strerror(rc));
			return 1;
		}
	}

	/* Collect the results: one per thread, in thread order, after each join. */
	total = 0;
	for (i = 0; i < nthreads; i++) {
		pthread_join(threads[i], &result);
		printf("thread %d: %zu matches\n", i, *(size_t *) result);
		total += *(size_t *) result;
	}

	printf("total: %zu matches\n", total);

	munmap((void *) data, size);

	return 0;
}
