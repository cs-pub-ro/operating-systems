CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: lowest-fd

lowest-fd: lowest-fd.o

lowest-fd.o: lowest-fd.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f lowest-fd.o lowest-fd
