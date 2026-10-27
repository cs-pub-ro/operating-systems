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
 * What every thread runs: count in its region and hand the result back.
 */
static void *count_region(void *arg)
{
	struct region *r = arg;

	/*
	 * TODO 1: count the matches in this region, and return the result
	 * to whoever joins this thread.  A thread returns a `void *`, and
	 * the main thread reads what it points at after pthread_join(), so
	 * it has to point at memory that is still there when the thread is
	 * gone.  A local variable of this function is not; the region is.
	 */

	return NULL;
}

int main(int argc, char *argv[])
{
	struct region regions[MAX_THREADS];
	pthread_t threads[MAX_THREADS];
	const char *data, *needle;
	size_t size, chunk, total;
	int nthreads, i, rc;

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
	 * The split from the demo: `nthreads` parts of equal size, the
	 * remainder going to the last one.
	 *
	 * TODO 3: once the total is in, compare it with `grep -o`, with one
	 * thread and with several.  A match that starts in one part and
	 * ends in the next is seen by neither.  Fix the split so that no
	 * match is lost, without any match being counted twice.
	 */
	chunk = size / nthreads;
	for (i = 0; i < nthreads; i++) {
		size_t offset = (size_t) i * chunk;

		regions[i].id = i;
		regions[i].start = data + offset;
		regions[i].len = (i == nthreads - 1) ? size - offset : chunk;
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

	/*
	 * TODO 2: join every thread, take the count it returned, print it
	 * and add it to `total`.  The second argument of pthread_join() is
	 * where the thread's return value lands.  No thread touches
	 * `total`; only this one does, after the thread is gone.
	 */
	total = 0;

	printf("total: %zu matches\n", total);

	munmap((void *) data, size);

	return 0;
}
