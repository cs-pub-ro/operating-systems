CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: segfault

segfault: segfault.o

segfault.o: segfault.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f segfault.o segfault
