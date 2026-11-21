CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: fdtsize

fdtsize: fdtsize.o

fdtsize.o: fdtsize.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f fdtsize.o fdtsize
