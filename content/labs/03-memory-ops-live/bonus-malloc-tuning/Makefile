CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: frames

frames: frames.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) frames
