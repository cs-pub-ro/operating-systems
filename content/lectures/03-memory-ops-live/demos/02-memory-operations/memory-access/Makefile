CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -Wno-unused-but-set-variable -Wno-discarded-qualifiers -g

.PHONY: all clean

all: memory-access

memory-access: memory-access.o

memory-access.o: memory-access.c ../../utils/utils.h

clean:
	-rm -f memory-access.o memory-access
	-rm -f *~
