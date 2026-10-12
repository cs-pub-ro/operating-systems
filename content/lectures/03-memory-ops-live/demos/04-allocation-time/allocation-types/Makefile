CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -Wno-unused-but-set-variable -Wno-discarded-qualifiers -g -fno-PIC
LDFLAGS = -no-pie

.PHONY: all clean

all: allocation-types

allocation-types: allocation-types.o

allocation-types.o: allocation-types.c ../../utils/utils.h

clean:
	-rm -f allocation-types.o allocation-types
	-rm -f *~
