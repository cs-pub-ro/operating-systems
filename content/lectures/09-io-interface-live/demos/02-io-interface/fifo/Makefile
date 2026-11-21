CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: receive_fifo send_fifo

receive_fifo: receive_fifo.o

receive_fifo.o: receive_fifo.c ../../utils/utils.h

send_fifo: send_fifo.o

send_fifo.o: send_fifo.c ../../utils/utils.h

clean:
	-rm -f *~ fifo_channel
	-rm -f receive_fifo.o send_fifo.o receive_fifo send_fifo
