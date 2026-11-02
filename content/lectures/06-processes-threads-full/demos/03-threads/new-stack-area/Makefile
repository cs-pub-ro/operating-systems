CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: create_threads

create_threads: create_threads.o

create_threads.o: create_threads.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f create_threads.o create_threads
