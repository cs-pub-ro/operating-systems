CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: malloc_kb

malloc_kb: malloc_kb.o

malloc_kb.o: malloc_kb.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f malloc_kb.o malloc_kb
