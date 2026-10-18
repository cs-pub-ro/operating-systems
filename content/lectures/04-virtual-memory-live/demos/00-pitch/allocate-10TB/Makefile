CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: allocate_gb

allocate_gb: allocate_gb.o

allocate_gb.o: allocate_gb.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f allocate_gb.o allocate_gb
