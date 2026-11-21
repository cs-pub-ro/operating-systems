CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -Wno-unused -Wno-unused-parameter -g

.PHONY: all clean

all: receive_fifo send_fifo

receive_fifo: receive_fifo.o

receive_fifo.o: receive_fifo.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

send_fifo: send_fifo.o

send_fifo.o: send_fifo.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

clean:
	-rm -f *~
	-rm -f receive_fifo.o receive_fifo
	-rm -f send_fifo.o send_fifo
