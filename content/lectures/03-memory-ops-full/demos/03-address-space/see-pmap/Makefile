CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -Wno-unused-but-set-variable -Wno-discarded-qualifiers -g -fno-PIC
LDFLAGS = -no-pie

.PHONY: all clean

all: see-pmap see-pmap-static

see-pmap: see-pmap.o

see-pmap.o: see-pmap.c ../../utils/utils.h

see-pmap-static: see-pmap.o
	$(CC) -static -no-pie -o $@ $^

clean:
	-rm -f see-pmap.o see-pmap see-pmap-static
	-rm -f *~
