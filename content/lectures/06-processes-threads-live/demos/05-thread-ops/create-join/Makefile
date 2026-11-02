CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g
LDFLAGS = -pthread

.PHONY: all clean

all: create_join

create_join: create_join.o

create_join.o: create_join.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f create_join.o create_join
