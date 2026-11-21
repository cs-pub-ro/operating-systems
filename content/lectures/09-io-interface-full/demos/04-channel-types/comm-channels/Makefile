CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -Wno-unused -Wno-unused-parameter -g

.PHONY: all clean

all: receive_fifo send_fifo reader writer send_unix_socket receive_unix_socket \
	send_net_dgram_socket receive_net_dgram_socket \
	send_net_stream_socket receive_net_stream_socket \

reader: reader.o

reader.o: reader.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

writer: writer.o

writer.o: writer.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

receive_fifo: receive_fifo.o

receive_fifo.o: receive_fifo.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

send_fifo: send_fifo.o

send_fifo.o: send_fifo.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

receive_unix_socket: receive_unix_socket.o

receive_unix_socket.o: receive_unix_socket.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

send_unix_socket: send_unix_socket.o

send_unix_socket.o: send_unix_socket.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

receive_net_stream_socket: receive_net_stream_socket.o sock_util.o

receive_net_stream_socket.o: receive_net_stream_socket.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

send_net_stream_socket: send_net_stream_socket.o sock_util.o

send_net_stream_socket.o: send_net_stream_socket.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

receive_net_dgram_socket: receive_net_dgram_socket.o sock_util.o

receive_net_dgram_socket.o: receive_net_dgram_socket.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

send_net_dgram_socket: send_net_dgram_socket.o sock_util.o

send_net_dgram_socket.o: send_net_dgram_socket.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

sock_util.o: ../../utils/sock/sock_util.c ../../utils/sock/sock_util.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

clean:
	-rm -f *~
	-rm -f receive_fifo.o receive_fifo
	-rm -f send_fifo.o send_fifo
	-rm -f reader.o reader
	-rm -f writer.o writer
	-rm -f sock_util.o
	-rm -f receive_net_dgram_socket.o receive_net_dgram_socket
	-rm -f receive_unix_socket.o receive_unix_socket
	-rm -f send_net_dgram_socket.o send_net_dgram_socket
	-rm -f send_unix_socket.o send_unix_socket
	-rm -f receive_net_stream_socket.o receive_net_stream_socket
	-rm -f send_net_stream_socket.o send_net_stream_socket
