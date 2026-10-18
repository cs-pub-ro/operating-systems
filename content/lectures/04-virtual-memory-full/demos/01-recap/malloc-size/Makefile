CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: malloc_size_pages malloc_size_entire

malloc_size_pages: malloc_size_pages.o

malloc_size_pages.o: malloc_size_pages.c ../../utils/utils.h

malloc_size_entire: malloc_size_entire.o

malloc_size_entire.o: malloc_size_entire.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f malloc_size_entire.o malloc_size_entire
	-rm -f malloc_size_pages.o malloc_size_pages
