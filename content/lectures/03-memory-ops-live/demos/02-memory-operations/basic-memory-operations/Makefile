CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -Wno-unused-but-set-variable -Wno-discarded-qualifiers -g

.PHONY: all clean

all: basic

basic: basic.o

basic.o: basic.c ../../utils/utils.h

clean:
	-rm -f basic.o basic
	-rm -f *~
