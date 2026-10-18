CC = gcc
CFLAGS = -Wall -Wextra -O2 -g

.PHONY: all clean

all: frames

frames: frames.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	rm -f frames
