CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: reserve_allocate

reserve_allocate: reserve_allocate.o

reserve_allocate.o: reserve_allocate.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f reserve_allocate.o reserve_allocate
