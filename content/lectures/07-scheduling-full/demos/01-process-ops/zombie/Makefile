CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -fno-PIC -g
LDFLAGS = -no-pie

.PHONY: all clean

all: zombie

zombie: zombie.o

zombie.o: zombie.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f zombie.o zombie
