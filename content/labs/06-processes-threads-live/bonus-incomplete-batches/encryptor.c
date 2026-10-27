// SPDX-License-Identifier: BSD-3-Clause

/*
 * Encrypt many files in place, with several threads: the files are split
 * into batches, and each thread takes one batch.  When the number of files
 * is not a multiple of the batch size, the last batch is the smaller one
 * that holds what is left.  The cipher
 * is XOR with a key, so running the program twice with the same key gives
 * the original files back.
 *
 *     ./encryptor <key> <batch-size> <file>...
 *     ./encryptor secret 10 data/file-01.bin data/file-02.bin ...
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

/* What one thread works on: a batch of files, and the key. */
struct batch {
	int id;			/* thread number, for the messages         */
	char **files;		/* first file of the batch                 */
	size_t nfiles;		/* how many files it holds                 */
	const char *key;	/* the key to XOR each file with           */
};

/*
 * Map the whole file at `path` into memory, for reading and writing, so
 * that a change to the memory is a change to the file.  On success returns
 * 0 and fills in the address and the size of the mapping.  Already written.
 */
static int map_file(const char *path, unsigned char **data, size_t *size)
{
	struct stat st;
	void *addr;
	int fd;

	fd = open(path, O_RDWR);
	if (fd < 0) {
		perror(path);
		return -1;
	}

	if (fstat(fd, &st) < 0) {
		perror("fstat");
		close(fd);
		return -1;
	}

	addr = mmap(NULL, st.st_size, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
	close(fd);
	if (addr == MAP_FAILED) {
		perror("mmap");
		return -1;
	}

	*data = addr;
	*size = st.st_size;

	return 0;
}

/* Undo map_file(): the changes are written back to the file.  Already written. */
static void unmap_file(unsigned char *data, size_t size)
{
	munmap(data, size);
}

/*
 * XOR every byte of `data` with the key, repeating the key as often as
 * needed.  Doing it twice gives the original bytes back.  Already written.
 */
static void xor_buffer(unsigned char *data, size_t size, const char *key)
{
	size_t klen = strlen(key);
	size_t i;

	for (i = 0; i < size; i++)
		data[i] ^= (unsigned char) key[i % klen];
}

/* What every thread runs: encrypt each file of its batch, one after another. */
static void *encrypt_batch(void *arg)
{
	struct batch *b = arg;

	printf("thread %d: %zu files, %s .. %s\n", b->id, b->nfiles,
	       b->files[0], b->files[b->nfiles - 1]);

	/*
	 * TODO 1: for every file in the batch: map it, XOR it with the key,
	 * unmap it.  The three functions above do each step; none of them
	 * knows about threads, and none needs to, because no two threads
	 * ever touch the same file.  A file that cannot be mapped has
	 * already been reported; go on with the next one.
	 */

	return NULL;
}

int main(int argc, char *argv[])
{
	struct batch batches[MAX_THREADS];
	pthread_t threads[MAX_THREADS];
	size_t nfiles, batch_size;
	const char *key;
	char **files;
	int nthreads, i;

	if (argc < 4) {
		fprintf(stderr, "Usage: %s <key> <batch-size> <file>...\n", argv[0]);
		return 1;
	}

	key = argv[1];
	batch_size = atoi(argv[2]);
	files = &argv[3];
	nfiles = argc - 3;

	if (key[0] == '\0' || batch_size == 0) {
		fprintf(stderr, "the key must not be empty, the batch size must be at least 1\n");
		return 1;
	}
	/*
	 * TODO 5: the number of threads.  57 files in batches of 10 need six
	 * threads, not five: the division has to round up, and it has to do
	 * so in integer arithmetic.
	 */
	nthreads = nfiles / batch_size;
	if (nthreads > MAX_THREADS) {
		fprintf(stderr, "that would take %d threads, the limit is %d\n",
			nthreads, MAX_THREADS);
		return 1;
	}

	/*
	 * TODO 2: fill in one batch per thread.  `files` is the array of
	 * `nfiles` names from the command line; batch i takes `batch_size`
	 * of them, starting right after the ones batch i - 1 took.  Every
	 * file has to be in exactly one batch.
	 *
	 * TODO 6: the last batch holds whatever is left once the others took
	 * theirs, which is between 1 and `batch_size` files.  Its size is
	 * the only one that is not `batch_size`; compute it from what is
	 * left rather than special-casing the last index.
	 */

	/*
	 * TODO 3: start one thread per batch, each running encrypt_batch()
	 * with a pointer to its own batch.
	 */

	/* TODO 4: wait for all of them. */

	printf("%zu files encrypted, %d thread(s)\n", nfiles, nthreads);

	return 0;
}
