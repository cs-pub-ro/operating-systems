CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -fno-PIC -g -Wno-unused-but-set-variable
LDFLAGS = -no-pie

.PHONY: all clean

all: fork_faults

fork_faults: fork_faults.o

fork_faults.o: fork_faults.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f fork_faults.o fork_faults
