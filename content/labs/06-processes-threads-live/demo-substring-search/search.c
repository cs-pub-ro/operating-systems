// SPDX-License-Identifier: BSD-3-Clause

/*
 * Search a large file for a word, with several threads: the file is mapped
 * into memory once, and each thread searches its own part of it.
 *
 *     ./search big.txt kernel 4
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

/* What one thread works on: a part of the file, and the word to look for. */
struct region {
	int id;			/* thread number, for the messages         */
	const char *start;	/* first byte of this thread's part        */
	size_t len;		/* how many bytes it covers                */
	const char *needle;	/* the word to look for                    */
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

/* What every thread runs: search its region and report.  Already written. */
static void *search_region(void *arg)
{
	struct region *r = arg;
	size_t count;

	count = count_matches(r->start, r->len, r->needle);
	printf("thread %d: %zu matches in %zu bytes\n", r->id, count, r->len);

	return NULL;
}

int main(int argc, char *argv[])
{
	struct region regions[MAX_THREADS];
	pthread_t threads[MAX_THREADS];
	const char *data, *needle;
	size_t size, chunk;
	int nthreads, i;

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
	 * TODO 1: cut the file into `nthreads` parts, one region each.
	 * The `size` bytes at `data` are the whole file.  Every byte has to
	 * belong to exactly one part, including the few left over when the
	 * size does not divide evenly; give those to the last part.
	 */

	/*TODO 1: calculate the chunk (nr of characters every thread will get)*/

	for (i = 0; i < nthreads; i++) {
		regions[i].id = i;
		regions[i].needle = needle;
		/* TODO 1: compute start and len */
	}

	/*
	 * TODO 2: start one thread per region, with pthread_create().
	 * Every thread runs search_region() and gets a pointer to its own
	 * region as the argument.  The function returns an error number
	 * rather than setting errno; strerror() turns it into a message.
	 */

	/*
	 * TODO 3: wait for every thread to finish, with pthread_join().
	 * Without this, main() returns, the process ends, and the threads
	 * still searching are gone with it.
	 */

	munmap((void *) data, size);

	return 0;
}
