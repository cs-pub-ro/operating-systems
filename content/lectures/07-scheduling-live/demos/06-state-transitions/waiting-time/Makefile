CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -fno-PIC -g -Wno-unused-parameter
LDFLAGS = -no-pie

.PHONY: all clean

all: waiting_time

waiting_time: waiting_time.o

waiting_time.o: waiting_time.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f waiting_time.o waiting_time
