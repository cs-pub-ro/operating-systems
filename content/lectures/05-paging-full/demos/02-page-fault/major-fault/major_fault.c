/*
 * Minor and major faults on the same file.
 *
 * The file is dropped from the page cache, mapped with read-ahead turned off,
 * and read one byte per page: every page is a major fault, served from disk.
 * The same walk a second time finds every page in the page cache: minor
 * faults only.
 */
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <time.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/resource.h>
#include <sys/stat.h>

#include "utils.h"

#define SIZE		(64UL << 20)
#define PAGE_SIZE	4096
#define PATH		"data.bin"

static long minor_faults(void)
{
	struct rusage ru;

	getrusage(RUSAGE_SELF, &ru);

	return ru.ru_minflt;
}

static long major_faults(void)
{
	struct rusage ru;

	getrusage(RUSAGE_SELF, &ru);

	return ru.ru_majflt;
}

static double now(void)
{
	struct timespec ts;

	clock_gettime(CLOCK_MONOTONIC, &ts);

	return (double)ts.tv_sec + (double)ts.tv_nsec / 1e9;
}

/* Make sure the file exists and is SIZE bytes long, then write it to disk. */
static int open_data_file(void)
{
	struct stat st;
	int fd;

	fd = open(PATH, O_RDWR | O_CREAT, 0644);
	DIE(fd < 0, "open");
	DIE(fstat(fd, &st) < 0, "fstat");

	if ((size_t)st.st_size < SIZE) {
		char *block = malloc(1 << 20);

		DIE(block == NULL, "malloc");
		for (unsigned int i = 0; i < 1 << 20; i++)
			block[i] = (char)i;
		for (off_t off = 0; off < (off_t)SIZE; off += 1 << 20)
			DIE(pwrite(fd, block, 1 << 20, off) != 1 << 20, "pwrite");
		DIE(fsync(fd) < 0, "fsync");
		free(block);
	}

	return fd;
}

static void walk(int fd, const char *label)
{
	volatile long sum = 0;
	long minor, major;
	double start;
	char *p;

	p = mmap(NULL, SIZE, PROT_READ, MAP_PRIVATE, fd, 0);
	DIE(p == MAP_FAILED, "mmap");
	/* No read-ahead: the kernel brings in only the page that faulted. */
	DIE(madvise(p, SIZE, MADV_RANDOM) < 0, "madvise");

	minor = minor_faults();
	major = major_faults();
	start = now();
	for (size_t i = 0; i < SIZE; i += PAGE_SIZE)
		sum += p[i];
	printf("%-28s %6ld minor, %6ld major faults, %.3f s\n", label,
	       minor_faults() - minor, major_faults() - major, now() - start);

	munmap(p, SIZE);
}

int main(void)
{
	int fd = open_data_file();

	/* Drop the file's pages from the page cache, so that the disk is hit. */
	DIE(posix_fadvise(fd, 0, 0, POSIX_FADV_DONTNEED) != 0, "posix_fadvise");

	printf("%lu pages of %s\n\n", SIZE / PAGE_SIZE, PATH);
	walk(fd, "first pass (from disk):");
	walk(fd, "second pass (from the cache):");

	close(fd);

	return 0;
}
