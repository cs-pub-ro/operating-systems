// SPDX-License-Identifier: BSD-3-Clause

/*
 * frames: a toy video pipeline, to see what the allocator does under a
 * program that allocates and frees one large buffer per unit of work.
 *
 * Each frame is a 4K image at 16 bits per channel, about 63 MiB.  For every
 * frame the program takes a buffer, composites one layer onto it, checks the
 * result, and gives the buffer back.  At the end it reports how long that
 * took, how many page faults it cost, how much memory the process used at
 * its peak, and how many pixels came out wrong.
 *
 * Build:  make
 * Run:    ./frames [--tune] [count]
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <malloc.h>
#include <time.h>
#include <sys/resource.h>

#define WIDTH		3840
#define HEIGHT		2160
#define BYTES_PER_PIXEL	8				/* 16-bit RGBA */
#define FRAME_SIZE	((size_t)WIDTH * HEIGHT * BYTES_PER_PIXEL)

/* Touch one byte per cache line: enough to fault every page in. */
#define STRIDE		64

/*
 * TODO 1: reconfigure the allocator for this workload, with mallopt().
 *
 * Run the program under strace first and look at what one frame costs the
 * kernel.  Then find, in `man 3 mallopt`, the parameter that decides when a
 * request is served by mmap() rather than from the heap, and the one that
 * decides when freed memory at the top of the heap is given back.  You want
 * one block, reused for every frame.
 */
static void tune_allocator(void)
{
}

/* The value a pixel of frame n should hold after compositing. */
static unsigned char expected(size_t i, int n)
{
	return (unsigned char)(n + i / STRIDE);
}

/*
 * Composite one layer onto the frame: brighten every sampled pixel by the
 * layer's value.  Written as if the frame starts out black.
 */
static void render_frame(unsigned char *frame, int n)
{
	size_t i;

	for (i = 0; i < FRAME_SIZE; i += STRIDE)
		frame[i] += expected(i, n);
}

/* Count the sampled pixels that do not hold the value they should. */
static size_t check_frame(const unsigned char *frame, int n)
{
	size_t bad = 0;
	size_t i;

	for (i = 0; i < FRAME_SIZE; i += STRIDE)
		if (frame[i] != expected(i, n))
			bad++;

	return bad;
}

static double now(void)
{
	struct timespec ts;

	clock_gettime(CLOCK_MONOTONIC, &ts);
	return (double)ts.tv_sec + (double)ts.tv_nsec / 1e9;
}

int main(int argc, char *argv[])
{
	int count = 100;
	int tune = 0;
	size_t corrupt = 0;
	struct rusage ru;
	double start;
	int n;

	for (n = 1; n < argc; n++) {
		if (strcmp(argv[n], "--tune") == 0)
			tune = 1;
		else
			count = atoi(argv[n]);
	}

	if (tune)
		tune_allocator();

	start = now();
	for (n = 0; n < count; n++) {
		/*
		 * TODO 2: render_frame() is written for a frame that starts
		 * out black.  Nothing on this line promises one.  Once the
		 * tuned run shows you that, make the promise explicit -- and
		 * measure what keeping it costs.
		 */
		unsigned char *frame = malloc(FRAME_SIZE);

		if (frame == NULL) {
			perror("malloc");
			return EXIT_FAILURE;
		}

		render_frame(frame, n);
		corrupt += check_frame(frame, n);

		free(frame);
	}

	getrusage(RUSAGE_SELF, &ru);
	printf("%d frames of %zu MiB%s\n", count, FRAME_SIZE >> 20,
	       tune ? " (allocator tuned)" : "");
	printf("  time:            %.3f s\n", now() - start);
	printf("  minor faults:    %ld\n", ru.ru_minflt);
	printf("  max RSS:         %ld MiB\n", ru.ru_maxrss >> 10);
	printf("  corrupt pixels:  %zu\n", corrupt);

	return EXIT_SUCCESS;
}
