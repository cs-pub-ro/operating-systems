CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: major_fault

major_fault: major_fault.o

major_fault.o: major_fault.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f major_fault.o major_fault
	-rm -f data.bin
