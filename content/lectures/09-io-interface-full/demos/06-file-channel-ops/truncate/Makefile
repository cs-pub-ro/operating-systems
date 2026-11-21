CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: truncate

truncate: truncate.o

truncate.o: truncate.c ../../utils/utils.h

clean:
	-rm -f *~ fake-gargantua.dat
	-rm -f truncate.o truncate
