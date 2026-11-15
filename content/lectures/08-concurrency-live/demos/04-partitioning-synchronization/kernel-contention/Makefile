CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -Wno-unused-parameter -g
LDLIBS = -lpthread

.PHONY: all clean

all: map_unmap

map_unmap: map_unmap.o

map_unmap.o: map_unmap.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f map_unmap.o map_unmap
