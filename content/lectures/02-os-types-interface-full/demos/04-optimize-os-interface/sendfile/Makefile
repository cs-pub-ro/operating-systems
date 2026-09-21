CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: server_write server_sendfile client

server_write: server_write.c

server_sendfile: server_sendfile.c

client: client.c

clean:
	rm -f server_write server_sendfile client
