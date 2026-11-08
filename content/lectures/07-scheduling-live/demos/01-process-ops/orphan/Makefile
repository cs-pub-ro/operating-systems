CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -fno-PIC -g
LDFLAGS = -no-pie

.PHONY: all clean

all: orphan

orphan: orphan.o

orphan.o: orphan.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f orphan.o orphan
