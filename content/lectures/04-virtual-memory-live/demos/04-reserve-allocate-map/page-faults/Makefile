CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: page_faults

page_faults: page_faults.o

page_faults.o: page_faults.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f page_faults.o page_faults
