CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g
CFLAGS += -O1

.PHONY: all clean

all: tlb

tlb: tlb.o

tlb.o: tlb.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f tlb.o tlb
