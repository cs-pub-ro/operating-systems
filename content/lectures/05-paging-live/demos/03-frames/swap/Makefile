CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: swap

swap: swap.o

swap.o: swap.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f swap.o swap
