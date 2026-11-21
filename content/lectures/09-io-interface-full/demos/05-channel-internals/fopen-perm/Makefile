CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: fopen-perm

fopen-perm: fopen-perm.o

fopen-perm.o: fopen-perm.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f fopen-perm.o fopen-perm

