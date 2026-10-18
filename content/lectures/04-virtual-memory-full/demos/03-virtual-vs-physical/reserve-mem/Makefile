CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: reserve_mem

reserve_mem: reserve_mem.o

reserve_mem.o: reserve_mem.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f reserve_mem.o reserve_mem
