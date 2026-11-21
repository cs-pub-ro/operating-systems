CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

PROGRAMS = pipe receive_fifo send_fifo receive_unix_socket send_unix_socket \
	receive_net_stream_socket send_net_stream_socket \
	receive_net_dgram_socket send_net_dgram_socket

.PHONY: all clean

all: $(PROGRAMS)

# Every program is built from the one source file with its name.
%: %.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -o $@ $<

clean:
	-rm -f *~ *.o fifo_channel socket_channel
	-rm -f $(PROGRAMS)
