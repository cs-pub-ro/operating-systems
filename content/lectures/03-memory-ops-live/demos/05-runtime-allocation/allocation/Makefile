CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: allocation

allocation: allocation.o

allocation.o: allocation.c ../../utils/utils.h

clean:
	-rm -f *.o *~ allocation *.txt
