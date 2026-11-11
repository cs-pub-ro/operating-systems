// SPDX-License-Identifier: BSD-3-Clause

/*
 * Count the occurrences of a word in a large file, with several threads.
 * The file is mapped into memory once and cut into one part per thread;
 * every thread adds what it found to one shared total, under a mutex.
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

/* The result: every thread adds to it, so every thread locks before it does. */
static size_t total;
static pthread_mutex_t total_lock = PTHREAD_MUTEX_INITIALIZER;

/* Seconds since some fixed point in the past; only differences mean anything. */
static double now(void)
{
	struct timespec ts;

	clock_gettime(CLOCK_MONOTONIC, &ts);

	return ts.tv_sec + ts.tv_nsec / 1e9;
}

/*
 * Map the whole file at `path` into memory, read-only.  On success returns
 * 0 and fills in the address and the size of the mapping.
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
 * `grep -o` counts them.
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
 * What every thread runs.  The count is kept in a local variable, which no
 * other thread can see, and added to the shared total once, at the end: one
 * lock per thread, not one per match.
 */
static void *search_region(void *arg)
{
	struct region *r = arg;
	size_t count;

	count = count_matches(r->start, r->len, r->needle);

	pthread_mutex_lock(&total_lock);
	total += count;
	pthread_mutex_unlock(&total_lock);

	return NULL;
}

int main(int argc, char *argv[])
{
	struct region regions[MAX_THREADS];
	pthread_t threads[MAX_THREADS];
	size_t size, chunk, overlap, offset;
	const char *data, *needle;
	double t_start, t_end;
	int nthreads, i, rc;

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
	 * Cut the file into `nthreads` parts.  The last one takes the bytes
	 * left over by the division.  Every other one reaches
	 * `strlen(needle) - 1` bytes into the next: far enough to finish a
	 * match that started inside it, not far enough to start a new one.
	 */
	chunk = size / nthreads;
	overlap = strlen(needle) - 1;
	for (i = 0; i < nthreads; i++) {
		offset = (size_t) i * chunk;
		regions[i].start = data + offset;
		regions[i].len = (i == nthreads - 1) ? size - offset : chunk + overlap;
		regions[i].needle = needle;
	}

	for (i = 0; i < nthreads; i++) {
		rc = pthread_create(&threads[i], NULL, search_region, &regions[i]);
		if (rc != 0) {
			fprintf(stderr, "pthread_create: %s\n", strerror(rc));
			return 1;
		}
	}

	/* The total is complete only when every thread has added its share. */
	for (i = 0; i < nthreads; i++)
		pthread_join(threads[i], NULL);

	t_end = now();

	printf("%zu matches, %d thread(s), %.3f s\n", total, nthreads, t_end - t_start);

	munmap((void *) data, size);

	return 0;
}
