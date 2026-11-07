CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -fno-PIC -g -Wno-unused-parameter
LDFLAGS = -no-pie

.PHONY: all clean

all: load_average

load_average: load_average.o

load_average.o: load_average.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f load_average.o load_average
