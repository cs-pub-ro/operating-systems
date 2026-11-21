CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: file-pointer

file-pointer: file-pointer.o

file-pointer.o: file-pointer.c ../../utils/utils.h

clean:
	-rm -f *~ digits.txt
	-rm -f file-pointer.o file-pointer
