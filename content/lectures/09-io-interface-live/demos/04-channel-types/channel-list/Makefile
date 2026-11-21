CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: channels

channels: channels.o

channels.o: channels.c ../../utils/utils.h

clean:
	-rm -f *~ fifo_channel socket_channel
	-rm -f channels.o channels
