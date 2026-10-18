/*
 * The page of libc that holds printf(): which virtual page it is in this
 * process, and which physical frame that page is mapped to.
 *
 * Run it twice, as root so that the frame number is shown: the virtual
 * addresses differ, the frame is the same.  One copy of libc's code in
 * memory, mapped into every process that uses it.
 */
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <fcntl.h>
#include <unistd.h>

#include "utils.h"

#define PAGE_SIZE	4096

int main(void)
{
	uintptr_t addr = (uintptr_t)&printf;
	uint64_t page_index = addr / PAGE_SIZE;
	uint64_t entry;
	ssize_t rc;
	int fd;

	/* Call it once, so that its page has been brought in. */
	printf("pid %d: printf() is at %p\n", getpid(), (void *)addr);

	fd = open("/proc/self/pagemap", O_RDONLY);
	DIE(fd < 0, "open");
	rc = pread(fd, &entry, sizeof(entry), page_index * sizeof(entry));
	DIE(rc != sizeof(entry), "pread");
	close(fd);

	printf("pid %d: virtual page 0x%lx -> present %lu, frame 0x%lx\n",
	       getpid(), page_index, (entry >> 63) & 1,
	       entry & ((1UL << 55) - 1));

	return 0;
}
