CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: file-ops

file-ops: file-ops.o

file-ops.o: file-ops.c ../../utils/utils.h

clean:
	-rm -f *~ f.txt
	-rm -f file-ops.o file-ops
