CC := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: histogram

histogram: main.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) histogram
