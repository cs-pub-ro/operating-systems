CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: fork_cow

fork_cow: fork_cow.o

fork_cow.o: fork_cow.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f fork_cow.o fork_cow
