CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: open-perm channel-perm

open-perm: open-perm.o

open-perm.o: open-perm.c ../../utils/utils.h

channel-perm: channel-perm.o

channel-perm.o: channel-perm.c ../../utils/utils.h

clean:
	-rm -f *~ notes.txt
	-rm -f open-perm.o channel-perm.o open-perm channel-perm
