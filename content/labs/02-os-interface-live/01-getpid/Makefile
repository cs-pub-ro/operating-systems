CC      = gcc
CFLAGS  = -Wall -Wextra -g

.PHONY: all clean

all: getpid

getpid: main.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	rm -f getpid
