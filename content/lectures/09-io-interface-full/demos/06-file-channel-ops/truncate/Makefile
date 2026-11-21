CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: truncate

truncate: truncate.o

open.o: truncate.c ../../utils/utils.h

clean:
	-rm -f *.o *~ truncate
