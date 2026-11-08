CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -fno-PIC -g
LDFLAGS = -no-pie

.PHONY: all clean

all: fork_exec

fork_exec: fork_exec.o

fork_exec.o: fork_exec.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f fork_exec.o fork_exec
