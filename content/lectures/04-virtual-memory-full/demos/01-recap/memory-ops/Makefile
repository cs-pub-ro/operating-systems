CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: memory_ops_pages memory_ops_entire

memory_ops_pages: memory_ops_pages.o

memory_ops_pages.o: memory_ops_pages.c ../../utils/utils.h

memory_ops_entire: memory_ops_entire.o

memory_ops_entire.o: memory_ops_entire.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f memory_ops_pages.o memory_ops_pages
	-rm -f memory_ops_entire.o memory_ops_entire
