CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: hello

hello: hello.o

hello.o: hello.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f hello.o hello
