CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -fno-PIC -g
LDFLAGS = -no-pie

.PHONY: all clean

all: posix_spawn

posix_spawn: posix_spawn.o

posix_spawn.o: posix_spawn.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f posix_spawn.o posix_spawn
